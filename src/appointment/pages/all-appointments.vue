<script>
export default {
  name: "all-appointments"
}
</script>

<template>
  <div class="w-full max-w-2xl mx-auto p-6 text-center">
    <h1 class="text-3xl font-bold mb-4 text-blue-600">{{ $t("appointments.welcomeTitle") }}</h1>
    <p class="text-lg mb-8 text-gray-700">{{ $t("appointments.welcomeMessage") }}</p>

    <div class="flex justify-center space-x-4">
      <router-link
          to="/appointments"
          class="btn px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {{ $t("appointments.goToAppointments") }}
      </router-link>

      <router-link
          to="/my-appointments"
          class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        {{$t('appointments.myAppointments') }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>