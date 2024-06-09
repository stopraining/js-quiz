<template>
  <p class="qNo">Question No.{{ qIndex + 1 }} of {{ questionList.length }}</p>
  <h3>{{ questionList[qIndex].title }}</h3>
  <div v-if="questionList[qIndex].code" class="code-show">
    <pre><code class="language-javascript">{{ questionList[qIndex].code }}</code></pre>
  </div>
  <div class="optionArea">
    <div class="optionBox">
      <button
        v-for="(opt, index) in questionList[qIndex].option"
        :key="index"
        @click="selectedOption = optionChar[index]"
        :class="{ selected: selectedOption === optionChar[index] }"
      >
        <b>{{ optionChar[index] }}. </b> {{ opt }}
      </button>
    </div>
  </div>

  <button
    class="btn result-btn"
    v-if="qIndex === questionList.length - 1"
    @click="resultQuestion"
    :disabled="selectedOption === ''"
  >
    Result
  </button>
  <button
    class="btn next-btn"
    v-else
    @click="nextQuestion"
    :disabled="selectedOption === ''"
  >
    Next
  </button>

  <!-- <h2>{{ questionList }}</h2> -->
</template>
<script>
// import { q } from "./q.js";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

export default {
  name: "QuestionList",
  data() {
    return {
      questionList: this.randomQuestion,
      answer: this.questionAnswer,
      qIndex: 0,
      selectedOption: "",
      userAnswer: [],
      optionChar: ["A", "B", "C", "D", "E"],
    };
  },
  props: {
    randomQuestion: {
      required: true,
      type: Array,
    },
    questionAnswer: {
      required: true,
      type: Array,
    },
  },
  emits: {
    //warning vue3
    "quiz-result": null,
  },
  methods: {
    nextQuestion() {
      if (this.qIndex < this.questionList.length - 1) {
        this.userAnswer.push(this.selectedOption);
        this.qIndex += 1;
        this.selectedOption = "";
      }
    },
    resultQuestion() {
      this.userAnswer.push(this.selectedOption);
      let totalCorrect = 0;
      let quizResult = this.questionList.map((data, index) => {
        data.userAnswer = this.userAnswer[index];
        data.answerIndex = this.answer[index];
        if (this.userAnswer[index] === this.answer[index]) {
          totalCorrect += 1;
          data.correct = true;
        } else {
          data.correct = false;
        }
        return data;
      });
      this.$emit("quiz-result", quizResult, totalCorrect);
    },
  },
  mounted() {
    window.Prism = window.Prism || {};
    window.Prism.manual = true;
    Prism.highlightAll(); // highlight your code on mount
  },
  updated: function () {
    Prism.highlightAll();
  },
};
</script>
<style scoped>
@import "prismjs/themes/prism-okaidia.css";

.code-show {
  width: 90%;
  font-size: 1rem;
  margin: auto;
  margin-bottom: 1rem;
}
.optionArea {
  margin: auto;
}
.optionBox {
  width: 100%;
}

.optionBox button {
  box-sizing: border-box;
  width: 100%;
  border: 2px solid lightgray;
  background: none;
  text-align: left;
  /* border-radius: 3px; */
  margin-bottom: 0.5rem;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
  padding: 0.5rem;
}

p.qNo {
  text-decoration: underline;
  color: #f39629;
}

.optionBox button:hover {
  border: 2px solid #f39629;
}

button.selected {
  border: 2px solid #f39629;
}

button.next-btn {
  background-color: #ff6b00;
  box-shadow: 0 5px #d55b3e;
}

button.next-btn:disabled,
button.next-btn[disabled] {
  background-color: #cccccc;
  color: #666666;
  box-shadow: 0 5px #666666;
  cursor: not-allowed;
}

button.next-btn:disabled:hover,
button.next-btn[disabled]:hover {
  background-color: #cccccc;
  color: #666666;
  box-shadow: 0 5px #666666;
  cursor: not-allowed;
  transform: translateY(0px);
}

button.next-btn:hover {
  background-color: #e95d35;
  box-shadow: 0 5px #d55b3e;
  transform: translateY(4px);
}

button.result-btn {
  background-color: #008736;
  box-shadow: 0 5px #116315;
}

button.result-btn:hover {
  background-color: #117243;
  box-shadow: 0 5px #116315;
  transform: translateY(4px);
}
button.result-btn:disabled,
button.result-btn[disabled] {
  background-color: #cccccc;
  color: #666666;
  box-shadow: 0 5px #666666;
  cursor: not-allowed;
  transform: translateY(0px);
}

button.result-btn:disabled:hover,
button.result-btn[disabled]:hover {
  background-color: #cccccc;
  color: #666666;
  box-shadow: 0 5px #666666;
  cursor: not-allowed;
  transform: translateY(0px);
}

@media screen and (min-width: 1000px) {
  .optionArea {
    width: 70%;
  }
  .code-show {
    width: 700px;
  }
}
</style>
