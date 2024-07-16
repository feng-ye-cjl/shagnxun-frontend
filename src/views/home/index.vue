<template>
  <div class="main">
    <div class="left">
      <div class="select">
        <!--公司id-->
        <el-input class="in" v-model="companyId" placeholder="公司id" @keyup.enter="getCompanyEntity"
                  style="width: 100px; margin-right: 50px"/>
        <!--   根据id查询公司实体列表按钮     -->
        <el-button type="primary" @click="getCompanyEntity">确认</el-button>
      </div>
      <div class="select">
        <!--类型-->
        <el-select
            v-model="typeName"
            placeholder="类型"
            style="width: 150px;margin-right: 30px">
          <el-option
              v-for="item in typeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click="selectTypeFn(item.value)"
          />
        </el-select>
        <!--主体-->
        <el-select
            v-model="entityName"
            placeholder="主体"
            style="width: 150px;margin-right: 30px">
          <el-option
              v-for="item in entityArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click="selectFn(item.value)"
          />
        </el-select>
        <!--子主体-->
        <el-select
            v-model="entityChildName"
            placeholder="子主体"
            style="width: 150px;margin-right: 50px">
          <el-option
              v-for="item in entityChildArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click="getCompanyDetail(item.value)"
          />
        </el-select>
      </div>
      <!--   公司信息输入框   -->
      <div class="companyInfo">
        <el-input class="in" v-model="entityInfo.groupEntityCode" placeholder="类型代码"/>
        <el-input class="in" v-model="entityInfo.entityCode" placeholder="主体代码"/>
        <el-input class="in" v-model="entityInfo.codeName" placeholder="主体名称"/>
        <el-input class="in" v-model="entityInfo.entityType" placeholder="子主体代码"/>
        <el-input class="in" v-model="entityInfo.typeName" placeholder="子主体名称"/>
        <!--   新增按钮     -->
        <el-button type="primary" @click="addCompanyEntityClick">新增</el-button>
      </div>
      <!--公司主体和子主体表格-->
      <el-table :data="entityList" style="width: 100%; border-radius: 10px">
        <el-table-column align="center" label="类型代码" prop="groupEntityCode"/>
        <el-table-column align="center" label="类型名称" prop="groupEntityName"/>
        <el-table-column align="center" label="主体代码" prop="entityCode"/>
        <el-table-column align="center" label="主体名称" prop="codeName"/>
        <el-table-column align="center" label="子主体代码" prop="entityType"/>
        <el-table-column align="center" label="子主体名称" prop="typeName"/>
        <el-table-column align="center">
          <template #header>
            操作
          </template>
          <template #default="scope">
            <!--按钮改成复选框-->
            <el-select
                v-model="entityList[scope.$index].selectOption"
                placeholder="操作"
                style="width: 82px;margin-right: 30px">
              <el-option
                  v-for="(item) in optionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  @click="selectOption(item,scope.$index, scope.row)"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="right">
      <!--   表单   -->
      <el-form :model="form">
        <div v-show="selectEntityInfo.isShow">
          <el-text class="mx-1" size="large">
            当前主体信息：{{ selectEntityInfo.entityCode }}---{{ selectEntityInfo.codeName }}
            {{ selectEntityInfo.entityType }}---{{ selectEntityInfo.typeName }}
          </el-text>
          <el-text class="mx-1" size="large">
            当前主体属性：{{ entitypropertyflag }}
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
          <el-button
              size="small"
              type="info"
              @click="toCompany(item)">
            公式
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
import {ref, reactive, onMounted} from 'vue'
import companyApi from "@/apis/company.js";
import {useRouter} from "vue-router";
import {useCompanyStore} from "@/stores/company.js";
import {ElMessage} from "element-plus";
import company2Api from "@/apis/company2.js";

// 使用pinia
const companyStore = useCompanyStore()
// 路由
const router = useRouter()
// 类型列表
const typeArr = ref([])
// 主体名称列表
const entityArr = ref([])
// 所有主体列表
const allEntityList = ref([])
// 子主体列表
const entityChildArr = ref([])
// {value:'111',label:'111}
// 当前主体名称
const entityCode = ref('')

// const entityType = ref('')

