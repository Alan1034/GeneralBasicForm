# GeneralBasicForm

## 一个兼容 Vue2 、Vue3 和 React(未来实现)  的表单组件，支持typescript，vue2请使用@1版本，Vue3请使用@2版本

| 组件\兼容性         | vue2 | vue3 | Ant Design Vue（next） | Element Plus | Element（ui） |
| ------------------- | ---- | ---- | ---- | ---- | ---- |
| VGeneralBasicForm    | √    | √    |     | √   | √   |
| VSearchBox           | √    |      |      |  | √ |
| VInfiniteScrollList |      | √    |     | √   |     |
| VDescriptions       | √ | √    | √ | √   | √ |
| VInputMobilecVerification | | √ | √ | √ |  |
| VInputGraphicVerification | | √ | √ | √ |  |
| VTreeTransfer | √ |  |  |  | √ |
| VTabs | √ | | | | √ |

示例:

因为兼容性问题，目前只能使用完整引入

```
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
```

```
import { VGeneralBasicForm } from 'general-basic-form'
import 'general-basic-form/style'
```

    <VGeneralBasicForm
      :showSearch="showSearch"
      :getList="getList"
      :formItem="formItem"
      :size="size"
      ref="VGeneralBasicFormRef"
      labelWidth="90px"
      :noInputBlank="true"
    >
      <template v-slot:default>
        ...一些传入插槽的内容
      </template>
      <template v-slot:behind-the-button>
        <el-form-item>
          <div>上次同步时间：</div>
        </el-form-item>
      </template>
    </VGeneralBasicForm>

