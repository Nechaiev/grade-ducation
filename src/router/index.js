import { createRouter, createWebHistory } from 'vue-router';
import ReviewPage from "../pages/ReviewPage.vue";
import HomePage from "../pages/HomePage.vue";

const routes = [
  { path: '/', component: HomePage },
  { path: '/reviews', component: ReviewPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
