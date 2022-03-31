<template>
    <div class="watchlist-select">
        <v-select :options="options" :components="SelectComponents" :value="selectedWatchlist" :reduce="item => item.key"
              @input="onSelect" :searchable="false"
        >
            <template v-slot:option="option">
                <span :class="{'font-weight-bold': option.key == selectedWatchlist}">{{ option.label }}</span>
                <svg-vue icon="check" class="icon check-icon blue" v-if="option.key == selectedWatchlist"></svg-vue>
            </template>

            <template #list-footer>
                <button class="btn" @click="openCreateModal()">
                    <svg-vue icon="copysam-create-watchlist" class="watchlist-icon"/>
                    {{ $t('site.create_list') }}
                </button>
            </template>
        </v-select>
    </div>
</template>

<script>
  import vSelect from 'vue-select';
  import {mapState} from "vuex";
  import {canOpenWatchlistCreateModal} from "../../mixins";


  export default {
    name: "WatchlistMenu",
    mixins: [canOpenWatchlistCreateModal],
    components: {
      vSelect,
    },
    data() {
      return {
        SelectComponents: {
          Deselect: null,
          OpenIndicator: {
            template: '<svg-vue icon="dropdown-arrow"/>',
          },
        },
      };
    },
    computed: {
      ...mapState({
        options(state) {
          const customListOptions = state.watchlist.lists.map(list => ({
            key: list.id,
            label: list.name,
          }));
          return [
            {
              key: 'all',
              label: this.$t('site.all_watchlist'),
            },
            ...customListOptions,
          ];
        },
      }),
      selectedWatchlist() {
        const {id} = this.$route.params;
        return this.options.find(option => option.key == id) ? id : 'all';
      }
    },
    methods: {
      onSelect(val) {
        if (val != this.$route.params.id) {
          this.$router.push({name: 'watchlist', params: {id: val}});
        }
      },
      setSelectWidth() {
        this.$nextTick(() => {
          $('.watchlist-select').css('width', $('.watchlist-select .vs__selected').width() + 30);
        });
      },
    },
    watch: {
      selectedWatchlist() {
        this.setSelectWidth();
      },
    },
    mounted() {
      this.setSelectWidth();
    },
  }
</script>

<style lang="scss">
</style>