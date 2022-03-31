<template>
    <div class="py-5">
        <MasterSlider v-for="section in SECTION" :key="section" :section="section" />
    </div>
</template>

<script>
  import MasterSlider from "../components/MasterSlider";
  import {SECTION} from "../constants";

  export default {
    name: "SectionSlides",
    components: {
      MasterSlider,
    },
    data: () =>({
      SECTION,
    }),
  }
</script>

<style scoped>

</style>
