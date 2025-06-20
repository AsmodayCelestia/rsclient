<script>
import Carousel from '../components/Carousel.vue';
import RewardTable from '../components/RewardTable.vue';
import { mapActions, mapWritableState } from 'pinia';
import { useCounterStore } from '../stores/counter';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default {
  components: {
    Carousel,
    RewardTable
  },
  computed: {
    ...mapWritableState(useCounterStore, ['rewardDetails', 'params', 'actions', 'units', 'actionRanges', 'email']),
    enrichedRewards() {
      return this.rewardDetails; // Sudah berisi detail lengkap
    },
    filteredRewards() {
      const query = this.params.filter.search;
      if (!query) return this.enrichedRewards;
      return this.enrichedRewards.filter(reward => reward.tanggal === query);
    }
  },
  methods: {
    ...mapActions(useCounterStore, [
      'fetchMyRewardDetails',
      'fetchActions',
      'fetchUnits',
      'fetchActionRanges'
    ]),
    triggerSearch() {
      console.log('Search tanggal:', this.params.filter.search);
    },
    redirectToAddReward() {
      this.$router.push('/addReward');
    },
    exportPDF() {
      const doc = new jsPDF();

      // ===== Judul utama =====
      doc.setFontSize(16);
      doc.text('Laporan Reward Karyawan', 14, 15);

      // ===== Info tambahan =====
      const nama = this.email || localStorage.getItem('email') || 'Nama Karyawan';
      const tanggalCetak = new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      doc.setFontSize(11);
      doc.text(`Nama: ${nama}`, 14, 23);
      doc.text(`Tanggal Cetak: ${tanggalCetak}`, 14, 29);

      // ===== Data tabel =====
      const rows = this.filteredRewards.map(r => ([
        r.tanggal,
        r.unit,
        r.tindakan,
        r.jumlahPasien,
        r.pengali,
        `Rp ${r.nilaiPerTindakan.toLocaleString()}`,
        `Rp ${r.subtotal.toLocaleString()}`
      ]));

      autoTable(doc, {
        startY: 35,
        head: [[
          'Tanggal', 'Unit', 'Tindakan', 'Jumlah', 'Pengali', 'Nilai', 'Subtotal'
        ]],
        body: rows,
        theme: 'grid',
        headStyles: { fillColor: [78, 137, 177] },
        styles: { fontSize: 10 }
      });

      doc.save('reward_karyawan.pdf');
    }
  },
  created() {
    this.fetchMyRewardDetails();
    this.fetchActions();
    this.fetchUnits();
    this.fetchActionRanges();
  }
};
</script>

<template>
  <div class="w-full">
    <div class="w-full max-w-screen-xl mx-auto">
      <Carousel />
    </div>
    <div class="container mx-auto px-4 py-10">
      <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <div class="flex gap-2">
          <button @click="redirectToAddReward" class="bg-purple-700 text-white px-4 py-2 rounded-md">
            Add Reward
          </button>
          <button @click="exportPDF" class="bg-green-600 text-white px-4 py-2 rounded-md">
            Export PDF
          </button>
        </div>
        <div class="flex items-center w-full md:w-auto">
          <input
            type="date"
            v-model="params.filter.search"
            @focus="$event.target.showPicker && $event.target.showPicker()"
            class="border border-gray-300 bg-gray-50 rounded-l-md px-4 py-2 w-full sm:w-60 cursor-pointer"
          />
          <button @click="triggerSearch" class="bg-gray-700 text-white px-4 py-2 rounded-r-md">
            🔍
          </button>
        </div>
      </div>
      <RewardTable :rewards="filteredRewards" />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
