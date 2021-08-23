# GeneralBasicForm

一个Vue3表单组件 <br/>
示例:

    <GeneralBasicForm
      :showSearch="showSearch"
      :getList="getList"
      :formItem="formItem"
      :size="size"
      ref="generalBasicForm"
      labelWidth="90px"
    />
     ...一些传入插槽的内容
    </GeneralBasicForm>

![img](https://raw.githubusercontent.com/Alan1034/PicturesServer/main/PicGo_imgs/202108231121814.png)

数据示例:

    showSearch: true, // 显示搜索条件
    getList(); //请求数据的函数
    formItem: [ 
        { label: "款式名称", prop: "bsName", type: "input" },
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
        { label: "创建时间", prop: "create_time", type: "date-picker"
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

安装：npm i general-basic-form<br/>
install: npm i general-basic-form
