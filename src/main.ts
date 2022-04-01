import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown, faEllipsis } from "@fortawesome/free-solid-svg-icons";

library.add(faAngleDown, faEllipsis);

const app = createApp(App);

app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
