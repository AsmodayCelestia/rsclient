<template>
    <div class="max-w-4xl mx-auto py-10">
      <h2 class="text-2xl font-bold mb-6">✨ Manage Actions</h2>
  
      <!-- Form tambah/edit tindakan -->
      <form @submit.prevent="handleSubmit" class="mb-6 flex flex-col md:flex-row gap-4">
        <input
          v-model="actionForm.name"
          placeholder="Nama Tindakan"
          class="border px-4 py-2 rounded w-full"
        />
        <input
          v-model.number="actionForm.nilaiPerTindakan"
          placeholder="Nilai per Tindakan (Rp)"
          type="number"
          class="border px-4 py-2 rounded w-full"
        />
        <select v-model="actionForm.unitId" class="border px-4 py-2 rounded w-full">
          <option disabled value="">Pilih Unit</option>
          <option v-for="unit in units" :key="unit.id" :value="unit.id">
            {{ unit.name }}
          </option>
        </select>
        <button class="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          {{ actionForm.id ? 'Update' : 'Tambah' }}
        </button>
      </form>
  
      <!-- Table tindakan -->
      <div class="bg-white shadow rounded overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-100 text-left">
            <tr>
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">Nama Tindakan</th>
              <th class="px-4 py-2">Unit</th>
              <th class="px-4 py-2">Nilai</th>
              <th class="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="action in actions" :key="action.id">
              <td class="px-4 py-2">{{ action.id }}</td>
              <td class="px-4 py-2">{{ action.name }}</td>
              <td class="px-4 py-2">{{ getUnitName(action.unitId) }}</td>
              <td class="px-4 py-2">Rp {{ action.nilaiPerTindakan.toLocaleString() }}</td>
              <td class="px-4 py-2 flex gap-2">
                <button @click="editAction(action)" class="text-blue-500">✏️ Edit</button>
                <button @click="handleDelete(action.id)" class="text-red-500">🗑️ Hapus</button>
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
      ...mapWritableState(useCounterStore, ['actions', 'units'])
    },
    data() {
      return {
        actionForm: {
          id: null,
          name: '',
          unitId: '',
          nilaiPerTindakan: 0
        }
      };
    },
    methods: {
      ...mapActions(useCounterStore, [
        'fetchActions',
        'fetchUnits',
        'createAction',
        'updateAction',
        'deleteAction' // ini method dari store
      ]),
  
      async handleSubmit() {
        if (this.actionForm.id) {
          await this.updateAction(this.actionForm.id, {
            name: this.actionForm.name,
            unitId: this.actionForm.unitId,
            nilaiPerTindakan: this.actionForm.nilaiPerTindakan
          });
        } else {
          await this.createAction({
            name: this.actionForm.name,
            unitId: this.actionForm.unitId,
            nilaiPerTindakan: this.actionForm.nilaiPerTindakan
          });
        }
        this.resetForm();
      },
  
      editAction(action) {
        this.actionForm = { ...action };
      },
  
      async handleDelete(id) {
        await this.deleteAction(id);
      },
  
      resetForm() {
        this.actionForm = {
          id: null,
          name: '',
          unitId: '',
          nilaiPerTindakan: 0
        };
      },
  
      getUnitName(unitId) {
        const unit = this.units.find(u => u.id === unitId);
        return unit ? unit.name : '-';
      }
    },
    created() {
      this.fetchActions();
      this.fetchUnits();
    }
  };
  </script>
  