<template>
    <div class="modal fade" id="advanced-filter" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog filter-dialog" role="document">
            <div class="modal-content">
                <div class="header">
                    <transition name="slide" mode="out-in">
                        <button type="button" class="btn btn-link slide-right" @click="back" v-if="selectingFilter" key="back-btn">
                            <svg-vue icon="back" class="back-icon"></svg-vue>
                        </button>
                        <button type="button" class="btn btn-link btn-reset slide-left" v-else key="reset-btn" @click="reset">{{ $t('site.reset') }}</button>
                    </transition>
                    <transition name="slide" mode="out-in">
                        <span v-if="selectingFilter" key="filter_name" class="slide-right">{{ selectingFilterName }}</span>
                        <span v-else key="title" class="slide-left">{{ $t('site.advanced_filter') }}</span>
                    </transition>
                    <button type="button" class="btn-close" data-toggle="dropdown" aria-label="Close" @click="close">
                        <svg-vue icon="close 1"></svg-vue>
                    </button>
                </div>

                <transition name="slide" mode="out-in">
                    <div class="body slide-right" v-if="selectingFilter" key="options">
                        <div class="filter-row clickable" v-for="{key, label} in filterOptions[selectingFilter]" @click="toggleFilterValue(selectingFilter, key)" :key="key">
                            <span :class="{'font-weight-bold': isOptionSelected(selectingFilter, key)}">{{ label }}</span>
                            <div v-if="isOptionSelected(selectingFilter, key) && key !== null">
                                <svg-vue icon="check" class="icon check"></svg-vue>
                                <svg-vue icon="close 2" class="icon deselect"></svg-vue>
                            </div>
                        </div>
                    </div>

                    <div class="body slide-left" v-else key="filters">
                        <div class="filter-row clickable" @click="select('time_period','site.time_period')">
                            <span class="filter-label">{{ $t('site.time_period') }}</span>
                            <span class="filter-value">{{ filterValueLabel('time_period') }}</span>
                        </div>
                        <div class="section-title">
                            {{ $t('site.performance') }}
                        </div>
                        <div class="filter-row clickable" @click="select('gained_at_least','site.gained_at_least')">
                            <span class="filter-label">{{ $t('site.gained_at_least') }}</span>
                            <span class="filter-value">{{ filterValueLabel('gained_at_least') }}</span>
                        </div>
                        <div class="filter-row clickable" @click="select('returns_daily','enum.filter_name.returns_daily')">
                            <span class="filter-label">{{ $t('enum.filter_name.returns_daily') }}</span>
                            <span class="filter-value">{{ filterValueLabel('returns_daily') }}</span>
                        </div>
                        <div class="filter-row clickable" @click="select('returns_weekly','enum.filter_name.returns_weekly')">
                            <span class="filter-label">{{ $t('enum.filter_name.returns_weekly') }}</span>
                            <span class="filter-value">{{ filterValueLabel('returns_weekly') }}</span>
                        </div>
                        <div class="filter-row clickable" @click="select('max_daily_drawdown','enum.filter_name.max_daily_drawdown')">
                            <span class="filter-label">{{ $t('enum.filter_name.max_daily_drawdown') }}</span>
                            <span class="filter-value">{{ filterValueLabel('max_daily_drawdown') }}</span>
                        </div>
                        <div class="filter-row clickable" @click="select('max_weekly_drawdown','enum.filter_name.max_weekly_drawdown')">
                            <span class="filter-label">{{ $t('enum.filter_name.max_weekly_drawdown') }}</span>
                            <span class="filter-value">{{ filterValueLabel('max_weekly_drawdown') }}</span>
                        </div>
                        <div class="section-title">
                            {{ $t('site.about_master') }}
                        </div>
                        <div class="filter-row clickable" @click="select('country','site.master_country')">
                            <span class="filter-label">{{ $t('site.master_country') }}</span>
                            <span class="filter-value">{{ filterValueLabel('country') }}</span>
                        </div>
                        <div class="filter-row clickable" @click="select('market', 'enum.filter_name.market')">
                            <span class="filter-label">{{ $t('enum.filter_name.market') }}</span>
                            <span class="filter-value">{{ filterValueLabel('market') }}</span>
                        </div>
                        <div class="filter-row clickable" @click="select('perf_fees_rate', 'site.profit_sharing')">
                            <span class="filter-label">{{ $t('site.profit_sharing') }}</span>
                            <span class="filter-value">{{ filterValueLabel('perf_fees_rate') }}</span>
                        </div>
                        <div class="filter-row clickable" @click="select('lifespan', 'enum.filter_name.lifespan')">
                            <span class="filter-label">{{ $t('enum.filter_name.lifespan') }}</span>
                            <span class="filter-value">{{ filterValueLabel('lifespan') }}</span>
                        </div>
                        <div class="filter-row clickable" @click="select('followers', 'enum.filter_name.followers')">
                            <span class="filter-label">{{ $t('enum.filter_name.followers') }}</span>
                            <span class="filter-value">{{ filterValueLabel('followers') }}</span>
                        </div>
                    </div>
                </transition>

                <div class="footer">
                    <button type="button" class="btn btn-link btn-apply" @click="apply">
                        {{ $t('site.apply') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {getFilterValueLabel} from "../../helpers";
  import {defaultState} from "../../store/filter.module";
  import {FILTER_OPTIONS} from "../../constants";
  import {hasLocalFilters} from "../../mixins";

  export default {
    name: "AdvancedFilter",
    mixins: [hasLocalFilters],
    data() {
      return {
        filterOptions: FILTER_OPTIONS,
        selectingFilter: null,
        selectingFilterName: null,
      };
    },
    methods: {
      filterValueLabel(filterKey) {
        return getFilterValueLabel(filterKey, this.filters[filterKey]);
      },
      select(filterKey, transKey) {
        this.selectingFilter = filterKey;
        this.selectingFilterName = this.$t(transKey);
      },
      back() {
        this.selectingFilter = null;
      },
      close() {
        $('#advanced-filter').modal('hide');
      },
      reset() {
        this.filters = _.cloneDeep(defaultState)
      },
      toggleFilterValue(key, val) {
        const currentValue = this.filters[key];
        if (_.concat(currentValue).includes(val)) {
            this.removeLocalFilterValue(key, val);
        } else {
            this.addLocalFilterValue(key, val);
        }
      },
      apply() {
        this.applyLocalFilter();
        this.close();
      },
      isOptionSelected(filterKey, optionKey) {
        const currentValue = _.compact(_.concat(this.filters[filterKey]));

        return (currentValue.length == 0 && optionKey === null) || currentValue.includes(optionKey);
      },
    },
  }
</script>

<style scoped lang="scss">
    @import "resources/assets/v2/scss/variables";

    .slide-right.slide-enter, .slide-right.slide-leave-to {
         transform: translateX(20px);
         opacity: 0;
     }

    .slide-left.slide-enter, .slide-left.slide-leave-to {
         transform: translateX(-20px);
         opacity: 0;
     }

    .slide-enter-active, .slide-leave-active {
        transition: all 0.2s ease;
    }

    .btn {
        &:hover {
            opacity: 0.75;
        }
    }

    .filter-label {
        flex-shrink: 0;
        margin-right: 50px;
        white-space: nowrap;
    }

    .filter-value {
        color: $blue;
        flex-shrink: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
