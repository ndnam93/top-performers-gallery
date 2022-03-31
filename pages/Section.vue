<template>
    <section>
        <div class="px-3 px-md-5">
            <h1 class="cp-section-title">
                <span>
                    {{ $t(`section.${section}`) }}
                    <section-tooltip :section="section" />
                </span>
                <span>
                    <button class="view-mode-btn mr-4 d-none d-md-inline-block" @click="isListMode = !isListMode">
                        <svg-vue :icon="'copysam-' + (isListMode ? 'grid' : 'list')"></svg-vue>
                    </button>
                    <router-link :to="{name: 'main'}" class="btn-back">{{ $t('site.back') }}</router-link>
                </span>
            </h1>
        </div>
        <component :is="currentView" :items="items" :hasMore="hasMore" @load-more="fetchMasters" />
        <CreateWatchlist />
    </section>
</template>

<script>
  import {mapState} from "vuex";
  import GridView from "../layouts/GridView";
  import ListView from "../layouts/ListView";
  import SectionTooltip from "../components/SectionTooltip";
  import {SECTION} from "../constants";
  import CreateWatchlist from "../modals/CreateWatchlist";

  export default {
    name: "SectionView",
    components: {
      GridView,
      ListView,
      SectionTooltip,
      CreateWatchlist,
    },
    props: {
      section: String,
    },
    data: () => ({
      isListMode: false,
    }),
    methods: {
      fetchMasters() {
        this.$store.dispatch('fetchMasters', this.section);
      }
    },
    computed: {
      ...mapState({
        items(state) {
          return state.master_list[this.section]?.list;
        },
        hasMore(state) {
          return state.master_list[this.section]?.hasMore;
        },
      }),
      currentView() {
        return this.isListMode ? ListView : GridView;
      },
    },
    mounted() {
      if (!Object.values(SECTION).includes(this.section)) {
        this.$router.push({name: 'main'});
      }
    },
  }
</script>

<style scoped lang="scss">
</style>