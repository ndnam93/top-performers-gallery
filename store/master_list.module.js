import { SECTION, PAGE_SIZE } from '../constants';
import { CopyMasterService } from '../api.service';

const defaultSectionState = {
  list: [],
  count: 0,
  hasMore: true,
  isFetching: false,
};
const sectionKeys = [...Object.values(SECTION), 'portfolio'];
const state = {};
for (const sectionKey of sectionKeys) {
  state[sectionKey] = _.cloneDeep(defaultSectionState);
}

const actions = {
  async fetchMasters ({commit, state}, sectionKey) {
    const {count, hasMore, isFetching} = state[sectionKey];
    if (!hasMore || isFetching) return;

    commit('setFetchingState', {
      sectionKey,
      isFetching: true,
    });
    const {data} = await CopyMasterService.query({
      section: sectionKey,
      page: (count / PAGE_SIZE) + 1,
      per_page: PAGE_SIZE,
    });
    commit('addToList', {
      sectionKey,
      items: data.data,
      total: data.meta.total,
    });
  },

};

const mutations = {
  setFetchingState(state, {sectionKey, isFetching}) {
    state[sectionKey] = {
      ...state[sectionKey],
      isFetching,
    };
  },
  addToList(state, {items, sectionKey, total}) {
    const {list} = state[sectionKey];
    const newList = [...list, ...items];
    state[sectionKey] = {
      list: newList,
      count: newList.length,
      hasMore: newList.length < total,
      isFetching: false,
    };
  },
  resetSection(state, sectionKey) {
    state[sectionKey] = _.cloneDeep(defaultSectionState);
  },
};

export default {
  state,
  actions,
  mutations,
};
