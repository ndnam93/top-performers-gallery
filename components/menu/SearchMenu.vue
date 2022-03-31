<template>
    <form action="" @submit.prevent="submit" class="d-flex flex-column flex-lg-row justify-content-center align-items-center align-items-lg-end">
        <div class="filter-control">
            <div class="filter-label">{{ $t('site.enter_name') }}</div>
            <input type="text" name="q" v-model="keyword">
        </div>
        <button class="btn btn-primary px-5 mb-4 ml-lg-5 text-uppercase" type="submit">{{ $t('site.search') }}</button>
    </form>
</template>

<script>
  export default {
    name: "SearchMenu",
    data: () => ({
      keyword: '',
    }),
    methods: {
      submit() {
        const keyword = this.keyword.trim();
        if (keyword == this.$route.query.q) return;

        keyword.length && this.$router.push({name: 'search_result', query: {q: keyword}});
      },
    },
    mounted() {
      this.keyword = this.$route.query.q;
    },
    watch: {
      '$route.query'(val, oldVal) {
        this.keyword = val.q;
      },
    },
  }
</script>

<style scoped lang="scss">
    @media only screen and (min-width: 768px) {
        .filter-control {
            width: 440px;
        }

    }
</style>