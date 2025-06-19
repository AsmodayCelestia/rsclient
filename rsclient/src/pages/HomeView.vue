<script>
import Carousel from '../components/Carousel.vue';
import RewardTable from '../components/RewardTable.vue';
import { mapActions, mapWritableState } from 'pinia';
import { useCounterStore } from '../stores/counter';

export default {
  components: {
    Carousel,
    RewardTable
  },
  computed: {
    ...mapWritableState(useCounterStore, ['rewardDetails', 'params', 'actions', 'units', 'actionRanges']),
    enrichedRewards() {
      console.log('[DEBUG] using raw rewardDetails as enriched');
      return this.rewardDetails; // udah lengkap
    },
    filteredRewards() {
      const query = this.params.filter.search;
      if (!query) return this.enrichedRewards;
      return this.enrichedRewards.filter(reward => reward.tanggal === query);
    }
  },
  methods: {
    ...mapActions(useCounterStore, [
      'fetchMyRewardDetails',
      'fetchActions',
      'fetchUnits',
      'fetchActionRanges'
    ]),
    triggerSearch() {
      console.log('Search tanggal:', this.params.filter.search);
    },
    redirectToAddReward() {
      this.$router.push('/addReward');
    }
  },
  created() {
    console.log('[DEBUG] Created hook fired');
    this.fetchMyRewardDetails();
    this.fetchActions();
    this.fetchUnits();
    this.fetchActionRanges();
  }
};
</script>

<template>
  <div class="w-full">
    <div class="w-full max-w-screen-xl mx-auto">
      <Carousel />
    </div>

    <div class="container mx-auto px-4 py-10">
      <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <button @click="redirectToAddReward" class="bg-purple-700 text-white px-4 py-2 rounded-md">
          Add Reward
        </button>

        <div class="flex items-center w-full md:w-auto">
          <input
            type="date"
            v-model="params.filter.search"
            @focus="$event.target.showPicker && $event.target.showPicker()"
            class="border border-gray-300 bg-gray-50 rounded-l-md px-4 py-2 w-full sm:w-60 cursor-pointer"
          />
          <button @click="triggerSearch" class="bg-gray-700 text-white px-4 py-2 rounded-r-md">
            🔍
          </button>
        </div>
      </div>

      <RewardTable :rewards="filteredRewards" />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
