<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  props: ['data'],
  methods: {
    ...mapActions(useCounterStore, ['fetchDetail', 'addBookmark']),
    detail(id) {
      console.log(id, '<<<<< ini di cardItem');
      this.dataId = id;
      this.fetchDetail(id);
    },
    addBookMark(id) {
      console.log(id, "<<<<<ini di BookMark");
      this.addBookmark(id);
    }
  },
}
</script>
<template>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Capacity</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <img :src="data.imgUrl" class="w-32 h-32 object-cover" alt="Product Image">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ data.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ data.facility }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ data.roomCapacity }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ data.price }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ data.location }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ data.status }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button v-if="$route.path === '/home'" @click.prevent="detail(data.id)" class="text-blue-500 hover:text-blue-700">View Details</button>
              <button v-if="$route.path === '/home'" @click.prevent="addBookMark(data.id)" class="text-green-500 hover:text-green-700 ml-4">Bookmark</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  