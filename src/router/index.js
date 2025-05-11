import HomeComponent from "../public/pages/home.component.vue";
import { createRouter, createWebHistory } from "vue-router";

const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');
const ChatComponent = () => import('../chat/pages/chat.vue');

const routes = [
    { path: '/home',            name: 'home',       component: HomeComponent,         meta: { title: 'Home' } },
    { path: '/chat',            name: 'chat',       component: ChatComponent,         meta: { title: 'Chat' } },
    { path: '/',                name: 'default',    redirect: '/home' },
    { path: '/:pathMatch(.*)*', name: 'not-found',  component: PageNotFoundComponent, meta: { title: 'Page not found' } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // corrected from import.meta.BASE_URL
    routes: routes,
});

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    const baseTitle = 'HelpMom';
    document.title = `${baseTitle} | ${to.meta.title || 'Untitled'}`;
    next();
});

export default router;
