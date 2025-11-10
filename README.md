<!-- @format -->

# GeneralBasicForm

## 一个兼容 Vue2 、Vue3 和 React(未来实现) 的表单组件，支持 typescript，vue2 请使用@1 版本，Vue3 请使用@2 版本，React19 请使用@3 版本。

| 组件\兼容性               | vue2 | vue3 | Ant Design Vue（next） | Element Plus | Element（ui） | React19 | shadcn/ui |
| ------------------------- | ---- | ---- | ---------------------- | ------------ | ------------- | ------- | --------- |
| VGeneralBasicForm         | √    | √    |                        | √            | √             |         |           |
| VSearchBox                | √    |      |                        |              | √             |         |           |
| VInfiniteScrollList       |      | √    |                        | √            |               |         |           |
| VDescriptions             | √    | √    | √                      | √            | √             |         |           |
| VInputMobilecVerification |      | √    | √                      | √            |               |         |           |
| VInputGraphicVerification |      | √    | √                      | √            |               |         |           |
| VTreeTransfer             | √    | √    |                        | √            | √             |         |           |
| VTabs                     | √    |      |                        |              | √             |         |           |
| RGeneralBasicForm         |      |      |                        |              |               | √       | √         |
| RFormList                 |      |      |                        |              |               | √       | √         |
| RTabs                     |      |      |                        |              |               | √       | √         |

安装：npm i general-basic-form<br/>
install: npm i general-basic-form

webpack4 兼容：
加入配置：module.exports = {
transpileDependencies: ['general-basic-form'],
}

示例:

因为兼容性问题，目前只能使用完整引入

```
import { RGeneralBasicForm,RBasicForm } from 'general-basic-form';
```

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
    footFieldSetting={{ className: 'col-start-1 col-span-4 col-end-3 mb-8' }}
    fieldLabelSetting={{ className: "text-lg" }}
    coms={{
      Input,
      Button,
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
      SelectGroup,
    }} >
</RBasicForm>
```

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
    getList(queryParams); // 请求数据的函数
    afterReset(queryParams); // 在重置按钮点击完后但还没重新请求时触发的的函数
    formOnly:true // 只展示表单不展示按钮
    parametersType:"url" // 见parametersType类型介绍
    DBPrimaryKey: user_id // indexDB主键，配合indexDB使用
    loading:false // 加载动画
    formData:{} // 表单数据不完整
    noInputBlank: true //校验input框不能仅输入空格
    //例子：formData.value.x=y ✘ | formData.value={...formData.value,x:y} ✔
    currentPageKey:"page", //当前页数key
    pageSizeKey:"limit", //每页显示个数key
    defCurrentPage:1, //默认的页数
    defPageSize：10, //默认的每页显示个数
    queryWhenReady:false,//初始化完成后自动触发查找数据函数
    footFieldSetting: {} // 表单底部按钮设置
    fieldGroupSetting: {} // 表单分组设置
    fieldLabelSetting: {} // 表单字段label设置
    onFormChange(queryParams):表单数据变化时触发的函数
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
              heading:true, //是否显示标题
              dim: 3, // 多维数组，注意要和columns的长度相等，输出为对象数组
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
                      className: 'w-full',
                    },
                  },
              ],
            },
            fieldSetting: {
              className: 'col-span-2 col-start-2 mb-8',
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
                dim: 1, // 1维数组，输出为字符串数组
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
            type: 'checkbox-list',
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
      prop: 'test1',
      label: 'test1(多选)',
      type: 'checkbox',
      fieldSetting: {
        className: 'col-span-4',
      },
      setting: {
        placeholder: '请选择套餐',
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
          type: "command",
          setting:{
            placeholder:"请输入分类",
            empty:"搜索内容为空的提示",
          },
          options: [
            {
              label: "指南",
              value: "guide",
              separator:true, //分割线
              children: [
              {
                value: 'shejiyuanze',
                label: '设计原则',
                onSelect: (value) => {
                  console.log('Selected', value);
                },
                shortcut: 'ctrl+z', //选项右侧的内容
              },

              ],
            },
            {
              label: "资源",
              value: "resource",
              children: [
                {
                  value: "axure",
                  label: "Axure Components",
                }
              ],
            },
          ],
        },
            {
              label: '分类',
              prop: 'expense_category_id',
              type: 'combobox',
              setting: {
                placeholder: '请输入分类',
                empty: '搜索内容为空的提示',
              },
              fieldSetting: {
                className: fieldClassName,
              },
              options: [
                {
                  label: '指南',
                  value: '指南',
                  separator: true, //分割线
                  children: [
                    {
                      value: 'shejiyuanze',
                      label: '设计原则',
                      shortcut: 'ctrl+z', //选项右侧的内容
                    },
                  ],
                },
                {
                  label: '资源',
                  value: 'resource',
                  children: [
                    {
                      value: 'axure',
                      label: 'Axure Components',
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

 export enum FormType {
  /**
   * @description: 输入框
   * @return {*}
   */
  "input" = "input",
  /**
   * @description: 表单中的多维列表，可增减元素，内部可以使用的数据类型除自身form-list外同FormType
   * @return {*}
   */
  "form-list" = "form-list",
  /**
   * @description: 选择器
   * @return {*}
   */
  "select" = "select",
  /**
   * @description: 带搜索的二级菜单
   * @return {*}
   */
  "command" = "command",
  /**
   * @description: 响应式下拉框+带搜索的二级菜单
   * @return {*}
   */
  "combobox" = "combobox",
  /**
   * @description: 日期选择器
   * @return {*}
   */
  "date-picker" = "date-picker",

  /**
   * @description: 单选框
   * @return {*}
   */
  "radio" = "radio",
  // /**
  //  * @description: 自定义元素，插槽组件
  //  * @return {*}
  //  */
  // "form-item-slot" = "form-item-slot",
  /**
   * @description: 多选框
   * @return {*}
   */
  "checkbox" = "checkbox",
  /**
   * @description: 多选框列表，输入输出都是字符串列表 ["value1", "value2", "value3"]
   * @return {*}
   */
  "checkbox-list" = "checkbox-list",
}


