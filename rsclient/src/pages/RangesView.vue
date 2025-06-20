<template>
    <div class="max-w-4xl mx-auto py-10">
      <h2 class="text-2xl font-bold mb-6">📊 Manage Ranges</h2>
      <form @submit.prevent="handleSubmit" class="mb-6 flex flex-col md:flex-row gap-4 flex-wrap">
        <select v-model="rangeForm.actionId" class="border px-4 py-2 rounded w-full md:w-1/4">
          <option disabled value="">Pilih Tindakan</option>
          <option v-for="action in actions" :key="action.id" :value="action.id">
            {{ action.name }}
          </option>
        </select>
        <input
          type="number"
          v-model.number="rangeForm.minValue"
          placeholder="Min Value"
          class="border px-4 py-2 rounded w-full md:w-1/6"
        />
        <input
          type="number"
          v-model.number="rangeForm.maxValue"
          placeholder="Max Value"
          class="border px-4 py-2 rounded w-full md:w-1/6"
        />
        <input
          type="number"
          v-model.number="rangeForm.pengali"
          placeholder="Pengali"
          class="border px-4 py-2 rounded w-full md:w-1/6"
        />
        <button class="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto" type="submit">
          {{ rangeForm.id ? 'Update' : 'Tambah' }}
        </button>
      </form>
      <div class="bg-white shadow rounded overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-100 text-left">
            <tr>
              <th class="px-4 py-2">Tindakan</th>
              <th class="px-4 py-2">Min</th>
              <th class="px-4 py-2">Max</th>
              <th class="px-4 py-2">Pengali</th>
              <th class="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="range in actionRanges" :key="range.id">
              <td class="px-4 py-2">{{ getActionName(range.actionId) }}</td>
              <td class="px-4 py-2">{{ range.minValue }}</td>
              <td class="px-4 py-2">{{ range.maxValue }}</td>
              <td class="px-4 py-2">{{ range.pengali }}</td>
              <td class="px-4 py-2 flex gap-2">
                <button @click="editRange(range)" class="text-blue-500">✏️</button>
                <button @click="removeRange(range.id)" class="text-red-500">🗑️</button>
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
    data() {
      return {
        rangeForm: {
          id: null,
          actionId: '',
          minValue: 0,
          maxValue: 0,
          pengali: 0
        }
      };
    },
    computed: {
      ...mapWritableState(useCounterStore, ['actions', 'actionRanges'])
    },
    methods: {
      ...mapActions(useCounterStore, [
        'fetchActions',
        'fetchActionRanges',
        'createRange',
        'updateRange',
        'deleteRange'
      ]),
      async handleSubmit() {
        if (this.rangeForm.id) {
          await this.updateRange(this.rangeForm);
        } else {
          await this.createRange(this.rangeForm);
        }
        this.resetForm();
        await this.fetchActionRanges();
      },
      editRange(range) {
        this.rangeForm = { ...range };
      },
      async removeRange(id) {
        await this.deleteRange(id);
        await this.fetchActionRanges();
      },
      getActionName(id) {
        const action = this.actions.find(a => a.id === id);
        return action ? action.name : '-';
      },
      resetForm() {
        this.rangeForm = { id: null, actionId: '', minValue: 0, maxValue: 0, pengali: 0 };
      }
    },
    created() {
      this.fetchActions();
      this.fetchActionRanges();
    }
  };
  </script>
  