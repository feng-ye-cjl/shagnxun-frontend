import http from '@/utils/http'



function getCompanyRole(data) {
    return requestUrl(data, '/getCompanyRole')
}



const company3Api = {
    getCompanyRole
}

export default company3Api

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