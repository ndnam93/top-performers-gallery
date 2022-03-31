import {isEmptyFilter, rejectInvalidFilters} from "../helpers";


const defaultState = {
  time_period: '1month',
  gained_at_least: null,
  country: [],
  market: [],
  perf_fees_rate: null,
  returns_daily: null,
  returns_weekly: null,
  max_daily_drawdown: null,
  max_weekly_drawdown: null,
  lifespan: null,
  followers: null,
};

const mutations = {
  setFilters(state, newValues) {
    _.assign(state, rejectInvalidFilters(newValues));
  },
  resetFilters(state) {
    _.assign(state, defaultState);
  },
};

const getters = {
  // Only get the filters that have selected values
  activeFilters: state => _.omitBy(state, isEmptyFilter),
};

export default {
  state: _.cloneDeep(defaultState),
  mutations,
  getters,
};

export { defaultState };
