<template>
  <div class="main">
    <div class="select">
      <!--公司id-->
      <el-input class="in" v-model="companyId" placeholder="公司id" style="width: 100px; margin-right: 50px"/>
      <!--   根据id查询公司实体列表按钮     -->
      <el-button type="primary" @click="getRouter">确认</el-button>
    </div>
    <div class="select">
      <!--主体-->
      <el-select
          v-model="entityName"
          placeholder="主体"
          style="width: 150px;margin-right: 30px">
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
          style="width: 150px;margin-right: 50px">
        <el-option
            v-for="(item,index) in entityChildArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click="childEntityClick(item.value,index)"
        />
      </el-select>
      <!--事件-->
      <el-select
          v-model="eventName"
          placeholder="事件"
          style="width: 150px;margin-right: 30px">
        <el-option
            v-for="(item,index) in eventList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click="selectEvent(item.value,index)"
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
    </div>
    <!--   公司信息输入框   -->
    <div class="companyInfo">
      <el-input class="in" v-model="entityInfo.entityCode" placeholder="主体代码"/>
      <el-input class="in" v-model="entityInfo.codeName" placeholder="主体名称"/>
      <el-input class="in" v-model="entityInfo.entityType" placeholder="子主体代码"/>
      <el-input class="in" v-model="entityInfo.typeName" placeholder="子主体名称"/>
      <el-input class="in" v-model="entityInfo.eventCode" placeholder="事件代码"/>
      <el-input class="in" v-model="entityInfo.eventName" placeholder="事件名称"/>
      <el-input class="in" v-model="entityInfo.propertyCode" placeholder="属性代码"/>
      <el-input class="in" v-model="entityInfo.propertyName" placeholder="属性名称"/>
    </div>
    <div class="select">
      <!--主体-->
      <el-select
          v-model="entityName2"
          placeholder="主体2"
          style="width: 150px;margin-right: 30px">
        <el-option
            v-for="(item,index) in entityArr2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click="selectFn2(item.value,index)"
        />
      </el-select>
      <!--子主体-->
      <el-select
          v-model="entityChildName2"
          placeholder="子主体2"
          style="width: 150px;margin-right: 50px">
        <el-option
            v-for="(item,index) in entityChildArr2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click="childEntityClick2(item.value,index)"
        />
      </el-select>
      <!--事件-->
      <el-select
          v-model="eventName2"
          placeholder="事件2"
          style="width: 150px;margin-right: 30px">
        <el-option
            v-for="(item,index) in eventList2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click="selectEvent2(item.value,index)"
        />
      </el-select>
      <!--属性-->
      <el-select
          v-model="propertyName2"
          placeholder="属性2"
          style="width: 150px;margin-right: 50px">
        <el-option
            v-for="(item,index) in propertyList2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click="selectProperty2(item.value,index)"
        />
      </el-select>
    </div>
    <!--   公司信息输入框2   -->
    <div class="companyInfo">
      <el-input class="in" v-model="entityInfo2.entityCode" placeholder="主体代码2"/>
      <el-input class="in" v-model="entityInfo2.codeName" placeholder="主体名称2"/>
      <el-input class="in" v-model="entityInfo2.entityType" placeholder="子主体代码2"/>
      <el-input class="in" v-model="entityInfo2.typeName" placeholder="子主体名称2"/>
      <el-input class="in" v-model="entityInfo2.eventCode" placeholder="事件代码2"/>
      <el-input class="in" v-model="entityInfo2.eventName" placeholder="事件名称2"/>
      <el-input class="in" v-model="entityInfo2.propertyCode" placeholder="属性代码2"/>
      <el-input class="in" v-model="entityInfo2.propertyName" placeholder="属性名称2"/>
      <!--   新增按钮     -->
      <el-button type="primary" @click="addRouter">新增</el-button>
    </div>
    <!--公司主体和子主体表格-->
    <el-table :data="tableList" style="width: 100%">
      <el-table-column align="center" label="主体代码" prop="entityCode"/>
      <el-table-column align="center" label="主体名称" prop="codeName"/>
      <el-table-column align="center" label="子主体代码" prop="entityType"/>
      <el-table-column align="center" label="子主体名称" prop="typeName"/>
      <el-table-column align="center" label="事件代码" prop="eventCode"/>
      <el-table-column align="center" label="事件名称" prop="eventName"/>
      <el-table-column align="center" label="主体代码2" prop="entityCode2"/>
      <el-table-column align="center" label="主体名称2" prop="typeName2"/>
      <el-table-column align="center" label="子主体代码2" prop="entityType2"/>
      <el-table-column align="center" label="子主体名称2" prop="codeName2"/>
      <el-table-column align="center" label="事件代码2" prop="eventCode2"/>
      <el-table-column align="center" label="事件名称2" prop="eventName2"/>
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


