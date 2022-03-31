import {getFilterValueLabel, isEmptyFilter} from "./helpers";

export const canOpenWatchlistCreateModal = {
  methods: {
    openCreateModal(masterIdToAdd = null) {
      this.$store.commit('setMasterIdForNewList', masterIdToAdd);
      $('#watchlist-create-modal').modal('show');
    },
  }
};

/*
 * Supplements components that have filter options control, adding a local filters state that is a subset of the global one.
 * Data flow: Global state => Local state =(apply)=> URL query => Global state
 */
export const hasLocalFilters = {
  data() {
    return {
      filters: {},
    };
  },
  computed: {
    globalFilters() {
      // Can be overriden to take only a few properties from global filters
      return _.cloneDeep(this.$store.state.filter);
    },
  },
  methods: {
    addLocalFilterValue(filterKey, valueToAdd) {
      const currentValue = this.filters[filterKey];
      if (_.isArray(currentValue)) {
        this.filters[filterKey] = valueToAdd === null ? [] : _.uniq([...currentValue, valueToAdd]);
      } else {
        this.filters[filterKey] = valueToAdd;
      }
    },
    removeLocalFilterValue(key, valueToRemove) {
      const currentValue = this.filters[key];
      const newValue = _.isArray(currentValue)
        ? _.difference(currentValue, [valueToRemove])
        : null;
      this.$set(this.filters, key, newValue);
    },
    applyLocalFilter() {
      const query = _.omitBy(this.filters, isEmptyFilter);
      if (!_.has(query, 'gained_at_least')) {
          delete query.time_period;
      }
      if (_.isEmpty(query)) {
        this.$store.commit('resetFilters');
        this.$router.push({name: 'main'});
      } else {
        this.$router.push({name: 'filter_result', query});
      }
    },
    syncWithGlobal() {
      this.filters = this.globalFilters;
    },
  },
  watch: {
    globalFilters: 'syncWithGlobal',
  },
  mounted() {
    this.syncWithGlobal();
  },
};

/**
 * For filter result menu. Depends on hasLocalFilters.
 */
export const hasFilterTags = {
  computed: {
    tags() {
      const tags = [];
      for (const key in this.filters) {
        if (key == 'time_period') continue;

        let values = _.compact(_.concat(this.filters[key]));
        for (const value of values) {
          tags.push({key, value});
        }
      }

      return tags;
    },
  },
  methods: {
    getTagLabel({key, value}) {
      return this.$t(`enum.filter_name.${key}`) + ' (' + getFilterValueLabel(key, value) + ')';
    },
  },
}

