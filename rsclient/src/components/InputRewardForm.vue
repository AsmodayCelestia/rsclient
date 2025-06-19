<script setup>
import { ref } from 'vue';
import axios from 'axios';

const emit = defineEmits(['submitted']);
const actionId = ref('');
const jumlahPasien = ref(0);
const tanggal = ref('');

const actions = ref([]);
const token = localStorage.getItem('Authorization');

async function fetchActions() {
  const { data } = await axios.get('http://localhost:3000/actions', {
    headers: { Authorization: token }
  });
  actions.value = data;
}

async function submit() {
  await axios.post('http://localhost:3000/rewards', {
    actionId: Number(actionId.value),
    jumlahPasien: Number(jumlahPasien.value),
    tanggal
  }, {
    headers: { Authorization: token }
  });
  emit('submitted');
  actionId.value = '';
  jumlahPasien.value = 0;
  tanggal.value = '';
}

fetchActions();
</script>

<template>
  <form @submit.prevent="submit" class="bg-white p-6 rounded shadow mb-6">
    <h2 class="text-xl font-bold mb-4">Input Tindakan</h2>

    <div class="mb-4">
      <label class="block font-medium">Tindakan</label>
      <select v-model="actionId" required class="w-full border px-4 py-2 rounded">
        <option disabled value="">-- Pilih Tindakan --</option>
        <option v-for="action in actions" :key="action.id" :value="action.id">
          {{ action.name }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block font-medium">Jumlah Pasien</label>
      <input type="number" v-model="jumlahPasien" required class="w-full border px-4 py-2 rounded"/>
    </div>

    <div class="mb-4">
      <label class="block font-medium">Tanggal</label>
      <input type="date" v-model="tanggal" required class="w-full border px-4 py-2 rounded"/>
    </div>

    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
      Submit
    </button>
  </form>
</template>
