<template>
    <div class="max-w-3xl mx-auto py-10">
      <h2 class="text-2xl font-bold mb-6">🔧 Manage Units</h2>
  
      <!-- Form tambah / edit -->
      <form @submit.prevent="handleSubmit" class="mb-6 flex gap-4">
        <input
          v-model="unitForm.name"
          placeholder="Nama Unit"
          class="border px-4 py-2 rounded w-full"
        />
        <button class="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          {{ unitForm.id ? 'Update' : 'Tambah' }}
        </button>
      </form>
  
      <!-- Table -->
      <div class="bg-white shadow rounded overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-100 text-left">
            <tr>
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">Nama Unit</th>
              <th class="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="unit in units" :key="unit.id">
              <td class="px-4 py-2">{{ unit.id }}</td>
              <td class="px-4 py-2">{{ unit.name }}</td>
              <td class="px-4 py-2 flex gap-2">
                <button @click="editUnit(unit)" class="text-blue-500">✏️ Edit</button>
                <button @click="handleDeleteUnit(unit.id)" class="text-red-500">🗑️ Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { useCounterStore } from '@/stores/counter';
  import { mapActions, mapWritableState } from 'pinia';
  
  export default {
    computed: {
      ...mapWritableState(useCounterStore, ['units'])
    },
    data() {
      return {
        unitForm: {
          id: null,
          name: ''
        }
      };
    },
    methods: {
      ...mapActions(useCounterStore, [
        'fetchUnits',
        'createUnit',
        'updateUnit',
        'deleteUnit'
      ]),
  
      async handleSubmit() {
        try {
          if (this.unitForm.id) {
            await this.updateUnit(this.unitForm.id, this.unitForm.name);
          } else {
            await this.createUnit(this.unitForm.name);
          }
          this.resetForm();
        } catch (err) {
          console.error('Gagal submit unit:', err);
        }
      },
  
      editUnit(unit) {
        this.unitForm = { ...unit };
      },
  
      async handleDeleteUnit(id) {
        try {
          await this.deleteUnit(id);
        } catch (err) {
          console.error('Gagal hapus unit:', err);
        }
      },
  
      resetForm() {
        this.unitForm = { id: null, name: '' };
      }
    },
    created() {
      this.fetchUnits();
    }
  };
  </script>
  