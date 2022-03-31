<template>
    <div class="d-flex flex-column flex-lg-row justify-content-between align-items-stretch align-items-lg-center">
        <div class="d-flex flex-wrap">
            <button type="button" class="filter-tag time-period-tag dropdown-toggle" data-toggle="dropdown" id="timePeriodBtn" v-if="filters.gained_at_least">
                {{ getFilterValueLabel('time_period', filters.time_period) }}
                <svg-vue icon="dropdown-arrow"/>
            </button>
            <div class="dropdown-menu time-period-menu box-shadow" aria-labelledby="timePeriodBtn">
                <button type="button" @click="updateTimePeriod(key)" v-for="{key, label} in filterOptions.time_period"
                   :key="key" :class="{'font-weight-bold': key == filters.time_period}"
                >{{ label }}</button>
            </div>

            <div class="filter-tag" v-for="tag in tags.slice(0, FILTER_RESULT_TAGS_LIMIT)" :key="key">
                {{ getTagLabel(tag) }}
                <button type="button" class="btn" aria-label="close" :title="$t('site.remove')" @click="removeTag(tag)">
                    <svg-vue icon="close 2" class="close-icon"></svg-vue>
                </button>
            </div>

            <div class="ellipsis" v-if="isTruncated">...</div>
            <current-filter />
        </div>

        <div class="d-flex align-items-center flex-shrink-0 mt-3 mt-lg-0">
            <button type="button" class="btn btn-outline-primary px-5 w-100" data-toggle="modal" data-target="#advanced-filter">
                {{ $t('site.edit_filter') }}
            </button>
        </div>
    </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {
    FILTER_OPTIONS,
    FILTER_RESULT_TAGS_LIMIT
  } from "../../constants";
  import {hasLocalFilters, hasFilterTags} from "../../mixins";
  import CurrentFilter from "./CurrentFilter";
  import {getFilterValueLabel} from "../../helpers";

  export default {
    name: "ResultFilterMenu",
    mixins: [hasLocalFilters, hasFilterTags],
    components: {
      CurrentFilter,
    },
    data() {
      return {
        debounceDelay: 1000,
        FILTER_RESULT_TAGS_LIMIT,
        filterOptions: FILTER_OPTIONS,
      };
    },
    computed: {
      ...mapGetters({
        globalFilters: 'activeFilters',
      }),
      isTruncated() {
        return this.tags.length > FILTER_RESULT_TAGS_LIMIT;
      },
    },
    methods: {
      removeTag({key, value}) {
        this.removeLocalFilterValue(key, value);
        this.applyFilter();
      },
      getFilterValueLabel,
      updateTimePeriod(value) {
        this.addLocalFilterValue('time_period', value);
        $('#timePeriodBtn').dropdown('toggle');
        this.applyFilter();
      },
    },
    watch: {
      filters() {
        this.$emit('ResultFilterChanged');
      },
    },
    mounted() {
      this.applyFilter = _.debounce(this.applyLocalFilter, 1000);
    },
  }
</script>

<style scoped lang="scss">
    .ellipsis {
        font-size: 24px;
        margin: 8px 20px 8px 0;
        display: flex;
        align-items: flex-end;
    }
</style>
