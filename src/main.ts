import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import UnsupportedDevice from './views/UnsupportedDevice.vue'
import { isDesktopDevice } from './utils/device'

const app = createApp(isDesktopDevice() ? App : UnsupportedDevice)

app.use(createPinia())
app.use(router)

app.mount('#app')
