import { createApp } from "vue";
import { createPinia} from "pinia";

import Mitt from "mitt";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.config.globalProperties.eventBus=new Mitt()

app.mount("#app");
