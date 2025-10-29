/** @format */

export enum FormType {
  /**
   * @description: 输入框
   * @return {*}
   */
  "input" = "input",
  /**
   * @description: 表单中的多维列表，可增减元素
   * @return {*}
   */
  "form-list" = "form-list",
  // /**
  //  * @description: 输入框/图像验证码
  //  * @return {*}
  //  */
  // 'input-graphic-verification' = 'input-graphic-verification',
  // /**
  //  * @description: 输入框/手机验证码
  //  * @return {*}
  //  */
  // 'input-mobile-verification' = 'input-mobile-verification',
  /**
   * @description: 分割线
   * @return {*}
   */
  "divider" = "divider",
  /**
   * @description: 选择器
   * @return {*}
   */
  "select" = "select",
  /**
   * @description: 级联选择器
   * @return {*}
   */
  "cascader" = "cascader",
  /**
   * @description: 日期选择器
   * @return {*}
   */
  "date-picker" = "date-picker",
  /**
   * @description: 数字输入框
   * @return {*}
   */
  "input-number" = "input-number",
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
}

export interface ItemType {
  type: FormType;
  // 扩展属性
  [key: string]: any;
}
