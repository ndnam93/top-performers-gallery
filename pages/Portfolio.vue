<template>
    <div>
        <grid-view :items="items" :hasMore="hasMore" @load-more="fetchMasters" v-if="hasMore || items.length" />

        <div class="d-flex flex-wrap px-md-4 py-5" v-if="!hasMore && !items.length">
            <div class="col-12">
                <div class="card empty-portfolio-card mb-3 mb-md-5">
                    <div class="card-body d-flex flex-column align-items-center">
                        <svg-vue icon="copysam-portfolio" class="watchlist-icon-lg mb-4" />
                        <h1>{{ $t('site.empty_portfolio') }}</h1>
                        <div class="hint mt-3 mb-4">{{ $t('site.empty_portfolio_hint') }}</div>
                        <button class="btn btn-primary" @click="goToMain">{{ $t('site.start_copy') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import GridView from "../layouts/GridView";
  import {mapState} from "vuex";

  export default {
    name: "Portfolio",
    components: {
      GridView,
    },
    data: () => ({
      isListMode: false,
    }),
    methods: {
      async fetchMasters() {
        this.$store.dispatch('fetchMasters', 'portfolio');
      },
      goToMain() {
        this.$router.push({name: 'main'});
      },
    },
    computed: {
      ...mapState({
        items(state) {
          return state.master_list.portfolio.list;
        },
        hasMore(state) {
          return state.master_list.portfolio.hasMore;
        },
      }),
    },
    mounted() {
      this.$store.commit('resetSection', 'portfolio');
    },
  }
</script>

<style scoped lang="scss">
    .empty-portfolio-card {
        border-radius: 20px;

        .card-body {
            padding: 40px 20px;
            color: rgba(#000, 0.5);
            text-align: center;

            h1 {
                font-size: 24px;
            }

            .hint {
                font-size: 18px;
            }

            .btn {
                font-size: 24px;
                width: 100%;
            }

            @media only screen and (min-width: 768px) {
                padding: 40px;
                text-align: left;

                h1 {
                    font-size: 36px;
                }

                .btn {
                    width: auto;
                    padding: 6px 160px;
                }
            }
        }
    }
</style>