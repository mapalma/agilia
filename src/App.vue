<template>
  <div id="app">
    <h1>Users</h1>
    <h2>Create New User</h2>
     <form v-on:submit.prevent="createUser()">
        <label for="newUserName">Name</label>
        <input id="newUserName" v-model="newUser.name">
        <button>Create New user</button>
      </form>
    <h2>Users</h2>
    <ul v-for="user in users" :key="user.id">
      <li>Name {{user.first_name}}, {{user.job}} 
        <button v-on:click.prevent="deleteUser(user.id)">Delete</button>
        <button v-on:click.prevent="loadUserToEdit(user.id)">Edit</button>
        </li>
    </ul>
    <h2>Edit User</h2>
    <form v-on:submit.prevent="editUser()">
      <label for="editUserName">Name</label>
      <input id="editUserName" v-model="user.name">
      <button>Edit User</button>
    </form>
    
  </div>
 
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return {
      newUser: {
        name: ''
      },
      user: {
        name: '',
        id: null
      }
    }
  },
  created(){
    this.$store.dispatch('loadUsers');
  },
  computed:{
    users() {
      return this.$store.getters.getUsers
    }
  },
  methods:{
    loadUserToEdit(id){
      this.editMode = true;
      axios.get("https://reqres.in/api/users/" + id)
      .then((result) => {
        console.log('user to edit', result);
        this.user.name = result.data.data.first_name;
        this.user.id = result.data.data.id;
      })
    },
    createUser(){
      this.$store.dispatch('createUser', this.newUser)
      this.newUser.user = '';
    },
    editUser(){
      this.$store.dispatch('editUser', this.user)
    },
    deleteUser(id){
      this.$store.dispatch('deleteUser', id)
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
