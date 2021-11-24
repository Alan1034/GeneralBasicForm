# GeneralBasicForm

一个兼容 Vue2 和 Vue3 的表单组件 <br/>
示例:

    <GeneralBasicForm
      :showSearch="showSearch"
      :getList="getList"
      :formItem="formItem"
      :size="size"
      ref="generalBasicForm"
      labelWidth="90px"
    >
     ...一些传入插槽的内容
    </GeneralBasicForm>

![image-20210903165502942](https://raw.githubusercontent.com/Alan1034/PicturesServer/main/PicGo_imgs/202109031655830.png)

在单纯作为表单的时候可以这样使用：

    <GeneralBasicForm
        formOnly
        :formItem="formItem"
        size="small"
        ref="generalBasicForm"
        :labelWidth="formLabelWidth"
        :formData: {
          // 外部传入的表单数据，用于回填
        }
        noUrlParameters
      />
    
      <style lang="scss" scoped>
      :deep {
        .el-form-item {
          margin-bottom: 22px;
        }
      }
      </style>

表单数据校验需要拿到内部表单的ref

    this.$refs["generalBasicForm"].$refs["queryFormRef"]    
      .validate(
        async (valid) => {
          if (valid) { 
            console.log(this.$refs["generalBasicForm"]["queryParams"]);
          }
        }
      );

![image-20211014191532067](https://raw.githubusercontent.com/Alan1034/PicturesServer/main/PicGo_imgs/202110141915657.png)

数据示例:

    showSearch: true, // 显示搜索条件
    getList(); // 请求数据的函数
    formOnly:true // 只展示表单不展示按钮
    noUrlParameters:true // 不接受和不改变url的参数
    formItem: [
        { label: "款式名称",
          prop: "bsName",
          type: "input",
          placeholder: "请输入图片名称/分类名称/图片标签",
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
          maxlength: "3000"},
        {
          label: "二次工艺",
          prop: "spName",
          type: "select",
          option: [
            { value: "3", desc: "满印" },
            { value: "1", desc: "区域印花" },
            { value: "2", desc: "绣花" },
          ],
        },
        { 
          label: "创建时间",
          prop: "create_time",
          type: "date-picker",
          "value-format": "yyyyMMdd"
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
          label: "分类",
          prop: "分类",
          type: "cascader",
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
      //分别支持input输入框，select单选框，date-picker日期选择器，cascader层级选择器 四种组件
      
      //date-picker可以传入'start-placeholder'和'end-placeholder'，其他组件支持placeholder传入
    
      //rules为表单校验规则，每个组件都可以传入
    
      //input支持template,支持以下几个属性：
      //prefix	输入框头部内容，只对 type="text"（默认） 有效
      //suffix	输入框尾部内容，只对 type="text" 有效
      //prepend	输入框前置内容，只对 type="text" 有效
      //append	输入框后置内容，只对 type="text" 有效
安装：npm i general-basic-form<br/>
install: npm i general-basic-form
