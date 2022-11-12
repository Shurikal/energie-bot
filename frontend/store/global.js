import { defineStore } from 'pinia'

export const useGlobalStore = defineStore({
  id: 'global-store',
  state: () => {
    return {
      data: null,
    }
  },
  actions: {
    setData(data) {
      this.data = data
    }
  },
})