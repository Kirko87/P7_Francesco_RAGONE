import { createRouter, createWebHistory } from "vue-router";
import LogInView from "../views/LogInView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/login",
      name: "login",
      component: () => import("../views/LogInView.vue"),
    },
    { path:"/signup",
      name: "signup",
      component: () => import("../views/SignInView.vue")

    }
  ],
});

export default router;
