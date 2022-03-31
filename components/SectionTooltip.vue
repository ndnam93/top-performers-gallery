<template>
    <a href="javascript:void(0)" data-toggle="tooltip" :title="$t(`section.${section}_explain`)"
       class="d-inline-flex" v-if="isShown">
        <img src="/images/copysam/hint-icon.svg" alt="">
    </a>
</template>

<script>
  export default {
    name: "SectionTooltip",
    props: ['section'],
    methods: {
      initTooltip() {
        $(this.$el).tooltip('dispose').tooltip({
          placement: !this.$screen.md ? 'top' : 'right'
        });
      },
    },
    watch: {
      '$screen.width'() {
        this.initTooltip();
      }
    },
    computed: {
      isShown() {
        return ['performance', 'top_newcomer'].includes(this.section);
      },
    },
    mounted() {
      this.isShown && this.initTooltip();
    },
  }
</script>

<style scoped>

</style>
