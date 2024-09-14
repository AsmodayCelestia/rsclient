  <script>
  import { useCounterStore } from '../stores/counter';
  import { mapActions } from 'pinia';
  import Flatpickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  export default {
    components: {
        Flatpickr
    },
    data() {
      return {
        patient: {
          firstName: '',
          lastName: '',
          age: '',
          sex: '',
          birthdate: '',
          address: '',
          phoneNumber: ''
        }
      }
    },
    // methods: {
    //   submitForm() {
    //     // Handle form submission
    //     console.log('Patient data:', this.patient);
    //     // You can send this data to your API here
    //   }
    // }
    methods: {
        ...mapActions(useCounterStore, ['addPatient']),
        async doAddPatient(){
        //   console.log(this.firstName, lastName, age, sex, birthdate, address, phoneNumber, "masuk di comp login");
          this.addPatient(this.patient)
        }
      }
  }
  </script>
<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Add New Patient</h1>
    <form @submit.prevent="doAddPatient" class="space-y-4">
      <!-- First Name -->
      <div>
        <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
        <input v-model="patient.firstName" type="text" id="firstName" class="form-input bg-white mt-1 block w-full border border-black rounded-md shadow-sm" required />
      </div>
      
      <!-- Last Name -->
      <div>
        <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
        <input v-model="patient.lastName" type="text" id="lastName" class="form-input bg-white mt-1 block w-full border border-black rounded-md shadow-sm" required />
      </div>

      <!-- Age -->
      <div>
        <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
        <input v-model="patient.age" type="number" id="age" class="form-input bg-white mt-1 block w-full border border-black rounded-md shadow-sm" required />
      </div>

    <!-- Sex -->
    <div>
        <label for="sex" class="block text-sm font-medium text-gray-700">Gender</label>
        <select v-model="patient.sex" id="sex" class="form-select bg-white mt-1 block w-full border border-black rounded-md shadow-sm" required>
          <option value="" disabled selected>Select Gender</option>
          <option value="Laki-Laki">Laki-Laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>

      <!-- Birthdate -->
      <div class="mb-4">
        <label for="birthdate" class="block text-sm font-medium text-gray-700">Birthdate</label>
        <Flatpickr v-model="patient.birthdate" id="birthdate" class="w-full p-2 border bg-white border-black rounded-md"/>
      </div>

      <!-- Address -->
      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
        <textarea v-model="patient.address" id="address" rows="3" class="form-input bg-white mt-1 block w-full border border-black rounded-md shadow-sm" required></textarea>
      </div>

      <!-- Phone Number -->
      <div>
        <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
        <input v-model="patient.phoneNumber" type="tel" id="phoneNumber" class="form-input bg-white mt-1 block w-full border border-black rounded-md shadow-sm" required />
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Save Patient</button>
      </div>
    </form>
  </div>
</template>
  
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  