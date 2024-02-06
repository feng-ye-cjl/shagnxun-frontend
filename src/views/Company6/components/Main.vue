<template>
  <div class="main">
    <div class="select">
      <!--公司id-->
      <el-input class="in" v-model="companyId" placeholder="公司id" style="width: 100px; margin-right: 50px"/>
      <!--   根据id查询公司实体列表按钮     -->
      <el-button type="primary" @click="getCompany">确认</el-button>
    </div>
    <!--下拉框-->
    <div class="select">
      <!--主体-->
      <el-select
          v-model="entityName"
          placeholder="主体"
          style="width: 150px;margin-right: 91px">
        <el-option
            v-for="(item,index) in entityArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click="selectFn(item.value,index)"
        />
      </el-select>
      <!--子主体-->
      <el-select
          v-model="entityChildName"
          placeholder="子主体"
          style="width: 150px;margin-right: 90px">
        <el-option
            v-for="(item,index) in entityChildArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click="childEntityClick(item.value,index)"
        />
      </el-select>
      <!--实体编号-->
      <el-select
          v-model="entityNum"
          placeholder="实体编号"
          style="width: 150px;margin-right: 90px">
        <el-option
            v-for="(item,index) in entityNoList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click="selectEntityNo(item.value,index)"
        />
      </el-select>
      <!--属性-->
      <el-select
          v-model="propertyName"
          placeholder="属性"
          style="width: 150px;margin-right: 50px">
        <el-option
            v-for="(item,index) in propertyList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click="selectProperty(item.value,index)"
        />
      </el-select>
      <!--   查询公司按钮     -->
      <el-button type="primary" @click="queryCompany">查询</el-button>
    </div>
    <!--   公司信息输入框   -->
    <div class="companyInfo">
      <el-input class="in" v-model="entityInfo.entityCode" placeholder="主体代码"/>
      <el-input class="in" v-model="entityInfo.codeName" placeholder="主体名称"/>
      <el-input class="in" v-model="entityInfo.entityType" placeholder="子主体代码"/>
      <el-input class="in" v-model="entityInfo.typeName" placeholder="子主体名称"/>
      <el-input class="in" v-model="entityInfo.entityNo" placeholder="实体编号"/>
      <el-input class="in" v-model="entityInfo.entityNoName" placeholder="实体名称"/>
      <el-input class="in" v-model="entityInfo.propertyCode" placeholder="属性代码"/>
      <el-input class="in" v-model="entityInfo.propertyName" placeholder="属性名称"/>
    </div>
    <!--等于号-->
    <el-text class="mx-1" size="large" style="font-size: 30px">=</el-text>
    <!--计算列表-->
    <div v-for="(item,idx) in computeList" :key="idx">
      <!--下拉框-->
      <div class="select">
        <!--主体-->
        <el-select
            v-model="item.entityName"
            placeholder="主体"
            style="width: 150px;margin-right: 91px">
          <el-option
              v-for="(entity) in entityArr"
              :key="entity.value"
              :label="entity.label"
              :value="entity.value"
              @click="selectChildList(entity,idx,item)"
          />
        </el-select>
        <!--子主体-->
        <el-select
            v-model="item.typeName"
            placeholder="子主体"
            style="width: 150px;margin-right: 90px">
          <el-option
              v-for="(entityChild,index) in entityChildArr"
              :key="entityChild.value"
              :label="entityChild.label"
              :value="entityChild.value"
              @click="childListEntityClick(entityChild,index,item)"
          />
        </el-select>
        <!--实体编号-->
        <el-select
            v-model="item.entityNo"
            placeholder="实体编号"
            style="width: 150px;margin-right: 90px">
          <el-option
              v-for="(entityno,index) in entityNoList"
              :key="entityno.value"
              :label="entityno.label"
              :value="entityno.value"
              @click="selectEntityNoList(entityno.value,index,item)"
          />
        </el-select>
        <!--属性-->
        <el-select
            v-model="item.propertyName"
            placeholder="属性"
            style="width: 150px;margin-right: 50px">
          <el-option
              v-for="(i,index) in propertyList"
              :key="i.value"
              :label="i.label"
              :value="i.value"
              @click="selectPropertyList(i.value,index,item)"
          />
        </el-select>
        <!--查询公司按钮-->
        <el-button type="primary" @click="addComputeList(item)">新增</el-button>
      </div>
      <!--   公司信息输入框   -->
      <div class="companyInfo">
        <el-input class="in" v-model="item.entityCode" placeholder="主体代码"/>
        <el-input class="in" v-model="item.codeName" placeholder="主体名称"/>
        <el-input class="in" v-model="item.entityType" placeholder="子主体代码"/>
        <el-input class="in" v-model="item.typeName" placeholder="子主体名称"/>
        <el-input class="in" v-model="item.entityNo" placeholder="实体代码"/>
        <el-input class="in" v-model="item.entityNoName" placeholder="实体名称"/>
        <el-input class="in" v-model="item.propertyCode" placeholder="属性代码"/>
        <el-input class="in" v-model="item.propertyName" placeholder="属性名称"/>
      </div>
    </div>
    <!--提交添加公司按钮-->
    <el-button type="primary" @click="submitAdd">提交</el-button>

    <!--公司主体和子主体表格-->
    <el-table :data="tableList" style="width: 100%">
      <el-table-column align="center" label="主体代码" prop="entityCode"/>
      <el-table-column align="center" label="主体名称" prop="codeName"/>
      <el-table-column align="center" label="子主体代码" prop="entityType"/>
      <el-table-column align="center" label="子主体名称" prop="typeName"/>
      <el-table-column align="center" label="实体编号" prop="entityNo"/>
      <el-table-column align="center" label="实体编号名称" prop="entityNoName"/>
      <el-table-column align="center" label="属性" prop="propertyName"/>
      <el-table-column align="center" label="类型名称" prop="typeName"/>
      <el-table-column align="center">
        <template #header>
          操作
        </template>
        <template #default="scope">
          <el-button size="small" type="info" @click="handleProperty(scope.$index, scope.row)">
            属性
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
          <el-button
              size="small"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)">
            消息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  属性表格  -->
    <el-table :data="propertyTable" style="width: 100%;margin-top: 50px">
      <el-table-column align="center" label="属性代码" prop="propertyEnglish"/>
      <el-table-column align="center" label="属性名称" prop="propertyChinese"/>
      <el-table-column align="center" label="属性代码2" prop="propertyEnglish2"/>
      <el-table-column align="center" label="属性名称2" prop="propertyChinese2"/>
      <el-table-column align="center">
        <template #header>
          操作
        </template>
        <template #default="scope">
          <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">
            属性
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
          <el-button
              size="small"
              type="primary"
              @click="handleDelete(scope.$index, scope.row)">
            消息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import {ref, onMounted} from 'vue'
