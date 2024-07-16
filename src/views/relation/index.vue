<template>
  <div class="main">
    <div class="left">
      <div class="select">
        <!--公司id-->
        <el-input class="in" v-model="companyId" placeholder="公司id" style="width: 100px; margin-right: 50px"/>
        <!--   根据id查询公司实体列表按钮     -->
        <el-button type="primary" @click="getRouter">确认</el-button>
        <!--   角色下拉框   -->
        <el-select
            v-model="roleName"
            placeholder="角色"
            style="width: 150px;margin-right: 30px;margin-left: 30px">
          <el-option
              v-for="(item,index) in roleArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click="selectRole(item.value,index)"
          />
        </el-select>
        <el-select
            v-model="typeName"
            placeholder="类型"
            style="width: 150px;margin-right: 30px">
          <el-option
              v-for="(item,index) in typeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click="selectType(item.value,index)"
          />
        </el-select>
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
        <!--        <el-select
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
                </el-select>-->
      </div>
      <!--   公司信息输入框   -->
      <div class="companyInfo">
        <el-input class="in" v-model="entityInfo.entityCode" placeholder="主体代码"/>
        <el-input class="in" v-model="entityInfo.codeName" placeholder="主体名称"/>
        <el-input class="in" v-model="entityInfo.entityType" placeholder="子主体代码"/>
        <el-input class="in" v-model="entityInfo.typeName" placeholder="子主体名称"/>
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
        <!--事件查询输入框-->
        <el-input class="in" v-model="searchEventName" placeholder="请输入事件" @keydown.enter="searchEvent"
                  style="width: 100px; margin-right: 50px"/>
        <!--属性-->
        <!--        <el-select
                    v-model="propertyName2"
                    placeholder="属性2"
                    style="width: 150px;margin-right: 50px">
                  <el-option
                      v-for="(item,index) in propertyList2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      @click="selectProperty2(item.value,index)"/>
                </el-select>-->
      </div>
      <!--   公司信息输入框2   -->
      <div class="companyInfo">
        <el-input class="in" v-model="entityInfo2.entityCode" placeholder="主体代码2"/>
        <el-input class="in" v-model="entityInfo2.codeName" placeholder="主体名称2"/>
        <el-input class="in" v-model="entityInfo2.entityType" placeholder="子主体代码2"/>
        <el-input class="in" v-model="entityInfo2.typeName" placeholder="子主体名称2"/>
        <!--   新增按钮     -->
        <el-button type="primary" @click="addEvent">新增</el-button>
      </div>
      <!--公司主体和子主体表格-->
      <el-table :data="tableList" style="width: 100%; max-height: 400px; min-height: 20px">
        <el-table-column align="center" label="主体代码" prop="entityCode"/>
        <el-table-column align="center" label="主体名称" prop="codeName"/>
        <el-table-column align="center" label="子主体代码" prop="entityType"/>
        <el-table-column align="center" label="子主体名称" prop="typeName"/>
        <el-table-column align="center" label="事件代码" prop="eventCode"/>
        <el-table-column align="center" label="事件名称" prop="eventName"/>
        <el-table-column align="center" label="场景名称" prop="sceneCodeName"/>
        <el-table-column align="center" label="场景代码" prop="sceneCodeType"/>
        <el-table-column align="center" label="类型名称" prop="typeName"/>
        <el-table-column align="center">
          <template #header>
            操作
          </template>
          <template #default="scope">
            <el-button size="small" type="info" @click="handleEvent(scope.$index, scope.row)">
              事件
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
      <!--  事件表格  -->
      <el-table :data="propertyTable" style="width: 80%;margin-top: 50px">
        <el-table-column align="center" label="事件代码" prop="propertyEnglish"/>
        <el-table-column align="center" label="事件名称" prop="propertyChinese"/>
        <el-table-column align="center">
          <template #header>
            操作
          </template>
          <template #default="scope">
            <el-button size="small" type="info" @click="queryProperty(scope.$index, scope.row)">
              属性
            </el-button>
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--  事件表单  -->
    <div class="right">
      <el-form :model="form">
        <div v-show="selectEntityInfo.isShow">
          <el-text class="mx-1" size="large">
            当前主体信息：{{ selectEntityInfo.entityCode }}---{{ selectEntityInfo.codeName }}
            {{ selectEntityInfo.entityType }}---{{ selectEntityInfo.typeName }}
            {{ selectEntityInfo.propertyEnglish }}---{{ selectEntityInfo.propertyChinese }}
          </el-text>
        </div>
        <!--    其他    -->
        <el-form-item
            :label="item.propertyEnglish"
            v-for="item in propertyList.otherList"
            :key="item.propertyEnglish">
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyChinese"/>
          <el-select
              v-model="item.propertyType"
              placeholder="类型"
              style="width: 100px;margin-right: 10px">
            <el-option
                v-for="item in propertyTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @click="selectTypeFn(item.value)"
            />
          </el-select>
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyLength"/>
          <el-button
              size="small"
              type="success"
              @click="addProperty(scope.$index, scope.row)">
            增加
          </el-button>
        </el-form-item>
        <!--field-->
        <el-form-item
            :label="item.propertyEnglish"
            v-for="item in propertyList.fieldList"
            :key="item.propertyEnglish">
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyChinese"/>
          <el-select
              v-model="item.propertyType"
              placeholder="类型"
              style="width: 100px;margin-right: 10px">
            <el-option
                v-for="item in propertyTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @click="selectTypeFn(item.value)"
            />
          </el-select>
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyLength"/>
          <el-button
              size="small"
              type="success"
              @click="addFieldProperty(item)">
            增加
          </el-button>
          <el-button
              size="small"
              type="primary"
              @click="toList(item)">
            跳转
          </el-button>
        </el-form-item>
        <!--number-->
        <el-form-item
            :label="item.propertyEnglish"
            v-for="item in propertyList.numberList"
            :key="item.propertyEnglish">
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyChinese"/>
          <el-input class="form_item" placeholder="类型" v-model="item.propertyType"/>
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyLength"/>
          <el-button
              size="small"
              type="success"
              @click="addNumber(item)">
            增加
          </el-button>
        </el-form-item>
        <!--access-->
        <el-form-item
            :label="item.propertyEnglish"
            v-for="item in propertyList.accessoryList"
            :key="item.propertyEnglish">
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyChinese"/>
          <el-input class="form_item" placeholder="类型" v-model="item.propertyType"/>
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyLength"/>
          <el-button
              size="small"
              type="success"
              @click="addAccessory(item)">
            增加
          </el-button>
          <el-button
              size="small"
              type="primary"
              @click="toList(item)">
            跳转
          </el-button>
        </el-form-item>
        <!--remark-->
        <el-form-item
            :label="item.propertyEnglish"
            v-for="item in propertyList.remarkList"
            :key="item.propertyEnglish">
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyChinese"/>
          <el-input class="form_item" placeholder="类型" v-model="item.propertyType"/>
          <el-input class="form_item" placeholder="长度" value="256"/>
          <el-button
              size="small"
              type="success"
              @click="addRemark(item)">
            增加
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">submit</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script setup>
import {ref, onMounted} from 'vue'
import company2Api from "@/apis/company2.js";
import {useCompanyStore} from "@/stores/company.js";
import companyApi from "@/apis/company.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";


