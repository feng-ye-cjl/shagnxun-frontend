<template>
  <div class="main">
    <div class="left">
      <div class="select">
        <!--公司id-->
        <el-input class="in" v-model="companyId" placeholder="公司id"
                  style="width: 100px; margin-right: 50px"/>
        <!--   根据id查询公司实体列表按钮     -->
        <el-button type="primary" @click="getCompanyEntity">确认</el-button>
      </div>
      <div class="select">
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
      <!--   公司信息   -->
      <div class="companyInfo">
        <el-input class="in" v-model="entityInfo.entityCode" placeholder="主体代码"/>
        <el-input class="in" v-model="entityInfo.codeName" placeholder="主体名称"/>
        <el-input class="in" v-model="entityInfo.entityType" placeholder="子主体代码"/>
        <el-input class="in" v-model="entityInfo.typeName" placeholder="子主体名称"/>
        <!--   新增按钮     -->
        <el-button type="primary">新增</el-button>
      </div>
      <!--公司主体和子主体表格-->
      <el-table :data="entityList" style="width: 100%">
        <el-table-column align="center" label="主体代码" prop="entityCode"/>
        <el-table-column align="center" label="主体名称" prop="codeName"/>
        <el-table-column align="center" label="子主体代码" prop="entityType"/>
        <el-table-column align="center" label="子主体名称" prop="typeName"/>
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
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="right">
      <!--   表单   -->
      <el-form :model="form" label-width="200px">
        <el-form-item
            :label="'field'+index"
            v-for="(item,index) in propertyList.fieldList"
            :key="item.propertyEnglish">
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyChinese"/>
          <el-input class="form_item" placeholder="类型" v-model="item.propertyType"/>
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyLength"/>
        </el-form-item>
        <el-form-item
            :label="item.propertyEnglish"
            v-for="item in propertyList.numberList"
            :key="item.propertyEnglish">
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyChinese"/>
          <el-input class="form_item" placeholder="类型" value="num"/>
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyLength"/>
        </el-form-item>
        <el-form-item
            :label="item.propertyEnglish"
            v-for="item in propertyList.accessoryList"
            :key="item.propertyEnglish">
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyChinese"/>
          <el-input class="form_item" placeholder="类型" v-model="item.propertyType"/>
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyLength"/>
        </el-form-item>
        <el-form-item
            :label="item.propertyEnglish"
            v-for="item in propertyList.remarkList"
            :key="item.propertyEnglish">
          <el-input class="form_item" placeholder="请输入" v-model="item.propertyChinese"/>
          <el-input class="form_item" placeholder="类型" v-model="item.propertyType"/>
          <el-input class="form_item" placeholder="长度" value="256"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<script setup>
import {computed, ref, reactive, onMounted} from 'vue'
import axios from "axios";
import {getCompanyAPI, getCompanyEntityProperty} from "@/apis/company.js";

