<template>
    <div class="mx-3 mx-md-5" id="listview-table">
        <table class="table table-borderless">
            <thead>
                <tr>
                    <th>{{ $t('site.people') }}</th>
                    <th>ROI</th>
                    <th>{{ $t('site.profit') }}</th>
                    <th>{{ $t('site.copiers') }}</th>
                    <th>{{ $t('site.profit_sharing') }}</th>
                    <th>{{ $t('site.add_to_watchlist') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.id" class="master-list-item">
                    <td>
                        <img class="avatar-img mr-4" :src="item.copy_master_profile_pic || '/images/copy-master-profile/CopySam_avatar.jpg'">
                        <a :href="`/secure/copy-trade/detail/${item.id}`" class="text-primary font-weight-bold">
                            {{ item.copy_master_name }}
                        </a>
                    </td>
                    <td>{{ item.roi_str }}</td>
                    <td>{{ item.profit_str }}</td>
                    <td>{{ item.copiers }}</td>
                    <td>{{ item.profit_sharing_str }}</td>
                    <td>
                        <ItemWatchlistButton :id="item.id" :master_name="item.copy_master_name"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-center">
            <scroll-loader :loader-method="emitLoadMore" :loader-disable="!hasMore"></scroll-loader>
        </div>
    </div>
</template>

<script>
  import ItemWatchlistButton from "../components/ItemWatchlistButton";

  export default {
    name: "ListView",
    props: {
      items: Array,
      hasMore: Boolean,
    },
    components: {
      ItemWatchlistButton
    },
    methods: {
      emitLoadMore() {
        this.$emit('load-more');
      },
    },
  }
</script>

<style lang="scss">
    .master-list-item {
        .watchlist-btn {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        .item-watchlist-menu {
            max-height: 228px;
        }
    }
</style>
<style scoped lang="scss">
    @import "resources/assets/v2/scss/variables";

    .avatar-img {
        width: 48px;
        height: 48px;
        border-radius: 4px;
        border: 1px solid #000;
    }

    #listview-table {
        min-height: 565px;
        height: calc(100vh - 536px);
        overflow: auto;
        position: relative;

        table {
            margin: 0;

            thead {
                background-color: #F1F1F1;
                color: #000;
                position: sticky;
                top: 0;
                z-index: 1;

                th {
                    font-weight: 600;
                    padding: 26px 18px;
                }
            }

            tr {
                &:nth-of-type(2n) {
                    background-color: rgba($blue, 0.1);
                }

                th, td {
                    border: 0 !important;

                    &:not(:first-child) {
                        text-align: center;
                    }
                }

                td {
                    padding: 16px 18px;
                    vertical-align: middle;
                    position: relative;
                }

                &:hover {
                    background-color: rgba(0, 0, 0, 0.075);
                }
            }
        }
    }
</style>
