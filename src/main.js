import { createApp } from 'vue'
import './style.css'
import App from './app.vue'
import {PrimeVue} from '@primevue/core';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Material from '@primeuix/themes/material';
import Vue3Apexcharts from "vue3-apexcharts";

import {
    Button,
    Card,
    Checkbox,
    Column, ConfirmationService,
    ConfirmDialog,
    DataTable,
    Dialog, DialogService, Drawer,
    FileUpload, FloatLabel, IconField, InputIcon, InputNumber, InputText, Menu, Rating, Row,
    Select,
    SelectButton, Tag, Textarea, Toast, ToastService, Toolbar, Message
} from "primevue";
import i18n from "./i18n.js";
import router from "./router/index.js";

createApp(App)
    .use(i18n)
    .use(router)
    .use(PrimeVue, { theme: { preset: Material}, ripple: true})
    .use(ConfirmationService)
    .use(DialogService)
    .use(ToastService)
    .use(Vue3Apexcharts)
    .component("apexchart", Vue3Apexcharts)
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-column', Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-checkbox', Checkbox)
    .component('pv-data-table', DataTable)
    .component('pv-dialog', Dialog)
    .component('pv-select', Select)
    .component('pv-select-button', SelectButton)
    .component('pv-file-upload', FileUpload)
    .component('pv-float-label', FloatLabel)
    .component('pv-icon-field', IconField)
    .component('pv-input-icon', InputIcon)
    .component('pv-input-text', InputText)
    .component('pv-input-number', InputNumber)
    .component('pv-menu', Menu)
    .component('pv-rating', Rating)
    .component('pv-row', Row)
    .component('pv-drawer', Drawer)
    .component('pv-tag', Tag)
    .component('pv-textarea', Textarea)
    .component('pv-toolbar', Toolbar)
    .component('pv-toast', Toast)
    .component('pv-message', Message)
    .mount('#app')
