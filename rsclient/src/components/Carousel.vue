<!-- Carousel.vue -->
<template>
    <div class="relative w-full h-[500px]">
      <div class="carousel w-full">
        <div id="item1" class="carousel-item">
          <img
            src="https://www.rspondokindah.co.id/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Frspi-assets-production%2Frspi-api%2Fuploads%2FMTcyNTYxMDAyMTUzOA%3D%3D.jpg&w=3840&q=75"
            class="w-full h-full object-cover"
          />
        </div>
        <div id="item2" class="carousel-item">
          <img
            src="https://www.rspondokindah.co.id/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Frspi-assets-production%2Frspi-api%2Fuploads%2FMTcwNDM0ODQ0NzEzOQ%3D%3D.jpg&w=3840&q=75"
            alt="Image 2"
            class="w-full h-full object-cover"
          />
        </div>
        <div id="item3" class="carousel-item">
          <img
            src="https://www.rspondokindah.co.id/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Frspi-assets-production%2Frspi-api%2Fuploads%2FMTcxNzA0MjA3MTgwMA%3D%3D.jpg&w=3840&q=75"
            class="w-full h-full object-cover"
          />
        </div>
        <!-- Add more items as needed -->
      </div>
      <!-- Add navigation controls -->
      <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-4">
        <a href="#item1" class="btn btn-xs btn-circle bg-blue-500 text-transparent hover:bg-blue-500">1</a>
        <a href="#item2" class="btn btn-xs btn-circle bg-blue-500 text-transparent hover:bg-blue-500">2</a>
        <a href="#item3" class="btn btn-xs btn-circle bg-blue-500 text-transparent hover:bg-blue-500">3</a>
        <a href="#item4" class="btn btn-xs btn-circle bg-blue-500 text-transparent hover:bg-blue-500">4</a>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const currentIndex = ref(0);
  const carouselItems = ref([]);
  
  function prevSlide() {
    currentIndex.value = (currentIndex.value - 1 + carouselItems.value.length) % carouselItems.value.length;
    updateCarousel();
  }
  
  function nextSlide() {
    currentIndex.value = (currentIndex.value + 1) % carouselItems.value.length;
    updateCarousel();
  }
  
  function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      carousel.scrollTo({
        left: carouselItems.value[currentIndex.value].offsetLeft,
        behavior: 'smooth'
      });
    }
  }
  </script>

<style scoped>
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
.carousel-item {
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 100%;
}
.carousel img {
  display: block;
  width: 100%;
  height: auto;
}
</style>