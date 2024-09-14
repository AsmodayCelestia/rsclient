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
<tbody class="bg-white divide-y divide-gray-200">
  <tr>
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ data.firstName + ' ' + data.lastName }} </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ data.sex }}</td>
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ data.umur }}</td>
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ data.phoneNumber }}</td>
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <button v-if="$route.path === '/home'" @click.prevent="detail(data.id)" class="text-blue-500 hover:text-blue-700">View Details</button>
      <button v-if="$route.path === '/home'" @click.prevent="addBookMark(data.id)" class="text-green-500 hover:text-green-700 ml-4">Bookmark</button>
    </td>
  </tr>
</tbody>
</template>
