<template>
    <component :is="pageComponent" :id="id"></component>
</template>

<script>
  import AllWatchlists from "./AllWatchlists";
  import CustomWatchlist from "./CustomWatchlist";

  export default {
    name: "MainWatchlist",
    props: ['id'],
    computed: {
      pageComponent() {
        return this.id == 'all' ? AllWatchlists : CustomWatchlist;
      },
    },
  }
</script>

<style scoped>

</style>