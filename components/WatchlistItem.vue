<template>
    <div class="col-12 col-lg-6 col-xxl-4 px-3 px-md-4 pb-5">
        <div class="card">
            <div class="card-body h-100">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="info">
                        <div class="name">{{ name }}</div>
                        <div class="count">{{ $t('site.people_count', {count: masters.length}) }}</div>
                    </div>
                    <button class="btn px-1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" type="button"
                        :id="`dropdown-watchlist-${id}`">
                        <svg-vue icon="copysam-watchlist-menu"></svg-vue>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" :aria-labelledby="`dropdown-watchlist-${id}`">
                        <button class="btn dropdown-item" @click.stop="onClickDelete">
                            <svg-vue icon="copysam-delete-watchlist"></svg-vue>
                            {{ $t('site.delete_watchlist') }}
                        </button>
                    </div>
                </div>
                <div class="preview" @click="goToWatchlist">
                    <div class="avatar" v-for="(avatar_url, index) in avatars" :key="index">
                        <div class="embed-responsive embed-responsive-1by1">
                            <img :src="avatar_url" alt="" class="embed-responsive-item" v-if="avatar_url">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "WatchlistItem",
    props: ['id', 'name', 'masters'],
    methods: {
      onClickDelete() {
        this.$emit('DeleteList');
      },
      goToWatchlist(event) {
        this.$router.push({name: 'watchlist', params: {id: this.id}});
      }
    },
    computed: {
      avatars() {
        const avatars = this.masters.map(item => item.copy_master_profile_pic)
          .filter(_.isString)
          .slice(0, 9);

        return [...avatars, ...Array(9 - avatars.length)];
      },
    },
  }
</script>

<style scoped lang="scss">
    .name {
        font-weight: bold;
        margin-bottom: 10px;
    }

    .count {
        color: rgba(#000, 0.5);
        font-size: 14px;
        margin-bottom: 20px;
    }

    .dropdown-toggle {
        &:after {
            display: none;
        }

        &:hover {
            opacity: 0.75;
        }
    }

    .dropdown-menu {
        border: 0;
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.25);

        .dropdown-item {
            padding: 12px 20px;
            font-size: 18px;
            font-weight: 600;
            color: #000;
            display: flex;
            align-items: flex-end;

            &:hover {
                background: #EBF2FC;
            }

            svg {
                width: 36px;
                margin-right: 20px;
            }
        }
    }

    .preview {
        cursor: pointer;
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(3, 1fr);

        .avatar {
            background: #ccc;

            &:first-child {
                grid-column: 1 / 3;
                grid-row: 1 / 3;
            }
        }
    }

    .dropdown-menu {
        border-radius: 10px;
        padding: 0;
    }
</style>