<script setup>
import { useCounterStore } from '../stores/counter';
const props = defineProps({
  rewards: Array
});
const store = useCounterStore();
</script>

<template>
  <div class="overflow-x-auto bg-white rounded shadow">
    <table class="min-w-full table-auto">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">Tanggal</th>
          <th class="px-4 py-2 text-left">Unit</th>
          <th class="px-4 py-2 text-left">Tindakan</th>
          <th class="px-4 py-2 text-left">Jumlah</th>
          <th class="px-4 py-2 text-left">Pengali</th>
          <th class="px-4 py-2 text-left">Nilai</th>
          <th class="px-4 py-2 text-left">Sub Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in rewards" :key="index">
          <td class="px-4 py-2">{{ item.tanggal }}</td>
          <td class="px-4 py-2">{{ item.unit }}</td>
          <td class="px-4 py-2">{{ item.tindakan }}</td>
          <td class="px-4 py-2">{{ item.jumlahPasien }}</td>
          <td class="px-4 py-2">{{ item.pengali }}</td>
          <td class="px-4 py-2">Rp {{ item.nilaiPerTindakan.toLocaleString() }}</td>
          <td class="px-4 py-2">Rp {{ item.subtotal.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
