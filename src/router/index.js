import HomeComponent from "../public/pages/home.component.vue";
import {createRouter, createWebHistory} from "vue-router";
import AppointmentComponent from "../appointment/pages/appointment.component.vue";

const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');
const routes = [
    { path: '/home',            name: 'home',       component: HomeComponent,           meta: { title: 'Home' } },
    { path: '/appointments', name: 'appointments', component: AppointmentComponent, meta: { title: 'Medical Appointments' } },
    { path: '/',                name: 'default',    redirect: '/home'  },
    { path: '/:pathMatch(.*)*', name: 'not-found',  component: PageNotFoundComponent,   meta: { title: 'Page not found' } },
];

const router = createRouter({
    history: createWebHistory(import.meta.BASE_URL),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    let baseTitle = 'ACME Learning Center';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;
