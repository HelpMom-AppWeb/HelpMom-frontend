<script>
export default {
  name: "home.component"
}
</script>

<template>
  <div class="w-full">
    <h1> Welcome</h1>
    <p>Welcome to HelpMom</p>
    <router-link to="/appointments" class="btn">Go to appointments</router-link>

    <router-link to="/my-appointments">My appointments</router-link>
  </div>
</template>

<style scoped>

</style>