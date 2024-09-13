<script>
import {  mapActions} from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    created() {
        // this.openRegister()
    },
    methods:{
        ...mapActions(useCounterStore, ['handleRegister']),
        doRegister(){
          console.log(this.email, this.password, "masuk di comp login");
          this.handleRegister(this.email, this.password)
        }
    }
}
</script>

<template>
    <section id="register-page" class="flex justify-center items-center h-screen bg-bisque overflow-hidden">
      <div class="flex justify-between items-center w-full h-full">
        <!-- Sign Up Form Container -->
        <div class="w-1/2">
          <div class="mt-5">
            <h1 class="text-center text-3xl font-bold">Sign up and enjoy</h1>
            <form @submit.prevent="doRegister" id="register-form" class="w-1/2 mx-auto py-5">
              <div class="mb-3">
                <div class="flex justify-between">
                  <label for="register-email" class="block text-sm font-medium text-gray-700">Email</label>
                  <span class="text-red-500 font-bold">*</span>
                </div>
                <input v-model="email" type="email" class="form-input w-full mt-1 p-2 border border-gray-300 rounded-md"
                  id="register-email" placeholder="Enter email address..." autocomplete="off" required />
              </div>
              <div class="mb-3">
                <div class="flex justify-between">
                  <label for="register-password" class="block text-sm font-medium text-gray-700">Password</label>
                  <span class="text-red-500 font-bold">*</span>
                </div>
                <input v-model="password" type="password" class="form-input w-full mt-1 p-2 border border-gray-300 rounded-md"
                  id="register-password" placeholder="Enter your password..." autocomplete="off" required />
              </div>
              <div class="flex justify-center py-5">
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Sign Up</button>
              </div>
            </form>
            <h6 class="text-center text-sm">I Have Account
              <a class="text-blue-500" @click.prevent="this.$router.push('/login')">Login</a> Anyway
            </h6>
          </div>
        </div>
  
        <!-- Image Container -->
        <div class="w-1/2 h-screen">
          <img
            src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/05/hotel-photography-lobby2.jpg"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  </template>
  