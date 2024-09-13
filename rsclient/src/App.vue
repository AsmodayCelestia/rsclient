<script>
import NavBar from './components/NavBar.vue'
import './style.css'
import './index.css'
import PaginationButton from './components/PaginationButton.vue';
  export default{
    components: {
      NavBar,
      PaginationButton
    }
  }
</script>

<template>
  <NavBar />
  <router-view>
  </router-view>
  <PaginationButton v-if="$route.path === '/home'" />
</template>

