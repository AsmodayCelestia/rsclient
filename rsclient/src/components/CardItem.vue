<script>
import { mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';


export default {
  props: ['data'],
  methods: {
    ...mapActions(useCounterStore, ['fetchDetail', 'addBookmark', 'deletePatient']),
    detail(id) {
      console.log(id, '<<<<< ini di cardItem');
      this.dataId = id;
      this.fetchDetail(id);
    },
    deleteList(id) {
      this.deletePatient(id).then(() => {
      this.$emit('item-deleted');  // Emit event when delete is successful
    });
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
        <div class="flex gap-4"> <!-- Add flex here -->
          <font-awesome-icon :icon="['fas', 'eye']" v-if="$route.path === '/home'" @click.prevent="detail(data.id)" />
          <font-awesome-icon :icon="['fas', 'trash']" v-if="$route.path === '/home'" @click.prevent="deleteList(data.id)"/>
        </div>
      </td>
  </tr>
</tbody>
</template>
