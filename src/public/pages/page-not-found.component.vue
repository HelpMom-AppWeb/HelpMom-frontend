<script>
export default {
  name: "page-not-found",
  data() {
    return {
      unavailableRoute: null,
    }
  },
  created() {
    this.unavailableRoute = this.$route.path;
  }

}
</script>

<template>
  <div class="w-full">
    <h1>{{$t("pageNotFound.title")}}</h1>
    <p>{{$t("pageNotFound.message1")}}<b>{{ unavailableRoute }}</b>{{$t("pageNotFound.message2")}}</p>
    <router-link to="/home">{{$t("pageNotFound.backToHome")}}</router-link>
  </div>
</template>

<style scoped>

</style>