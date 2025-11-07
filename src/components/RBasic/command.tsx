import { useContext, useId, useEffect, useState } from 'react';
import { FormContext } from '../BasicForm';
const Command = (props) => {
  const { item = {}, id = useId(), coms: {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } } = props
  const { setting = {},
    options = [{
      label: "",
      children: []
    }],
    empty = "" } = item

  const { dispatchQueryParams, queryParams, message, formLoading, } = useContext(FormContext);
  const [valDict, setValDict] = useState({})
  useEffect(() => {
    const newDict = {}
    for (let i = 0; i < options?.length; i++) {
      for (let j = 0; j < options[i]?.children?.length; j++) {
        const ele = options[i].children[j]
        newDict[ele.value] = ele.label

      }
    }
    setValDict({ ...newDict })
  }, [options])
  return (
    <Command
      id={id}
      name={item.prop}
      value={queryParams[item.prop] || ""}
      disabled={formLoading}
      onValueChange={value => dispatchQueryParams({ data: { ...queryParams, [item.prop]: value } })}
      aria-invalid={message?.[item.prop] && message?.[item.prop].length > 0}
      filter={(value, search, keywords) => {
        const extendValue = value + ' ' + keywords.join(' ')
        const extendLabel = valDict[value] + ' ' + keywords.join(' ')
        if (extendValue.includes(search)) return 1
        if (extendLabel.includes(search)) return 1
        return 0
      }}
      {...setting}
    >
      <CommandInput
        placeholder={setting?.placeholder}
      />
      <CommandList>
        <CommandEmpty>{empty}</CommandEmpty>
        {
          options.map(itemList => {
            const { label = '', children = [], separator = false, value = "" } = itemList
            return (
              <div key={value}>
                {separator && <CommandSeparator></CommandSeparator>}
                <CommandGroup heading={label}>
                  {children.map((status) => {
                    const { label, value, onSelect = () => { }, shortcut } = status
                    return (
                      <CommandItem
                        key={value}
                        value={`${value}`}
                        onSelect={onSelect}
                      >
                        {label}
                        {shortcut && <CommandShortcut>{shortcut}</CommandShortcut>}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </div>
            )
          })
        }

      </CommandList>
    </Command>
  )
}
export default Command