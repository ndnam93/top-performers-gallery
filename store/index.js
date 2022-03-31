import Vuex from "vuex";
import filter from './filter.module';
import master_list from './master_list.module';
import watchlist from './watchlist.module';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    filter,
    master_list,
    watchlist,
  },
});
store.dispatch('fetchWatchlists');

export default store;
