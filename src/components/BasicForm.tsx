import { createContext, useState, Dispatch, useReducer, useEffect, useMemo, useId } from "react";
import type { ItemType } from "../types/basicFrom";
import { TypeCom } from "../components/comType";
import { FormList } from "../components/CustomCom/form-list";
import { Spinner } from "../components/ui/spinner"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  // FieldContent,
  FieldLegend,
  FieldSeparator,
  // FieldSet,
  FieldError,
} from "./ui/field"
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
export const TasksDispatchContext = createContext(null);
const reducer = (state, action) => {
  const { data } = action;
  return { ...data }
}


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
export const BasicForm = (prop) => {
  const handleQuery = (queryParameter) => {
    HandleParamsData.handleQuery({
      queryParameter, vm: { ...defProps, ...prop }
    })
  }
  const props = { ...defProps, ...prop, handleQuery };
  const {
    formItem = [] as ItemType[],
    children,
    coms,
    // getList = () => { },
    formData = {},
    fieldGroupSetting = {},
    footFieldSetting = {},
    fieldLabelSetting = {},
    loading = false,
    // showSearch = true,
    // formOnly = false,
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
  const { Button } = coms
  const [formLoading, setFormLoading] = useState(false);
  const [inited, setInited] = useState(false);
  const [message, setMessage] = useState({});
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
    const data = HandleParamsData.initQueryParams({
      vm: props,
      dispatchQueryParams,
    })
    dispatchQueryParams({ data })
  }, [inited])
  const valid = async () => {
    // 读取表单数据
    let message = {}
    // for (const [key, value] of formData.entries()) {
    for (const [key, value] of Object.entries(queryParams)) {
      const item = formItem.find((item) => item.prop === key)
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
    <FormContext value={{ ...props, dispatchQueryParams, queryParams, message, formLoading }}>
      <form action={action}>
        <FieldGroup {...fieldGroupSetting}>
          {formItem.map((item, index) => {
            const id = useId();
            return (
              <Field key={item.prop}
                data-invalid={message?.[item.prop] && message?.[item.prop].length > 0}
                {...item.fieldSetting}>
                {item.legend && <FieldLegend
                  {...item.legend?.setting}
                >{item.legend?.legend || item.legend}</FieldLegend>}
                <FieldLabel htmlFor={id} {...fieldLabelSetting}>
                  {item.label}
                </FieldLabel>
                <TypeCom coms={coms} item={item} id={id} type={item.type}></TypeCom>
                {
                  /^form-list$/i.test(item.type) && (
                    <FormList
                      id={id}
                      coms={coms}
                      item={item}
                    />
                  )
                }
                {item.description && item.description.length > 0 &&
                  item.description.map((des, index) => {
                    return (
                      <FieldDescription key={index}>{des}</FieldDescription>
                    )
                  })}
                <FieldError errors={message?.[item.prop] || []} ></FieldError>
                {item.separator && <FieldSeparator>{item.separator}</FieldSeparator>}

              </Field>
            )
          })}
          {children}
          <Field orientation="horizontal" {...footFieldSetting}>
            <Button disabled={formLoading} formAction={formAction}>{formLoading ? <Spinner /> : []}提交</Button>
            <Button disabled={formLoading} variant="outline" type="button" onClick={resetQuery}>
              重置
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </FormContext>
  );
}

