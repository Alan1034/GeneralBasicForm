import { useContext, useId, useEffect, useState, useImperativeHandle } from 'react';
import Checkbox from "../../RBasic/checkbox";
import { FormContext } from "../../BasicForm";
export const CheckboxList = (props) => {
  const { coms, item = {}, id = useId() } = props
  const { option = [], gap = 3 } = item
  const { setting = {}, prop = "" } = item
  const { value } = setting
  const { dispatchQueryParams, queryParams, } = useContext(FormContext);
  const [checkedList, setCheckedList] = useState([]);
  useImperativeHandle(props.ref, () => {
    return {
      checkedList: () => {
        return checkedList
      }
    }
  }, [checkedList])
  useEffect(() => {
    if (queryParams[prop] && Array.isArray(queryParams[prop])) {
      setCheckedList(queryParams[prop])
    }

  }, [JSON.stringify(queryParams)])
  useEffect(() => {
    if (value && Array.isArray(value)) {
      setCheckedList(value)
    }

  }, [value])
  const onCheckedChange = (props, checked) => {
    const { value } = props
    let newData = [...checkedList]
    if (checked === true) {
      newData = [...checkedList, value]
    }
    if (checked === false) {
      newData = checkedList.filter(item => item !== value)
    }
    newData = [...new Set([...newData])]
    setCheckedList(newData)
    if (setting.onChange) {
      // 兼容form-list
      setting.onChange(newData)
      return
    }
    dispatchQueryParams({ data: { ...queryParams, [prop]: newData } })
  }
  return (
    <div id={id}>
      {
        option.map((opt, index) => {
          const key = `${prop}-${opt.value}`
          const newItem = { ...item, ...opt, prop: key }
          newItem.setting = {
            ...newItem.setting,
            name: key,
            value: opt.value,
            checked: checkedList.includes(opt.value) || "",
            onCheckedChange: onCheckedChange.bind(this, { value: opt.value }),
          }
          return (
            <div className={`mb-${gap}`} key={key}>
              <Checkbox
                id={key}
                coms={coms}
                item={newItem}
              />
            </div>

          )
        })
      }
    </div>
  )
}