const companyStore = useCompanyStore()
// 路由
const router = useRouter()

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
const entityName2 = ref('')
// 当前主体代码
const entityCode = ref('')
const entityCode2 = ref('')
// 当前子主体名称
const entityChildName = ref('')
const entityChildName2 = ref('')
// 数据类型下拉框
const propertyTypeList = ref([
  {
    value: 'char',
    label: 'char'
  },
  {
    value: 'char0',
    label: 'char0'
  }
])

// 主体信息
const entityInfo = ref({})
// 主体信息2
const entityInfo2 = ref({})
// 事件名称
const eventName = ref('')
const eventName2 = ref('')
// 属性列表
const propertyList = ref([])
const propertyList2 = ref([])
// 属性表格
const propertyTable = ref([])
// 角色数组
const roleArr = ref([])
// 角色名称
const roleName = ref('')
// 所有返回的表格数据
const router2List = ref([])
// 类型数组
const typeArr = ref([
  {
    value: '01',
    label: 'PC端'
  },
  {
    value: '02',
    label: '小程序'
  }
])
const typeName = ref('')
// 当前类型index
const typeIndex = ref(0)
// 当前角色index
const roleIndex = ref(0)

// 当前选中的作为属性查询的entityCode和entityType
const selectEntityCode = ref('')
const selectEntityType = ref('')
// 保存当前选中的事件code
const selectEventCode = ref('')
// 当前的objectCode
const selectObjectCode = ref('')
// 当前搜索的事件名
const searchEventName = ref('')

