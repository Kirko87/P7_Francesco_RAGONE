import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LogInView.vue"),
      },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignInView.vue"),
    },
    {
      path: "/:parent?",
      name: "main",
      component: () => import("../views/MainPage.vue"),
      props:route => ({parent:parseInt(route.params.parent)})
    }
  ],

});

router.beforeEach(async (to, from) => {
  if (
    // make sure the user is authenticated
    !localStorage.getItem("token") &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login' &&
    to.name !== 'signup'
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router;
