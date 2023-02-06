import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import App from './App.vue'
import AccordionTab from "primevue/accordiontab";
import Accordion from "primevue/accordion";
import Button from "primevue/button";
import ToggleButton from "primevue/togglebutton";
import Dropdown from "primevue/dropdown";
import Topbar from "primevue/menubar"
import InputNumber from "primevue/inputnumber";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
const app = createApp(App)

app.use(PrimeVue);

app.component("TopBar",Topbar)
app.component("AccorDion",Accordion)
app.component("AccordionTab",AccordionTab)
app.component("BasicButton",Button)
app.component("DropDown",Dropdown)
app.component("ToggleButton",ToggleButton)
app.component("TextArea",Textarea)
app.component("NumberInput",InputNumber)
app.component("InputText",InputText)
import "primeicons/primeicons.css";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
// import "@/assets/styles/wgt_style.css";
import "primeflex/primeflex.css";

app.mount('#app')

