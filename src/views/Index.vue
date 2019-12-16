<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">{{ $t('vocabulary.title') }}</span>
        <md-button class="md-icon-button md-list-action" @click="add">
          <md-icon>add_circle_outline</md-icon>
        </md-button>
      </md-app-toolbar>
      <md-app-content>
        <div class="md-layout-item">
          <router-link to="/test">
            <md-button class="md-raised md-primary" :disabled="vocabulary.length < 20">
              <span v-if="vocabulary.length >= 20">{{ $t('vocabulary.startTest') }}</span>
              <span v-if="vocabulary.length < 20">{{ $t('vocabulary.disabledTestInfo') }}</span>
            </md-button>
          </router-link>
        </div>
        <md-list>
          <md-list-item>
            <div class="md-layout-item md-headline">
              {{ $t('vocabulary.word') }}
            </div>
            <div class="md-layout-item md-headline">
              {{ $t('vocabulary.foreignWord') }}
            </div>
            <div class="md-layout-item md-headline"></div>
          </md-list-item>
          <transition-group name="fade">
            <md-list-item v-bind:key="item.id" v-for="item in vocabulary">
              <div class="md-layout-item">
                <span v-if="edit !== item.id" class="md-list-item-text">{{ item.word }}</span>
                <md-field v-if="edit === item.id">
                  <md-input v-model="item.word" required></md-input>
                </md-field>
              </div>
              <div class="md-layout-item">
                <span v-if="edit !== item.id" class="md-list-item-text">{{ item.foreignWord }}</span>
                <md-field v-if="edit === item.id">
                  <md-input v-model="item.foreignWord" required></md-input>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-button class="md-icon-button md-list-action" @click="toggleEdit(item)">
                  <md-icon v-if="edit !== item.id">edit</md-icon>
                  <md-icon v-if="edit === item.id" class="md-accent">edit</md-icon>
                </md-button>
                <md-button class="md-icon-button md-list-action" @click="remove(item.id)">
                  <md-icon>clear</md-icon>
                </md-button>
              </div>
            </md-list-item>
          </transition-group>
        </md-list>
        <a href="https://github.com/westberliner/vue-vocabulary-playground">Code on github</a>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
/*eslint no-console: ["error", { allow: ["log", "error"] }] */
import uuid from 'uuid'

export default {
  name: "Index",
  methods: {
    toggleEdit(item) {
      if (this.edit !== item.id) {
        this.edit = item.id;
      } else if (this.edit === item.id) {
        this.edit = null;
      }
      this.$store.commit('vocabulary/PERSIST_VOCABULARY')
    },
    add() {
      this.$store.commit('vocabulary/ADD_VOCABULARY_ITEM', {
        id: uuid.v4(),
        word: "Neu",
        foreignWord: "new"
      });
    },
    remove(id) {
      this.$store.commit('vocabulary/REMOVE_VOCABULARY_ITEM', id);
    }
  },
  data() {
    return {
      edit: null
    }
  },
  computed: {
    vocabulary() {
      return this.$store.getters["vocabulary/vocabulary"];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-list-item {
  transition: all .5s;
  /* opacity: 0; */
}
.md-list-item.show {
  opacity: 1;
}
.md-layout-item {
  margin-right: 1em;
}
.md-content {
  text-align: left;
}

</style>
