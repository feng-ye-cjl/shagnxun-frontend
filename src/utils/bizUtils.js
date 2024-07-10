function isObjectEqual(obj1, obj2) {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }
    for (let key of obj1Keys) {
        if (key !== 'companyId' && obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}

/**
 * * 获取两个数组中相同的实体
 * @param arr1
 * @param arr2
 * @return {*[]}
 */
export function getSameEntity(arr1, arr2) {
    let resArr = [];
    arr1.forEach((item1) => {
        arr2.forEach((item2) => {
            if (isObjectEqual(item1, item2)) {
                resArr.push(item2);
            }
        });
    })
    return resArr;
}

const arr1 =
    [{code: 0, codeName: '主页', companyId: '00000', entityCode: '002', entityType: '02',},
        {code: 0, codeName: '主页', companyId: '00000', entityCode: '002', entityType: '03',},
        {code: 0, codeName: '主页', companyId: '00000', entityCode: '002', entityType: '04'}]

const arr2 = [{code: 0, codeName: '主页', companyId: '50043', entityCode: '002', entityType: '02',}]

console.log(getSameEntity(arr1, arr2));