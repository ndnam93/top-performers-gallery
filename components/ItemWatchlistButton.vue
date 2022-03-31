<template>
    <div>
        <button class="watchlist-btn dropdown-toggle" type="button" :id="'toggle-btn-' + id" data-toggle="dropdown">
            <svg-vue icon="copysam-added-to-watchlist" class="icon-added blue" v-if="currentList"/>
            <svg-vue icon="copysam-add-to-watchlist" v-else />
        </button>
        <div class="dropdown-menu dropdown-menu-right item-watchlist-menu" :aria-labelledby="'toggle-btn-' + id" ref="watchlistMenu">
            <ul>
                <li v-for="list in lists" :key="list.id">
                    <button class="btn" @click="onItemClick(list)" :title="getHint(list)">
                        <span :class="{'font-weight-bold': true}">{{ list.name }}</span>
                        <div v-if="currentList && list.id == currentList.id">
                            <svg-vue icon="check" class="check icon"></svg-vue>
                            <svg-vue icon="close 2" class="unwatch icon"></svg-vue>
                        </div>
                    </button>
                </li>
            </ul>
            <button class="btn new-list-btn" @click="openCreateModal(id)">
                <svg-vue icon="copysam-create-watchlist"/>
                {{ $t('site.add_to_new') }}
            </button>
        </div>
    </div>
    
</template>

<script>
  import {mapGetters, mapState} from "vuex";
  import {WatchlistService} from "../api.service";
  import {canOpenWatchlistCreateModal} from "../mixins";

  export default {
    name: "ItemWatchlistButton",
    props: ['id', 'master_name'],
    mixins: [canOpenWatchlistCreateModal],
    methods: {
      async onItemClick(list) {
        const action = list.id == this.currentList?.id ? 'unwatch' : 'watch';
        const {data: {success}} = await WatchlistService.patch(list.id, {action, master_id: this.id});
        if (!success) {
          return this.$toast.error(this.$t('messages.action_not_performed'));
        }

        this.$store.dispatch('fetchWatchlists');
        const msgKey = action == 'unwatch' ? 'unwatched_master' : (this.currentList ? 'moved_master' : 'watched_master');
        this.$toast.success(this.$t(`messages.${msgKey}`, {name: this.master_name, watchlist: list.name}));
      },
      getHint(list) {
        if (!this.currentList)              return this.$t('site.add_to_watchlist');
        if (list.id == this.currentList.id) return this.$t('site.remove_from_watchlist');
        return this.$t('site.move_to_watchlist');
      },
    },
    computed: {
      ...mapGetters(['getMasterWatchlist']),
      ...mapState({
        lists(state) {
          return state.watchlist.lists;
        },
      }),
      currentList() {
        return this.getMasterWatchlist(this.id);
      },
    },
  }
</script>

<style scoped lang="scss">
    @import "resources/assets/v2/scss/variables";
    @import "resources/assets/v2/scss/mixins";

    .watchlist-btn {
        width: 50px;
        height: 52px;
        padding: 8px 10px 0;
        overflow: hidden;
        white-space: nowrap;
        text-align: left;
        background-color: transparent;
        position: absolute;

        svg {
            width: 32px;
            margin-right: 16px;

            &.icon-remove {
                display: none;
            }
        }
    }

    .item-watchlist-menu {
        border: 0;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.25);
        width: 254px;
        max-width: calc(100% - 16px);
        max-height: calc(100% - 63px);
        padding: 0;
        overflow: hidden;

        &.show {
            display: flex;
            flex-direction: column;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
            width: 100%;
            flex-shrink: 1;
            overflow-x: hidden;
            @include blue-scrollbar();

            li {
                &:first-of-type .btn {
                    padding-top: 14px;
                }

                &:last-of-type .btn {
                    padding-bottom: 14px;
                }
            }
        }

        .btn {
            padding: 8px 20px;
            width: 100%;
            border-radius: 0;
            display: flex;
            align-items: center;

            &:hover {
                @media (hover: hover) and (pointer: fine) {
                    background: #EBF2FC;

                    .icon {
                        &.check {
                            display: none;
                        }

                        &.unwatch {
                            display: block;
                        }
                    }
                }
            }

            span {
                text-align: left;
                flex-grow: 1;
            }

            .icon {
                @include square(16px);

                &.unwatch {
                    fill: #DD3030;
                    display: none;
                }
            }

            &.new-list-btn {
                background: #EAF1FC;
                width: 100%;
                font-size: 14px;
                font-weight: normal;
                border-radius: 0;
                flex-shrink: 0;
                display: flex;
                justify-content: center;
                align-items: center;

                svg {
                    width: 24px;
                    margin-right: 10px;
                }
            }
        }
    }
</style>