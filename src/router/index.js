import HomeComponent from "../public/pages/home.vue";
import {createRouter, createWebHistory} from "vue-router";
import AppointmentComponent from "../appointment/pages/appointment.component.vue";
import AppointmentsPatient from '../appointment/pages/appointmentsPatient.component.vue';
import AllAppointmentsComponent from "../appointment/pages/all-appointments.vue";
import PatientManagementComponent from "../patient-management/pages/patient-management.component.vue";
import AddPatientComponent from "../patient-management/pages/add-patient.component.vue";
import PatientInfoComponent from "../patient-management/pages/patient-info.component.vue";
import LoginComponent from "../pages/login/login.component.vue";
import RegisterComponent from "../pages/register/register.component.vue";
const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');
const ChatComponent = () => import('../chat/pages/chat.vue');
const HealthMonitoringComponent = () => import('../health-monitoring/pages/health-monitoring.component.vue')

const MedicationsComponent = () => import('../medications/pages/medications.component.vue');

const routes = [
    { path: '/home', name: 'home', component: HomeComponent, meta: { title: 'Home' } },


    { path: '/chat/:patientId?', name: 'Chat', component: ChatComponent, props: true, meta: { title: 'Chat' } },

    { path: '/', name: 'default', redirect: '/home' },

    {path: '/login',name: 'Login',component: LoginComponent},
    {path: '/register',name: 'Register',component: RegisterComponent},
    { path: '/appointments', name: 'appointments', component: AppointmentComponent, meta: { title: 'Medical Appointments' } },
    { path: '/my-appointments', name: 'patient-appointments', component: AppointmentsPatient, meta: { title: 'My appointments' } },
    { path: '/all-appointments', name: 'all-appointments', component: AllAppointmentsComponent, meta: { title: 'All Appointments'} },
    { path: '/health', name: 'health', component: HealthMonitoringComponent, meta: {title: 'Health Component'} },
    { path: '/medications', name: 'medications', component: MedicationsComponent, meta: { title: 'Medications' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFoundComponent, meta: { title: 'Page not found' } },
    { path: '/patient-management/patients', name: 'patient-management', component: PatientManagementComponent, meta: { title: 'Patient Management'}},
    { path: '/patient-management/patients/add-patient', name: 'add-patient', component: AddPatientComponent, meta: { title: 'Add Patient' }},
    { path: '/patient-management/patients/:patientId', name: 'patient-info', component: PatientInfoComponent, meta: { title: 'About Patient'}},
];


const router = createRouter({
    history: createWebHistory(import.meta.BASE_URL),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    let baseTitle = 'HelpMom';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;