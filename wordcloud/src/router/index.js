import { createRouter, createWebHistory } from "vue-router";
import LoginPanel from "../components/LoginPanel.vue";
import Questions from "../components/Questions.vue";
import Answers from "../components/Answers.vue";
import WordCloud4 from "../components/WordCloud4.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/user",
      name: "user",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginPanel,
    },
    {
      path: "/questions/",
      name: "questions",
      component: Questions,
    },
    {
      path: "/answers/:questionId",
      name: "answers",
      component: Answers,
      props: true
    },
    {
        path: "/wordcloud",
        name: "wordcloud",
        component: WordCloud4,
    },
    {
        path: "/",
        redirect: {name:"user"},
    },
  ],
});

export default router;
