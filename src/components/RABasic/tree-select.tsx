import { useContext, useId } from 'react';
import { FormContext } from "../FormContext";
import { TreeSelect } from 'antd';
import { treeData } from "./utils";
export const ATreeSelect = (props) => {
  const { item = {}, id = useId() } = props
  const {
    options = [],
  } = item

  const { dispatchQueryParams, queryParams, message, formLoading, } = useContext(FormContext);


  const handleChange = (newValue: string[]) => {
    // console.log(value)
    dispatchQueryParams({ data: { ...queryParams, [item.prop]: newValue } })
  }

  return (
    <TreeSelect
      id={id}
      name={item.prop}
      treeData={treeData(options)}
      value={queryParams[item.prop] || []}
      onChange={handleChange}
      loading={formLoading}
      options={options}
      aria-invalid={message?.[item.prop] && message?.[item.prop].length > 0}
      {...item.setting}
    />
  )
}