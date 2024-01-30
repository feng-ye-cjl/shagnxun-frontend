import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useCompanyStore = defineStore('company', () => {
    // state
    const companyInfo = ref({})
    // 属性跳转查询条件
    const toListBody = ref({})

    // action
    const setCompanyInfo = payload => {
        companyInfo.value = payload
    };

    const setToListBody = payload => {
        toListBody.value = payload
    };

    return {
        companyInfo,
        setCompanyInfo,
        toListBody,
        setToListBody
    }
})