import company2Api from "@/apis/company2.js";
import {useCompanyStore} from "@/stores/company.js";
import companyApi from "@/apis/company.js";
import company3Api from "@/apis/company3.js";


const companyStore = useCompanyStore()


// 主体名称列表
const entityArr = ref([])
// const entityArr2 = ref(entityArr)
// 所有主体列表
const allEntityList = ref([])
// 子主体列表
const entityChildArr = ref([])
// const entityChildArr2 = ref([])
// 事件列表
const entityNoList = ref([])
// 事件列表2
// const eventList2 = ref([])
// 当前主体名称
const entityName = ref('')
// 当前主体代码
const entityCode = ref('')
// const entityCode2 = ref('')
// 当前子主体名称
const entityChildName = ref('')
// const entityChildName2 = ref('')

// 主体信息
const entityInfo = ref({})
// 主体信息2
const entityInfo2 = ref({})
// 事件名称
const entityNum = ref('')
// 当前属性名称
const propertyName = ref('')
// 属性列表
const propertyList = ref([])
// const propertyList2 = ref([])
// 属性表格
const propertyTable = ref([])
// 角色数组
const roleArr = ref([])
// 角色名称
// const roleName = ref('')
// 所有返回的表格数据
const router2List = ref([])
// 类型数组
// const typeArr = ref([
//   {
//     value: '01',
//     label: '类型1'
//   },
//   {
//     value: '02',
//     label: '类型2'
//   }
// ])
// const typeName = ref('')
// 当前类型index
// const typeIndex = ref(0)
// 当前角色index
// const roleIndex = ref(0)

