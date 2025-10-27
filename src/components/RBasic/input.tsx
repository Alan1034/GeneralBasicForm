import { useContext, useId } from 'react';

import { FormContext } from '../BasicForm';
const Input = (props) => {
  const { item, id = useId(), coms: { Input,
    // Button

  } } = props

  const { dispatchQueryParams, queryParams, message, formLoading, } = useContext(FormContext);
  return (
    <Input
      id={id}
      name={item.prop}
      value={queryParams[item.prop] || ""}
      disabled={formLoading}
      onChange={e => dispatchQueryParams({ data: { [item.prop]: e.target.value } })}
      aria-invalid={message?.[item.prop] && message?.[item.prop].length > 0}
      {...item.setting}
    />
  )
}
export default Input;