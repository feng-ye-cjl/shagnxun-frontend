import http from '@/utils/http'

function getCompany0(data) {
    let url = '/getCompanyEntitycode0'
    return requestUrl(data, url)
}

function getCompany(data) {
    let url = '/getCompanyEntitycode'
    return requestUrl(data, url)
}

function getCompanyEntityProperty(data) {
    let url = '/getCompanyEntityproperty'
    return requestUrl(data, url)
}

function addCompanyEntity(data) {
    let url = '/addCompanyEntity'
    return requestUrl(data, url)
}


const companyApi = {
    getCompany0,
    getCompany,
    getCompanyEntityProperty,
    addCompanyEntity
}

export default companyApi

/**
 * 封装通用请求函数
 * @param data
 * @param url
 * @returns {*}
 */
const requestUrl = function (data, url) {
    if (data !== undefined && data !== null) {
        const params = []
        for (const key in data) {
            params.push(key + '=' + data[key]);
        }
        const s = params.join('&');
        let paramUrl = ''
        if (url.indexOf('?') !== -1) {
            paramUrl = '&' + s;
        } else {
            paramUrl = '?' + s;
        }
        url += paramUrl;
        return http({
            url: url
        })
    }
}