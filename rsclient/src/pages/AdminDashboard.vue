<template>
    <div class="max-w-6xl mx-auto px-6 py-10">
      <h1 class="text-3xl font-bold mb-6">Dashboard Admin</h1>
      <div class="bg-white p-6 rounded shadow mb-10">
        <h2 class="text-xl font-semibold mb-4">Grafik Total Reward per Tindakan (30 Hari Terakhir)</h2>
  
        <input
          v-model="searchName"
          placeholder="Filter nama karyawan (opsional)"
          class="mb-4 p-2 border rounded w-full md:w-1/2"
        />
  
        <div class="relative h-[400px]">
          <Bar
            v-if="filteredChartData.labels.length"
            :data="filteredChartData"
            :options="chartOptions"
          />
          <p v-else class="text-gray-500">Tidak ada data yang bisa ditampilkan.</p>
        </div>
  
        <p class="mt-4 text-gray-700">
          Total Semua Reward (30 hari): 
          <strong>Rp {{ totalRewardFormatted }}</strong>
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div @click="$router.push('/admin/units')" class="bg-blue-100 p-6 rounded cursor-pointer hover:bg-blue-200">
          <h3 class="text-lg font-semibold">🔧 Manage Units</h3>
          <p class="text-sm">Tambah, edit, atau hapus unit kerja</p>
        </div>
        <div @click="$router.push('/admin/actions')" class="bg-green-100 p-6 rounded cursor-pointer hover:bg-green-200">
          <h3 class="text-lg font-semibold">💉 Manage Actions</h3>
          <p class="text-sm">Kelola tindakan medis</p>
        </div>
        <div @click="$router.push('/admin/ranges')" class="bg-yellow-100 p-6 rounded cursor-pointer hover:bg-yellow-200">
          <h3 class="text-lg font-semibold">📊 Manage Ranges</h3>
          <p class="text-sm">Atur pengali reward berdasarkan jumlah pasien</p>
        </div>
        <div @click="$router.push('/admin/rewards')" class="bg-purple-100 p-6 rounded cursor-pointer hover:bg-purple-200">
          <h3 class="text-lg font-semibold">👥 Semua Capaian Reward</h3>
          <p class="text-sm">Lihat seluruh reward karyawan</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { Bar } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  export default {
    name: 'AdminDashboard',
    components: { Bar },
    data() {
      return {
        rewards: [],
        searchName: '',
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: value => 'Rp ' + value.toLocaleString()
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      };
    },
    computed: {
      filteredChartData() {
        const grouped = {};
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
  
        this.rewards.forEach(item => {
          const rewardDate = new Date(item.tanggal);
          if (rewardDate < thirtyDaysAgo) return;
  
          if (this.searchName && !item.User?.name?.toLowerCase().includes(this.searchName.toLowerCase())) return;
  
          const actionName = item.Action?.name || '(Unknown)';
          if (!grouped[actionName]) grouped[actionName] = 0;
          grouped[actionName] += Number(item.totalReward || 0);
        });
  
        const sorted = Object.entries(grouped).sort((a, b) => b[1] - a[1]);
  
        return {
          labels: sorted.map(([label]) => label),
          datasets: [
            {
              label: 'Total Reward (Rp)',
              backgroundColor: '#4e89b1',
              data: sorted.map(([_, value]) => value)
            }
          ]
        };
      },
      totalRewardFormatted() {
        const total = Object.values(this.filteredChartData.datasets?.[0]?.data || []).reduce((a, b) => a + b, 0);
        return total.toLocaleString();
      }
    },
    async mounted() {
      try {
        const { data } = await axios.get('http://localhost:3000/all-rewards', {
          headers: { Authorization: localStorage.getItem('Authorization') }
        });
  
        this.rewards = data.map(item => ({
          ...item,
          Action: item.Action || {},
          User: item.User || {}
        }));
      } catch (err) {
        console.error('[ERROR] Gagal ambil /all-rewards:', err);
      }
    }
  };
  </script>
  
  <style scoped>
  canvas {
    max-height: 400px;
  }
  </style>
  