/**
 * 查询事件（模糊查询）
 */
const searchEvent = () => {
  // 定义事件列表请求体
  const requestBody = {
    Company_id: companyId.value,
    entity_code: '000',
    entity_type: '00',
    event_name: searchEventName.value
  }
  // company2Api.getCompanyEntityEvent(requestBody)
  company2Api.getCompanyEntityEvent(requestBody).then(res => {
    console.log('模糊查询事件', res)
    ElMessage.success('查询成功')
    // console.log('模糊查询事件', res[0])
    // 先清空事件列表
    eventList2.value = []
    // 渲染事件列表
    res.forEach(item => {
      eventList2.value.push({value: item.eventCode, label: item.eventName})
    })
  })
};


// 查询属性
const queryProperty = async (index, row) => {
  console.log('当前行属性条件', index, row)
  // 保存当前事件数据
  selectEntityInfo.value.propertyChinese = row.propertyChinese === '' ? '空' : row.propertyChinese
  selectEntityInfo.value.propertyEnglish = row.propertyEnglish === '' ? '空' : row.propertyEnglish
  selectEntityInfo.value.isShow = true
  console.log('当前选中的选项', selectEntityInfo.value)
  console.log(selectEntityInfo.value.codeName === '')
  // 保存事件code
  selectEventCode.value = row.propertyEnglish
  // console.log('当前选中的事件code', selectEventCode.value)
  // 先清空属性列表
  propertyList.value = {
    otherList: [],
    fieldList: [],
    numberList: [],
    accessoryList: [],
    remarkList: []
  }
  const requestBody = {
    company_id: companyId.value,
    entity_code: selectEntityCode.value,
    entity_type: selectEntityType.value,
    event_code: row.propertyEnglish,
    role_type: roleName.value,
    type: typeName.value,
  }
  // 保存当前requestBody以及主体信息保存到pinia
  companyStore.setToListBody({
    ...requestBody,
    code_name: entityInfo.value.codeName,
    type_name: entityInfo.value.typeName,
    event_name: entityInfo.value.eventName,
    role_name: roleName.value === '04' ? '管理员' : '工人'
  })

  console.log('当前角色和类型', roleName.value, typeName.value)
  if (roleName.value === '' || typeName.value === '') {
    ElMessage({
      message: '选择角色和类型',
      type: 'warning',
    })
    return;
  }
  // console.log('请求数据', requestBody);

  const res = await company2Api.getCompanyEventProperty(requestBody)
  // console.log('查询属性结果', res)
  // 保存objectCode
  selectObjectCode.value = res[0].objectCode
  // const res = null
  res.forEach(item => {
    if (item.propertyEnglish.charAt(0) === 'f') {
      propertyList.value.fieldList.push(item)
    } else if (item.propertyEnglish.charAt(0) === 'n') {
      propertyList.value.numberList.push(item)
    } else if (item.propertyEnglish.charAt(0) === 'a') {
      propertyList.value.accessoryList.push(item)
    } else if (item.propertyEnglish.charAt(0) === 'r') {
      propertyList.value.remarkList.push(item);
    } else {
      propertyList.value.otherList.push(item);
    }
  })
  // 如果其中一个数组为空则默认填充一条记录
  if (propertyList.value.fieldList.length === 0) {
    propertyList.value.fieldList.push({propertyEnglish: 'field0', value: 'char', propertyLength: '32'});
  }
  if (propertyList.value.numberList.length === 0) {
    propertyList.value.numberList.push({propertyEnglish: 'number0', value: 'num', propertyLength: '32'})
  }
  if (propertyList.value.accessoryList.length === 0) {
    propertyList.value.accessoryList.push({propertyEnglish: 'accessory', value: 'char', propertyLength: '32'})
  }
  if (propertyList.value.remarkList.length === 0) {
    propertyList.value.remarkList.push({propertyEnglish: 'remark', value: 'char', propertyLength: '256'});
  }
  // console.log(propertyList.value);
}

