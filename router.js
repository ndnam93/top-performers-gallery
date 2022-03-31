import VueRouter  from "vue-router";
import qs from 'qs';
import {BASE_PATH} from './constants';
import Main from './pages/Main';
import SectionPage from "./pages/Section";
import SectionSlides from "./pages/SectionSlides";
import FilterResult from "./pages/FilterResult";
import SearchResult from "./pages/SearchResult";
import MainWatchlist from "./pages/MainWatchlist";
import Portfolio from "./pages/Portfolio";

Vue.use(VueRouter );

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: `${BASE_PATH}/`,
      component: Main,
      children: [
        {
          name: 'main',
          path: `${BASE_PATH}/`,
          component: SectionSlides,
        },
        {
          name: 'filter_result',
          path: 'filter',
          component: FilterResult,
        },
        {
          name: 'search_result',
          path: 'search',
          component: SearchResult,
        },
        {
          name: 'watchlist',
          path: 'watchlist/:id',
          component: MainWatchlist,
          props: true,
        },
        {
          name: 'portfolio',
          path: 'portfolio',
          component: Portfolio,
        },
      ]
    },
    {
      name: 'section',
      path: `${BASE_PATH}/section/:section`,
      component: SectionPage,
      props: true,
    },
    { path: '*', redirect: { name: 'main' } },
  ],
  parseQuery: query => qs.parse(query),
  stringifyQuery: query => {
    const result = qs.stringify(query, {encode: false});

    return result ? ('?' + result) : '';
  },
});

// Mute NavigationDuplicated error
const originalPush = router.push;
router.push = function(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }

  return originalPush.call(this, location).catch(err => {
    return VueRouter.isNavigationFailure(err) ? err : Promise.reject(err);
  });
}

export default router;
