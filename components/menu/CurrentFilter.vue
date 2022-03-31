<template>
    <div class="dropdown">
        <button class="filter-tag btn btn-view-all dropdown-toggle" type="button" id="currentFilterBtn" data-toggle="dropdown" @click="syncWithGlobal">
            {{ $t('site.view_all') }}
            <svg-vue icon="dropdown-arrow"/>
        </button>
        <div class="dropdown-menu dropdown-menu-right filter-dropdown" aria-labelledby="currentFilterBtn">
            <div class="d-flex flex-column filter-dialog box-shadow">
                <div class="header">
                    <button class="btn" disabled></button>
                    <span>{{ $t('site.current_filter') }}</span>
                    <button type="button" class="btn-close" data-toggle="dropdown" aria-label="Close" @click="close">
                        <svg-vue icon="close 1"></svg-vue>
                    </button>
                </div>
                <div class="body">
                    <div class="filter-row" v-for="tag in tags" :key="key">
                        <span class="filter-label">{{ getTagLabel(tag) }}</span>
                        <a class="blue btn-remove" @click.prevent.stop="removeLocalFilterValue(tag.key, tag.value)">{{ $t('site.remove') }}</a>
                    </div>
                </div>
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
  import {hasFilterTags, hasLocalFilters} from "../../mixins";

  export default {
    name: "CurrentFilter",
    mixins: [hasLocalFilters, hasFilterTags],
    methods: {
      close() {
        $('#currentFilterBtn').dropdown('toggle');
      },
      apply() {
        this.applyLocalFilter();
        this.close();
      },
    },
    mounted() {
      // Fix dropdown disappearing on click
      $(document).on('click', '.dropdown-menu', function(e) {
        e.stopPropagation();
      });
    },
  }
</script>

<style scoped lang="scss">
    @import "resources/assets/v2/scss/variables";

    .btn.btn-view-all {
        font-weight: normal;

        svg {
            width: 12px;
            box-sizing: content-box;
            padding: 0 8px 0 10px;
            color: $blue;
        }
    }

    .filter-dropdown {
        background-color: transparent;
        border: 0;

        .btn-remove:hover {
            cursor: pointer;
        }
    }

    .btn-remove:hover {
        cursor: pointer;
    }
    .filter-dialog .body {
        background-color: #FFF;
        min-height: 63px;
    }
</style>
