<script>
import { useCounterStore } from '../stores/counter'

export default {
  data() {
    return {
      tanggal: new Date().toISOString().split('T')[0],
      rewards: [{ tindakan: '', jumlahPasien: '' }],
      rewardOptions: [],
      actionMap: {} // name → id
    }
  },
  async mounted() {
    const store = useCounterStore()
    await store.fetchActions()

    // ambil semua tindakan dan simpan di dropdown
    this.rewardOptions = store.actions.map(a => a.name)

    // bikin map nama → id
    this.actionMap = Object.fromEntries(store.actions.map(a => [a.name, a.id]))
  },
  methods: {
    async handleSubmit() {
      try {
        for (const reward of this.rewards) {
          const actionId = this.actionMap[reward.tindakan]
          if (!actionId) throw new Error('Tindakan tidak ditemukan')

          await fetch('http://localhost:3000/rewards', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('Authorization')
            },
            body: JSON.stringify({
              actionId,
              jumlahPasien: reward.jumlahPasien,
              tanggal: this.tanggal
            })
          })
        }
        this.$router.push('/home')
      } catch (error) {
        console.error('Gagal input reward:', error)
      }
    },
    addRow() {
      this.rewards.push({ tindakan: '', jumlahPasien: '' })
    },
    removeRow(index) {
      if (this.rewards.length > 1) this.rewards.splice(index, 1)
    },
    showDatePicker(e) {
      e.target.showPicker && e.target.showPicker()
    }
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-10">
    <h1 class="text-2xl font-semibold mb-6">Input Reward</h1>
    <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded shadow-md max-w-3xl space-y-4">
      
      <!-- Tanggal -->
      <div>
        <label class="block font-medium mb-1">Tanggal</label>
        <input
          type="date"
          v-model="tanggal"
          required
          @focus="showDatePicker"
          :max="new Date().toISOString().split('T')[0]"
          class="w-full border px-4 py-2 rounded bg-white cursor-pointer"
        />
      </div>

      <!-- Dynamic Row -->
      <div v-for="(row, index) in rewards" :key="index" class="border p-4 rounded bg-gray-50 relative">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <!-- Dropdown -->
          <div>
            <label class="block font-medium mb-1">Tindakan</label>
            <select v-model="row.tindakan" required class="w-full border px-4 py-2 rounded">
              <option disabled value="">-- Pilih Tindakan --</option>
              <option v-for="option in rewardOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>

          <!-- Jumlah pasien -->
          <div>
            <label class="block font-medium mb-1">Jumlah Pasien</label>
            <input
              type="number"
              v-model="row.jumlahPasien"
              required
              class="w-full border px-4 py-2 rounded"
            />
          </div>
        </div>

        <!-- Hapus -->
        <button
          v-if="rewards.length > 1"
          type="button"
          @click="removeRow(index)"
          class="absolute top-2 right-2 text-red-600 hover:underline text-sm"
        >
          Hapus
        </button>
      </div>

      <!-- Tambah -->
      <div class="flex justify-between items-center">
        <button type="button" @click="addRow" class="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400">
          + Tambah Tindakan
        </button>
      </div>

      <!-- Submit -->
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Submit Semua
      </button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
}
input[type="date"] {
  appearance: auto;
  -webkit-appearance: auto;
}
</style>
