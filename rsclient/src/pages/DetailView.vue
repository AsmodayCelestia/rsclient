<script>
import { mapState, mapActions} from 'pinia';
import { useCounterStore } from '../stores/counter';
export default{
    computed: {  //ini untuk looping di homepage
          ...mapState(useCounterStore, ['lodgingDetail', 'qr'])
    },
    methods: {
    ...mapActions(useCounterStore, ['fetchDetail', 'QrCodeGenerator']),
    },
    created(){
        console.log(this.$route);
        this.fetchDetail(this.$route.params.id)
    }
}
</script>

<template>
<div class="container py-5">
  <div class="row">
    <div class="col-md-9">
      <div class="card">
        <img :src="lodgingDetail.imgUrl" class="card-img-top" style="height: 600px;" alt="Product Image">
        <div class="card-body">
          <h5 class="card-title">{{ lodgingDetail.name }}</h5>
          <p class="card-text">Facility: {{ lodgingDetail.facility }}</p>
          <p class="card-text">Room Capacity: {{ lodgingDetail.roomCapacity }}</p>
          <p class="card-text">Location: {{ lodgingDetail.location }}</p>
          <p class="card-text">Price: {{ lodgingDetail.price }}</p>
          <p class="card-text">Type: {{ lodgingDetail.Type.name }}</p>
          <p class="card-text">Status: {{ lodgingDetail.status }}</p>
        </div>
        <div class="card-footer">
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Author: {{ lodgingDetail.User.username }}</h5>
            <p class="card-text">Email: {{ lodgingDetail.User.email }}</p>
            <p class="card-text">Phone Number: {{ lodgingDetail.User.phoneNumber }}</p>
            <p class="card-text">Address: {{ lodgingDetail.User.address }}</p>
            <p class="card-text">Created At: {{ lodgingDetail.createdAt }}</p>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div v-html="qr">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>