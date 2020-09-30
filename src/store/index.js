import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users:[]
  },
  getters:{
    getUsers:(state)=>{
      return state.users;
    }
  },
  mutations: {
    loadUsers(state, users){
      state.users = users
    }

  },
  actions: {
    loadUsers({commit}){
      axios.get("https://reqres.in/api/users?page=2")
      .then((result) => {
        commit('loadUsers', result.data.data)
      })
    },
    createUser(context, user){
      axios.post("https://reqres.in/api/users", {"name":user.name})
      .then((result) => {
        console.log('created');
        console.log(result);
      })
    },
    editUser(context, user) {
      axios.put("https://reqres.in/api/users/" + user.id, {"name":user.name})
      .then((result) => {
        console.log('edited');
        console.log(result);
      })
    },
    deleteUser(context, id){
      axios.get("https://reqres.in/api/users/" + id)
      .then((result) => {
        console.log('user deleted');
        console.log(result.data.data);
      })
    }
  },
  modules: {
  }
})
