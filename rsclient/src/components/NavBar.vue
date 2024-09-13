<script>
import { mapState, mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
export default{
  computed:{
    ...mapState(useCounterStore, ['email'])
  },
  methods: {
      ...mapActions(useCounterStore, ['logout', 'Bookmark', 'home', 'fetchLodgings']),
    },
} 
</script>

<template>
  <nav class="bg-blue-400 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <a @click.prevent="$router.push('/home')" class="text-4xl font-bold text-white cursor-pointer">
        MEDKIT
      </a>
      <div class="flex items-center space-x-6">
        <div v-if="$route.path !== '/login'">Hello, {{ email }}</div>

            <div  v-if="$route.path !== '/home' && $route.path !== '/'" id="home">
              <a @click.prevent="home()">Home</a>
            </div>
            <div  v-if="$route.path !== '/login'" id="Bookmark">
              <a @click.prevent="Bookmark()">Bookmark</a>
            </div>
            <div v-if="$route.path !== '/login'" id="logout">
              <a @click.prevent="logout()">Logout</a>
            </div>
            <!-- <button id="logout-button" class="btn btn-outline-danger mx-3">Logout</button> -->
          </div>
        </div>
      </nav>
</template>