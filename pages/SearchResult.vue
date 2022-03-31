<template>
    <section>
        <div class="px-3 px-md-5 py-4 py-md-5">
            <h1 class="cp-section-title">
                <span>{{ $t('site.searching_for', {keyword}) }} | {{ $t('site.results', {count: items.length}) }}</span>
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
  import GridView from "../layouts/GridView";
  import ListView from "../layouts/ListView";
  import {CopyMasterService} from "../api.service";

  export default {
    name: "SearchResult",
    components: {
      GridView,
      ListView,
    },
    data: () => ({
      keyword: '',
      isListMode: false,
      items: [],
      hasMore: true,
    }),
    methods: {
      async fetchResult() {
        this.hasMore = true;
        const {data: response} = await CopyMasterService.search({q: this.keyword});
        this.items = response?.data || [];
        this.hasMore = false;
      }
    },
    computed: {
      currentView() {
        return this.isListMode ? ListView : GridView;
      },
    },
    mounted() {
      if (_.isEmpty(this.$route.query.q)) {
        this.$router.push({name: 'main'});
      }
      this.keyword = this.$route.query.q;
    },
    watch: {
      '$route.query'(val, oldVal) {
        this.keyword = val.q;
        this.items = [];
        this.hasMore = true;
      },
    },
  }
</script>

<style scoped>

</style>