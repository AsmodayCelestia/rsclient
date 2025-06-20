// ✅ store/counter.js
import { defineStore } from 'pinia'
import axios from 'axios'

const SERVER_URL = 'http://localhost:3000'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    email: '',
    role: '',
    myRewards: [],
    rewardDetails: [], // detail performance pribadi
    allRewards: [],
    actions: [],
    units: [],
    actionRanges: [],
    params: {
      filter: { search: '' },
      page: { number: 1, size: 10 }
    }
  }),
  actions: {
    async handleLogin(email, password) {
      try {
        const { data } = await axios.post(`${SERVER_URL}/login`, { email, password })
        localStorage.setItem('Authorization', data.Authorization)
        localStorage.setItem('role', data.role)
        this.email = data.email
        this.role = data.role

        await this.fetchUnits()
        await this.fetchActions()
        await this.fetchActionRanges()

        if (data.role === 'admin') this.router.push('/admin')
        else this.router.push('/home')
      } catch (error) {
        console.error('Login gagal:', error)
      }
    },

    async handleRegister(name, email, password, role = 'karyawan') {
      try {
        await axios.post(`${SERVER_URL}/register`, { name, email, password, role })
        this.router.push('/login')
      } catch (error) {
        console.error('Register gagal:', error)
      }
    },

    logout() {
      localStorage.removeItem('Authorization')
      localStorage.removeItem('role')
      this.router.push('/login')
    },

    async fetchMyRewardDetails() {
      try {
        const { data } = await axios.get(`${SERVER_URL}/my-performance`, {
          headers: { Authorization: localStorage.getItem('Authorization') }
        });
        this.rewardDetails = data;
      } catch (error) {
        console.error('Gagal ambil detail reward:', error);
      }
    },

    async inputReward({ actionId, jumlahPasien, tanggal }) {
      try {
        const { data } = await axios.post(`${SERVER_URL}/rewards`, {
          actionId,
          jumlahPasien,
          tanggal
        }, {
          headers: { Authorization: localStorage.getItem('Authorization') }
        })
        this.myRewards.push(data)
      } catch (error) {
        console.error('Gagal input reward:', error)
      }
    },

    async fetchUserPerformance(userId) {
      try {
        const { data } = await axios.get(`${SERVER_URL}/user/${userId}/performance`, {
          headers: { Authorization: localStorage.getItem('Authorization') }
        })
        return data;
      } catch (error) {
        console.error('Gagal ambil performance user:', error);
        return [];
      }
    },

    async fetchAllRewards() {
      try {
        const { data } = await axios.get(`${SERVER_URL}/all-rewards`, {
          headers: { Authorization: localStorage.getItem('Authorization') }
        })
        this.allRewards = data
      } catch (error) {
        console.error('Gagal ambil semua reward:', error)
      }
    },

    async createUnit(name) {
      try {
        await axios.post(`${SERVER_URL}/units`, { name }, {
          headers: { Authorization: localStorage.getItem('Authorization') }
        })
        await this.fetchUnits()
      } catch (error) {
        console.error('Gagal tambah unit:', error)
      }
    },

    async createAction({ name, unitId, nilaiPerTindakan }) {
      try {
        await axios.post(`${SERVER_URL}/actions`, { name, unitId, nilaiPerTindakan }, {
          headers: { Authorization: localStorage.getItem('Authorization') }
        })
        await this.fetchActions()
      } catch (error) {
        console.error('Gagal tambah tindakan:', error)
      }
    },

    async createRange({ actionId, minValue, maxValue, pengali }) {
      try {
        await axios.post(`${SERVER_URL}/ranges`, { actionId, minValue, maxValue, pengali }, {
          headers: { Authorization: localStorage.getItem('Authorization') }
        })
        await this.fetchActionRanges()
      } catch (error) {
        console.error('Gagal tambah range:', error)
      }
    },

    async fetchActions() {
      try {
        const { data } = await axios.get(`${SERVER_URL}/actions`, {
          headers: { Authorization: localStorage.getItem('Authorization') }
        })
        this.actions = data
      } catch (error) {
        console.error('Gagal ambil tindakan:', error)
      }
    },

    async updateAction(id, payload) {
      try {
        await axios.put(`${SERVER_URL}/actions/${id}`, payload, {
          headers: { Authorization: localStorage.getItem('Authorization') }
        });
        await this.fetchActions();
      } catch (error) {
        console.error('Gagal update action:', error);
      }
    },
    
    async deleteAction(id) {
      try {
        await axios.delete(`${SERVER_URL}/actions/${id}`, {
          headers: { Authorization: localStorage.getItem('Authorization') }
        });
        await this.fetchActions();
      } catch (error) {
        console.error('Gagal hapus action:', error);
      }
    },
    
    async fetchUnits() {
      try {
        const { data } = await axios.get(`${SERVER_URL}/units`, {
          headers: { Authorization: localStorage.getItem('Authorization') }
        })
        this.units = data
      } catch (error) {
        console.error('Gagal ambil unit:', error)
      }
    },

    async updateUnit(id, name) {
      try {
        await axios.put(`${SERVER_URL}/units/${id}`, { name }, {
          headers: { Authorization: localStorage.getItem('Authorization') }
        });
        await this.fetchUnits();
      } catch (error) {
        console.error('Gagal update unit:', error);
        throw error;
      }
    },

    async deleteUnit(id) {
      try {
        await axios.delete(`${SERVER_URL}/units/${id}`, {
          headers: { Authorization: localStorage.getItem('Authorization') }
        });
        await this.fetchUnits();
      } catch (error) {
        console.error('Gagal hapus unit:', error);
        throw error;
      }
    },

    async fetchActionRanges() {
      try {
        const { data } = await axios.get(`${SERVER_URL}/ranges`, {
          headers: { Authorization: localStorage.getItem('Authorization') }
        })
        this.actionRanges = data
      } catch (error) {
        console.error('Gagal ambil range:', error)
      }
    },

async createRange(rangeData) {
  try {
    await axios.post(`${SERVER_URL}/ranges`, rangeData, {
      headers: { Authorization: localStorage.getItem('Authorization') }
    });
    await this.fetchActionRanges();
  } catch (error) {
    console.error('Gagal tambah range:', error);
  }
},

async updateRange(rangeData) {
  try {
    await axios.put(`${SERVER_URL}/ranges/${rangeData.id}`, rangeData, {
      headers: { Authorization: localStorage.getItem('Authorization') }
    });
    await this.fetchActionRanges();
  } catch (error) {
    console.error('Gagal update range:', error);
  }
},

async deleteRange(id) {
  try {
    await axios.delete(`${SERVER_URL}/ranges/${id}`, {
      headers: { Authorization: localStorage.getItem('Authorization') }
    });
    await this.fetchActionRanges();
  } catch (error) {
    console.error('Gagal hapus range:', error);
  }
},
  }
})