// 主体名称列表
const entityArr = ref([])
// 所有主体列表
const allEntityList = ref([])
// 子主体列表
const entityChildArr = ref([])
// {value:'111',label:'111}
// 当前主体名称
const entityName = ref('')
// 当前子主体名称
const entityChildName = ref('')
// 输入框数据
const input = ref('')
// 表格数据
const search = ref('')
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
// 当前属性列表数据
const propertyList = ref({
  fieldList: [],
  numberList: [],
  accessoryList: [],
  remarkList: []
})
const handleEdit = async (index, row) => {
  // 先清空属性列表
  propertyList.value = {
    fieldList: [],
    numberList: [],
    accessoryList: [],
    remarkList: []
  }
  // console.log(row)
  const requestBody = {
    company_id: row.code,
    entity_code: row.entityCode,
    entity_type: row.entityType
  }
  // console.log(requestBody)
  // const res = await getCompanyEntityProperty(requestBody)
  const res = [
    {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "实体编号",
      "propertyEnglish": "entityNo",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "产品代码",
      "propertyEnglish": "field0",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "产品名称",
      "propertyEnglish": "field1",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "家具代码",
      "propertyEnglish": "field2",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "家具名称",
      "propertyEnglish": "field3",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "材料代码",
      "propertyEnglish": "field4",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "材料名称",
      "propertyEnglish": "field5",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "长",
      "propertyEnglish": "accessory1",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "宽",
      "propertyEnglish": "accessory2",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "高",
      "propertyEnglish": "accessory3",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "当前工种",
      "propertyEnglish": "accessory5",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "单位",
      "propertyEnglish": "field6",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "价格",
      "propertyEnglish": "number0",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "当前工单编号",
      "propertyEnglish": "field7",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "总价",
      "propertyEnglish": "number1",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "折后价",
      "propertyEnglish": "number2",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "备注",
      "propertyEnglish": "remark",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "总订单编号",
      "propertyEnglish": "field9",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "订单",
      "codeNo": "家具子订单",
      "codeType": "",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "订单名称",
      "propertyEnglish": "field8",
      "propertyLength": "32",
      "propertyType": "char",
      "typeName": "家具子订单"
    }, {
      "code": 0,
      "codeName": "null",
      "codeNo": "null",
      "codeType": "01",
      "entityCode": "303",
      "entityType": "32",
      "propertyChinese": "备注3",
      "propertyEnglish": "remark3",
      "propertyLength": "null",
      "propertyType": "char",
      "typeName": "null"
    }]
  res.forEach(item => {
    // console.log(item.propertyEnglish.charAt(0),item.propertyEnglish.charAt(0) === 'f')
    if (item.propertyEnglish.charAt(0) === 'f') {
      propertyList.value.fieldList.push(item)
    } else if (item.propertyEnglish.charAt(0) === 'n') {
      propertyList.value.numberList.push(item)
    } else if (item.propertyEnglish.charAt(0) === 'a') {
      propertyList.value.accessoryList.push(item)
    } else if (item.propertyEnglish.charAt(0) === 'r') {
      propertyList.value.remarkList.push(item);
    } else {
      console.log(item)
      console.log('目标数组不存在')
    }
  })
  console.log(propertyList.value)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}

// 表格数据
const tableData = ref([])
// 公司主体表格列表
const entityList = ref([])
// 公司id
const companyId = ref('')
// 根据公司id获取公司列表数据用于渲染到表格
const getCompanyEntity = async () => {
  // 构造请求对象
  const requestBody = {
    company_id: companyId.value,
    group_entity_code: '101'
  }
  /*axios.get(
      `http://140.143.154.96/day07/getCompanyEntitycode?company_id=${companyId.value}&group_entity_code=000`
  ).then(res => {
    // console.log(res.data)
    entityList.value = res.data.filter(item => item.code === id);
  })*/
  const res = await getCompanyAPI(requestBody)
  console.log(res)
  // entityList.value = res.filter(item => item.code === Number(companyId.value));
  entityList.value = res
}
// 根据主体查找子主体
const selectFn = (code) => {
  // 获取之前先清空子实体数组
  entityChildArr.value = []
  // 根据主体名称获取当前主体项中的子主体列表
  console.log(allEntityList.value)
  allEntityList.value.forEach(item => {
    // console.log(code === item.entityCode)
    if (code === item.entityCode) {
      entityChildArr.value.push({
        value: item.entityType,
        label: item.typeName,
      })
    }
  })
  console.log(entityChildArr.value)
}

const entityInfo = ref({})

const getCompanyDetail = code => {
  console.log(allEntityList.value)
  console.log(code)
  allEntityList.value.forEach(item => {
    if (item.entityType === code) {
      entityInfo.value = {...item}
    }
  })
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

// 表单提交
const onSubmit = () => {
  console.log('submit!')
}

// 初始化函数
const init = async () => {
  const requestBody = {
    company_id: '00000',
    group_entity_code: '000'
  }
  // console.log(requestBody)
  /*axios.get(
      `http://140.143.154.96/day07/getCompanyEntitycode?company_id=${requestBody.company_id}&group_entity_code=${requestBody.group_entity_code}`
  ).then(res => {
    allEntityList.value = res.data
    res.data.forEach(item => {
      entityArr.value.push({
        value: item.entityCode,
        label: item.codeName,
        childArr: []
      })
    })
    for (let i = 0; i < entityArr.value.length; i++) {
      for (let j = i + 1; j < entityArr.value.length; j++) {
        if (entityArr.value[i].value === entityArr.value[j].value) {
          entityArr.value.splice(j, 1)
        }
      }
    }
    console.log(entityArr.value)
  })*/
  // 使用封装的请求方法
  const res = await getCompanyAPI(requestBody)
  allEntityList.value = res
  res.forEach(item => {
    entityArr.value.push({
      value: item.entityCode,
      label: item.codeName,
      childArr: []
    })
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
  .left {
    float: left;
    width: 670px;

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