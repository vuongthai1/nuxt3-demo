import { App, Ref } from 'vue'
import { DefaultsInstance, DisplayInstance, LocaleInstance, LocaleMessages, LocaleOptions, ThemeInstance, createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp: {
    vueApp: {
      use: (arg0: {
        install: (app: App<any>) => void; defaults: Ref<DefaultsInstance>; display: DisplayInstance; theme: ThemeInstance & { install: (app: App<any>) => void }; icons: Record<string, any>; locale: {
          isRtl: Ref<boolean>; rtl: Ref<Record<string, boolean>>; rtlClasses: Ref<string>; name: string; messages: Ref<LocaleMessages>; current: Ref<string>; fallback: Ref<//   throw new Error('Function not implemented.')
            // }
            string>; t: (key: string, ...params: unknown[]) =>
              // }
              string; n: (value: number) => string; provide: (props: LocaleOptions) => LocaleInstance
        }; date: Record<string, any>
      }) => void
    }
  }) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
  })

  nuxtApp.vueApp.use(vuetify)
})

// function defineNuxtPlugin(arg0: (nuxtApp: any) => void) {
//   throw new Error('Function not implemented.')
// }
