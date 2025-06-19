<template>
  <div class="w-full max-w-screen-xl mx-auto relative overflow-hidden">
    <!-- Carousel Wrapper -->
    <div class="carousel relative w-full h-[250px] md:h-[400px] lg:h-[500px]">
      <div class="carousel-track flex transition-all duration-500 ease-in-out">
        <div
          v-for="(img, index) in images"
          :key="index"
          class="carousel-item flex-shrink-0 w-full h-full"
        >
          <img :src="img" class="w-full h-full object-cover rounded-md" />
        </div>
      </div>

      <!-- Navigation -->
      <div
        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
      >
        <button
          v-for="(img, index) in images"
          :key="index"
          @click="goToSlide(index)"
          class="w-3 h-3 rounded-full bg-white border border-blue-500 hover:bg-blue-500"
          :class="currentIndex === index ? 'bg-blue-500' : 'bg-white'"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const images = [
  'https://www.rspondokindah.co.id/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Frspi-assets-production%2Frspi-api%2Fuploads%2FMTcyNTYxMDAyMTUzOA%3D%3D.jpg&w=3840&q=75',
  'https://www.rspondokindah.co.id/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Frspi-assets-production%2Frspi-api%2Fuploads%2FMTcwNDM0ODQ0NzEzOQ%3D%3D.jpg&w=3840&q=75',
  'https://www.rspondokindah.co.id/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Frspi-assets-production%2Frspi-api%2Fuploads%2FMTcxNzA0MjA3MTgwMA%3D%3D.jpg&w=3840&q=75'
];

const currentIndex = ref(0);
const track = ref(null);

function goToSlide(index) {
  currentIndex.value = index;
  const container = track.value;
  if (container) {
    const offset = container.offsetWidth * index;
    container.scrollTo({ left: offset, behavior: 'smooth' });
  }
}

onMounted(() => {
  track.value = document.querySelector('.carousel-track');
});
</script>

<style scoped>
.carousel-track {
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}
.carousel-item {
  scroll-snap-align: start;
}
</style>
