<template>
    <div>
        <!-- Multiple select -->
        <v-select :options="options" :components="SelectComponents" multiple :clearSearchOnBlur="() => true"
                  :closeOnSelect="false" :value="optionsForSelectedValues" :placeholder="placeholder"
                  :reduce="item => item.key" @option:selecting="onOptionSelect" v-if="isMultiple"
        >
            <template v-slot:selected-option="{label}">
                {{ label + (value.length > 1 ? ',...' : '') }}
            </template>
            <template v-slot:option="{key, label}">
                <img :src="`/images/flags/${key}.png`" :alt="key" class="flag-icon" v-if="key && filterName == 'country'">
                <span :class="{'font-weight-bold': isSelected(key)}">{{ label }}</span>
                <div v-if="isSelected(key) && key !== null">
                    <svg-vue icon="check" class="icon check"></svg-vue>
                    <svg-vue icon="close 2" class="icon deselect"></svg-vue>
                </div>
            </template>
        </v-select>

        <!-- Single select -->
        <v-select :options="options" :components="SelectComponents" :value="optionsForSelectedValues"
                  :reduce="item => item.key" @option:selecting="onOptionSelect" v-else
        >
            <template v-slot:option="{key, label}">
                <span :class="{'font-weight-bold': isSelected(key)}">{{ label }}</span>
                <svg-vue icon="check" class="icon" v-if="isSelected(key) && key !== null"></svg-vue>
            </template>
        </v-select>
    </div>
</template>

<script>
  import {getFilterValueLabel} from "../../helpers";
  import vSelect from "vue-select";
  import {FILTER_OPTIONS} from "../../constants";

  export default {
    name: "CopySamSelect",
    components: {
      vSelect,
    },
    props: ['filterName', 'value', 'onOptionSelect'],
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
    methods: {
      isSelected(key) {
        const currentValue = _.concat(this.value);
        return (currentValue.length == 0 && key === null) || currentValue.includes(key);
      },
    },
    computed: {
      isMultiple() {
        return _.isArray(this.value);
      },
      placeholder() {
        return getFilterValueLabel(this.filterName, null)
      },
      options() {
        return FILTER_OPTIONS[this.filterName];
      },
      optionsForSelectedValues() {
        return this.isMultiple
          ? this.options.filter(item => this.value.includes(item.key))
          : this.options.find(item => item.key == this.value);
      },
    },
  }
</script>

<style scoped>
</style>
