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
    <nav  class="d-flex justify-content-center" aria-label="Page navigation example">
        <ul class="pagination">
            <li v-if="params.page.number !== 1" @click.prevent="beforePage" class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li @click.prevent="getPage(1)" class="page-item"><a class="page-link" href="#">1</a></li>
            <li @click.prevent="getPage(2)" class="page-item"><a class="page-link" href="#">2</a></li>
            <li @click.prevent="getPage(3)" class="page-item"><a class="page-link" href="#">3</a></li>
            <li v-if="params.page.number !== 3" @click.prevent="nextPage" class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
    </nav>
    <br><br>    <br><br>     <br><br>
</template>