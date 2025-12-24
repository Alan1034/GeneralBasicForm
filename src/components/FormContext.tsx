import { createContext, useState, Dispatch, useReducer, useEffect, useMemo, useImperativeHandle } from "react";
import type { ItemType } from "../types/basicFrom";
import { HandleParamsData } from "network-spanner"

interface FormContextType {
  queryParams: any,
  message: { [key: string]: { message?: string, [key: string]: any }[] },
  formLoading: Boolean
  dispatchQueryParams: Dispatch<any>;
  getList: () => void;
  // 扩展属性
  [key: string]: any
}

const initialState: FormContextType = {
  queryParams: {},
  message: {},
  formLoading: false,
  dispatchQueryParams: () => { },
  getList: () => { }
};

export const FormContext = createContext(initialState);

const defProps = {
  formItem: [] as ItemType[],
  coms: {
    Button: []
  },
  getList: () => { },
  formData: {},
  loading: false,
  // showSearch : true,
  // formOnly : false,
  afterReset: () => { },
  // size,
  // labelWidth,
  noInputBlank: false,
  currentPageKey: "page",
  pageSizeKey: "pageSize",
  parametersType: "url",
  defCurrentPage: 1,
  DBPrimaryKey: null,
  defPageSize: 10,
  queryWhenReady: false,
}
export const FormProvider = (prop) => {
  const handleQuery = (queryParameter) => {
    HandleParamsData.handleQuery({
      queryParameter, vm: { ...defProps, ...prop }
    })
  }
  const props = { ...defProps, ...prop, handleQuery };
  const {
    formItem = [] as ItemType[],
    children,
    onFormChange = () => { },
    formData = {},
    loading = false,
    // afterReset = () => { },
    // size,
    // labelWidth,
    // parametersType="url",
    // DBPrimaryKey,
    // noInputBlank=false,
    // currentPageKey="page",
    // pageSizeKey="pageSize",
    // defCurrentPage=1,
    // defPageSize=10,
    queryWhenReady = false

  } = props;
  const [formLoading, setFormLoading] = useState(false);
  const [inited, setInited] = useState(false);
  const [message, setMessage] = useState({});
  const reducer = (state, action) => {
    const { data } = action;
    onFormChange({ ...data })
    return { ...data }
  }
  const calculateQueryParams = (propsFormData) => {

    const rawFormData = { ...propsFormData }
    let queryParams = {};
    formItem.forEach((item) => {
      if (item.prop) {
        queryParams[item.prop] = rawFormData[item.prop] || '';
      }
    });
    setInited(true)
    return queryParams;
  }
  const [queryParams, dispatchQueryParams] = useReducer(
    reducer,
    formData,
    calculateQueryParams
  );
  useMemo(() => {
    if (!inited) {
      return
    }
    const data = HandleParamsData.initQueryParams({
      vm: props,
      dispatchQueryParams,
    })
    dispatchQueryParams({ data })
  }, [inited])
  useImperativeHandle(props.ref, () => {
    return {
      formAction,
      queryParams
    }
  })
  const valid = async () => {
    // 读取表单数据
    let message = {}
    // for (const [key, value] of formData.entries()) {
    for (let i = 0; i < formItem.length; i++) {
      const item = formItem[i];
      const key = item.prop
      const value = queryParams[key]
      if (item && item.rules) {
        const newRules = HandleParamsData.getItemRules({
          item,
          vm: props
        })

        for (const rule of newRules) {
          try {
            if (rule.required && !value) {
              throw new Error(rule.message || `${item.label}不能为空`);
            }


            if (rule.pattern && !rule.pattern.test(value)) {
              throw new Error(rule.message || `${item.label}格式不正确`);
            }
            if (rule.validator) {
              await new Promise<void>((resolve, reject) => {
                const callback = (back) => {
                  if (back) {
                    reject(back)
                    return
                  }
                  resolve()
                }
                rule.validator(rule, value, callback);
              })
            }
          } catch (error) {
            if (!message[key]) {
              message[key] = []
            }
            message[key].push({ message: error.message || "校验失败" })
          }
        }
      }
    }
    setMessage({ ...message })
    return { ...message }
  }
  const action = async (formData) => {
    await valid()
  }
  const resetQuery = () => {
    HandleParamsData.resetQuery({
      vm: { ...props, handleQuery: null },
      dispatchQueryParams
    })
  }


  const formAction = async (formData) => {
    // HandleParamsData.handleQuery({
    //   queryParameter, vm: this
    // })
    // 读取表单数据
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value)
    // }
    const resMessage = await valid()
    if (Object.keys(resMessage).length == 0) {
      setFormLoading(true)
      await HandleParamsData.handleQuery({
        queryParameter: { defaultPageFirst: !queryWhenReady }, vm: { ...props, }, queryParams
      })
      setFormLoading(false)
    }
  }

  useEffect(() => { setFormLoading(loading) }, [loading])
  useEffect(() => { dispatchQueryParams({ data: { ...queryParams, ...formData } }) }, [JSON.stringify(formData)])
  return (
    <FormContext
      value={{
        ...props,
        dispatchQueryParams,
        queryParams,
        message,
        formLoading,
        action,
        resetQuery,
        formAction
      }}
    >
      {children}
    </FormContext>
  );
}