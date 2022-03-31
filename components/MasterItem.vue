<template>
    <div :class="{card: true, 'master-grid-item': true, 'show-more-info': enableMoreInfo}" @mouseleave="hideMoreInfo" v-click-outside="hideMoreInfo">
        <div class="card-body">
            <div class="row h-100">
                <img :src="flagUrl" class="flag-icon" alt="Flag" v-if="flagUrl">
                <ItemWatchlistButton :id="id" :master_name="copy_master_name"/>
                <div class="col-12 col-md-6 d-flex justify-content-center align-items-start">
                    <div class="embed-responsive embed-responsive-1by1 avatar mb-3 mb-md-0">
                        <img class="avatar-img embed-responsive-item" @mouseenter="showMoreInfo" @click="showMoreInfo"
                             :src="copy_master_profile_pic || '/images/copy-master-profile/CopySam_avatar.jpg'">
                        <transition name="avatar">
                            <div class="overlay" v-if="enableMoreInfo"></div>
                        </transition>
                    </div>
                </div>
                <div class="col-12 col-md-6 d-flex flex-column justify-content-between">
                    <h5 class="text-primary text-center text-md-left pr-md-5 mr-md-3">
                        {{ copy_master_name }}
                    </h5>
                    <div>
                        <p><b>ROI:</b> {{ roi_str }}</p>
                        <p><b>{{ $t('site.profit') }}:</b> {{ profit_str }}</p>
                        <p><b>{{ $t('site.copiers') }}:</b> {{ copiers }}</p>
                        <p><b>{{ $t('site.profit_sharing') }}:</b> {{ profit_sharing_str }}</p>
                    </div>
                    <a :href="`/secure/copy-trade/detail/${id}`" class="btn btn-primary btn-block mt-3">{{ $t('site.view_more') }}</a>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="more-info" v-show="enableMoreInfo">
                <div class="card-header">
                    <h5 class="text-primary">{{ copy_master_name }}</h5>
                </div>
                <div class="card-body">
                    <p><b>{{ $t('site.trading_type') }}:</b> {{ copy_master_trading_type && $t(`enum.trading_type.${copy_master_trading_type}`) }}</p>
                    <p><b>{{ $t('site.trading_style') }}:</b> {{ copy_master_trading_style && $t(`enum.trading_style.${copy_master_trading_style}`) }}</p>
                    <p><b>{{ $t('site.trading_strategy') }}:</b> {{ copy_master_trading_strategy }}
                    </p>
                </div>
                <div class="card-footer text-danger">{{ $t('site.risk_warning') }}</div>
            </div>
        </transition>
    </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside';
  import ItemWatchlistButton from "./ItemWatchlistButton";

  export default {
    name: "MasterItem",
    components: {
      ItemWatchlistButton
    },
    props: [
      'id',
      'copy_master_name',
      'copy_master_profile_pic',
      'copy_master_trading_type',
      'copy_master_trading_style',
      'copy_master_trading_strategy',
      'roi',
      'roi_str',
      'copiers',
      'profit',
      'profit_str',
      'perf_fees_rate',
      'profit_sharing_str',
      'country_code',
    ],
    data: () => ({
      enableMoreInfo: false,
    }),
    methods: {
      showMoreInfo() {
        this.enableMoreInfo = true;

        // Hide dropdown menu
        if ($('#toggle-btn-' + this.id).siblings('.dropdown-menu').is(':visible')) {
          $('#toggle-btn-' + this.id).dropdown('toggle');
        }
      },
      hideMoreInfo() {
        this.enableMoreInfo = false;
      },
    },
    computed: {
      flagUrl() {
        if (!this.country_code || ['CN', 'SG'].includes(this.country_code)) return null;

        return `/images/flags/${this.country_code}.png`;
      },
    },
    mounted () {
      // prevent click outside event with popupItem.
      this.popupItem = this.$el
    },
    directives: {
      ClickOutside
    },
  }
</script>

<style lang="scss">
    .master-grid-item {
        .watchlist-btn {
            right: 8px;
            top: 0;
            z-index: 1;
        }
    }
</style>
<style scoped lang="scss">
    @import "resources/assets/v2/scss/variables";
    @import "resources/assets/v2/scss/mixins";

    @mixin fill-parent {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .card {
        border-radius: 20px;
        overflow: hidden;
        transition: $transition;
        transform-origin: 50% 50%;
        background: #FFFFFF;
        box-shadow: 4px 4px 25px rgba(0, 0, 0, 0.15);
        height: 100%;

        h5 {
            font-size: 18px;
        }

        .card-body {
            padding: 5%;

            p {
                margin-bottom: 2px;
            }

            .btn {
                padding-top: 12px;
                padding-bottom: 12px;
            }
        }

        .avatar {
            overflow: visible;
            min-width: 80px;
            width: 24%;

            @media only screen and (min-width: 768px) {
                width: 100%;
            }

            .avatar-img {
                border-radius: 50%;
            }

            .overlay {
                @include fill-parent;
                border-radius: 50%;
                background: #EAF1FC;
                z-index: 1;
                transform: scale(8);

                &.avatar-enter-active {
                    animation: avatar-in .5s ease forwards;
                }

                &.avatar-leave-active {
                    animation: avatar-in .5s ease reverse forwards;
                }

                @keyframes avatar-in {
                    0% {
                        opacity: 0;
                        transform: scale(1);
                    }
                    40% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(8);
                    }
                }
            }
        }

        .more-info {
            @include fill-parent;
            z-index: 2;
            display: flex;
            flex-direction: column;

            .card-header {
                background-color: transparent;
                padding: 1.5rem 5% 1.5rem;
            }

            .card-body {
                padding: 0 5%;
                overflow: auto;
                @include blue-scrollbar();
            }

            .card-footer {
                text-transform: uppercase;
                text-align: center;
                font-style: italic;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: 1px;
                background-color: transparent;
                box-shadow: 4px 4px 25px rgba(0, 0, 0, 0.15);
                flex-shrink: 0;
                padding: 10px;
            }

            &.fade-enter-active {
                animation: fade-in 500ms ease forwards;
            }

            &.fade-leave-active {
                animation: fade-in 500ms ease reverse forwards;
            }

            @keyframes fade-in {
                0% {
                    opacity: 0;
                    transform: translateY(50%);
                }
                50% {
                    opacity: 0;
                }
                100% {
                    opacity: 1;
                    transform: translateY(0%);
                }
            }
        }

        &.show-more-info {
            transform: scale(1.04);
        }

        .flag-icon {
            width: 24px;
            position: absolute;
            top: 23px;
            left: 18px;

            @media only screen and (min-width: 768px) {
                right: 56px;
                left: auto;
            }
        }
    }
</style>
