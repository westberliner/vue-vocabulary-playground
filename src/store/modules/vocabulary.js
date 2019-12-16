/*eslint no-console: ["error", { allow: ["log", "error"] }] */
import uuid from 'uuid'

// TODO: get this to work.
// import VuexPersistence from 'vuex-persist'

// const vuexPersistence = new VuexPersistence({
//   key: 'vocabulary-app',
//   storage: window.localStorage
// })
// initial state
const state = {
  vocabulary: []
}

// getters
const getters = {
  vocabulary: state => state.vocabulary,
  vocabularyTestSet: state => (amount) => {
    let vocabulary = [...state.vocabulary];
    let ctr = vocabulary.length;
    let temp;
    let index;
  
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = vocabulary[ctr];
        vocabulary[ctr] = vocabulary[index];
        vocabulary[index] = temp;
    }
    return vocabulary.splice(0, amount);
  }
}

// actions
const actions = {
  setDefaultVocabularyItems ({ commit }) {
    let list = [
      {word: "Bett", fWord: "Bed"},
      {word: "Haus", fWord: "House"},
      {word: "Tür", fWord: "Door"},
      {word: "Telefon", fWord: "Phone"},
      {word: "Auto", fWord: "Car"},
      {word: "Tisch", fWord: "Table"},
      {word: "Licht", fWord: "Light"},
      {word: "Dunkel", fWord: "Dark"},
      {word: "Kerze", fWord: "Candle"},
      {word: "Kind", fWord: "Child"},
      {word: "Mutter", fWord: "Mother"},
      {word: "Vater", fWord: "Father"},
      {word: "Frucht", fWord: "Fruit"},
      {word: "Stuhl", fWord: "Chair"},
      {word: "Salz", fWord: "Salt"},
      {word: "Pfeffer", fWord: "Pepper"},
      {word: "Wasser", fWord: "Water"},
      {word: "Baum", fWord: "Tree"},
      {word: "Zucker", fWord: "Sugar"},
      {word: "Schild", fWord: "Shield"}
    ];
    for (var item of list) {
      commit('ADD_VOCABULARY_ITEM', {
        id: uuid.v4(),
        word: item.word,
        foreignWord: item.fWord
      });
      
    }
  }
}

// mutations
const mutations = {
  INITIALIZE_STORE (state) {
    if(localStorage.getItem('vocabulary')) {
      // Replace the state object with the stored item
      state.vocabulary = JSON.parse(localStorage.getItem('vocabulary'));
    } else {
      this.dispatch('vocabulary/setDefaultVocabularyItems');
    }
  },
  ADD_VOCABULARY_ITEM(state, payload) {
    state.vocabulary.unshift(payload);
    localStorage.vocabulary = JSON.stringify(state.vocabulary);
  },
  REMOVE_VOCABULARY_ITEM(state, payload) {
    state.vocabulary = state.vocabulary.filter(item => item.id !== payload);
    localStorage.vocabulary = JSON.stringify(state.vocabulary);
  },
  PERSIST_VOCABULARY(state) {
    localStorage.vocabulary = JSON.stringify(state.vocabulary);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  // plugins: [vuexPersistence.plugin]
}
