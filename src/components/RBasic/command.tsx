/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2025-11-07 14:46:25
 * @LastEditTime: 2026-02-06 18:57:25
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description:Command文档：https://github.com/dip/cmdk
 * @FilePath: /GeneralBasicForm/src/components/RBasic/command.tsx
 * 
 */

import { useContext, useId } from 'react';
import { FormContext } from '../FormContext';
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

  const valDict = {}
  if (item.options) {
    for (let i = 0; i < options?.length; i++) {
      if (item.options[i]?.children && item.options[i]?.children.length > 0) {
        for (let j = 0; j < options[i]?.children?.length; j++) {
          const ele = options[i].children[j]
          valDict[ele.value] = ele.label

        }
      } else {
        const ele = item.options[i]
        valDict[ele.value] = ele.label
      }
    }
  }

  const renderItem = (item) => {
    const { label, value, onSelect = () => { }, shortcut } = item;

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
  }
  return (
    <Command
      id={id}
      name={item.prop}
      value={`${queryParams[item.prop]}` || ""}
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
            if (children && children.length > 0) {
              return (
                <div key={value}>
                  {separator && <CommandSeparator></CommandSeparator>}
                  <CommandGroup heading={label}>
                    {children.map((status) => {
                      return (renderItem(status))
                    })}
                  </CommandGroup>
                </div>
              )
            }
            return (
              renderItem(itemList)
            )
          })
        }

      </CommandList>
    </Command>
  )
}
export default Command