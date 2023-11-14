export enum FormType {
  /**
   * @description: 输入框
   * @return {*}
   */
  'input' = 'input',
  /**
   * @description: 输入框/图像验证码
   * @return {*}
   */
  'input-graphic-verification' = 'input-graphic-verification',
  /**
   * @description: 输入框/手机验证码
   * @return {*}
   */
  'input-mobile-verification' = 'input-mobile-verification',
  /**
   * @description: 分割线
   * @return {*}
   */
  'divider' = 'divider',
  /**
   * @description: 选择器
   * @return {*}
   */
  'select' = 'select',
  /**
   * @description: 级联选择器
   * @return {*}
   */
  'cascader' = 'cascader',
  /**
   * @description: 日期选择器
   * @return {*}
   */
  'date-picker' = 'date-picker',
  /**
   * @description: 数字输入框
   * @return {*}
   */
  'input-number' = 'input-number',
}

export interface ItemType {
  type: FormType;
  // 扩展属性
  [key: string]: any
};
