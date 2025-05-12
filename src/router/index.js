import HomeComponent from "../public/pages/home.component.vue";
import {createRouter, createWebHistory} from "vue-router";
import DashboardComponent from "../public/pages/dashboard.component.vue";
import PatientManagementComponent from "../patient-management/pages/patient-management.component.vue";
import AddPatientComponent from "../patient-management/pages/add-patient.component.vue";
import AboutComponent from "../patient-management/pages/about.component.vue";


const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');
const routes = [
    { path: '/home',            name: 'home',       component: HomeComponent,           meta: { title: 'Home' } },
    { path: '/',                name: 'default',    redirect: '/home'  },
    {path: '/dashboard',        name: 'dashboard', component: DashboardComponent, meta: { title: 'Dashboard' }},
    { path: '/patient-management', name: 'patient-management', component: PatientManagementComponent, meta: { title: 'Patient Management'}},
    { path: '/add-patient', name: 'add-patient', component: AddPatientComponent, meta: { title: 'Add Patient' }},
    { path: '/about', name: 'about', component: AboutComponent, meta: { title: 'About Patient'}},
    { path: '/:pathMatch(.*)*', name: 'not-found',  component: PageNotFoundComponent,   meta: { title: 'Page not found' } },
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
