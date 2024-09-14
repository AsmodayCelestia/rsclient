<script>
    import { mapActions } from 'pinia';
    import { useCounterStore } from '../stores/counter';
    export default {
      data(){
        return {
                email: '',
                password: ''
              }
      },
      methods: {
        ...mapActions(useCounterStore, ['handleLogin']),
        async doLogin(){
          console.log(this.email, this.password, "masuk di comp login");
          this.handleLogin(this.email, this.password)
        }
      }
    }
</script>

<template>
    <section id="login-page" class="flex justify-center items-center h-screen bg-bisque overflow-hidden">
      <div class="flex justify-between items-center w-full h-full">
        <!-- Login Form Container -->
        <div class="w-1/2">
          <div>
            <h1 class="text-center text-3xl font-bold">Welcome To My Hotel List</h1>
            <form @submit.prevent="doLogin" id="form-login" class="w-1/2 mx-auto py-3">
              <div class="mb-3">
                <label for="login-email" class="block text-sm font-medium text-gray-700">Email address</label>
                <input v-model="email" type="email" 
                       class="form-input w-full mt-1 p-2 border border-gray-300 rounded-md bg-white" 
                       id="login-email" aria-describedby="emailHelp" />
              </div>
              <div class="mb-3">
                <label for="login-password" class="block text-sm font-medium text-gray-700">Password</label>
                <input v-model="password" type="password" 
                       class="form-input w-full mt-1 p-2 border border-gray-300 rounded-md bg-white" 
                       id="login-password" />
              </div>
              <div class="flex justify-center py-5">
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
              </div>
            </form>
            <h6 class="text-center text-sm">Register 
              <a class="text-blue-500" @click.prevent="this.$router.push('/register')">Here</a> to Become Admin
            </h6>
          </div>
        </div>
  
        <!-- Image Container -->
        <div class="w-1/2 h-screen">
          <img
            src="https://i.pinimg.com/1200x/be/5f/2d/be5f2dc0f91c72007afed0be22fca50b.jpg"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  </template>
  
  <style scoped>
  /* Apply specific background color to override autofill */
  input:-webkit-autofill {
    background-color: white !important;
    color: black !important;
  }
  </style>