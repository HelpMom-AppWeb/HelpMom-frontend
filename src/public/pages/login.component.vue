<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 p-4">
    <div class="relative w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl transition hover:scale-[1.01]">

      <div class="absolute -top-20 -left-20 w-40 h-40 bg-pink-300 rounded-full opacity-20 mix-blend-overlay"></div>
      <div class="absolute -bottom-16 -right-16 w-32 h-32 bg-purple-300 rounded-full opacity-20 mix-blend-overlay"></div>

      <!-- Logo - Modificado -->
      <div class="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-gradient-to-br from-pink-300 to-purple-400">
        <div class="flex justify-center w-full">
          <img src="@/assets/logo.svg" alt="Logo" class="h-2 w-auto object-contain" />
        </div>
      </div>

      <!-- Form -->
      <div class="w-full md:w-1/2 p-8 space-y-6">
        <div class="text-center md:text-left">
          <h2 class="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-pink-400 to-pink-600 text-transparent bg-clip-text">
            {{ $t('title') }}
          </h2>
          <p class="text-gray-600 mt-2">{{ $t('subtitle') }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-9" novalidate>
          <!-- Toggle -->
          <div class="flex gap-4">
            <button
                type="button"
                @click="form.role = 'patient'"
                :class="[
                'flex-1 py-2.5 rounded-lg border transition font-medium',
                form.role === 'patient'
                  ? 'bg-pink-500 text-white border-pink-500 shadow'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-pink-50'
              ]"
            >
              {{ $t('patient') }}
            </button>
            <button
                type="button"
                @click="form.role = 'doctor'"
                :class="[
                'flex-1 py-2.5 rounded-lg border transition font-medium',
                form.role === 'doctor'
                  ? 'bg-pink-500 text-white border-pink-500 shadow'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-pink-50'
              ]"
            >
              {{ $t('doctor') }}
            </button>
          </div>

          <div>
            <label for="username" class="block text-sm font-medium text-gray-600 mb-1">{{ $t('username') }}</label>
            <input
                id="username"
                v-model="form.username"
                type="text"
                required
                autocomplete="username"
                :placeholder="$t('usernamePlaceholder')"
                class="w-full rounded-lg border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition text-gray-700 bg-white border shadow-sm"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-600 mb-1">{{ $t('password') }}</label>
            <input
                id="password"
                v-model="form.password"
                type="password"
                required
                autocomplete="current-password"
                :placeholder="$t('passwordPlaceholder')"
                class="w-full rounded-lg border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition text-gray-700 bg-white border shadow-sm"
            />
          </div>

          <div class="mt-6"> <!-- Añade esta clase para mayor espacio superior -->
            <button
                type="submit"
                :disabled="loading"
                class="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 shadow-md hover:shadow-lg active:scale-95"
            >
              <span v-if="!loading">{{ $t('submit') }}</span>
              <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2
        5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3
        7.938l3-2.647z" />
              </svg>
            </button>
          </div>

          <div v-if="errorMessage" class="text-red-500 text-sm text-center mt-2 px-4 py-3 bg-red-50 rounded-lg border border-red-100" aria-live="assertive">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  username: 'b',
  password: '1',
  role: 'patient'
})

const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const success = await authStore.login(form.value)
    if (success) {
      router.push(authStore.isDoctor ? '/doctor' : '/patient')
    } else {
      errorMessage.value = t('login.errors.invalidCredentials')
    }
  } catch (err) {
    console.error('Login error:', err)
    errorMessage.value = err?.message || t('login.errors.invalidCredentials')
  } finally {
    loading.value = false
  }
}
</script>
