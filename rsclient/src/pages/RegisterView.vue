<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(useCounterStore, ['handleRegister']),
    doRegister() {
      this.handleRegister(this.name, this.email, this.password);
    }
  }
};
</script>

<template>
  <section id="register-page" class="flex justify-center items-center h-screen bg-gray-100 overflow-hidden">
    <div class="flex justify-between items-center w-full h-full">
      <div class="w-full md:w-1/2 px-8">
        <div class="mt-5">
          <h1 class="text-center text-3xl font-bold">Sign up and enjoy</h1>
          <form @submit.prevent="doRegister" class="w-full max-w-md mx-auto py-5">
            <div class="mb-4">
              <label for="register-name" class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                v-model="name"
                type="text"
                id="register-name"
                placeholder="Masukkan nama lengkap..."
                class="form-input w-full mt-1 p-2 border border-gray-300 rounded-md"
                autocomplete="off"
                required
              />
            </div>
            <div class="mb-4">
              <label for="register-email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                v-model="email"
                type="email"
                id="register-email"
                placeholder="Masukkan alamat email..."
                class="form-input w-full mt-1 p-2 border border-gray-300 rounded-md"
                autocomplete="off"
                required
              />
            </div>
            <div class="mb-6">
              <label for="register-password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                v-model="password"
                type="password"
                id="register-password"
                placeholder="Masukkan password..."
                class="form-input w-full mt-1 p-2 border border-gray-300 rounded-md"
                autocomplete="off"
                required
              />
            </div>
            <div class="flex justify-center">
              <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full">
                Daftar
              </button>
            </div>
          </form>

          <p class="text-center text-sm mt-4">
            Sudah punya akun?
            <a class="text-blue-600 hover:underline cursor-pointer" @click.prevent="$router.push('/login')">
              Login di sini
            </a>
          </p>
        </div>
      </div>

      <!-- Image Section -->
      <div class="hidden md:block w-1/2 h-full">
        <img
          src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/05/hotel-photography-lobby2.jpg"
          class="w-full h-full object-cover"
          alt="Background"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
input:-webkit-autofill {
  background-color: white !important;
  color: black !important;
}
</style>