const typeName = ref('')
// 当前主体名称
const entityName = ref('')
// 当前子主体名称
const entityChildName = ref('')
const entityInfo = ref({})
// 当前属性列表数据
const propertyList = ref({
  otherList: [],
  fieldList: [],
  numberList: [],
  accessoryList: [],
  remarkList: []
})
// 属性类型列表
const propertyTypeList = ref([
  {value: 'char', label: 'char'},
  {value: 'char0', label: 'char0'},
  {value: 'dic', label: 'dic'},
  {value: 'list10', label: 'list10'},
  {value: 'list11', label: 'list11'},
  {value: 'image', label: 'image'},
])
// 当前选中的作为属性查询的entityCode和entityType
const selectEntityCode = ref('')
const selectEntityType = ref('')
const selectCodeName = ref('')
const selectTypeName = ref('')

// 跳转到公司页面
const toCompany = item => {
  console.log(item)
  // 设置当前属性到pinia
  companyStore.setCompanyInfo({
    ...companyStore.companyInfo,
    propertyChinese: item.propertyChinese,
    propertyEnglish: item.propertyEnglish,
  })
  // // 路由跳转
  router.push('/formula')
};


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

// 提交增加属性信息
const onSubmit = async () => {
  // 将propertyList组装成json字符串
  // console.log(propertyList.value)
  let requestArr = []
  for (let key in propertyList.value) {
    console.log('当前的键值对：', key, propertyList.value[key])
    propertyList.value[key].forEach(item => {
      if (item.propertyChinese !== undefined && item.propertyChinese !== '') {
        // 解构相应对象
        const {propertyChinese, propertyEnglish, propertyType, propertyLength} = item
        requestArr.push({propertyChinese, propertyEnglish, propertyType, propertyLength})
      }
    })
  }
  // requestArr.push({"主体编号", "entityNo", "char", "32"})
  console.log(requestArr)
  // 转json，注意js对象转换成json格式必须加上encodeURIComponent方法，否则无法传输
  const jsonStr = encodeURIComponent(JSON.stringify(requestArr))

  const requestBody = {
    company_id: companyId.value,
    entity_code: selectEntityCode.value,
    entity_type: selectEntityType.value,
    code_name: selectCodeName.value,
    type_name: selectTypeName.value,
    property_list: jsonStr
  }
  console.log('当前添加条件', requestBody)
  const res = await company2Api.addCompanyEntityProperty(requestBody)
  // 若响应码为1则表示添加成功
  if (res.code === 1) {
    ElMessage({
      message: '本公司主体属性添加成功',
      type: 'success',
    })
  }
  console.log(res);

  if (entitypropertyres1.value === 0) {
    //如果通用主体属性也没有，则也增加通用主体属性
    const requestBody1 = {
      company_id: "101",
      entity_code: selectEntityCode.value,
      entity_type: selectEntityType.value,
      code_name: selectCodeName.value,
      type_name: selectTypeName.value,
      property_list: jsonStr
    }
    console.log('当前添加条件', requestBody)
    const res1 = await company2Api.addCompanyEntityProperty(requestBody1)
    // 若响应码为1则表示添加成功
    if (res1.code === 1) {
      ElMessage({
        message: '通用主体属性添加成功',
        type: 'success',
      })
    }

  }


}
// 操作列表
const optionList = ref([
  {
    value: '01',
    label: '属性'
  },
  {
    value: '02',
    label: '删除'
  },
  {
    value: '03',
    label: '消息'
  },
  {
    value: '04',
    label: '页面'
  },
  {
    value: '05',
    label: '事件'
  },
  {
    value: '06',
    label: '弹框'
  }
])
// 当前选中的主体信息
const selectEntityInfo = ref({isShow: false})
// 操作下拉框函数
const selectOption = (item, index, row) => {
  // 根据index判断当前是什么操作
  if (item.value === '01') {
    console.log('属性')
    queryProperty(index, row)
  } else if (item.value === '02') {
    console.log('删除')
    handleDelete(index, row)
  } else if (item.value === '03') {
    console.log('消息')
    handleJump(index, row)
  } else if (item.value === '04') {
    console.log('页面')
    toPage(index, row)
  } else if (item.value === '05') {
    console.log('事件');
    toEvent(index, row);
  } else {
    console.log('弹框')
    // toDialog(index, row)
  }
  // 给当前主体信息赋值
  selectEntityInfo.value = entityList.value[index];
  selectEntityInfo.value.isShow = true
  console.log('当前entityCode', selectEntityInfo.value.entityCode);
  entityInfo.value.groupEntityCode = selectEntityInfo.value.groupEntityCode;
  entityInfo.value.entityCode = selectEntityInfo.value.entityCode;
  entityInfo.value.codeName = selectEntityInfo.value.codeName;
  entityInfo.value.entityType = selectEntityInfo.value.entityType;
  entityInfo.value.typeName = selectEntityInfo.value.typeName;
}

