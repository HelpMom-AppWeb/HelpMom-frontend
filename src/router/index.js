import HomeComponent from "../public/pages/home.vue";
import {createRouter, createWebHistory} from "vue-router";
import AppointmentComponent from "../appointment/pages/appointment.component.vue";
import AppointmentsPatient from '../appointment/pages/appointmentsPatient.component.vue';
import AllAppointmentsComponent from "../appointment/pages/all-appointments.vue";
import PatientManagementComponent from "../patient-management/pages/patient-management.component.vue";
import AddPatientComponent from "../patient-management/pages/add-patient.component.vue";
import PatientInfoComponent from "../patient-management/pages/patient-info.component.vue";


const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');
const ChatComponent = () => import('../chat/pages/chat.vue');

const HealthMonitoringComponent = () => import('../health-monitoring/pages/health-monitoring.component.vue')

const MedicationsComponent = () => import('../medications/pages/medications.component.vue');

const routes = [
    { path: '/home',            name: 'home',       component: HomeComponent,           meta: { title: 'Home' } },
    { path: '/health', name: 'health', component: HealthMonitoringComponent, meta: {title: 'Health Component'}},
    { path: '/',                name: 'default',    redirect: '/home'  },
    {path: '/dashboard',        name: 'dashboard', component: DashboardComponent, meta: { title: 'Dashboard' }},
    { path: '/patient-management/patients', name: 'patient-management', component: PatientManagementComponent, meta: { title: 'Patient Management'}},
    { path: '/patient-management/patients/add-patient', name: 'add-patient', component: AddPatientComponent, meta: { title: 'Add Patient' }},
    { path: '/patient-management/patients/patient-info', name: 'about', component: PatientInfoComponent, meta: { title: 'About Patient'}},
    { path: '/appointments', name: 'appointments', component: AppointmentComponent, meta: { title: 'Medical Appointments' } },
    { path: '/my-appointments',  name: 'patient-appointments', component: AppointmentsPatient, meta: { title: 'My appointments' } },
    { path: '/:pathMatch(.*)*', name: 'not-found',  component: PageNotFoundComponent,   meta: { title: 'Page not found' } },
    { path: '/medications', name: 'medications', component: MedicationsComponent, meta: { title: 'Medications' }},
    { path: '/patient-management', name: 'patient-management', component: PatientManagementComponent, meta: { title: 'Patient Management'}},
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
