<script>
import { mapActions, mapWritableState} from 'pinia';
import { useCounterStore } from '../stores/counter';
import CardItem from '../components/CardItem.vue'
import Carousel from '../components/Carousel.vue';

export default {
  computed: {  //ini untuk looping di homepage
    ...mapWritableState(useCounterStore, ['lodgings', 'params', 'query', 'types'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchLodgings', 'fetchTypes']),
    filter(typeId){
      console.log(typeId);
      this.params.filter.type = typeId
      this.fetchLodgings()
    }
  },
  created() {
    this.fetchLodgings()
    this.fetchTypes()
  },
  components: {
    Carousel,
    CardItem
  }
}
</script>
<template>
    <div class="mx-auto">
      <!-- <button @click="$router.push('/add')" class="btn btn-dark mb-3">Add New</button> -->
      <div class="flex justify-center h-[500px]">
        <Carousel />
        <!-- <div class="w-8/12 p-4 h-full">
          <img
            src="https://images4.alphacoders.com/134/thumb-1920-1341419.png"
            class="w-full h-full object-cover">
        </div>
        <div class="w-5/12 p-4 h-full">
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/466255549.jpg?k=b6a635b57e3d18fd213afc933491bb3027fd32a479628b36834da4014677be40&o=&hp=1"
            class="w-full h-full object-cover">
        </div> -->
        </div>
    <!-- Filter Button Below Carousel -->
<br><br>
    <div class="relative mt-12 mx-9">
      <button class="bg-blue-500 text-white px-4 py-2 rounded-md" type="button">
        Filter By Type
      </button>
    </div>

    <!-- List of Items (example placeholder) -->
    <div class="flex justify-center container mx-auto py-3">
      <div class="w-full">
        <div class="grid grid-cols-4 gap-7">
          <CardItem v-for="lodging in lodgings" :key="lodging.id" :data="lodging"/>
        </div>
      </div>
    </div>
    </div>
  </template>
  