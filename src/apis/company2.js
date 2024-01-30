import http from '@/utils/http'



function getCompanyEntityEvent(data) {
    return requestUrl(data, '/getCompanyEntityevent')
}

function getCompanyEntityProperty(data) {
    return requestUrl(data, '/getCompanyEntityproperty')
}

function getEntityMessageRouter(data) {
    return requestUrl(data, '/getEntityMessageRouter')
}

function getEntityMessageRouter2(data) {
    return requestUrl(data, '/getEntityMessageRouter2')
}

function addEntityMessageRouter(data) {
    return requestUrl(data, '/addEntityMessageRouter')
}

function getCompanyRole(data) {
    return requestUrl(data, '/getCompanyRole')
}

function getEntityPageRouter(data) {
    return requestUrl(data, '/getEntityPageRouter')
}

function getEntityPageRouter2(data) {
    return requestUrl(data, '/getEntityPageRouter2')
}

function addEntityPageRouter(data) {
    return requestUrl(data, '/addEntityPageRouter')
}

function addCompanyEntityProperty(data) {
    return requestUrl(data, '/addCompanyEntityproperty')
}

/**
 * 主体事件查询接口
 * @param data
 * @returns {*}
 */
function getEntityEventList2(data) {
    return requestUrl(data, '/getEntityEventLIst2')
}

/**
 * 主体事件增加接口（小程序端）
 * @param data
 * @returns {*}
 * @constructor
 */
function BusEntityEventServlet(data) {
    return requestUrl(data, '/BusEntityEventServlet')
}

/**
 * 主体事件增加接口（PC端）
 * @param data
 * @returns {*}
 * @constructor
 */
function BusEntityEventServlet2(data) {
    return requestUrl(data, '/BusEntityEventServlet2')
}

/**
 * 查询事件属性接口
 * @param data
 * @returns {*}
 */
function getCompanyEventProperty(data) {
    return requestUrl(data, '/getCompanyEventproperty')
}

/**
 * 事件属性增加接口
 * @param data
 * @returns {*}
 */
function addCompanyEventProperty(data) {
    return requestUrl(data, '/addCompanyEventproperty')
}



// 接口总体对象
const company2Api = {
    getCompanyEntityEvent,
    getCompanyEntityProperty,
    getEntityMessageRouter,
    getEntityMessageRouter2,
    addEntityMessageRouter,
    getCompanyRole,
    getEntityPageRouter,
    getEntityPageRouter2,
    addEntityPageRouter,
    addCompanyEntityProperty,
    getEntityEventList2,
    BusEntityEventServlet,
    BusEntityEventServlet2,
    getCompanyEventProperty,
    addCompanyEventProperty
}

export default company2Api

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