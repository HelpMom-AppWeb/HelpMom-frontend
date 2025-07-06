import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

export function useAccessControl() {
    const authStore = useAuthStore()

    return {
        isDoctor: computed(() => authStore.isDoctor),
        isPatient: computed(() => authStore.isPatient),
        user: computed(() => authStore.user)
    }
}