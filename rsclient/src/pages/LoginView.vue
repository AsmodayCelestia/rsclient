<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      errorMsg: ""
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async doLogin() {
      try {
        const { data } = await axios.post("http://localhost:3000/login", {
          email: this.email,
          password: this.password
        });

        localStorage.setItem("Authorization", data.Authorization);
        localStorage.setItem("role", data.role);

        if (data.role === "admin") {
          this.router.push("/admin");
        } else if (data.role === "karyawan") {
          this.router.push("/home");
        } else {
          this.errorMsg = "Role tidak dikenali.";
        }
      } catch (err) {
        console.error(err);
        this.errorMsg = "Email atau password salah.";
      }
    }
  }
};
</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <div class="container">
      <h1 class="text-2xl font-bold text-center mb-6">Login Sistem Reward</h1>
      <form @submit.prevent="doLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm mb-2" for="email">Email</label>
          <input v-model="email" type="email" id="email" class="w-full p-2 border rounded" required />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm mb-2" for="password">Password</label>
          <input v-model="password" type="password" id="password" class="w-full p-2 border rounded" required />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>

      <p v-if="errorMsg" class="mt-4 text-red-600 text-sm text-center">{{ errorMsg }}</p>
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