const companyStore = useCompanyStore()

// 类型列表
// const typeArr = ref([])

// 主体名称列表
const entityArr = ref([])
const entityArr2 = ref(entityArr)
// 所有主体列表
const allEntityList = ref([])
// 子主体列表
const entityChildArr = ref([])
const entityChildArr2 = ref([])
// 事件列表
const eventList = ref([])
// 事件列表2
const eventList2 = ref([])
// 当前主体名称
const entityName = ref('')
// 当前主体代码
const entityCode = ref('')
const entityCode2 = ref('')
// 当前子主体名称
const entityChildName = ref('')
const entityChildName2 = ref('')

// 主体信息
const entityInfo = ref({})
// 主体信息2
const entityInfo2 = ref({})
// 事件名称
const eventName = ref('')
// 当前属性名称
const propertyName = ref('')
// 属性列表
const propertyList = ref([])
const propertyList2 = ref([])
// 属性表格
const propertyTable = ref([])


const handleProperty = async (index, row) => {
  propertyTable.value = []
  console.log('当前行数据', row)
  // 回显到输入框
  entityInfo.value.entityCode = row.entityCode
  entityInfo.value.codeName = row.entityName
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
    entity_code2: row.entityCode2,
    entity_type2: row.entityType2,
    event_code2: row.eventCode2,
    subscribe_scene_code: row.subscribeSceneCode
    /*company_id : "50031",
    entity_code : "303",
    entity_type : "32",
    event_code : "604",
    subscribe_scene_code : "Tsb60220604303"*/
  }
  const res = await company2Api.getEntityMessageRouter2(requestBody)
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


