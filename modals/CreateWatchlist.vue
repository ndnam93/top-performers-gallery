<template>
    <div class="modal fade" id="watchlist-create-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <svg-vue icon="close 1"></svg-vue>
                    </button>
                </div>
                <div class="modal-body pb-4">
                    <div class="row pl-lg-3">
                        <div class="col-12 col-md-6 pl-lg-4">
                            <form action="" @submit.prevent="submit">
                                <div style="font-size: 24px">{{ $t('site.watchlist_name_hint') }}</div>
                                <input type="text" v-model="name" :placeholder="$t('messages.name_required')" class="form-control mt-4 mt-lg-5" required>
                                <div class="invalid-feedback">{{ errMsg }} &nbsp;</div>
                                <button type="submit" class="btn btn-primary mt-4 mb-4 mb-md-0 mt-lg-5">{{ $t('site.create_list') }}</button>
                            </form>
                        </div>
                        <div class="col-12 col-md-6">
                            <img src="/images/copysam/new-watchlist-bg.svg" alt="" class="w-100">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {WatchlistService} from "../api.service";
  import {mapState} from "vuex";

  export default {
    name: "CreateWatchlist",
    data() {
      return {
        name: '',
        errMsg: null,
      };
    },
    methods: {
      async submit() {
        if (this.name.trim()) {
          this.errMsg = null;
          try {
            const response = await WatchlistService.create({name: this.name});
            if (!response.data.success) {
              return this.$toast.error(this.$t('messages.action_not_performed'));
            }
            this.$toast.success(this.$t('messages.watchlist_created', {name: this.name}));

            if (this.masterId) {
              await WatchlistService.patch(response.data.data.id, {
                action: 'watch',
                master_id: this.masterId,
              });
              this.$toast.success(this.$t('messages.watched_master', {watchlist: this.name}));
            }

            this.$store.dispatch('fetchWatchlists');
            $('#watchlist-create-modal').modal('hide');
            this.name = '';

          } catch(err) {
            if (err.response?.status == 400) {
              this.errMsg = err.response.data?.errors?.name[0];
            }
          }
        }
      },
    },
    computed: {
      ...mapState({
        masterId: state => state.watchlist.masterIdForNewList,
      }),
    },
  }
</script>

<style scoped lang="scss">
    .modal-header {
        border: 0;

        .close {
            color: #ccc;

            svg {
                width: 24px;
            }
        }
    }

    .modal-content {
        border-radius: 10px;

        input[type=text] {
            border: 2px solid rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            height: 50px;
        }

        .invalid-feedback {
            display: block;
        }

        button[type=submit] {
            padding: 12px 50px;
        }
    }

</style>
