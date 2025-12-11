import { useContext, useId } from 'react';
import { Label } from "../ui/label"
import { FormContext } from '../FormContext';
const Checkbox = (props) => {
  const { item, id = useId(), coms: { Checkbox, } } = props

  const { dispatchQueryParams, queryParams, message, formLoading, } = useContext(FormContext);
  const onCheckedChange = (checked) => {
    if (checked === true) {
      dispatchQueryParams({ data: { ...queryParams, [item.prop]: checked } })
    }
    if (checked === false) {
      dispatchQueryParams({ data: { ...queryParams, [item.prop]: checked } })
    }

  }

  return (
    <div className="flex items-center gap-2 space-x-2">
      <Checkbox
        id={id}
        name={item.prop}
        checked={queryParams[item.prop] || ""}
        value={item.value || queryParams[item.prop] || ""}
        disabled={formLoading}
        onCheckedChange={onCheckedChange}
        aria-invalid={message?.[item.prop] && message?.[item.prop].length > 0}
        {...item.setting}
      />
      <Label htmlFor={id}>{item.label}</Label>
    </div>

  )
}
export default Checkbox;