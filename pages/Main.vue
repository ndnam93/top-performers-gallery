<template>
    <div>
        <QuickMenu/>
        <router-view/>
        <CreateWatchlist />
    </div>
</template>

<script>
  import QuickMenu from "../components/menu/QuickMenu";
  import CreateWatchlist from "../modals/CreateWatchlist";

  export default {
    name: "Main",
    components: {
      QuickMenu,
      CreateWatchlist,
    }
  }
</script>

<style scoped lang="scss"></style>
