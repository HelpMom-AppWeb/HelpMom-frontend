import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
// Componentes principales
import Login from '@/public/pages/login.component.vue'


// Layouts
import DoctorLayout from '@/layouts/DoctorLayout.vue'
import PatientLayout from '@/layouts/PatientLayout.vue'
import PatientManagementComponent from "../patient-management/pages/patient-management.component.vue";
import AddPatientComponent from "../patient-management/pages/add-patient.component.vue";
import LoginComponent from "../pages/login/login.component.vue";
import RegisterComponent from "../pages/register/register.component.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { title: 'Login' }
        },
        {
            path: '/register',
            name:'Register',
            component:RegisterComponent
        },
        {
            path: '/loginTest',
            name: 'LoginTest',
            component: LoginComponent
        },


        // Rutas para Doctor
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
                    component: () => import('../appointment/pages/appointmentCreation.component.vue'),
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
                    path: '/patient-management/patients',
                    name: 'patient-management',
                    component: PatientManagementComponent,
                    meta: { title: 'Patient Management'}
                },
                {
                    path: '/add-patient',
                    name: 'add-patient',
                    component: AddPatientComponent,
                    meta: { title: 'Add Patient' }
                },
                {
                    path: 'patients/:id',
                    name: 'patient-info',
                    component: () => import('@/patient-management/pages/patient-info.component.vue'),
                    meta: { title: 'Patient Info' },
                    props: true
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
                    meta: { title: 'Chat' },
                    props: true
                }
            ]
        },

        // Rutas para Paciente
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
                    name: 'appointmentsPatient',
                    component: () => import('../appointment/pages/appointmentsPatient.component.vue'),
                    meta: { title: 'My Appointments' }
                },
                {
                    path: 'health',
                    name: 'patient-health',
                    component: () => import('../health-monitoring/pages/health-monitoring.component.vue'),
                    meta: { title: 'My Health' }
                },
                {
                    path: 'chat',
                    name: 'patient-chat',
                    component: () => import('../chat/pages/chat.vue'),
                    meta: { title: 'Chat with Doctor' }
                }
            ]
        },

        // Ruta para página no encontrada
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

    // Establecer título
    document.title = `${baseTitle} | ${to.meta.title || 'App'}`

    // Páginas públicas
    if (to.meta.public) return next()

    // Verificar autenticación
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next({
            name: 'login',
            query: { redirect: to.fullPath }
        })
    }

    // Verificar rol
    if (to.meta.role && authStore.user?.role !== to.meta.role) {
        const fallbackRoute = authStore.isDoctor ? '/doctor' : '/patient'
        return next(fallbackRoute)
    }

    // Redirigir si ya está autenticado
    if (to.name === 'login' && authStore.isAuthenticated) {
        const defaultRoute = authStore.isDoctor ? '/doctor' : '/patient'
        return next(defaultRoute)
    }

    next()
})

export default router