// 计算列表(默认存放一条数据)
const computeList = ref([
  {
    entityCode: '',
    codeName: '',
    entityType: '',
    typeName: '',
    entityNo: '',
    entityNoName: '',
    propertyCode: '',
    propertyName: '',
  }
])

// 公式数据列表
const formulaList = ref([])
const queryCompany = async () => {
  console.log('调用接口查询公司列表')
  // 定义请求体
  const requestBody = {
    entityCode: '803',
    entityType: '10',
    field9: entityInfo.value.entityNo
  }
  console.log('请求对象', requestBody)
  const res = await company3Api.getFormula(requestBody)
  console.log(res.data)
  // 保存公式列表
  formulaList.value = res.data
  // 先清空表格
  tableList.value = []
  // 填充表格
  res.data.forEach(item => {
    tableList.value.push({
      entityCode: item.field0,
      codeName: item.field1,
      entityType: item.field2,
      typeName: item.field3,
      entityNo: item.field4,
      entityNoName: item.field5,
      propertyName: item.remark2,
    })
  })
}


const handleProperty = async (index, row) => {
  propertyTable.value = []
  console.log('当前行数据', row)
  console.log('当前entityInfo', entityInfo.value)
  // 回显到输入框
  entityInfo.value.entityCode = row.entityCode
  entityInfo.value.codeName = row.codeName
  entityInfo.value.entityType = row.entityType
  entityInfo.value.typeName = row.typeName
  entityInfo.value.eventCode = row.eventCode
  entityInfo.value.eventName = row.eventName

  entityInfo2.value.entityCode = row.entityCode2
  entityInfo2.value.codeName = row.entityName2
  entityInfo2.value.entityType = row.entityType2
  entityInfo2.value.typeName = row.typeName2
  entityInfo2.value.eventCode = row.eventCode2
  entityInfo2.value.eventName = row.eventName2
  // 构造请求对象
  const requestBody = {
    company_id: companyId.value,
    entity_code: row.entityCode,
    entity_type: row.entityType,
    event_code: row.eventCode,
    object_code: router2List.value[index].objectCode
  }
  const res = await company2Api.getEntityPageRouter2(requestBody)
  // console.log(res)
  res.forEach(item => {
    propertyTable.value.push({
      propertyEnglish: item.propertyEnglish,
      propertyChinese: item.propertyChinese,
      propertyEnglish2: item.otherPropertyEnglish,
      propertyChinese2: item.otherPropertyChinese,
    })
  })
}
const handleDelete = (index, row) => {
  console.log(index, row)
}

// 公司主体表格列表
const tableList = ref([])
// 公司id
const companyId = ref('')
// 根据公司id获取公司列表数据用于渲染到表格


// 第一行根据主体查找子主体
const selectFn = (code, index) => {
  console.log(code)
  entityCode.value = code
  // 获取之前先清空子实体数组，和下拉框选项
  entityChildArr.value = []
  entityChildName.value = ''
  // 根据主体名称获取当前主体项中的子主体列表
  console.log(allEntityList.value)
  allEntityList.value.forEach(item => {
    // console.log(code === item.entityCode)
    if (code === item.entityCode && item.entityType !== '') {
      entityChildArr.value.push({
        value: item.entityType,
        label: item.typeName,
      })
    }
  })
  console.log(entityChildArr.value)
  // 渲染输入框
  entityInfo.value.entityCode = entityArr.value[index].value
  entityInfo.value.codeName = entityArr.value[index].label
}


