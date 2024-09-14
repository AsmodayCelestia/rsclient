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
    },
    redirectToAddPatient() {
      this.$router.push('/addPatient');
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
<br><br><br>
    <div class="relative mt-8 flex justify-between items-center ml-20">
      <!-- Left Button -->
      <button @click="redirectToAddPatient" class="bg-purple-700 text-white px-4 py-2 rounded-md" type="button">
        Add New Item
      </button>

      <!-- Right Buttons Group -->
      <div class="flex gap-2 mr-20">
        <!-- Filter Button -->
        <button class="bg-blue-500 text-white px-4 py-2 rounded-md" type="button">
          Filter By Type
        </button>

        <!-- Search Button -->
        <!-- Search Field -->
        <input
          type="text"
          placeholder="Search..."
          class="border border-gray-300 bg-gray-50 rounded-md px-4 py-2"
        />
      </div>
    </div>


    <!-- List of Items (example placeholder) -->
    <div class="flex justify-center container mx-auto py-3">
      <div class="w-full">
        <div>
            <div class="w-full">
                <table class="w-full min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kelamin</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Umur</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <CardItem v-for="lodging in lodgings" :key="lodging.id" :data="lodging"/>
                </table>
            </div>
        </div>
      </div>
    </div>
</div>
  </template>
  