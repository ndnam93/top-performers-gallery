<template>
    <div>
        <div class="d-flex flex-wrap px-3 px-md-4 pt-5">
            <div class="col-12 col-lg-6 col-xxl-4 px-3 px-md-4 pb-5" v-for="item in items" :key="item.id">
                <master-item v-bind="item"/>
            </div>

            <div class="col-12 col-lg-6 col-xxl-4 px-3 px-md-4 pb-5">
                <div class="card h-100">
                    <button class="button-card card-body py-5" @click="goToMain">
                        <svg-vue icon="copysam-add-to-watchlist" class="pb-3 watchlist-icon-lg"></svg-vue>
                        {{ $t('site.discover_people') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapState} from "vuex";
  import MasterItem from "../components/MasterItem";

  export default {
    name: "CustomWatchlist",
    props: ['id'],
    components: {
      MasterItem,
    },
    computed: {
      ...mapState({
        list(state) {
          return state.watchlist.lists.find(list => list.id == this.id);
        },
        watchlistLoaded(state) {
          return Boolean(this.$store.state.watchlist.updated_at);
        },
      }),
      items() {
        return this.list?.masters || [];
      },
    },
    methods: {
      goToMain() {
        this.$router.push({name: 'main'});
      },
    },
    mounted() {
      if (this.watchlistLoaded && _.isEmpty(this.list)) {
        this.$router.push({name: 'watchlist', params: {id: 'all'}});
      }
    },
  }
</script>

<style scoped>

</style>