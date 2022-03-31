<template>
    <div class="d-flex flex-column flex-lg-row justify-content-between align-items-stretch align-items-lg-center">
        <div class="row flex-column flex-sm-row justify-content-between w-100">
            <div class="filter-control col-sm-6 col-lg-4 col-xl">
                <div class="filter-label">{{ $t('site.people_from') }}</div>
                <copy-sam-select filter-name="country" :value="simpleFilters.country" :onOptionSelect="({key}) => onOptionSelect('country', key)"/>
            </div>

            <div class="filter-control col-sm-6 col-lg-4 col-xl">
                <div class="filter-label">{{ $t('site.market') }}</div>
                <copy-sam-select filter-name="market" :value="simpleFilters.market" :onOptionSelect="({key}) => onOptionSelect('market', key)"/>
            </div>

            <div class="filter-control col-sm-6 col-lg-4 col-xl">
                <div class="filter-label">{{ $t('site.gained_at_least') }}</div>
                <copy-sam-select filter-name="gained_at_least" :value="simpleFilters.gained_at_least" :onOptionSelect="({key}) => onOptionSelect('gained_at_least', key)"/>
            </div>

            <div class="filter-control col-sm-6 col-lg-4 col-xl">
                <div class="filter-label">{{ $t('site.during_the') }}</div>
                <copy-sam-select filter-name="time_period" :value="simpleFilters.time_period" :onOptionSelect="({key}) => onOptionSelect('time_period', key)"/>
            </div>

            <div class="filter-control col-sm-6 col-lg-4 col-xl">
                <div class="filter-label">{{ $t('site.profit_sharing') }}</div>
                <copy-sam-select filter-name="perf_fees_rate" :value="simpleFilters.perf_fees_rate" :onOptionSelect="({key}) => onOptionSelect('perf_fees_rate', key)"/>
            </div>

            <div class="filter-buttons col-sm-12 col-lg-4 col-xl d-flex align-items-center justify-content-between justify-content-xl-end mb-2 mt-3 my-lg-0">
                <button class="btn btn-primary px-4 mr-3" type="button" @click="applyFilters" ref="applyBtn">{{ $t('site.go') }}</button>
                <button type="button" class="btn btn-outline-primary px-4" data-toggle="modal" data-target="#advanced-filter">
                    {{ $t('site.advanced_filter') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapState} from "vuex";
  import {isEmptyFilter} from "../../helpers";
  import CopySamSelect from "./CopySamSelect";

  export default {
    name: "NormalFilterMenu",
    components: {
      CopySamSelect,
    },
    data() {
      return {
        advancedFilters: {},
      };
    },
    computed: {
      ...mapState({
        simpleFilters(state) {
          return _.pick(state.filter, ['country', 'market', 'gained_at_least', 'time_period', 'perf_fees_rate']);
        },
      }),
    },
    methods: {
      applyFilters(event) {
        const query = _.omitBy(this.simpleFilters, isEmptyFilter);
        if (!_.has(query, 'gained_at_least')) {
            delete query.time_period;
        }
        if (_.isEmpty(query)) {
          $(event.target).tooltip({
            placement: 'bottom',
            title: this.$t('messages.please_select_filter'),
            trigger: 'focus',
            customClass: 'danger',
          }).tooltip('show');
          return;
        }

        this.$router.push({name: 'filter_result', query});
      },
      isMultiple(name) {
        return _.isArray(this.simpleFilters[name]);
      },
      onOptionSelect(name, selectedVal) {
        let newValue = selectedVal;
        if (this.isMultiple(name)) {
          // If the "Any" option is selected, remove all values. Otherwise append to/remove from the array of values.
          const oldValues = this.simpleFilters[name];
          if (selectedVal === null) {
            newValue = [];
          } else if (oldValues.includes(selectedVal)) {
            newValue = _.difference(oldValues, [selectedVal])
          } else {
            newValue = [...oldValues, selectedVal];
          }
        }

        this.$store.commit('setFilters', {[name]: newValue});
      }
    },
    watch: {
      simpleFilters(val) {
        if (!_.isEmpty(_.omitBy(val, isEmptyFilter))) {
          $(this.$refs.applyBtn).tooltip('dispose');
        }
      }
    },
  }
</script>

<style scoped lang="scss">
</style>