// 循环列表中根据主体查找子主体
const selectChildList = (entity, index, item) => {
  // 获取之前先清空子实体数组
  entityChildArr.value = []
  entityCode.value = entity.value
  item.typeName = ''
  item.entityType = ''
  console.log(item)
  // // 根据主体名称获取当前主体项中的子主体列表
  // console.log(allEntityList.value)
  allEntityList.value.forEach(item => {
    // console.log(code === item.entityCode)
    if (entity.value === item.entityCode && item.entityType !== '') {
      entityChildArr.value.push({
        value: item.entityType,
        label: item.typeName
      })
    }
  })
  // console.log(entityChildArr.value)
  // 渲染输入框
  computeList.value[index].entityCode = entity.value
  computeList.value[index].codeName = entity.label
  // entityInfo.value.entityCode = entityArr.value[index].value
  // entityInfo.value.codeName = entityArr.value[index].label
}


// 获取实体列表函数
const childEntityClick = async (code, index) => {
  // 先清空列表
  entityNoList.value = []
  propertyList.value = []
  entityNum.value = ''
  propertyName.value = ''
  // 定义事件列表请求体
  const requestBody = {
    company_id: companyId.value,
    entity_code: entityCode.value,
    entity_type: code
  }
  // 请求实体接口条件
  const requestBody2 = {
    companyId: companyId.value,
    entityCode: entityCode.value,
    entityType: code
  }
  // 调用远程方法获取实体列表
  const res = await company3Api.queryEntryGeneral(requestBody2)
  console.log('实体列表', res)
  // 渲染事件列表
  res.data.forEach(item => {
    // console.log('事件中的每一项',item.entityName)
    entityNoList.value.push({value: item.entityNo, label: item.entityName})
  })
  console.log(entityNoList.value)
  // 获取属性列表
  const res2 = await company2Api.getCompanyEntityProperty(requestBody)
  console.log('属性列表', res2)
  // 渲染属性列表
  res2.forEach(item => {
    if (item.propertyEnglish.charAt(0) === 'n') {
      propertyList.value.push({value: item.propertyEnglish, label: item.propertyChinese});
    }
  })
  // 渲染输入框
  entityInfo.value.entityType = entityChildArr.value[index].value
  entityInfo.value.typeName = entityChildArr.value[index].label
}

// 列表子主体选择事件
const childListEntityClick = async (entityChild, index, item) => {
  // 先清空实体编号和属性列表，以及绑定的名称
  entityNoList.value = []
  propertyList.value = []
  item.entityNo = ''
  item.entityNoName = ''
  item.propertyName = ''
  item.propertyCode = ''
  console.log('子主体项', entityChild)
  console.log('自主体项值', entityChild.value)
  console.log('主体代码', entityCode.value)
  // 定义事件列表请求体
  const requestBody = {
    company_id: companyId.value,
    entity_code: entityCode.value,
    entity_type: entityChild.value
  }
  // 请求实体接口条件
  const requestBody2 = {
    companyId: companyId.value,
    entityCode: entityCode.value,
    entityType: entityChild.value
  }
  // 调用远程方法获取实体编号列表
  const res = await company3Api.queryEntryGeneral(requestBody2)
  console.log('实体列表', res)
  // 渲染实体编号列表
  res.data.forEach(item => {
    entityNoList.value.push({value: item.entityNo, label: item.entityName})
  })
  console.log(entityNoList.value)
  // 获取属性列表
  const res2 = await company2Api.getCompanyEntityProperty(requestBody)
  console.log('属性列表', res2)
  // 渲染属性列表
  res2.forEach(item => {
    if (item.propertyEnglish.charAt(0) === 'n') {
      propertyList.value.push({value: item.propertyEnglish, label: item.propertyChinese});
    }
  })
  // 渲染输入框
  item.entityType = entityChildArr.value[index].value
  item.typeName = entityChildArr.value[index].label
}

