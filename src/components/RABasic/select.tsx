import { useContext, useId, useEffect } from 'react';
import { FormContext } from "../FormContext";
import { Select } from 'antd';
export const ASelect = (props) => {
  const { item = {}, id = useId() } = props
  const {
    options = [],
  } = item

  const { dispatchQueryParams, queryParams, message, formLoading, } = useContext(FormContext);

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    // console.log(value)
    // if (item.setting.labelInValue) {
    //   dispatchQueryParams({ data: { ...queryParams, [item.prop]: value.value } })
    //   return
    // }
    // dispatchQueryParams({ data: { ...queryParams, [item.prop]: value } })
  };
  const handleSelect = (value: string | number | React.ReactNode, option: any) => {
    // console.log(value)
    dispatchQueryParams({ data: { ...queryParams, [item.prop]: value } })
  }

  return (
    <Select
      id={id}
      name={item.prop}
      value={queryParams[item.prop] || ""}
      onChange={handleChange}
      onSelect={handleSelect}
      loading={formLoading}
      options={options}
      aria-invalid={message?.[item.prop] && message?.[item.prop].length > 0}
      {...item.setting}
    />
  )
}