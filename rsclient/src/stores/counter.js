// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// const SERVER_URL = "https://lodgings.asmodaycelestia.online"
const SERVER_URL = "http://localhost:3000"

export const useCounterStore = defineStore('counter', {
  state: () => ({ 
    qr: '',
    lodgingDetail: '',
    query: '',
    filter: '',
    email: '',
    pagination: 1,
    bookmarks: [],
    lodgings: [],
    types: [],
    params: {
      page: {
        size: 8, 
        number: 1 
      },
      filter: {
        // type: 5, 
      }
    }
   }),
  getters: {},
  actions: {
    async handleLogin(email, password){
      console.log(email, password);
      try {
        const {data} = await axios({
          method: "post",
          url: `${SERVER_URL}/login`,
          data: {email, password}
        })
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('role', data.role)
        // this.params = {}
        this.router.push("/home")
        this.email = email
        // console.log(this.email, '<<<<email nih');
        console.log('Masyukk abangkuuuuh');
      } catch (error) {
        console.log(error);
      }
    },
    async fetchLodgings() {
      try {
        const { data } = await axios({
          url: `${SERVER_URL}/pub/lodgings`,
          method: `GET`,
          params: this.params
        })
        console.log(data.data);
        this.lodgings = data.data
      } catch (error) {
        console.log(error);
      }
    },
    async fetchTypes() {
      try {
        const { data } = await axios({
          url: `${SERVER_URL}/pub/types`,
          method: `GET`
        })
        console.log(data);
        this.types = data
      } catch (error) {
        console.log(error);
      }
    },
    async logout(){
      // console.log("kok bisa");
      try {
        localStorage.removeItem('access_token')
        localStorage.removeItem('role')
        this.router.push("/login")
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDetail(id){
      try {
        console.log(id, "ini id di fetchDetail");
        const { data } = await axios({
          url: `${SERVER_URL}/pub/lodgings/`+`${id}`,
          method: `GET`
        })
        const response = await axios({
          method: `POST`,
          url: `${SERVER_URL}pub/QrCode`,
          data: {dinamis: `https://phase2-c3-46fbd.web.app/detail/${id}`}
          // data: {dinamis: `http://localhost:3000/detail/` + `${id}`}
      })
      console.log(response.data);
      this.qr = response.data
        // console.log(data1.data, 'ini data1');
      // this.Qr = data
      console.log(data);
        console.log(data ,'<<<<<<ini di fetchDetail');
        data.createdAt = new Date(data.createdAt).toLocaleDateString(["ban", "id"], {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })
          const rupiah = (number)=>{
            return new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR"
            }).format(number);
          }
          data.price = rupiah(data.price) // "Rp 20.000,00"
        this.lodgingDetail = data
        console.log(data, '<<<harusnya createdAt keubah');
        this.router.push("/detail/"+`${id}`)
      } catch (error) {
        console.log(error);
      }
    },
    async addBookmark(id){
      try {
        if (localStorage.access_token) {
          const { data } = await axios({
            url: `${SERVER_URL}/pub/bookmark/`+id,
            method: `POST`,
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
          console.log(data, '<<<< ini di add bookmark');
        }
      } catch (error) {
        console.log(error);
      }
    },
    async Bookmark(){
      try {
        if(localStorage.access_token){
          this.router.push("/bookmark")
        }
      } catch (error) {
        console.log(error);
      }
    },
    async home(){
      try {
        this.router.push("/home")
      } catch (error) {
        console.log(error);
      }
    },
    async handleRegister(email, password){
      console.log(email, password);
      const { data } = await axios({
          url: `${SERVER_URL}/pub/register`,
          method: `POST`,
          data: {email, password}
      })
      console.log(data, '<<<<handleRegister');  
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('role', data.role)
      // this.params = {}
      this.router.push("/home")
      console.log('Masyukk abangkuuuuh');
    }
  }
})