// 根据主体查找子主体
const selectFn = (code, index) => {
  console.log(code)
  entityCode.value = code
  // 获取之前先清空子实体数组
  entityChildArr.value = []
  // 根据主体名称获取当前主体项中的子主体列表
  console.log(allEntityList.value)
  allEntityList.value.forEach(item => {
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

const selectFn2 = (code, index) => {
  entityCode2.value = code
  // 获取之前先清空子实体数组
  entityChildArr2.value = []
  // 根据主体名称获取当前主体项中的子主体列表
  console.log(allEntityList.value)
  allEntityList.value.forEach(item => {
    // console.log(code === item.entityCode)
    if (code === item.entityCode && item.entityType !== '') {
      entityChildArr2.value.push({
        value: item.entityType,
        label: item.typeName,
      })
    }
  })
  console.log(entityChildArr.value)
  // 渲染输入框
  entityInfo2.value.entityCode = entityArr2.value[index].value
  entityInfo2.value.codeName = entityArr2.value[index].label
}


// 获取事件列表和属性列表函数
const childEntityClick = async (code, index) => {
  // 清空事件属性列表
  eventList.value = []
  propertyList.value = []
  console.log(code)
  // 定义事件列表请求体
  const requestBody = {
    company_id: companyId.value,
    entity_code: entityCode.value,
    entity_type: code
  }
  // 调用远程方法获取事件列表
  const res = await company2Api.getCompanyEntityEvent(requestBody)
  console.log(res)
  // 渲染事件列表
  res.forEach(item => {
    eventList.value.push({value: item.eventCode, label: item.eventName})
  })

  // 同时获取属性列表
  const res2 = await company2Api.getCompanyEntityProperty(requestBody)
  console.log('属性列表', res2)
  // 渲染属性列表
  res2.forEach(item => {
    propertyList.value.push({value: item.propertyEnglish, label: item.propertyChinese})
  })
  // 渲染输入框
  entityInfo.value.entityType = entityChildArr.value[index].value
  entityInfo.value.typeName = entityChildArr.value[index].label
}

const childEntityClick2 = async (code2, index) => {
  propertyList2.value = []
  eventList2.value = []
  console.log(code2)
  // 定义事件列表请求体
  const requestBody2 = {
    company_id: companyId.value,
    entity_code: entityCode2.value,
    entity_type: code2
    // company_id: '50031',
    // entity_code: '303',
    // entity_type: '32'

  }
  // 调用远程方法获取事件列表
  const res = await company2Api.getCompanyEntityEvent(requestBody2)
  console.log(res)
  // 渲染事件列表
  res.forEach(item => {
    eventList2.value.push({value: item.eventCode, label: item.eventName})
  })

  const res2 = await company2Api.getCompanyEntityProperty(requestBody2)
  console.log('属性列表', res2)
  // 渲染属性列表
  res2.forEach(item => {
    propertyList2.value.push({value: item.propertyEnglish, label: item.propertyChinese})
  })
  // 渲染输入框
  entityInfo2.value.entityType = entityChildArr2.value[index].value
  entityInfo2.value.typeName = entityChildArr2.value[index].label
}

// 选择一个事件
const selectEvent = (code, index) => {
  entityInfo.value.eventCode = eventList.value[index].value
  entityInfo.value.eventName = eventList.value[index].label
}

const selectEvent2 = (code, index) => {
  entityInfo2.value.eventCode = eventList2.value[index].value
  entityInfo2.value.eventName = eventList2.value[index].label
}

// 选择一个属性
const selectProperty = (code, index) => {
  console.log('index', index)
  console.log('属性列表', propertyList.value)
  // console.log(propertyList.value[index])
  // 渲染输入框
  entityInfo.value.propertyCode = propertyList.value[index].value
  entityInfo.value.propertyName = propertyList.value[index].label
}

const selectProperty2 = (code2, index) => {
  console.log('index', index)
  console.log('属性列表', propertyList2.value)
  // console.log(propertyList.value[index])
  // 渲染输入框
  entityInfo2.value.propertyCode = propertyList2.value[index].value
  entityInfo2.value.propertyName = propertyList2.value[index].label
}

const getRouter = async () => {
  // 先清空对
  tableList.value = []
  // 构造请求对象
  console.log(entityInfo.value.entityCode === '')
  console.log(entityInfo.value.entityType === '')
  const requestBody = {
    company_id: companyId.value,
    entity_code: entityInfo.value.entityCode === '' ? '' : entityInfo.value.entityCode,
    entity_type: entityInfo.value.entityType === '' ? '' : entityInfo.value.entityType
    // company_id: '50031',
    // entity_code: '303',
    // entity_type: '32'
  }
  const res = await company2Api.getEntityMessageRouter(requestBody)
  // console.log(res)
  // entityList.value = res.filter(item => item.code === Number(companyId.value));
  tableList.value = res
}


// 新增函数
const addRouter = async () => {
  console.log('实体信息1', entityInfo.value)
  console.log('实体信息2', entityInfo2.value)
  // 构造请求条件
  const requestBody = {
    company_id: companyId.value,
    entity_code: entityInfo.value.entityCode,
    code_name: entityInfo.value.codeName,
    entity_type: entityInfo.value.entityType,
    type_name: entityInfo.value.typeName,
    event_code: entityInfo.value.eventCode,
    event_name: entityInfo.value.eventName,
    property_english: entityInfo.value.propertyCode,
    property_chinese: entityInfo.value.propertyName,
    entity_code2: entityInfo2.value.entityCode,
    code_name2: entityInfo2.value.codeName,
    entity_type2: entityInfo2.value.entityType,
    type_name2: entityInfo2.value.typeName,
    event_code2: entityInfo2.value.eventCode,
    event_name2: entityInfo2.value.eventName,
    property_english2: entityInfo2.value.propertyCode,
    property_chinese2: entityInfo2.value.propertyName,
  }
  const res = await company2Api.addEntityMessageRouter(requestBody)
  console.log(res)
}

// 初始化函数
const init = async () => {
  // 获取pinia中的公司数据
  console.log('来自页面1的参数', companyStore.companyInfo)
  // 绑定数据
  companyId.value = companyStore.companyInfo.companyId
  entityInfo.value.entityCode = companyStore.companyInfo.entityCode
  entityInfo.value.codeName = companyStore.companyInfo.entityName
  entityInfo.value.entityType = companyStore.companyInfo.childEntityCode
  entityInfo.value.typeName = companyStore.companyInfo.childEntityName

  // 获取主体子主体列表
  // 使用封装的请求方法
  const requestBody = {
    company_id: companyId.value,
    group_entity_code: '000'
  }
  const res = await companyApi.getCompany0(requestBody)
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
  // console.log(allEntityList.value)
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