// const childEntityClick2 = async (code2, index) => {
//   eventList2.value = []
//   propertyList2.value = []
//   console.log(code2)
//   // 定义事件列表请求体
//   const requestBody2 = {
//     company_id: companyId.value,
//     entity_code: entityCode2.value,
//     entity_type: code2
//   }
//   // 调用远程方法获取事件列表
//   const res = await company2Api.getCompanyEntityEvent(requestBody2)
//   console.log(res)
//   // 渲染事件列表
//   res.forEach(item => {
//     eventList2.value.push({value: item.eventCode, label: item.eventName})
//   })
//
//   const res2 = await company2Api.getCompanyEntityProperty(requestBody2)
//   console.log('属性列表', res2)
//   // 渲染属性列表
//   res2.forEach(item => {
//     propertyList2.value.push({value: item.propertyEnglish, label: item.propertyChinese})
//   })
//   // 渲染输入框
//   entityInfo2.value.entityType = entityChildArr2.value[index].value
//   entityInfo2.value.typeName = entityChildArr2.value[index].label
// }

// 选择一个实体
const selectEntityNo = (code, index) => {
  entityInfo.value.entityNo = entityNoList.value[index].value
  entityInfo.value.entityNoName = entityNoList.value[index].label
}

const selectEntityNoList = (code, index, item) => {
  console.log('当前实体编号列表', entityNoList.value)
  console.log('当前实体编号', entityNoList.value[index])
  item.entityNo = entityNoList.value[index].value
  item.entityNoName = entityNoList.value[index].label
}

// const selectEvent2 = (code, index) => {
//   entityInfo2.value.eventCode = eventList2.value[index].value
//   entityInfo2.value.eventName = eventList2.value[index].label
// }

// 选择一个属性
const selectProperty = (code, index) => {
  console.log('index', index)
  console.log('属性列表', propertyList.value)
  // console.log(propertyList.value[index])
  // 渲染输入框
  entityInfo.value.propertyCode = propertyList.value[index].value
  entityInfo.value.propertyName = propertyList.value[index].label
}
// 计算列表中选择一个实体
const selectPropertyList = (code, index, item) => {
  // 渲染输入框
  item.propertyCode = propertyList.value[index].value
  item.propertyName = propertyList.value[index].label
}


// 获取公司列表
const getCompany = async () => {
  // 先清空
  tableList.value = []
  entityArr.value = []
  entityName.value = ''

  // 获取角色
  const roleRes = await company2Api.getCompanyRole({company_id: companyId.value})
  roleRes.forEach(item => {
    roleArr.value.push({
      value: item.role_type,
      label: item.role_name
    })
  })
  // 构造请求对象
  const requestBody = {
    /*company_id: companyId.value,
    entity_code: entityInfo.value.entityCode,
    entity_type: entityInfo.value.entityType*/
    company_id: companyId.value,
    entity_code: '',
    entity_type: ''
  }
  const res = await company2Api.getEntityPageRouter(requestBody)
  // 保存表格数据
  router2List.value = res
  console.log(res)
  // res.forEach(item => {
  //   tableList.value.push({
  //     entityCode: item.entityCode,
  //     codeName: item.codeName,
  //     entityType: item.entityType,
  //     typeName: item.typeName,
  //     eventCode: item.eventCode,
  //     eventName: item.eventName,
  //     sceneCodeName: item.sceneCodeName,
  //     sceneCodeType: item.sceneCodeType,
  //   })
  // })

  const body = {
    company_id: companyId.value,
    group_entity_code: '000'
  }
  const res2 = await companyApi.getCompany0(body)
  allEntityList.value = res2
  res2.forEach(item => {
    if (item.entityType === '') {
      entityArr.value.push({
        value: item.entityCode,
        label: item.codeName,
        childArr: []
      })
    }
  })
  for (let i = 0; i < entityArr.value.length; i++) {
    for (let j = i + 1; j < entityArr.value.length; j++) {
      if (entityArr.value[i].value === entityArr.value[j].value) {
        entityArr.value.splice(j, 1)
      }
    }
  }
}


