import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('company', () => {
  // state
  const companyInfo = ref({})

  // action
  const setCompanyInfo = payload => {
    companyInfo.value = payload
  };

  return { companyInfo,setCompanyInfo }
})
