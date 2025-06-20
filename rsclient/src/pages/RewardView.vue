<script setup>
import { onMounted, ref, computed } from 'vue'
import { useCounterStore } from '../stores/counter'
import RewardTable from '../components/RewardTable.vue'

const store = useCounterStore()
const searchName = ref('')
const searchDate = ref('')

const showDatePicker = (e) => {
  e.target.showPicker && e.target.showPicker()
}

const filteredRewards = computed(() => {
  return store.allRewards
    .filter(log => {
      const matchName = log.User.name.toLowerCase().includes(searchName.value.toLowerCase())
      const matchDate = log.tanggal.includes(searchDate.value)
      return matchName && matchDate
    })
    .map(log => {
      return {
        tanggal: log.tanggal,
        unit: log.Action.unit,
        tindakan: log.Action.name,
        jumlahPasien: log.jumlahPasien,
        pengali: log.pengali,
        nilaiPerTindakan: log.Action.nilaiPerTindakan,
        subtotal: log.totalReward
      }
    })
})

onMounted(() => {
  store.fetchAllRewards()
  store.fetchActions()
  store.fetchUnits()
  store.fetchActionRanges()
})
</script>

<template>
  <section class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-4">Laporan Reward Pegawai</h2>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Cari nama pegawai"
        v-model="searchName"
        class="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/3"
      />
      <input
        type="date"
        v-model="searchDate"
        @focus="showDatePicker"
        class="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/3 bg-white cursor-pointer"
      />
    </div>

    <RewardTable :rewards="filteredRewards" />
  </section>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
input[type="date"] {
  appearance: auto;
  -webkit-appearance: auto;
}
</style>
