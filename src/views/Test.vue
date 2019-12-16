<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">{{ $t('test.title') }}</span>
      </md-app-toolbar>
      <md-app-content>
        <router-link to="/">
          <md-button class="md-raised md-primary">{{ $t('home') }}</md-button>
        </router-link>
        <br>
        <br>
        <br>
        <div v-if="!showResults">
          <md-progress-bar md-mode="determinate" :md-value="progress"></md-progress-bar>
          <br>
          <div class="md-layout-item">
            <md-field>
              <label>{{ vocabulary[step].word }}</label>
              <md-input v-model="answers[step]" focus ref="answer"></md-input>
            </md-field>
          </div>
          <md-button v-if="0 != step" class="md-accent" @click="back">{{ $t('test.back') }}</md-button>
          <md-button v-if="amount-1 != step" class="md-primary" @click="forth">{{ $t('test.next') }}</md-button>
          <md-button v-if="amount-1 == step" class="md-primary" @click="displayResults">{{ $t('test.finish') }}</md-button>
        </div>
        <div v-if="showResults">
          <div class="correct-overview">
            <div class="fill" v-bind:style="{ width: correctPercentage() + '%' }"></div>
          </div>
          <p>
            {{ $t('test.resultText', {correct: correctTotal(), amount: amount}) }}
          </p>
          <md-list>
            <md-list-item>
              <div class="md-layout-item md-headline">
                {{ $t('vocabulary.word') }}
              </div>
              <div class="md-layout-item md-headline">
                {{ $t('vocabulary.foreignWord') }}
              </div>
              <div class="md-layout-item md-headline">
                {{ $t('test.answer') }}
              </div>
              <div class="md-layout-item md-headline">
                {{ $t('test.result') }}
              </div>
            </md-list-item>
            <md-list-item v-bind:key="index" v-for="(item, index) in vocabulary">
              <div class="md-layout-item">
                <span class="md-list-item-text">{{ item.word }}</span>
              </div>
              <div class="md-layout-item">
                <span class="md-list-item-text">{{ item.foreignWord }}</span>
              </div>
              <div class="md-layout-item">
                <span class="md-list-item-text">{{ answers[index] }}</span>
              </div>
              <div class="md-layout-item">
                <md-icon v-if="answers[index] == item.foreignWord" style="color:#76ff03">check</md-icon>
                <md-icon v-if="answers[index] != item.foreignWord" class="md-accent">clear</md-icon>
              </div>
            </md-list-item>
          </md-list>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
/*eslint no-console: ["error", { allow: ["log", "error"] }] */
export default {
  data() {
    return {
      step: 0,
      progress: 0,
      amount: 20,
      answers: [],
      showResults: false
    }
  },
  computed: {
    vocabulary() {
      return this.$store.getters["vocabulary/vocabularyTestSet"](this.amount);
    }
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    focusInput() {
      this.$refs.answer.$el.focus();
    },
    forth() {
      this.step++;
      this.updateProgress();
    },
    back() {
      this.step--;
      this.updateProgress();
    },
    updateProgress() {
      var progressState;
      if (this.step === 0) {
        progressState = 0;
      } else if (this.step +1 === this.amount) {
        progressState = 100;
      } else {
        progressState = parseInt((this.step + 1) * 100 / this.amount);
      }
      this.progress = progressState;
    },
    displayResults() {
      this.showResults = true;
    },
    correctPercentage() {
      var correctTotal = this.correctTotal();
      return parseInt((correctTotal) * 100 / this.amount);
    },
    correctTotal() {
      var correct = 0;
      var vocabulary = this.vocabulary;
      this.answers.forEach(function(value, key) {
        if (value == vocabulary[key].foreignWord) {
          correct++;
        }
      });
      return correct;
    }
  }
}
</script>

<style scoped>
.correct-overview {
  width: 100%;
  height: 20px;
  background-color: #ff5252;
}
.fill {
  width: 100%;
  height: 20px;
  background-color: #76ff03;
  transition: all .5s;
}
.md-list-item {
  transition: all .5s;
  /* opacity: 0; */
}
.md-content {
  text-align: left;
}
</style>
