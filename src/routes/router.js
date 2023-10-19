import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import BudgetList from "../views/BudgetList.vue";

const routes = [
  { path: "/", name: 'Home', component: Home },
  { path: "/register", name: 'Register', component: Register },
  { path: "/budget-list", name: 'BudgetList', component: BudgetList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;