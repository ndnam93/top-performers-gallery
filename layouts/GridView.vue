<template>
    <div>
        <div class="d-flex flex-wrap px-md-4 pt-4 pt-md-5">
            <div class="col-12 col-lg-6 col-xxl-4 px-3 px-md-4 pb-3 pb-md-5" v-for="item in items" :key="item.id">
                <master-item v-bind="item"/>
            </div>
        </div>
        <div class="justify-content-center pb-5">
            <scroll-loader :loader-method="emitLoadMore" :loader-disable="!hasMore"></scroll-loader>
        </div>
    </div>
</template>

<script>
  import MasterItem from "../components/MasterItem";

  export default {
    name: "GridView",
    components: {
      MasterItem,
    },
    props: {
      items: Array,
      hasMore: Boolean,
    },
    methods: {
      emitLoadMore() {
        this.$emit('load-more');
      },
    },
  }
</script>

<style scoped>

</style>