// 查询属性
const queryProperty = async (index, row) => {
  console.log('当前行属性条件', index, row)
  // 保存信息到pinia
  companyStore.setCompanyInfo({
    companyId: row.companyId,
    entityCode: row.entityCode,
    codeName: row.codeName,
    entityType: row.entityType,
    typeName: row.typeName
  })
  // 保存当前entityCode和entityType
  selectEntityCode.value = row.entityCode
  selectEntityType.value = row.entityType

  selectCodeName.value = row.codeName
  selectTypeName.value = row.typeName
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
    entity_code: row.entityCode,
    entity_type: row.entityType
  }
  // console.log(requestBody)
  const res = await companyApi.getCompanyEntityProperty(requestBody)
  console.log("res", res);
  if (res.length === 0) {
    //本公司没有定义，从通用主体属性获取，通用company_id为101
    entitypropertyflag.value = "通用主体属性";
    const requestBody1 = {
      company_id: "101",
      entity_code: row.entityCode,
      entity_type: row.entityType
    }
    // console.log(requestBody)
    const res1 = await companyApi.getCompanyEntityProperty(requestBody1)
    entitypropertyres1.value = res1.length;
    res1.forEach(item => {
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


  } else {
    entitypropertyflag.value = "本公司主体属性";
    entitypropertyres1.value = 1;
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
  }
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


// 删除按钮
const handleDelete = (index, row) => {
  console.log(index, row)
}

// 点击消息按钮跳转页面
const handleJump = (index, row) => {
  // 传递五项数据，公司id，主体代码，主体名称，子主体代码，子主体名称
  const companyInfo = {
    companyId: companyId.value,
    entityCode: row.entityCode,
    entityName: row.codeName,
    childEntityCode: row.entityType,
    childEntityName: row.typeName
  }
  console.log(companyInfo)
  // 将数据存入pinia
  companyStore.setCompanyInfo(companyInfo)
  console.log(companyStore.companyInfo)
  // 路由跳转
  router.push('/message')
}

// 跳转到页面
const toPage = (index, row) => {
  console.log(index, row)
  // 将公司数据存入pinia
  companyStore.setCompanyInfo({companyId: companyId.value})
  router.push('/page')
};

// 跳转到事件页面
const toEvent = (index, row) => {
  console.log(index, row)
  // 将公司数据存入pinia
  companyStore.setCompanyInfo(
      {
        companyId: companyId.value,
        entityCode: row.entityCode,
        codeName: row.codeName,
        entityType: row.entityType,
        typeName: row.typeName
      }
  )
  router.push('/event')
};

// 表格数据
// const tableData = ref([])
// 公司主体表格列表
const entityList = ref([])
// 公司id
const companyId = ref('')

const entitypropertyflag = ref('')
const entitypropertyres1 = ref('')

// 根据公司id获取公司列表数据用于渲染到表格
const getCompanyEntity = async () => {
  // 构造请求对象
  const requestBody = {
    company_id: companyId.value,
    group_entity_code: '101'
  }
  const res = await companyApi.getCompany(requestBody)
  console.log(res)
  entityList.value = res
  // 事件列表中每一项加上当前选择的操作名称
  entityList.value.forEach(item => {
    item.selectOption = ''
  });
}


/**
 * 添加公司实体
 * @return {Promise<void>}
 */
const addCompanyEntityClick = async () => {
  // 构造请求对象
  console.log('addCompanyEntity entityInfo', entityInfo);
  const requestBody = {
    company_id: companyId.value,
    group_entity_code: entityInfo.value.groupEntityCode,
    entity_code: entityInfo.value.entityCode,
    code_name: entityInfo.value.codeName,
    entity_type: entityInfo.value.entityType,
    type_name: entityInfo.value.typeName
  }
  const res = await companyApi.addCompanyEntity(requestBody)
  console.log(res)


  if (res.code === 1) {
    ElMessage({
      message: '本公司主体添加成功',
      type: 'success',
    })
  }

  // const res = await addCompanyEntity(requestBody)
  // console.log('主体增加返回', res);
  // entityList.value = res.filter(item => item.code === Number(companyId.value));
  // entityList.value = res
}


// 根据类型查找主体
const selectTypeFn = (code) => {
  // 获取之前先清空子实体数组和绑定的数据
  entityArr.value = []
  entityName.value = ''
  // 根据类型名称获取当前主体项中的子主体列表
  console.log('所有主体列表', allEntityList.value)
  console.log('主体code', code)
  allEntityList.value.forEach(item => {

    if (code === item.groupEntityCode) {
      console.log('主体item.groupEntityCode', item.groupEntityCode)
      if (item.entityType === '') {
        entityArr.value.push({
          value: item.entityCode,
          label: item.codeName,
        })
      }
    }
  })
  console.log('主体列表', entityArr.value);
}

// 根据主体查找子主体
const selectFn = (code) => {
  // 获取之前先清空子实体数组
  entityChildArr.value = []
  // 根据主体名称获取当前主体项中的子主体列表
  console.log('主体列表', allEntityList.value)
  entityCode.value = code
  allEntityList.value.forEach(item => {
    if (code === item.entityCode) {
      if (item.entityType !== '') {
        entityChildArr.value.push({
          value: item.entityType,
          label: item.typeName,
        })
      }
    }
  })

  console.log('主体code', entityCode.value)
  console.log('主体列表2', entityChildArr.value)
}


const getCompanyDetail = code => {
  console.log(allEntityList.value)
  console.log(code)
  allEntityList.value.forEach(item => {
    if (item.entityType === code && item.entityCode === entityCode.value) {
      entityInfo.value = {...item}
    }
  })
  console.log('entityInfo=', entityInfo.value.entityCode);
  console.log('entityInfo2=', entityInfo.value);

}


// 表单数据
// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

/**
 * 初始数据填充
 */
const initData = () => {
  typeArr.value.push({
    value: '101',
    label: '页面',

  })

  typeArr.value.push({
    value: '01',
    label: '售前',

  })
  typeArr.value.push({
    value: '02',
    label: '政务',

  })


  typeArr.value.push({
    value: '03',
    label: '产业',

  })
  typeArr.value.push({
    value: '04',
    label: '办公',

  })
  typeArr.value.push({
    value: '05',
    label: '生产',
  })


  typeArr.value.push({
    value: '06',
    label: '营销',

  })
  typeArr.value.push({
    value: '07',
    label: '交易',

  })
  typeArr.value.push({
    value: '08',
    label: '其他',
  })


  typeArr.value.push({
    value: '09',
    label: '法律',

  })
  typeArr.value.push({
    value: '10',
    label: '物业',

  })
  typeArr.value.push({
    value: '11',
    label: '物流',
  })


  typeArr.value.push({
    value: '12',
    label: '地图',

  })
  typeArr.value.push({
    value: '13',
    label: '工程',

  })
  typeArr.value.push({
    value: '14',
    label: '流程',
  })

  typeArr.value.push({
    value: '16',
    label: '财务',
  })

  typeArr.value.push({
    value: '17',
    label: '金融',
  })

  typeArr.value.push({
    value: '18',
    label: '文档',
  })

  typeArr.value.push({
    value: '19',
    label: '报告',
  })

  typeArr.value.push({
    value: '90',
    label: '售后',
  })
  typeArr.value.push({
    value: '99',
    label: '日志',
  })
};


// 初始化函数
const init = async () => {
  const requestBody = {
    company_id: "00000",
    group_entity_code: "000",
    entity_type: ""
  }
  initData();

  console.log("初始化，allEntityList requestBody", requestBody);
  // 使用封装的请求方法
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
  console.log('entityList = ', entityList.value)
  console.log('allEntityList = ', allEntityList.value)
}

// onMounted内部必须是一个箭头函数，内部函数体为一个需要执行的方法
onMounted(() => {
  // 页面挂载后初始化
  console.log("初始化")
  init()
})
</script>


<style scoped lang="scss">
.main {
  .left {
    float: left;
    width: 657px;

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