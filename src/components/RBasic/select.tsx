import { useContext, useId } from 'react';

import { FormContext } from '../BasicForm';
const Select = (props) => {
  const { item = {}, id = useId(),
    coms: { Select, SelectTrigger,
      SelectValue, SelectContent,
      SelectGroup, SelectItem
      // Button

    }
  } = props
  const { setting = {} } = item
  const { dispatchQueryParams, queryParams, message, formLoading, } = useContext(FormContext);
  return (
    <Select
      name={item.prop}
      value={queryParams[item.prop] || ""}
      disabled={formLoading}
      onChange={e => dispatchQueryParams({ data: { ...queryParams, [item.prop]: e.target.value } })}
      onValueChange={value => dispatchQueryParams({ data: { ...queryParams, [item.prop]: value } })}
      aria-invalid={message?.[item.prop] && message?.[item.prop].length > 0}
      {...setting}
    >
      <SelectTrigger id={id} className={`${setting?.className}`}>
        <SelectValue placeholder={setting?.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {(item.option || []).map((dict, index) => {
            return <SelectItem key={dict.value} value={dict.value}>{dict.label}</SelectItem>
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
export default Select;