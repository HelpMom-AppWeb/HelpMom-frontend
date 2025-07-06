import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        _initialized: false // Bandera para controlar la inicialización
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
        isDoctor: (state) => state.user?.role === 'a',
        isPatient: (state) => state.user?.role === 'b',
        isInitialized: (state) => state._initialized
    },
    actions: {
        /**
         * Simulación login demo:
         * - doctor/1 accede como doctor
         * - patient/1 accede como paciente
         */
        async login({ username, password }) {
            if ((username === 'a' || username === 'b') && password === '1') {
                this.user = {
                    name: username === 'a' ? 'Dr. Smith' : 'Jane Doe',
                    role: username
                }
                this.token = 'fake-jwt-token'

                // Persistir
                this.persistAuth()
                return true
            } else {
                throw new Error('Invalid credentials')
            }
        },
        logout() {
            this.user = null
            this.token = null
            this.clearAuth()
        },
        // Nueva acción para persistir datos
        persistAuth() {
            localStorage.setItem('auth', JSON.stringify({
                user: this.user,
                token: this.token
            }))
        },
        // Nueva acción para limpiar datos
        clearAuth() {
            localStorage.removeItem('auth')
        },
        // Nueva acción para inicializar
        initialize() {
            if (this._initialized) return

            const authData = localStorage.getItem('auth')
            if (authData) {
                try {
                    const { user, token } = JSON.parse(authData)
                    this.user = user
                    this.token = token
                } catch (error) {
                    this.clearAuth()
                    console.error('Error parsing auth data:', error)
                }
            }
            this._initialized = true
        }
    }
})