// 新增field属性
const addFieldProperty = (item) => {
  let selectNum = Number(item.propertyEnglish.slice(-1))
  console.log(selectNum)
  // 如果当前项已经是9则无法添加
  if (selectNum === 9) {
    ElMessage({
      message: '当前已到添加上限',
      type: 'warning',
    })
    return;
  }
  for (let i = 0; i < propertyList.value.fieldList.length; i++) {
    const item = propertyList.value.fieldList[i];
    const num = Number(item.propertyEnglish.slice(-1));
    console.log(num);
    // 如果下一项已经存在则不可添加
    if (num === (selectNum + 1)) {
      console.log('选择的相等了')
      ElMessage({
        message: '请勿重复添加',
        type: 'warning',
      })
      return;
    }
  }
  propertyList.value.fieldList.push({propertyEnglish: 'field' + (selectNum + 1), value: 'char'})
}
// 增加number
const addNumber = item => {
  let selectNum = Number(item.propertyEnglish.slice(-1))
  console.log('当前选择的尾号', selectNum)
  // 转换第一个非数字格式
  selectNum = isNaN(selectNum) ? 0 : selectNum;
  // 如果当前项已经是5则无法添加
  if (selectNum === 5) {
    ElMessage({
      message: '当前已到添加上限',
      type: 'warning',
    })
    return;
  }
  for (let i = 0; i < propertyList.value.numberList.length; i++) {
    const num = Number(propertyList.value.numberList[i].propertyEnglish.slice(-1))
    console.log('numberList中的尾号', num)
    if (num === (selectNum + 1)) {
      console.log('选择的相等了')
      ElMessage({
        message: '请勿重复添加',
        type: 'warning',
      })
      return;
    }
  }
  propertyList.value.numberList.push({propertyEnglish: 'number' + (selectNum + 1), value: 'num'})
}
// 添加accessory
const addAccessory = item => {
  let selectNum = Number(item.propertyEnglish.slice(-1))
  console.log('当前选择的尾号', selectNum)
  // 转换第一个非数字格式
  selectNum = isNaN(selectNum) ? 0 : selectNum;
  // 如果当前项已经是5则无法添加
  if (selectNum === 5) {
    ElMessage({
      message: '当前已到添加上限',
      type: 'warning',
    })
    return;
  }
  for (let i = 0; i < propertyList.value.accessoryList.length; i++) {
    const num = Number(propertyList.value.accessoryList[i].propertyEnglish.slice(-1))
    console.log('numberList中的尾号', num)
    if (num === (selectNum + 1)) {
      console.log('选择的相等了')
      ElMessage({
        message: '请勿重复添加',
        type: 'warning',
      })
      return;
    }
  }
  propertyList.value.accessoryList.push({propertyEnglish: 'accessory' + (selectNum + 1), value: 'char'})
}
// 新增备注
const addRemark = item => {
  let selectNum = Number(item.propertyEnglish.slice(-1))
  console.log('当前选择的尾号', selectNum)
  // 转换第一个非数字格式
  selectNum = isNaN(selectNum) ? 0 : selectNum;
  // 如果当前项已经是2则无法添加
  if (selectNum === 2) {
    ElMessage({
      message: '当前已到添加上限',
      type: 'warning',
    })
    return;
  }
  for (let i = 0; i < propertyList.value.remarkList.length; i++) {
    const num = Number(propertyList.value.remarkList[i].propertyEnglish.slice(-1))
    console.log('numberList中的尾号', num)
    if (num === (selectNum + 1)) {
      console.log('选择的相等了')
      ElMessage({
        message: '请勿重复添加',
        type: 'warning',
      })
      return;
    }
  }
  propertyList.value.remarkList.push({propertyEnglish: 'remark' + (selectNum + 1), value: 'char'})
}

