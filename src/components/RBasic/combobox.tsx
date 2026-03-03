import { useContext, useId } from 'react';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox"

import { FormContext } from '../FormContext';
const RCombobox = (props) => {
  const { setting = {}, item, id = useId(), } = props

  const { dispatchQueryParams, queryParams, message, formLoading, } = useContext(FormContext);
  const onValueChange = (nextSelectedValue) => {
    dispatchQueryParams({ data: { ...queryParams, [item.prop]: nextSelectedValue } })
  }
  return (
    <Combobox
      items={item.options}
      virtualized
      id={id}
      name={item.prop}
      disabled={formLoading}
      value={item.value || queryParams[item.prop] || ""}
      onValueChange={onValueChange}
      {...setting}
    >
      <ComboboxInput
        placeholder={setting?.placeholder}
        showClear
        aria-invalid={message?.[item.prop] && message?.[item.prop].length > 0} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(optionItem) => (
            <ComboboxItem key={optionItem.value} value={optionItem.value}>
              {optionItem.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
export default RCombobox;