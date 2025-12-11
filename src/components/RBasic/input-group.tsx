import { useContext, useId, } from 'react';
import { FormContext } from '../FormContext';

const InputGroup = (props) => {
  const { item = {}, id = useId(), coms: {
    InputGroup,
    InputGroupAddon,
    // InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
  } } = props
  const { setting = {} } = item
  const { type = "input", addons = [] } = setting
  const { dispatchQueryParams, queryParams, message, formLoading, } = useContext(FormContext);
  return (
    <InputGroup>
      {
        addons.map((addon, index) => {
          const { text, align, render } = addon
          return (
            <InputGroupAddon
              key={index}
              align={align}>
              {text && <InputGroupText>{text}</InputGroupText>}
              {render && render(queryParams[item.prop])}
            </InputGroupAddon>
          )
        })
      }
      {type === "input" && <InputGroupInput
        id={id}
        name={item.prop}
        value={queryParams[item.prop] || ""}
        disabled={formLoading}
        onChange={e => dispatchQueryParams({ data: { ...queryParams, [item.prop]: e.target.value } })}
        aria-invalid={message?.[item.prop] && message?.[item.prop].length > 0}
        {...setting} />}
      {type === "textarea" && <InputGroupTextarea
        id={id}
        name={item.prop}
        value={queryParams[item.prop] || ""}
        disabled={formLoading}
        onChange={e => dispatchQueryParams({ data: { ...queryParams, [item.prop]: e.target.value } })}
        aria-invalid={message?.[item.prop] && message?.[item.prop].length > 0}
        {...setting} />}
      {/* <InputGroupButton>Button</InputGroupButton> */}
    </InputGroup>
  )
}
export default InputGroup