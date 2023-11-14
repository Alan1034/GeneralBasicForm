
export interface BasicFormComponentsProps {
  item: any;
  // queryParams: Object | String;
  // size:String;
  // getList?:Function
}


export interface InputGraphicVerification {
  graphicUrl?: string
  getGraphic?: Function
  key: string | number
};
export interface InputMobileVerification {
  getSmscode: Function
};
