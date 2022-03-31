<template>
    <div class="modal fade" id="watchlist-delete-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content flex-column align-items-center">
                <svg-vue icon="copysam-delete-watchlist" class="watchlist-icon-lg" />
                <div class="text" v-html="$t('site.delete_confirm', {name: `<b>${name}</b>`})" />
                <div class="d-flex flex-wrap justify-content-center justify-content-lg-between align-self-stretch">
                    <button class="btn btn-primary mt-3" @click="close">{{ $t('site.cancel') }}</button>
                    <button class="btn btn-outline-primary mt-3" @click="submit">{{ $t('site.delete') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {WatchlistService} from "../api.service";

  export default {
    name: "DeleteWatchlist",
    props: ['id', 'name'],
    methods: {
      close() {
        $('#watchlist-delete-modal').modal('hide');
      },
      async submit() {
        const response = await WatchlistService.delete(this.id);
        if (response.data.success) {
          this.close();
          this.$store.dispatch('fetchWatchlists');
          this.$toast.info(this.$t('messages.watchlist_deleted', {name: this.name}));
        } else {
          this.$toast.error(this.$t('messages.action_not_performed'));
        }
      },
    }
  }
</script>

<style scoped>
    .modal-content {
        border-radius: 10px;
        padding: 20px;
    }

    .text {
        padding: 40px 0;
        font-size: 24px;
    }

    .btn {
        padding: 6px 100px;
        font-size: 24px;
    }

    @media only screen and (min-width: 768px) {
        .modal-content {
            padding: 40px 80px;
        }

    }
</style>
