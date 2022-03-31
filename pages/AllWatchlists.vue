<template>
    <div class="d-flex flex-wrap px-3 px-md-4 pt-5">
        <watchlist-item v-for="list in lists" :key="list.id" v-bind="list" @DeleteList="openDeleteModal(list)"/>

        <div class="col-12 col-lg-6 col-xxl-4 px-3 px-md-4 pb-5">
            <div class="card h-100">
                <button class="button-card card-body py-5" @click="openCreateModal()">
                    <svg-vue icon="copysam-create-watchlist" class="pb-3 watchlist-icon-lg"></svg-vue>
                    {{ $t('site.create_list') }}
                </button>
            </div>
        </div>

        <DeleteWatchlist v-bind="watchlistToDelete" />
    </div>
</template>

<script>
  import {mapState} from "vuex";
  import DeleteWatchlist from "../modals/DeleteWatchlist";
  import WatchlistItem from "../components/WatchlistItem";
  import {canOpenWatchlistCreateModal} from "../mixins";

  export default {
    name: "AllWatchlists",
    mixins: [canOpenWatchlistCreateModal],
    components: {
      DeleteWatchlist,
      WatchlistItem,
    },
    data() {
      return {
        watchlistToDelete: null,
      };
    },
    methods: {
      openDeleteModal(list) {
        this.watchlistToDelete = list;
        $('#watchlist-delete-modal').modal('show');
      },
    },
    computed: {
      ...mapState({
        lists(state) {
          return state.watchlist.lists;
        },
      }),
    },
  }
</script>

<style scoped lang="scss">
</style>