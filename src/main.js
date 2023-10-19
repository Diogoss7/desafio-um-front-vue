import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFolderPlus,
  faBook,
  faPen,
  faTrashAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

library.add(faFolderPlus, faBook, faPen, faTrashAlt, faSearch);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
