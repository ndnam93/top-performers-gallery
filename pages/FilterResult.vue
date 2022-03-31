<template>
    <section style="min-height: 100vh">
        <div class="px-3 px-md-5 py-4 py-md-5">
            <h1 class="cp-section-title">
                <span>{{ $t('site.custom_search') }} | {{ $t('site.results', {count: items.length}) }}</span>
                <span>
                    <button class="view-mode-btn mr-4 d-none d-md-inline-block" @click="isListMode = !isListMode">
                        <svg-vue :icon="'copysam-' + (isListMode ? 'grid' : 'list')"></svg-vue>
                    </button>
                    <router-link :to="{name: 'main'}" class="btn-back">{{ $t('site.back') }}</router-link>
                </span>
            </h1>
        </div>
        <component :is="currentView" :items="items" :hasMore="hasMore" @load-more="fetchResult" />
        <div class="d-flex justify-content-center mb-5" v-if="!hasMore && !items.length">
            <router-link :to="{name: 'main'}" class="btn btn-primary px-5 py-2 font-weight-bold text-uppercase">{{ $t('site.go_back') }}</router-link>
        </div>
    </section>
</template>

<script>
  import {mapState} from "vuex";
  import GridView from "../layouts/GridView";
  import ListView from "../layouts/ListView";
  import {CopyMasterService} from "../api.service";
  import {isEmptyFilter} from "../helpers";

  export default {
    name: "FilterResult",
    components: {
      GridView,
      ListView,
    },
    data: () => ({
      isListMode: false,
      items: [],
      hasMore: true,
    }),
    methods: {
      async fetchResult() {
        this.hasMore = true;
        const {data: response} = await CopyMasterService.query(this.filters);
        this.items = response?.data || [];
        this.hasMore = false;
      }
    },
    computed: {
      ...mapState({
        filters: 'filter',
      }),
      currentView() {
        return this.isListMode ? ListView : GridView;
      },
    },
    mounted() {
      if (_.isEmpty(_.omitBy(this.$route.query, isEmptyFilter))) {
        this.$router.push({name: 'main'});
      }
      this.$store.commit('setFilters', this.$route.query);
    },
    watch: {
      '$route.query'(val, oldVal) {
        this.$store.commit('resetFilters');
        this.$store.commit('setFilters', val);
        this.items = [];
        this.hasMore = true;
      },
    },
  };
</script>

<style scoped lang="scss">
</style>
