<!-- @format -->

# GeneralBasicForm

## 一个兼容 Vue2 、Vue3 和 React(未来实现) 的表单组件，支持 typescript，vue2 请使用@1 版本，Vue3 请使用@2 版本，React19请使用@3 版本。

| 组件\兼容性         | vue2 | vue3 | Ant Design Vue（next） | Element Plus | Element（ui） | React19 | shadcn/ui |
| ------------------- | ---- | ---- | ---- | ---- | ---- | ------------------- | ------------------- |
| VGeneralBasicForm    | √    | √    |     | √   | √   |    |    |
| VSearchBox           | √    |      |      |  | √ |  |  |
| VInfiniteScrollList |      | √    |     | √   |     |     |     |
| VDescriptions       | √ | √    | √ | √   | √ |  |  |
| VInputMobilecVerification | | √ | √ | √ |  |  |  |
| VInputGraphicVerification | | √ | √ | √ |  |  |  |
| VTreeTransfer | √ | √ |  | √ | √ |  |  |
| VTabs | √ | | | | √ |  |  |
| RGeneralBasicForm |  | | | |  | √ | √ |
| RFormList | | | | | | √ | √ |
| RTabs |  | | | |  | √ | √ |

安装：npm i general-basic-form<br/>
install: npm i general-basic-form

webpack4 兼容：
加入配置：module.exports = {
transpileDependencies: ['general-basic-form'],
}

示例:

因为兼容性问题，目前只能使用完整引入

```
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
```

```
import { RGeneralBasicForm,RBasicForm } from 'general-basic-form';
```

<RGeneralBasicForm
formItem={formItem}
getList={getList}
parametersType="data"
noInputBlank
formData={detail}
fieldGroupSetting={{ className: 'grid grid-cols-4 gap-4' }}

> </RGeneralBasicForm>

 <RBasicForm
              formItem={formItem}
              getList={getList}
              parametersType="data"
              noInputBlank
              formData={detail}
              fieldGroupSetting={{ className: 'grid grid-cols-4 gap-4' }}
              coms={{
                Input,
                Button,
                Select,
                SelectContent,
                SelectItem,
                SelectTrigger,
                SelectValue,
                SelectGroup,
              }}
            ></RBasicForm>
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

getList 会传出默认的参数,首次请求时会有页数和分页大小,重置后会传出默认页数 1

    async getList(
       params = {
         page: Number(this.$route.query.page) || 1,
         limit: Number(this.$route.query.limit) || 10,
       }
     ) {}

表单数据校验需要拿到内部表单的 ref

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

parametersType 类型介绍

| parametersType 形式 | 支持页面刷新 | 参数改变引起路由跳转 | 组件间共享数据 | 存储上限 | 浏览器兼容性 |
| ------------------- | ------------ | -------------------- | -------------- | -------- | ------------ |
| url                 | 是           | 是                   | 是             | 中       | 高           |
| data                | 否           | 否                   | 否             | 高       | 高           |
| indexDB             | 是           | 否                   | 是             | 高       | 中           |

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
    queryWhenReady:false,//初始化完成后自动触发查找数据函数
    formItem: [

        { label: "款式名称",
          prop: "bsName",
          type: "input",
          legend: '这是一个可选的标题',
       	  setting: {
            placeholder: '请输入手机验证码',
            style: 'width: 100%',
            required: true,
          },
      fieldSetting: {
        orientation: 'responsive',//表单布局-响应式
      },
          rules: [
            {
              message: "请输入信息",
                  required: true,
            },
            {
              pattern: /^\w+[\,\，\-\w' '#]+$/,
              message: "请输入正确的Invoice单号"
            },
                    {
          validator: (rule, value, callback) => {
            callback();
          },
        },
          ],
          separator: true, //分割线

          //template: {
          //  suffix: () => {
          //    return <svg-icon icon-class="baifenbi" />;
          //  },
          //},
    	},
          {
            label: '天数-价格配置',
            prop: 'prices',
            type: 'form-list',
            description: [
              '段落1',
              '段落2',
            ],
            separator: "text", //文字分割线
            setting: {
              ndim: 3, // 多维数组，注意要和columns的长度相等，输出为对象数组
              columns: [
                  {
                  prop: 'id',
                  label: '套餐ID',
                  type: 'input',
                  setting: {
                    placeholder: '请输入套餐ID',
                    disabled: true,
                    className: 'hidden',
                  },
                },
                {
                  prop: 'days',
                  label: '套餐名称',
                  type: 'input',
                  setting: {
                    required: true,
                    placeholder: '请输入套餐名称',
                    type: 'number'
                  },
                },
                  {
                    prop: 'serviceType',
                    label: '服务类型',
                    type: 'select',
                    option: [
                      { label: '到家服务', value: 'home_service' },
                      { label: '医院陪护', value: 'hospital_care' },
                    ],
                    setting: {
                      placeholder: '请选择服务类型',
                      required: true,
                    },
                  },
              ],
            },
            fieldSetting: {
              className: 'col-span-4',
            },
            rules: [
              {
                validator: (rule, value, callback) => {
                  console.log(value);
                  for (let i = 0; i < value.length; i++) {
                    const element = value[i];
                    if (!Number(element.days)) {
                      callback(new Error('请输入数字'));
                      return;
                    }
                  }
                  callback();
                },
              },
            ],
            removeItemAction: (item, index) => {
              // 删除项会触发此函数
              console.log(item, index);
            },
          },
           {
              label: '护士在线增值服务内容',
              prop: 'nursingCare',
              type: 'form-list',
              setting: {
                placeholder: ['请输入服务内容'],
                required: true,
                ndim: 1, // 1维数组，输出为字符串数组
              },
              fieldSetting: {
                className: 'col-span-2',
              },
              rules: [
                {
                  validator: (rule, value, callback) => {
                    for (let i = 0; i < value.length; i++) {
                      const element = value[i];
                      if (!element) {
                        callback(new Error('请输入服务内容'));
                        return;
                      }
                    }
                    callback();
                  },
                },
              ],
            },
         {
           prop: 'level',
           label: '等级',
           type: 'select',
           option: [
             { label: 'Y3', value: 'Y3' },
             { label: 'Y4', value: 'Y4' },
             { label: 'Y5', value: 'Y5' },
           ],
           setting: {
             placeholder: '请选择等级',
             required: true,
             multiple: true,
           },
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
            prop: 'level',
            label: '多选',
            legend: 标题',
            type: 'checkbox',
            gap: 3,
            option: [
              { label: 'Y3', value: 'Y3' },
              { label: 'Y4', value: 'Y4' },
              { label: 'Y5', value: 'Y5' },
            ],
            fieldSetting: {
              className: 'col-span-4',
            },
            setting: {
              placeholder: '请选择等级',
            },
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

支持组件 type:

/\*\*

- @description: 输入框
- @return {_}
  _/
  "input" = "input",
  /\*\*
- @description: 表单中的多维列表，可增减元素
- @return {_}
  _/
  "form-list" = "form-list",
  /\*\*
- @description: 分割线
- @return {_}
  _/
  "divider" = "divider",
  /\*\*
- @description: 选择器
- @return {_}
  _/
  "select" = "select",
  /\*\*
- @description: 级联选择器
- @return {_}
  _/
  "cascader" = "cascader",
  /\*\*
- @description: 日期选择器
- @return {_}
  _/
  "date-picker" = "date-picker",
  /\*\*

  /\*\*
- @description: 单选框
- @return {_}
  _/
  "radio" = "radio",

/\*\*

- @description: 多选框
- @return {_}
  _/
  "checkbox" = "checkbox",

