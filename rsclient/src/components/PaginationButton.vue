<script>
export default {
  props: {
    filteredLength: {
      type: Number,
      required: true
    }
  },
  computed: {
    currentPage() {
      return this.params.page.number
    },
    totalPages() {
      return Math.ceil(this.filteredLength / this.params.page.size)
    }
  },
  methods: {
    gotoPage(n) {
      if (n >= 1 && n <= this.totalPages) {
        this.params.page.number = n
      }
    },
    nextPage() {
      this.gotoPage(this.currentPage + 1)
    },
    prevPage() {
      this.gotoPage(this.currentPage - 1)
    }
  },
  inject: ['params']
}
</script>

<template>
  <nav class="flex justify-center mt-8" aria-label="Page navigation">
    <ul class="inline-flex space-x-2">
      <li v-if="currentPage > 1">
        <button
          @click.prevent="prevPage"
          class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Previous
        </button>
      </li>

      <li
        v-for="n in totalPages"
        :key="n"
        @click.prevent="gotoPage(n)"
      >
        <button
          :class="[
            'px-3 py-1 rounded',
            currentPage === n
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ n }}
        </button>
      </li>

      <li v-if="currentPage < totalPages">
        <button
          @click.prevent="nextPage"
          class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>
