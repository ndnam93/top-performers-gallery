<template>
    <section v-if="items.length || hasMore">
        <div class="px-3 px-md-5">
            <h1 class="cp-section-title">
                <span>
                    {{ $t(`section.${section}`) }}
                    <section-tooltip :section="section" />
                </span>
                <router-link :to="{name: 'section', params: {section}}">{{ $t('site.view_all') }}</router-link>
            </h1>
        </div>
        <splide :options="splideOptions" :slides="items" v-if="items.length || !hasMore">
            <splide-slide v-for="item in items" :key="item.id">
                <master-item v-bind="item"/>
            </splide-slide>
        </splide>
        <div class="d-flex justify-content-center py-5 mb-4" v-else>
            <scroll-loader :loader-method="fetchMasters" :loader-disable="items.length || !hasMore"></scroll-loader>
        </div>
    </section>
</template>

<script>
  import {Splide, SplideSlide} from "@splidejs/vue-splide";
  import {mapState} from "vuex";
  import {PAGE_SIZE} from "../constants";
  import SectionTooltip from "./SectionTooltip";
  import MasterItem from "./MasterItem";

  export default {
    name: "MasterSlider",
    components: {
      Splide,
      SplideSlide,
      MasterItem,
      SectionTooltip,
    },
    props: {
      section: String,
    },
    data() {
      return {
        splideOptions: {
          perPage: 3,
          pagination: false,
          arrowPath: 'M13.6979 35.1474C14.6605 36.2842 16.1686 36.2842 17.0992 35.1474L28.298 21.9988C28.7472 21.4683 29.0039 20.7484 29.0039 19.9905C29.0039 19.2327 28.7472 18.5127 28.298 17.9822L17.0992 4.83363C16.65 4.26525 16.0403 4 15.4306 4C14.7889 4 14.1792 4.26525 13.6979 4.83363C12.7673 5.9704 12.7673 7.75134 13.73 8.85021L23.1959 19.9905L13.7299 31.1308C12.7673 32.2297 12.7673 34.0485 13.6979 35.1474Z',
          padding: '1.5rem',
          waitForTransition: false,
          breakpoints: {
            576: {
              perPage: 1,
              padding: 0,
            },
            1200: {
              perPage: 2,
            },
          }
        },
      }
    },
    computed: mapState({
      items(state) {
        return state.master_list[this.section].list.slice(0, PAGE_SIZE);
      },
      hasMore(state) {
        return state.master_list[this.section].hasMore;
      },
    }),
    methods: {
      fetchMasters() {
        this.$store.dispatch('fetchMasters', this.section);
      },
    },
  }
</script>

<style scoped>

</style>
