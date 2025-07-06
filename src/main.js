import { createApp } from 'vue'
import './style.css'
import App from './app.vue'
import { PrimeVue } from '@primevue/core'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import Material from '@primeuix/themes/material'
import Vue3Apexcharts from "vue3-apexcharts"
import { createPinia } from "pinia"
import i18n from "./i18n.js"
import router from "./router/index.js"

// Importaciones de componentes PrimeVue
import {
    Button, Card, Checkbox, Column, ConfirmationService,
    ConfirmDialog, DataTable, Dialog, DialogService, Drawer,
    FileUpload, FloatLabel, IconField, InputIcon, InputNumber,
    InputText, Menu, Rating, Row, Select, SelectButton, Tag,
    Textarea, Toast, ToastService, Toolbar, Message
} from "primevue"

// Crear la instancia de Pinia primero
const pinia = createPinia()

// Crear la aplicación
const app = createApp(App)

// Configurar PrimeVue
app.use(PrimeVue, {
    theme: { preset: Material },
    ripple: true
})

// Usar plugins
app.use(i18n)
app.use(pinia) // Pinia debe registrarse antes del router
app.use(router)

// Servicios PrimeVue
app.use(ConfirmationService)
app.use(DialogService)
app.use(ToastService)
app.use(Vue3Apexcharts)

// Registrar componentes globales
const primeComponents = {
    'pv-button': Button,
    'pv-card': Card,
    'pv-column': Column,
    'pv-confirm-dialog': ConfirmDialog,
    'pv-checkbox': Checkbox,
    'pv-data-table': DataTable,
    'pv-dialog': Dialog,
    'pv-select': Select,
    'pv-select-button': SelectButton,
    'pv-file-upload': FileUpload,
    'pv-float-label': FloatLabel,
    'pv-icon-field': IconField,
    'pv-input-icon': InputIcon,
    'pv-input-text': InputText,
    'pv-input-number': InputNumber,
    'pv-menu': Menu,
    'pv-rating': Rating,
    'pv-row': Row,
    'pv-drawer': Drawer,
    'pv-tag': Tag,
    'pv-textarea': Textarea,
    'pv-toolbar': Toolbar,
    'pv-toast': Toast,
    'pv-message': Message,
    'apexchart': Vue3Apexcharts
}

Object.entries(primeComponents).forEach(([name, component]) => {
    app.component(name, component)
})

// Inicializar el store de autenticación antes de montar la app
import { useAuthStore } from '@/stores/auth.store'
const authStore = useAuthStore()
authStore.initialize()

// Montar la aplicación
app.mount('#app')