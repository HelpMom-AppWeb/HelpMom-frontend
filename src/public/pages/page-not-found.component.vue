<script>
export default {
  name: "PageNotFound",
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
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
    <div class="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center space-y-6">
      <!-- Icono de error -->
      <div class="mx-auto w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <!-- Texto principal -->
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Página no encontrada</h1>
        <p class="text-gray-600">Lo sentimos, no pudimos encontrar lo que buscabas</p>
      </div>

      <!-- Ruta no disponible -->
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-sm text-gray-700">La ruta <span class="font-mono bg-gray-200 px-2 py-1 rounded">{{ unavailableRoute }}</span> no está disponible</p>
      </div>

      <!-- Botón de acción -->
      <router-link
          to="/home"
          class="inline-flex items-center px-6 py-3 bg-pink-200 text-white rounded-lg hover:bg-pink-300 transition-colors shadow-md hover:shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        Volver al Inicio
      </router-link>
    </div>
  </div>
</template>

<style scoped>
/* Animación suave para el contenedor */
div {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilo para el botón */
.router-link-active {
  @apply bg-pink-300;
}
</style>