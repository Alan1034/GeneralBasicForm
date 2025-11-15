/** @format */

export enum FormType {
  /**
   * @description: 输入框
   * @return {*}
   */
  "input" = "input",
  /**
   * @description: 复杂输入框，可自定义前后缀和大小
   * @return {*}
   */
  "input-group" = "input-group",
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
   * @description: 响应式下拉框+带搜索的二级菜单/多选
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

export interface ItemType {
  type: FormType;
  // 扩展属性
  [key: string]: any;
}
