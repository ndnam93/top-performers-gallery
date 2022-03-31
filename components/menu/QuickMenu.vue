<template>
    <div>
        <div class="px-md-5">
            <ul class="nav">
                <li class="mobile-tab-label">{{ $t(`site.${activeTab}`) }}</li>
                <li>
                    <button :class="{btn: true, active: activeTab == 'filter' && showMenu}" @click="selectTab('filter')">
                        <svg-vue icon="copysam-filter" class="icon"></svg-vue>
                        <span>{{ $t('site.filter') }}</span>
                    </button>
                </li>
                <li>
                    <button :class="{btn: true, active: activeTab == 'search' && showMenu}" @click="selectTab('search')">
                        <svg-vue icon="copysam-search" class="icon"></svg-vue>
                        <span>{{ $t('site.search') }}</span>
                    </button>
                </li>
                <li>
                    <button :class="{btn: true, active: activeTab == 'watchlist' && showMenu}" @click="selectTab('watchlist')">
                        <svg-vue icon="copysam-added-to-watchlist" class="icon"></svg-vue>
                        <span>{{ $t('site.watchlist') }}</span>
                    </button>
                </li>
                <li>
                    <button :class="{btn: true, active: activeTab == 'portfolio' && showMenu}" @click="selectTab('portfolio')">
                        <svg-vue icon="copysam-portfolio" class="icon"></svg-vue>
                        <span>{{ $t('site.portfolio') }}</span>
                    </button>
                </li>
            </ul>
        </div>
        <transition name="slide">
            <div class="menu-tab" v-show="showMenu" :style="{height: menuHeight}">
                <transition name="fade" mode="out-in" @enter="setMenuActualHeight">
                    <div class="tab-pane" v-if="activeTab == 'filter'" key="filter" ref="filter">
                        <transition name="fade" mode="out-in" @enter="setMenuActualHeight">
                            <component :is="isFilterResultMode ? 'ResultFilterMenu' : 'NormalFilterMenu'" @ResultFilterChanged="setMenuActualHeight"/>
                        </transition>
                    </div>
                    <div class="tab-pane" v-if="activeTab == 'search'" key="search" ref="search">
                        <search-menu />
                    </div>
                    <div class="tab-pane" v-if="activeTab == 'watchlist'" key="watchlist" ref="watchlist">
                        <watchlist-menu />
                    </div>
                    <div class="tab-pane" v-if="activeTab == 'portfolio'" key="portfolio" ref="portfolio">
                        <h4 class="blue font-weight-600 mt-2">{{ $t('site.copysam_portfolio') }}</h4>
                    </div>
                </transition>
            </div>
        </transition>
        <advanced-filter />
    </div>
</template>

<script>
  import SearchMenu from "./SearchMenu";
  import NormalFilterMenu from "./NormalFilterMenu";
  import ResultFilterMenu from "./ResultFilterMenu";
  import WatchlistMenu from "./WatchlistMenu";
  import AdvancedFilter from "./AdvancedFilter";

  export default {
    name: "QuickMenu",
    components: {
      SearchMenu,
      NormalFilterMenu,
      ResultFilterMenu,
      WatchlistMenu,
      AdvancedFilter,
    },
    data() {
      return {
        activeTab: 'filter',
        isFilterResultMode: false,
        showMenu: true,
        menuHeight: 'auto',
      };
    },
    methods: {
      selectTab(tab) {
        if (tab == 'watchlist' && this.$route.name != 'watchlist') {
          this.$router.push({name: 'watchlist', params: {id: 'all'}});
        }
        if (tab == 'portfolio' && this.$route.name != 'portfolio') {
          this.$router.push({name: 'portfolio'});
        }
        if (['filter', 'search'].includes(tab) && !['main', 'filter_result', 'search_result'].includes(this.$route.name))        {
          this.$router.push({name: 'main'});
        }

        this.showMenu = this.activeTab == tab ? !this.showMenu : true;
        this.activeTab = tab;
      },
      setMenuActualHeight() {
        this.$nextTick(function () {
            this.menuHeight = this.$refs[this.activeTab]?.clientHeight + 'px';
        });
      },
      setStateFromRoute(route) {
        if (route.name == 'search_result') {
          this.activeTab = 'search';
        }
        if (route.name == 'filter_result') {
          this.activeTab = 'filter';
          this.isFilterResultMode = true;
        } else {
          this.isFilterResultMode = false;
        }
        if (route.name == 'watchlist') {
          this.activeTab = 'watchlist';
        }
        if (route.name == 'portfolio') {
          this.activeTab = 'portfolio';
        }
        if (route.name == 'main' && !['search', 'filter'].includes(this.activeTab)) {
          this.activeTab = 'filter';
        }
        this.showMenu = true;
      }
    },
    mounted() {
      this.setStateFromRoute(this.$route);
      this.setMenuActualHeight();
    },
    watch: {
      $route(to, from) {
        this.setStateFromRoute(to);
      },
      '$screen.width'() {
        this.setMenuActualHeight();
      },
    }
  }
</script>

<style scoped lang="scss">
    @import "resources/assets/v2/scss/variables";
    @import "resources/assets/v2/scss/mixins";

    ul.nav {
        border-bottom: 1px solid $grey;
        padding: 16px;
        flex-wrap: nowrap;

        li {
            flex-grow: 1;
            max-width: 80px;

            .btn {
                width: 100%;
                color: $grey-50;
                padding: 0;

                .icon {
                    @include square(24px);
                    fill: #ccc;
                    transition: fill 0.15s ease-in-out;
                }

                span {
                    display: none;
                }

                &:hover {
                    text-decoration: none;
                }

                &:hover, &.active {
                    color: $blue;

                    .icon {
                        fill: $blue;
                    }
                }
            }

            &.mobile-tab-label {
                border-right: 1px solid #CCCCCC;
                flex-shrink: 0;
                font-size: 18px;
                padding-right: 6px;
                max-width: 150px;
                color: $blue;
            }
        }
    }

    .menu-tab {
        background: #F1F1F1;
        box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
        transition: height 0.5s ease;

        &.slide-enter, &.slide-leave-to {
            height: 0 !important;
        }

        &.slide-enter-active, &.slide-leave-active {
            overflow: hidden;
        }

        .tab-pane {
            padding: 14px 1rem;
        }
    }

    @media only screen and (min-width: 768px) {
        ul.nav {
            li {
                max-width: 260px;

                .btn {
                    padding: 0.375rem 0.75rem;

                    .icon {
                        @include square(36px);
                        margin-right: 16px;
                    }

                    span {
                        display: inline;
                    }
                }

                &.mobile-tab-label {
                    display: none;
                }
            }
        }

        .menu-tab {
            .tab-pane {
                padding: 14px 3rem;
            }
        }
    }

    @media only screen and (min-width: 992px) {
        ul.nav {
            li:not(:last-child) {
                padding-right: 80px;
            }
        }
    }
</style>