// 跳转页面
const toList = (item) => {
  // 填充参数到pinia然后跳转
  console.log(item)
  const {propertyChinese, propertyEnglish} = item
  // 填充参数到pinia
  companyStore.setToListBody(
      {
        ...companyStore.toListBody,
        propertyChinese,
        propertyEnglish
      }
  )
  // 跳转路由
  router.push('/list')
}

// 选择类型
const selectType = (value, index) => {
  console.log(value, index)
  typeIndex.value = index
}

// 选择角色
const selectRole = (value, index) => {
  console.log(value, index)
  roleIndex.value = index
};

// 当前选中的主体信息
const selectEntityInfo = ref({isShow: false})

// 获取事件
const handleEvent = async (index, row) => {
  // 保存当前entityCode和entityType
  selectEntityCode.value = row.entityCode
  selectEntityType.value = row.entityType
  propertyTable.value = []
  console.log('当前行数据', row)
  // 获取并保存当前行数据
  const {codeName, entityCode, entityType, typeName} = row
  console.log('当前选中的信息', codeName, entityCode, entityType, typeName)
  selectEntityInfo.value.codeName = codeName === '' ? '空' : codeName
  selectEntityInfo.value.entityCode = entityCode === '' ? '空' : entityCode
  selectEntityInfo.value.entityType = entityType === '' ? '空' : entityType
  selectEntityInfo.value.typeName = typeName === '' ? '空' : typeName
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
    entity_code: row.entityCode,
    entity_type: row.entityType,
    object_code: router2List.value[index].objectCode
  }
  const res = await company2Api.getEntityEventList2(requestBody)
  // console.log('事件查询返回结果', res)
  res.forEach(item => {
    propertyTable.value.push({
      propertyEnglish: item.eventCode2,
      propertyChinese: item.eventName2,
    })
  })
}


