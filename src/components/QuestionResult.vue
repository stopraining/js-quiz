<template>
  <h2>Result</h2>
  <h3>Score: {{ totalCorrect }}/{{ result.length }} ({{ scoreP }}%)</h3>
  <button class="btn detail-btn" @click="showDetails = !showDetails">
    Show Details</button
  ><button class="btn retry-btn" @click="retry">Retry</button>
  <div class="resultArea" v-show="showDetails">
    <div class="resultBox" v-for="(r, index) in result" :key="r.id">
      <span v-if="r.correct">⭕</span>
      <span v-else>❌</span>
      <h4>{{ index + 1 }}. {{ r.title }}</h4>
      <div v-if="r.code" class="code-show">
        <pre><code class="language-javascript">{{ r.code }}</code></pre>
      </div>
      <p
        v-for="(opt, index) in r.option"
        :key="index"
        :class="{
          correctOption: r.answerIndex === optionChar[index],
          wrongOption: !r.correct & (r.userAnswer === optionChar[index]),
        }"
      >
        <b>{{ optionChar[index] }}. </b> {{ opt }}
      </p>
    </div>
  </div>
</template>
<script>
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
export default {
  name: "QuestionResult",
  data() {
    return {
      showDetails: false,
      optionChar: ["A", "B", "C", "D", "E"],
    };
  },
  emits: {
    retry: null,
  },
  props: {
    result: {
      required: true,
      type: Array,
    },
    totalCorrect: {
      required: true,
      type: Number,
    },
  },
  methods: {
    retry() {
      this.$emit("retry");
    },
  },
  computed: {
    scoreP() {
      return Math.round((this.totalCorrect / this.result.length) * 100);
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

.resultArea {
  width: 100%;
}
.resultBox {
  /* width: 100%; */
  margin-bottom: 10px;
  border: 2px solid lightgray;
  padding: 10px 0px;
}

.resultBox p {
  text-align: left;
  padding: 0.5rem;
}

button.detail-btn {
  background-color: #ff6b00;
  box-shadow: 0 5px #d55b3e;
  margin-right: 15px;
}

button.detail-btn:hover {
  background-color: #e95d35;
  box-shadow: 0 5px #d55b3e;
  transform: translateY(4px);
}

button.retry-btn {
  background-color: #008736;
  box-shadow: 0 5px #116315;
}

button.retry-btn:hover {
  background-color: #117243;
  box-shadow: 0 5px #116315;
  transform: translateY(4px);
}

.correctOption {
  background-color: rgba(144, 238, 144, 0.5);
  border: 2px solid rgba(144, 238, 144);
}
.wrongOption {
  background-color: rgba(240, 128, 128, 0.8);
  border: 2px solid rgba(240, 128, 128);
}

@media screen and (min-width: 1000px) {
  .resultArea {
    width: 70%;
    margin: auto;
  }
  .code-show {
    width: 700px;
  }
}
</style>
