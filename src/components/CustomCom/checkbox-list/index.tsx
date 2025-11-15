import { useContext, useId, useEffect } from 'react';
import Checkbox from "../../RBasic/checkbox";
import { FormContext } from "../../BasicForm";
export const CheckboxList = (props) => {
  const { coms, item = {}, id = useId() } = props
  const { option = [], gap = 3 } = item
  const { setting = {} } = item

  const { dispatchQueryParams, queryParams, } = useContext(FormContext);
  useEffect(() => {
    if (Object.prototype.toString.call(queryParams[item.prop]) !== '[object Array]') {
      dispatchQueryParams({ data: { ...queryParams, [item.prop]: [] } })
    }

  }, [JSON.stringify(queryParams)])
  const onCheckedChange = (props, checked) => {
    const { value } = props
    const rawData = queryParams[item.prop] || []
    let newData = [...rawData]
    if (checked === true) {
      newData = [...rawData, value]
    }
    if (checked === false) {
      newData = rawData.filter(item => item !== value)
    }
    newData = [...new Set([...newData])]
    if (setting.onChange) {
      setting.onChange(newData)
    }
    dispatchQueryParams({ data: { ...queryParams, [item.prop]: newData } })
  }
  return (
    <div id={id}>
      {
        option.map((opt, index) => {
          const key = `${item.prop}-${opt.value}`
          const newItem = { ...item, ...opt, prop: key }
          newItem.setting = {
            ...newItem.setting,
            name: key,
            value: opt.value,
            checked: queryParams[item.prop]?.includes(opt.value) || "",
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