import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

// Pages
import Login from '@/public/pages/login.component.vue'
import RegisterComponent from '@/pages/register/register.component.vue'
// Layouts
import DoctorLayout from '@/layouts/DoctorLayout.vue'
import PatientLayout from '@/layouts/PatientLayout.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { title: 'Login' }
        },


        {
            path: '/doctor/add-patient',
            name: 'add patient',
            component: () => import('@/patient-management/pages/add-patient.component.vue'),
            meta: { title: 'add patient' }
        },

        {
            path: '/doctor/patient-management/:id',
            name: 'patient-info',
            component: () => import('@/patient-management/pages/patient-info.component.vue'),
            props: true,
            meta: { title: 'Patient Info' }
        },

        {
            path: '/register',
            name: 'register',
            component: RegisterComponent,
            meta: { title: 'Register' }
        },

        // Doctor
        {
            path: '/doctor',
            component: DoctorLayout,
            children: [
                {
                    path: '',
                    name: 'doctor-dashboard',
                    component: () => import('@/doctor/components/DoctorHome.vue')
                },
                {
                    path: 'appointments',
                    name: 'doctor-appointments',
                    component: () => import('@/appointment/pages/appointmentCreation.component.vue'),
                    meta: { title: 'Appointments Management' }
                },
                {
                    path: 'all-appointments',
                    name: 'all-appointments',
                    component: () => import('@/appointment/pages/all-appointments.vue'),
                    meta: { title: 'All Appointments' }
                },
                {
                    path: 'patient-management',
                    name: 'patient-management',
                    component: () => import('@/patient-management/pages/patient-management.component.vue'),
                    meta: { title: 'Patient Management' }
                },

                {
                    path: 'health',
                    name: 'doctor-health',
                    component: () => import('@/health-monitoring/pages/health-monitoring.component.vue'),
                    meta: { title: 'Health Monitoring' }
                },
                {
                    path: 'medications',
                    name: 'doctor-medications',
                    component: () => import('@/medications/pages/medications.component.vue'),
                    meta: { title: 'Medications' }
                },
                {
                    path: 'chat/:patientId?',
                    name: 'doctor-chat',
                    component: () => import('@/chat/pages/chat.vue'),
                    props: true,
                    meta: { title: 'Chat' }
                }
            ]
        },

        // Patient
        {
            path: '/patient',
            component: PatientLayout,
            children: [
                {
                    path: '',
                    name: 'patient-dashboard',
                    component: () => import('@/patient/components/PatientHome.vue')
                },
                {
                    path: 'appointments',
                    name: 'appointments-patient',
                    component: () => import('@/appointment/pages/appointmentsPatient.component.vue'),
                    meta: { title: 'My Appointments' }
                },
                {
                    path: 'health',
                    name: 'patient-health',
                    component: () => import('@/health-monitoring/pages/health-monitoring.component.vue'),
                    meta: { title: 'My Health' }
                },
                {
                    path: 'chat',
                    name: 'patient-chat',
                    component: () => import('@/chat/pages/chat.vue'),
                    meta: { title: 'Chat with Doctor' }
                }
            ]
        },

        // Not Found
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/public/pages/page-not-found.component.vue'),
            meta: { title: 'Page Not Found', public: true }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const baseTitle = 'HelpMom'
    document.title = `${baseTitle} | ${to.meta.title || 'App'}`

    if (to.meta.public) return next()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next({ name: 'login', query: { redirect: to.fullPath } })
    }

    if (to.meta.role && authStore.user?.role !== to.meta.role) {
        const fallback = authStore.isDoctor ? '/doctor' : '/patient'
        return next(fallback)
    }

    if (to.name === 'login' && authStore.isAuthenticated) {
        const defaultRoute = authStore.isDoctor ? '/doctor' : '/patient'
        return next(defaultRoute)
    }

    next()
})

export default router
