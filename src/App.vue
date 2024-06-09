<template>
  <div v-if="!start">
    <h1>JS Quiz :&nbsp;</h1>
    <select id="qs" v-model="questionNum">
      <option value="1" selected>1</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option></select
    ><br />
    <button class="btn start-btn" @click="startQuiz">Start</button>
  </div>
  <question-result
    v-else-if="resultShow && start"
    :result="result"
    :total-correct="totalCorrect"
    @retry="reStart"
  ></question-result>
  <question-list
    v-else
    @quiz-result="quizResult"
    :random-question="questionList"
    :question-answer="questionAnswer"
  ></question-list>
  <p v-if="waitingText">Waiting...</p>
</template>

<script>
import { q } from "./q"; //
import QuestionList from "./components/QuestionList.vue";
import QuestionResult from "./components/QuestionResult.vue";

export default {
  name: "App",
  components: {
    QuestionList,
    QuestionResult,
  },
  data() {
    return {
      resultShow: false,
      result: [],
      start: false,
      waitingText: false,
      questionList: [],
      questionAnswer: [],
      questionImport: JSON.parse(JSON.stringify(q)), //deep copy
      totalCorrect: 0,
      questionNum: 1,
    };
  },
  methods: {
    startQuiz() {
      this.waitingText = true;
      // setTimeout(() => {
      this.quizRandom(this.questionNum);
      this.quizAnswer();
      this.waitingText = false;
      this.start = true;
      // }, 1000);
    },
    quizResult(result, totalCorrect) {
      this.totalCorrect = totalCorrect;
      this.result = result;
      this.resultShow = true;
    },
    quizRandom(num) {
      while (num > 0) {
        let randomIndex = Math.floor(
          Math.random() * this.questionImport.length
        );
        this.questionList.push(this.questionImport[randomIndex]);
        this.questionImport.splice(randomIndex, 1);
        num -= 1;
      }
    },
    quizAnswer() {
      this.questionList.forEach((data) => {
        this.questionAnswer.push(data.answer);
      });
    },
    reStart() {
      // console.log("retry");
      this.start = false;
      this.resultShow = false;
      this.result = [];
      this.questionList = [];
      this.questionAnswer = [];
      this.questionImport = JSON.parse(JSON.stringify(q));
      this.totalCorrect = 0;
    },
  },
};
</script>

<style>
body {
  background-color: #01142f;
  font-size: 20px;
  overflow-y: scroll;
  /* padding-right: 5px; */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  box-sizing: border-box;
  color: white;
}
h1 {
  font-size: 2rem;
  display: inline-block;
}
select {
  font-size: 1.5rem;
}

.btn {
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.2rem;
  margin: 2rem auto;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 10px;
}

button.start-btn {
  background-color: #008736;
  box-shadow: 0 5px #116315;
  border-radius: 50%;
}

button.start-btn:hover {
  background-color: #117243;
  box-shadow: 0 5px #116315;
  transform: translateY(4px);
}
/* scrollbar */
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #01142f;
}

::-webkit-scrollbar-thumb:hover {
  background: #d55b3e;
  border-radius: 20px;
}
</style>
