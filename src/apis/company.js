import http from '@/utils/http'

export function getCompanyAPI (data) {
    return http({
        url: `/getCompanyEntitycode?company_id=${data.company_id}&group_entity_code=${data.group_entity_code}`
    })
}

export function getCompanyEntityProperty(data) {
    return http({
        url: `/getCompanyEntityproperty?company_id=${data.company_id}&entity_code=${data.entity_code}&entity_type=${data.entity_code}`
    })
}