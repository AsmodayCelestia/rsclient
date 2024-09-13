<script>
// import { mapWritableState, mapActions} from 'pinia';
// import { useCounterStore } from '../stores/counter';
import CardItem from '../components/CardItem.vue';
import axios from 'axios';
const SERVER_URL = "https://lodgings.asmodaycelestia.online"
// const SERVER_URL = "http://localhost:3000"
export default {
    data() {
        return {
            bookmarks:[]
        }
    },
    components:{
        CardItem
    },
    created() {
        this.getBookmark()
    },
    methods:{
        async getBookmark(){
            const { data } = await axios({
          url: `${SERVER_URL}/pub/bookmark/`,
          method: `GET`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        console.log(data,'<<<<')
        // console.log(this.$route.path);
        this.bookmarks = data.map((element) => {
          const rupiah = (number)=>{
            return new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR"
            }).format(number);
          }
          element.Lodging.price = rupiah(element.Lodging.price) // "Rp 20.000,00"
          console.log(element);
          return element.Lodging
        })
        console.log(this.bookmarks, "<<<<harusny price keubah");
        // this.bookmarks = data.map(el=>{
        //     return el.Lodging
        // })
        }
    }
}
</script>

<template>
    <div class="container my-5">
      <!-- <button @click="$router.push('/add')" class="btn btn-dark mb-3">Add New</button> -->
      <div class="d-flex justify-content-md-center" style="height: 500px">
        <div class="col-8 container" style="height: 500px; padding: 15px;">
          <img
            src="https://i0.wp.com/www.thesuitelife.com.hk/wp-content/uploads/2015/08/Trisara-Phuket-Thailand-Sunset-Infinity-Pool-1024x768.jpg?resize=660%2C495&ssl=1"
            class="w-100 h-100">
        </div>
        <div class="col-5" style="height: 500px; padding: 15px;">
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/466255549.jpg?k=b6a635b57e3d18fd213afc933491bb3027fd32a479628b36834da4014677be40&o=&hp=1"
            class="w-100 h-100">
        </div>
      </div>
      <div class="d-flex justify-content-md-center container row py-3">
        <div class="col">
          <div class="row row-cols-4 g-7">
            <CardItem v-for="bookmark in bookmarks" :key="bookmark.id" :data="bookmark"/>
          </div>
        </div>
      </div>
    </div>

</template>