import { useContext, useId } from 'react';

import { FormContext } from '../FormContext';
const Textarea = (props) => {
  const { item, id = useId(), coms: { Textarea,
    // Button

  } } = props

  const { dispatchQueryParams, queryParams, message, formLoading, } = useContext(FormContext);
  return (
    <Textarea
      id={id}
      name={item.prop}
      value={queryParams[item.prop] || ""}
      disabled={formLoading}
      onChange={e => dispatchQueryParams({ data: { ...queryParams, [item.prop]: e.target.value } })}
      aria-invalid={message?.[item.prop] && message?.[item.prop].length > 0}
      {...item.setting}
    />
  )
}
export default Textarea;