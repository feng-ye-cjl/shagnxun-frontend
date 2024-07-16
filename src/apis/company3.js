import http from '@/utils/http2.js'

/**
 * 查询实体编号接口
 * @param data
 * @returns {*}
 */
function queryEntryGeneral(data) {
    return http({
        url: '/baseServer/servers/general/queryEntryGeneral',
        method: 'POST',
        data
    })
}

/**
 * 新增公式
 * @param data
 * @returns {*}
 */
function insertEntryGeneralChain(data) {
    return http({
        url: '/servers/general/insertEntryGeneralChain',
        method: 'POST',
        data
    })
}

// function insertEntryGeneralChain(data) {
//     const url = 'post/servers/general/insertEntryGeneralChain'
//     return requestUrl(data,url)
// }

/**
 * 获取公式接口
 * @param data
 * @returns {*}
 */
function getFormula(data) {
    const url = '/baseServer/transaction/sub/getEntityTable2Chain'
    return requestUrl(data, url);
}



const company3Api = {
    queryEntryGeneral,
    getFormula,
    insertEntryGeneralChain
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