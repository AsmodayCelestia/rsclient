<script setup>
import { onMounted, ref, computed } from 'vue'
import { useCounterStore } from '../stores/counter'
import RewardTable from '../components/RewardTable.vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

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
        nama: log.User.name,
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

const exportPDF = () => {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text('Laporan Reward Pegawai', 14, 15)

  const tanggalCetak = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  doc.setFontSize(11)
  doc.text(`Tanggal Cetak: ${tanggalCetak}`, 14, 23)

  const rows = filteredRewards.value.map(r => ([
    r.nama,
    r.tanggal,
    r.unit,
    r.tindakan,
    r.jumlahPasien,
    r.pengali,
    `Rp ${r.nilaiPerTindakan.toLocaleString()}`,
    `Rp ${r.subtotal.toLocaleString()}`
  ]))

  autoTable(doc, {
    startY: 35,
    head: [[
      'Nama', 'Tanggal', 'Unit', 'Tindakan', 'Jumlah', 'Pengali', 'Nilai', 'Subtotal'
    ]],
    body: rows,
    theme: 'grid',
    headStyles: { fillColor: [78, 137, 177] },
    styles: { fontSize: 10 }
  })

  doc.save('laporan_reward_admin.pdf')
}

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
      <button
        @click="exportPDF"
        class="bg-green-600 text-white px-4 py-2 rounded-md w-full md:w-auto"
      >
        Export PDF
      </button>
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
