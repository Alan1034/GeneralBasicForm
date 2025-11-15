import { useContext, useId } from 'react';

import { FormContext } from '../BasicForm';
const NativeSelect = (props) => {
  const { item = {}, id = useId(),
    coms: { NativeSelect, NativeSelectOption,
      // NativeSelectOptGroup
    }
  } = props
  const { setting = {} } = item
  const { dispatchQueryParams, queryParams, message, formLoading, } = useContext(FormContext);
  return (
    <NativeSelect
      name={item.prop}
      value={queryParams[item.prop] || []}
      disabled={formLoading}
      onChange={e => dispatchQueryParams({ data: { ...queryParams, [item.prop]: e.target.value } })}
      aria-invalid={message?.[item.prop] && message?.[item.prop].length > 0}
      {...setting}
    >
      {(item.option || []).map((dict, index) => {
        return <NativeSelectOption key={dict.value} value={dict.value}>{dict.label}</NativeSelectOption>
      })}
    </NativeSelect>
  )
}
export default NativeSelect;