// 新增计算列表函数
const addComputeList = async (item) => {
  // 定义请求对象
  const entityBody = {
    company_id: companyId.value,
    entityCode: '803',
    codeName: '',
    entityType: '10',
    typeName: '',

    field6: entityInfo.value.entityCode,
    field7: entityInfo.value.entityType,
    field8: entityInfo.value.propertyCode,
    field9: entityInfo.value.entityNo,

    field0: item.entityCode,
    field1: item.codeName,
    field2: item.entityType,
    field3: item.typeName,
    field4: item.entityNo,
    field5: item.entityNoName,
    remark1: item.propertyCode,
    remark2: item.propertyName,
  }
  // 添加一项记录
  computeList.value.push(
      {
        entityCode: item.entityCode !== '803' ? '803' : '',
        codeName: item.entityCode !== '803' ? '公式' : '',
        entityType: item.entityType !== '01' ? '01' : '',
        typeName: item.entityType !== '01' ? '公式' : '',
        entityNo: '',
        entityNoName: '',
        propertyCode: '',
        propertyName: '',
        entityBody: entityBody
      }
  )
}

// 提交添加按钮事件
const submitAdd = async () => {
  // 获取entityBody数组
  let jsonBody = []
  computeList.value.forEach(item => {
    console.log('每一项item的entityBody', item.entityBody)
    if (item.entityBody !== undefined) {
      jsonBody.push(item.entityBody)
    }
  })
  console.log(jsonBody)
  const requestbody = {
    company_id: companyId.value,
    entity_code: '803',
    entity_type: '01',
    entity_list: encodeURIComponent(JSON.stringify(jsonBody))
  }
  console.log('请求体', requestbody)
  const res = await company2Api.addEntityTable(requestbody)
  console.log(res)
}

// 初始化函数
const init = async () => {
  // 获取pinia中的公司数据
  console.log('来自页面1的参数', companyStore.companyInfo)
  // 绑定数据
  companyId.value = companyStore.companyInfo.companyId
  entityInfo.value.entityCode = companyStore.companyInfo.entityCode
  entityInfo.value.codeName = companyStore.companyInfo.codeName
  entityInfo.value.entityType = companyStore.companyInfo.entityType
  entityInfo.value.typeName = companyStore.companyInfo.typeName

  // 获取主体子主体列表
  // 使用封装的请求方法
  const requestBody = {
    company_id: companyId.value,
    group_entity_code: '000'
  }
  const res = await companyApi.getCompany(requestBody)
  allEntityList.value = res
  res.forEach(item => {
    if (item.entityType === '') {
      entityArr.value.push({
        value: item.entityCode,
        label: item.codeName,
        childArr: []
      })
    }
  })
  for (let i = 0; i < entityArr.value.length; i++) {
    for (let j = i + 1; j < entityArr.value.length; j++) {
      if (entityArr.value[i].value === entityArr.value[j].value) {
        entityArr.value.splice(j, 1)
      }
    }
  }
  console.log(allEntityList.value)
}

// onMounted内部必须是一个箭头函数，内部函数体为一个需要执行的方法
onMounted(() => {
  // 页面挂载后初始化
  init()
})
</script>


<style scoped lang="scss">
.main {
  float: left;
  width: 1300px;

  .companyInfo {
    .in {
      width: 100px;
      margin-right: 20px;
    }
  }


}
</style>