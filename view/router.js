import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("./pages/Home/HomePage.vue") },
    { path: "/login", component: () => import("./pages/Login/LoginPage.vue") },
    { path: "/register", component: () => import("./pages/Login/RegisterPage.vue") },
    { path: "/login/forgot-password", component: () => import("./pages/Login/ForgotPasswordPage.vue") },
    //{ path: "/feedback-contact", component: () => import("./pages/Feedback-Contact") },
    //{ path: "/products/:category/:name", component: () => import("./pages/Products/") }
  ],
});

export default router;
