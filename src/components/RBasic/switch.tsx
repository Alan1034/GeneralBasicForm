import { useContext, useId } from 'react';

import { FormContext } from '../FormContext';
const Switch = (props) => {
  const { item, id = useId(), coms: { Switch } } = props

  const { dispatchQueryParams, queryParams, message, formLoading, } = useContext(FormContext);
  return (
    <div>
      <Switch
        id={id}
        name={item.prop}
        value={queryParams[item.prop] || ""}
        disabled={formLoading}
        onCheckedChange={checked => dispatchQueryParams({ data: { ...queryParams, [item.prop]: checked } })}
        aria-invalid={message?.[item.prop] && message?.[item.prop].length > 0}
        {...item.setting}
      />
    </div>

  )
}
export default Switch;