![image-20210903165502942](https://raw.githubusercontent.com/Alan1034/PicturesServer/main/PicGo_imgs/202109031655830.png)

在单纯作为表单的时候可以这样使用：

    <VGeneralBasicForm
        formOnly
        :formItem="formItem"
        size="small"
        ref="VGeneralBasicFormRef"
        :labelWidth="formLabelWidth"
        :formData: {
          // 外部传入的表单数据，用于回填
        }
        noUrlParameters
        :afterReset="afterReset"
        v-model:loading="loading"
      />
    
      <style lang="scss" scoped>
      :deep(.el-form-item) {
        margin-bottom: 16px;
      }
      :deep(.el-divider--horizontal) {
        margin: 8px 0px;
      }
      </style>

getList会传出默认的参数,首次请求时会有页数和分页大小,重置后会传出默认页数1

    async getList(
       params = {
         page: Number(this.$route.query.page) || 1,
         limit: Number(this.$route.query.limit) || 10,
       }
     ) {}

表单数据校验需要拿到内部表单的ref

    async getSmscode() {
      const VGeneralBasicFormRef = this.$refs['VGeneralBasicFormRef'] as any
      const state = await new Promise<boolean>((resolve, reject) => {
        VGeneralBasicFormRef.$refs['queryFormRef']?.validateField(
          'user_phone',
          async (valid: boolean, props?: FormItemProp[] | undefined) => {
            if (valid) {
              const { user_phone } = VGeneralBasicFormRef['queryParams']
              const res: any = await SmscodeList({ user_phone })
              if (res) {
                console.log(res)
                resolve(true)
              } else {
                resolve(false)
              }
            } else {
              resolve(false)
            }
          }
        )
      })
      return state
    },
    
    setup写法：
    const VGeneralBasicFormRef = ref()
    const params = await new Promise<any>((resolve, reject) => {
      VGeneralBasicFormRef.value.$refs['queryFormRef']?.validate(
        async (valid: boolean, props?: FormItemProp[] | undefined) => {
          if (valid) {
            const params = VGeneralBasicFormRef.value['queryParams']
            resolve(params)
          } else {
            reject()
          }
        }
      )
    })


![image-20211014191532067](https://raw.githubusercontent.com/Alan1034/PicturesServer/main/PicGo_imgs/202110141915657.png)

parametersType类型介绍

| parametersType形式 | 支持页面刷新 | 参数改变引起路由跳转 | 组件间共享数据 | 存储上限 | 浏览器兼容性 |
| ------------------ | ------------ | -------------------- | -------------- | -------- | ------------ |
| url                | 是           | 是                   | 是             | 中       | 高           |
| data               | 否           | 否                   | 否             | 高       | 高           |
| indexDB            | 是           | 否                   | 是             | 高       | 中           |

数据示例:

    showSearch: true, // 显示搜索条件
    getList(); // 请求数据的函数
    afterReset(); // 在重置按钮点击完后但还没重新请求时触发的的函数
    formOnly:true // 只展示表单不展示按钮
    parametersType:"url" // 见parametersType类型介绍
    loading:false // 加载动画
    formData:{} // 注意，因为可能出现的性能问题在组件watch formData的变化时没有使用deep，所以有时候深度的修改会不生效，导致表单数据不完整
    noInputBlank: true //校验input框不能仅输入空格
    //例子：formData.value.x=y ✘ | formData.value={...formData.value,x:y} ✔
    currentPageKey:"page", //当前页数key
    pageSizeKey:"limit", //每页显示个数key
    defCurrentPage:1, //默认的页数
    defPageSize：10, //默认的每页显示个数
    queryWhenReady:false,//初始化完成后自动触发查找数据函数，建议用这个this.$refs["VGeneralBasicFormRef"].handleQuery({ defaultPageFirst: false })
    formItem: [
    	{
          label: '',
          prop: 'bsName35',
          type: 'divider',
          setting: {
          },
          template: {
            default: () => {
              return "123123123";
            },
          },
        },
        { label: "款式名称",
          prop: "bsName",
          type: "input",
       	  setting: {
            placeholder: '请输入手机验证码',
            style: 'width: 100%'
          },
          rules: [
            {
              message: "请输入信息"
            },
            {
              pattern: /^\w+[\,\，\-\w' '#]+$/,
              message: "请输入正确的Invoice单号"
            }
          ],
          template: {
            suffix: () => {
              return <svg-icon icon-class="baifenbi" />;
            },
          },
    	},
        {
          label: "二次工艺",
          prop: "spName",
          type: "select",
          setting:{ multiple:true, //多选},
          option: [
            { value: "3", label: "满印" },
            { value: "1", label: "区域印花" },
            { value: "2", label: "绣花" },
          ],
        },
        { 
          label: "创建时间",
          prop: "create_time",
          type: "date-picker",
          setting: {
            "range-separator": "至",
          }
        },
        {
          label: "二次工艺成本价格（人民币分）",
          prop: "spCost",
          type: "input-number",
          "controls-position": "right",
          min: 0,
          rules: [
            {
              required: true,
              message: "请输入二次工艺成本价格",
              trigger: "blur",
            },
          ],
        },
        {
          label: '',
          prop: 'bsName2',
          type: 'input-graphic-verification',
          setting: {
            placeholder: '请输入图形验证码',
            style: 'width: 100%'
          },
          rules: [
            {
              message: '请输入图形验证码',
              trigger: 'blur'
            }
          ],
          graphicSrc, // 请求图像的URL
          getGraphic, // 重新请求图像的函数
          key:Math.random(),  // 必传，图像更新后必须更新。如果URL会变化也可以用URL代替
        },
        {
          label: '',
          prop: 'bsName3',
          type: 'input-mobile-verification',
          inputSetting: {
            placeholder: '请输入手机验证码',
            style: 'width: 100%'
          },
    	  buttonSetting: {
      		type: "text",
      		style: 'text-align: end',
    	  },
          rules: [
            {
              message: '请输入手机验证码',
              trigger: 'blur'
            }
          ],
          getSmscode,// 获取验证码的回调函数,获取失败必须返回false,否则计时器不会重新计算
        },
        {
          label: '是否必填',
          prop: 'is_optional',
          type: 'radio',
          setting: {
            disabled: true
          },
          option: [
            { value: '是', label: 'true',border: true },
            { value: '否', label: 'false' }
          ],
          rules: [
            {
              required: true,
              message: '请输入标签项名称',
              trigger: 'blur'
            }
          ]
        },
        {
          label: '多选',
          prop: 'is_multi',
          type: 'checkbox',
          setting: {
          },
          option: [
            { value: '是', label: 'true' },
            { value: '否', label: 'false' }
          ],
          rules: []
        },
        {
          label: '受访人',
          prop: 'contactors',
          type: 'form-item-slot',
          name: "contactors"
          // 插槽组件使用：
          // <VGeneralBasicForm ...>
          // 	<template #contactors>
          //		<div>一些组件
          //			一些组件
          //			<el-form-item prop="contactors">...</el-form-item>
          //		</div>
          //	</template>
      	  // </VGeneralBasicForm>
        },
        {
          label: "分类",
          prop: "分类",
          type: "cascader",
          setting:{},
          options: [
            {
              value: "zhinan",
              label: "指南",
              children: [
                {
                  value: "shejiyuanze",
                  label: "设计原则",
                  children: [
                    {
                      value: "yizhi",
                      label: "一致",
                    },
                    {
                      value: "fankui",
                      label: "反馈",
                    },
                    {
                      value: "xiaolv",
                      label: "效率",
                    },
                    {
                      value: "kekong",
                      label: "可控",
                    },
                  ],
                },
                {
                  value: "daohang",
                  label: "导航",
                  children: [
                    {
                      value: "cexiangdaohang",
                      label: "侧向导航",
                    },
                    {
                      value: "dingbudaohang",
                      label: "顶部导航",
                    },
                  ],
                },
              ],
            },
            {
              value: "ziyuan",
              label: "资源",
              children: [
                {
                  value: "axure",
                  label: "Axure Components",
                },
                {
                  value: "sketch",
                  label: "Sketch Templates",
                },
                {
                  value: "jiaohu",
                  label: "组件交互文档",
                },
              ],
            },
          ],
        },
      ],
    
      //rules为表单校验规则，每个组件都可以传入
    
      //input支持template,支持以下几个属性：
      //prefix	输入框头部内容，只对 type="text"（默认） 有效
      //suffix	输入框尾部内容，只对 type="text" 有效
      //prepend	输入框前置内容，只对 type="text" 有效
      //append	输入框后置内容，只对 type="text" 有效
      
      //divider支持template：
      //default
支持组件type:

 /**

  \* @description: 输入框

  */

 'input' = 'input',

 /**

  \* @description: 输入框/图像验证码

  */

 'input-graphic-verification' = 'input-graphic-verification',

 /**

  \* @description: 输入框/手机验证码

  */

 'input-mobile-verification' = 'input-mobile-verification',

 /**

  \* @description: 分割线

  */

 'divider' = 'divider',

 /**

  \* @description: 选择器

  */

 'select' = 'select',

 /**

  \* @description: 级联选择器

  */

 'cascader' = 'cascader',

 /**

  \* @description: 日期选择器

  */

 'date-picker' = 'date-picker',

 /**

  \* @description: 数字输入框

  */

 'input-number' = 'input-number',

 /**

  \* @description: 单选框

  */

 'radio' = 'radio',

 /**

  \* @description: 自定义元素，插槽组件

  */

 'form-item-slot'='form-item-slot',

 /**

  \* @description: 多选框

  */

 'checkbox'='checkbox',



# VInfiniteScrollList对虚拟滚动列表+接口的封装



![image-20231208165229296](https://raw.githubusercontent.com/Alan1034/PicturesServer/main/PicGo_imgs/202312081652392.png)

```
import { VInfiniteScrollList } from 'general-basic-form'
import 'general-basic-form/style'
<VInfiniteScrollList
  :search="search"
  id="user_id"
  name="name"
  ref="InfiniteScrollListRef"
  checkbox
  :extra="extraRender"
  :max="1"
 />
```
```
移动端配合下拉刷新使用
import { getOrderItem } from "../orderItem/functional"
// getOrderItem为JSX函数，返回一个VUE组件

<t-pull-down-refresh v-model="refreshing" @refresh="onRefresh" class="refresh-content">
      <VInfiniteScrollList :search="loadData" :checkbox="false" id="cancelId" ref="InfiniteScrollListRef" checkbox
        :extra="getOrderItem" height="100%" infinite-scroll-distance="50"/>
    </t-pull-down-refresh>
```
```
search：数据接口 (page: Number) => Promise<[]>
id：数据key值（唯一和选择值）
name：显示名字
checkbox：是否有多选功能，不传的话就是单纯的虚拟滚动列表
extra：同行额外显示的内容，(item: any) => VNode | String;
//el-checkbox有固定高度，如果需要配置高度比较高，例如有换行的自定义extra，最好处理一下样式，例子：
//:deep(.el-checkbox) {
//  padding: 6px 16px !important;
//  display: flex;
//  align-items: baseline;
//  height: auto;
//}
defaultSelection：包含数据key值的对象数组或者直接传入key值数组
height:默认272px String
```

```
 defineExpose({ reset, loadList, selectInfo, list, ifbottom });
 InfiniteScrollListRef?.value?.reset()：重置列表内容
 InfiniteScrollListRef?.value?.lowReset()：重置列表内容，但保留已选择的选项
 InfiniteScrollListRef?.value?.loadList()：向下滚动列表内容，受到loading和ifbottom的影响
 InfiniteScrollListRef?.value?.refreshList()：刷新列表，滚动列表会对整个内容重新请求数据，已选择的内容会自动选择
 InfiniteScrollListRef?.value?.selectInfo：选择的内容
 InfiniteScrollListRef?.value?.list：列表的内容
 InfiniteScrollListRef?.value?.ifbottom：是否到底部
 InfiniteScrollListRef?.value?.loading：加载中
```

# VDescriptions对展示描述列表的封装

![image-20231208182455415](https://raw.githubusercontent.com/Alan1034/PicturesServer/main/PicGo_imgs/202312081824708.png)

```
import { VDescriptions } from 'general-basic-form'
 <VDescriptions
  :formData="props.formData"
  :formItem="formItem"
  componentType="Ant Design Vue"
  ...其他el-descriptions的配置
 />
```

```
formData:Object
formItem:[ {
      label: '受访人',
      prop: 'contactors',
      render: (scope: any) => {
        const { $index, row = {} } = scope
        const { contactors = [] } = row
        const ele = (contactors.length > 0 ? <span>{contactors.map((item: any) => item.name).join("，")} </span> : null)
        return ele
      }
    },
    {
      label: '拜访详情',
      prop: 'detail',
      descriptionsItemProps:{
       'label-class-name': 'label-class-name'
      }
  }]
componentType:"Ant Design Vue"|"Element Plus"（默认）
strict:Boolean //使用strict参数后，如果formData内的某个字段没有值，对应的描述元素将不会展示（包括标签文字），但有render的字段仍然会展示
descriptionsItemProps:a-descriptions-item|el-descriptions-item的配置
```

# VInputMobilecVerification，VInputGraphicVerification表单里的图形验证码、手机验证码组件，可以单独引入

```
<VInputGraphicVerification :item="{同表单，可忽略label和rules字段}" :loading="loading"></VInputGraphicVerification>

<VInputMobilecVerification :item="{同表单，可忽略label和rules字段}" componentType="Ant Design Vue" ref="VInputMobilecVerificationRef"></VInputMobilecVerification>
```

```
componentType:"Ant Design Vue"|"Element Plus"（默认）
```

```
此用法下必须提供：
provide(/* 注入名 */ "queryParams", /* 表单值对象 */ queryParams);

componentType为Ant Design Vue需要提供：
import { Form } from 'ant-design-vue';
provide(/* 注入名 */ "Form", /* Ant Design Vue Form实例，用于表单数据更新等 */ Form);

可选：
provide("size", size); // 同组件size
provide("getList", getList); // 输入框回车触发

调用发送短信验证码和重置的方法
VInputMobilecVerificationRef.value.VerificationButtonRef.buttonClick()
VInputMobilecVerificationRef.value.VerificationButtonRef.reset()
```

安装：npm i general-basic-form<br/>
install: npm i general-basic-form

