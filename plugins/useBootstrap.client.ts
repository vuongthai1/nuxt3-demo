import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

export default defineNuxtPlugin((nuxtApp: { provide: (arg0: string, arg1: any) => void }) => {
    nuxtApp.provide('bootstrap', bootstrap)
})
