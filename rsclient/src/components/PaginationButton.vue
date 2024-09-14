<script>
import { mapActions, mapWritableState} from 'pinia';
import { useCounterStore } from '../stores/counter';
export default{
    computed: {  //ini untuk looping di homepage
        ...mapWritableState(useCounterStore, ['params', 'query'])
    },
    methods: {
        ...mapActions(useCounterStore, ['fetchLodgings']),
        nextPage(){
            this.params.page.number++
            this.fetchLodgings()
        },
        beforePage(){
            this.params.page.number--
            this.fetchLodgings()
        },
        getPage(n){
            this.params.page.number = n
            this.fetchLodgings()
        }
    },
}
</script>


<template>
    <nav class="flex justify-center" aria-label="Page navigation example">
      <ul class="inline-flex space-x-2">
        <li v-if="params.page.number !== 1" @click.prevent="beforePage" class="page-item">
          <a class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer">Previous</a>
        </li>
        <li @click.prevent="getPage(1)" class="page-item">
          <a class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer">1</a>
        </li>
        <li @click.prevent="getPage(2)" class="page-item">
          <a class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer">2</a>
        </li>
        <li @click.prevent="getPage(3)" class="page-item">
          <a class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer">3</a>
        </li>
        <li v-if="params.page.number !== 3" @click.prevent="nextPage" class="page-item">
          <a class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer">Next</a>
        </li>
      </ul>
    </nav>
    <br><br> <br><br> <br><br>
  </template>
  