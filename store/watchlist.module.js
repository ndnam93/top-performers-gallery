import {WatchlistService} from "../api.service";

const state = {
  lists: [],
  updated_at: null,
  masterIdForNewList: null,
};

const actions = {
  async fetchWatchlists({commit, state}) {
    const {data} = await WatchlistService.getAll();
    commit('setWatchlists', data.data);
  }
};

const mutations = {
  setWatchlists(state, lists) {
    state.lists = lists;
    state.updated_at = new Date();
  },
  setMasterIdForNewList(state, masterId) {
    state.masterIdForNewList = masterId;
  },
};

const getters = {
  getMasterWatchlist: state => masterId => {
    for (const list of state.lists) {
      if (list.masters?.find(master => master.id == masterId)) {
        return _.pick(list, ['id', 'name']);
      }
    }
    return null;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