// 提交增加属性信息
const onSubmit = async () => {
  // 将propertyList组装成json字符串
  // console.log(propertyList.value)
  let requestArr = []
  for (let key in propertyList.value) {
    // console.log('当前的键值对：', key, propertyList.value[key])
    propertyList.value[key].forEach(item => {
      if (item.propertyChinese !== undefined && item.propertyChinese !== '') {
        // 解构相应对象
        const {propertyChinese, propertyEnglish, propertyType, propertyLength} = item
        requestArr.push({propertyChinese, propertyEnglish, propertyType, propertyLength})
      }
    })
  }
  console.log(requestArr)
  // 转json，注意js对象转换成json格式必须加上encodeURIComponent方法，否则无法传输
  const jsonStr = encodeURIComponent(JSON.stringify(requestArr))

  const requestBody = {
    company_id: companyId.value,
    entity_code: selectEntityCode.value,
    entity_type: selectEntityType.value,
    property_list: jsonStr,
    event_code: selectEventCode.value,
    object_code: selectObjectCode.value
  }
  console.log('当前添加条件', requestBody)
  const res = await company2Api.addCompanyEventProperty(requestBody)
  // const res = null
  // 若响应码为1则表示添加成功
  if (res.code === 1) {
    ElMessage({
      message: '添加成功',
      type: 'success',
    })
  }
  console.log(res);
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

const selectFn2 = (code, index) => {
  entityCode2.value = code
  // 获取之前先清空子实体数组
  entityChildArr2.value = []
  // 根据主体名称获取当前主体项中的子主体列表
  console.log(allEntityList.value)
  allEntityList.value.forEach(item => {
    // console.log(code === item.entityCode)
    if (code === item.entityCode) {
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


// 获取事件列表函数
const childEntityClick = async (code, index) => {
  console.log(code)
  // 定义事件列表请求体
  const requestBody = {
    company_id: companyId.value,
    entity_code: entityCode.value,
    entity_type: code,
    // company_id: '50031',
    //  entity_code: '303',
    // entity_type: '32'
  }
  // 调用远程方法获取事件列表
  const res = await company2Api.getCompanyEntityEvent(requestBody)
  console.log('event res = ', res)
  // 渲染事件列表
  res.forEach(item => {
    eventList.value.push({value: item.eventCode, label: item.eventName})
  })

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
  console.log(code2)
  // 定义事件列表请求体
  const requestBody2 = {
    entity_code: "000",
    entity_type: "00",
    //  event_name:null,
    // company_id: companyId.value,
    // entity_code: entityCode2.value,
    // entity_type: code2,
    // company_id: '50031',
    // entity_code: '303',
    // entity_type: '32'
  }
  // 调用远程方法获取事件列表
  const res = await company2Api.getCompanyEntityEvent(requestBody2)
  console.log('entity res2 = ', res)
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


// 获取角色列表
const getRouter = async () => {
  // 先清空列表
  tableList.value = []
  roleArr.value = []
  // 获取角色
  const roleRes = await company2Api.getCompanyRole({company_id: companyId.value})
  roleRes.forEach(item => {
    roleArr.value.push({
      value: item.role_type,
      label: item.role_name
    })
  })
  // 构造请求对象
  console.log('当前主体代码类型', entityInfo.value.entityCode === undefined)
  const requestBody = {
    company_id: companyId.value,
    entity_code: entityInfo.value.entityCode === undefined ? '' : entityInfo.value.entityCode,
    entity_type: entityInfo.value.entityType === undefined ? '' : entityInfo.value.entityType,
    scene_code_type: '104'
  }
  // const requestBody = {
  //   company_id: '50032',
  //   entity_code: '',
  //   entity_type: '',
  //   scene_code_type: '104'
  // }
  const res = await company2Api.getEntityPageRouter(requestBody)
  // 保存表格数据
  router2List.value = res
  console.log(res)
  res.forEach(item => {
    tableList.value.push({
      entityCode: item.entityCode,
      codeName: item.codeName,
      entityType: item.entityType,
      typeName: item.typeName,
      eventCode: item.objectCodeType,
      eventName: item.objectCodeName,
      sceneCodeName: item.sceneCodeName,
      sceneCodeType: item.sceneCodeType,
    })
  })

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


// 新增函数
const addEvent = async () => {
  // console.log('实体信息1', entityInfo.value)
  // console.log('实体信息2', entityInfo2.value)
  // console.log('角色列表',roleArr.value)
  // console.log('角色列表项',roleArr.value[roleIndex.value])
  // 构造请求条件
  const requestBody = {
    company_id: companyId.value,
    company_name: "西安家具定制",
    role_type: roleArr.value[roleIndex.value].value,
    entityCode: entityInfo.value.entityCode,
    entityType: entityInfo.value.entityType,
    codeName: entityInfo.value.codeName,
    typeName: entityInfo.value.typeName,
    entityCode2: entityInfo2.value.entityCode,
    entityType2: entityInfo2.value.entityType,
    codeName2: entityInfo2.value.codeName,
    typeName2: entityInfo2.value.typeName,
    eventCode2: entityInfo2.value.eventCode,
    eventName2: entityInfo2.value.eventName
  }
  console.log('当前新增条件为', requestBody)
  // 先定义响应结果
  let res = null;
  // 判断是pc端还是小程序端
  // console.log('当前类型',typeName.value,'01')
  // console.log(typeName.value === '01')
  if (typeName.value === '02') {
    console.log('调用小程序增加接口')
    res = await company2Api.BusEntityEventServlet(requestBody)
  } else if (typeName.value === '01') {
    console.log('调用PC增加接口')
    res = await company2Api.BusEntityEventServlet2(requestBody)
  }
  if (res.code === 1) {
    ElMessage({
      message: '添加成功',
      type: 'success',
    })
  }
  console.log(res);
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
}

// onMounted内部必须是一个箭头函数，内部函数体为一个需要执行的方法
onMounted(() => {
  // 页面挂载后初始化
  init()
})
</script>


<style scoped lang="scss">
.main {
  .left {
    float: left;
    width: 860px;

    .el-button + .el-button {
      margin: 0;
    }

    .companyInfo {
      .in {
        width: 100px;
        margin-right: 20px;
      }
    }
  }

  .right {
    float: right;
    width: 500px;

    .form_item {
      width: 83px;
      margin-right: 10px;
    }

    .el-form-item__label {
      width: 100px;
    }

    .form_item:last-child {
      margin: 0;
    }
  }


}
</style>