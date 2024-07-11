import { createRouter, createWebHistory } from "vue-router";
import LoginPanel from "../components/LoginPanel.vue";
import Questions from "../components/Questions.vue";
import Answers from "../components/Answers.vue";
import WordCloud4 from "../components/WordCloud4.vue";
import QuestionbyCode  from "../components/QuestionsbyCode.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/user",
      name: "user",
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
      path: '/questions-by-code',
      name: 'QuestionbyCode',
      component: QuestionbyCode,
    },
    {
        path: "/",
        redirect: {name:"user"},
    },
  ],
});



export default router;
