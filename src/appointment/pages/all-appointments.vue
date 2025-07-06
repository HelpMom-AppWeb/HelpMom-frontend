<script>
export default {
  name: "all-appointments"
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
    <div class="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 space-y-8">
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold text-pink-200">Appointment Hub</h1>
      </div>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <router-link
            to="/doctor/appointments"
            class="btn px-8 py-3 bg-pink-200 text-white rounded-lg hover:bg-pink-300 transition-all
                 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center
                 space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          <span>Create a New Appointment</span>
        </router-link>

        <router-link
            to="/patient/appointments"
            class="px-8 py-3 bg-white border-2 border-pink-200 text-indigo-600 rounded-lg hover:bg-pink-200
                 transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex items-center
                 justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pink-100" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
          <span>My Appointments List</span>
        </router-link>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Mobile-first responsive design */
@media (min-width: 640px) {
  .max-w-md {
    max-width: 28rem;
    padding: 2rem;
  }
}

/* Button press effect */
.active:scale-95 {
  transform: scale(0.95);
}

/* Smooth transitions */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>