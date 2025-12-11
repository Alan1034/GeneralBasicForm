import { useState, useContext, useEffect, useId } from "react";
import { X, Plus } from 'lucide-react';
import { TypeCom } from "../../comType";
import { FormContext } from "../../FormContext";
export const FormList = (props) => {
  const { coms, item = {}, id = useId() } = props
  const { setting = {}, prop, gap = 3 } = item
  // itemWidth: 'auto' | 'mean'
  const { dim = 1, columns = [], heading = (dim != 1),
    itemWidth = 'auto', onChange = () => { } } = setting
  const { Button } = coms
  const x_list = []

  for (let i = 0; i < dim; i++) {
    x_list.push({})
  }
  const { dispatchQueryParams, queryParams, formLoading, } = useContext(FormContext);
  const newXList = (rowIndex, value = "" as any) => {
    const newList = []
    for (let columnIndex = 0; columnIndex < x_list.length; columnIndex++) {
      const x = { key: "", value: "" }
      x.key = `${prop}[${rowIndex}][${columnIndex}]`
      x.value = (typeof value === "object" ? value?.[columns?.[columnIndex]?.prop] : value) || ""
      newList.push(x)
    }
    return newList
  }
  const [list, setList] = useState([[...newXList(0)]]);

  const addItem = () => {
    setList([...list, [...newXList(list.length)]]);
  }
  const removeItem = async (rowIndex) => {
    const newList = [...list]
    if (item.removeItemAction) {
      await item.removeItemAction(queryParams?.[item.prop], rowIndex)
    }
    newList.splice(rowIndex, 1)
    setList(newList)
    setFormData(newList)
  }
  const changeItem = (props, e) => {
    let value
    if (typeof e?.target?.value === "string") {
      value = e?.target?.value
    } else {
      value = e
    }

    const { rowIndex, columnIndex } = props
    const newList = [...list]
    newList[rowIndex][columnIndex].value = value
    setList(newList)
    setFormData(newList)
  }
  const setFormData = (innerNewList) => {
    let newList = []
    if (dim === 1) {
      newList = innerNewList.flat().map(x => x.value)
    } else {
      newList = innerNewList.map(x => {
        const obj = {};
        x.forEach((y, index) => {
          obj[columns[index]?.prop] = y.value
        })
        return obj
      })
    }
    dispatchQueryParams({ data: { ...queryParams, [item.prop]: [...newList] } })
    onChange(newList)
  }
  useEffect(() => {
    setDefaultValue()
  }, [queryParams?.[item.prop]])
  const setDefaultValue = async () => {
    const params = queryParams?.[item.prop]
    const newList = []
    if (params) {
      if (Array.isArray(params) && params.length > 0) {
        // 是数组
        for (let i = 0; i < params.length; i++) {
          const x = params[i];
          newList.push([...newXList(i, x)])

        }

      }
    }
    setList(newList)
  }
  let itemWidthClass = 'w-full'
  let itemWidthStyle = {}
  let listWidthClass = 'flex'
  switch (itemWidth) {
    case 'auto':
      itemWidthClass = "w-full"
      break;
    case 'mean':
      let count = 1
      columns.forEach(column => {
        if (!column.setting?.className?.match(/hidden/i)) {
          count += 1
        }
        // count += 1
      })
      itemWidthClass = `flex-none`
      itemWidthStyle = { width: `${(1 / count) * 100}%` }
      break;

    default:
      break;
  }
  return (
    <div id={id}>
      <div className={`flex gap-${gap} mb-${gap} justify-end`}>
        <Button onClick={addItem} disabled={formLoading}><Plus />添加{item.label}</Button>
      </div>
      {list.map((ele, rowIndex) => {
        return (
          <div key={rowIndex} className={`${listWidthClass} gap-${gap} mb-${gap} items-end`}>
            {
              ele.map((x, columnIndex) => {
                let newItem = { ...item }
                const column = item?.setting?.columns?.[columnIndex]
                if (column) {
                  newItem = { ...column }
                }
                if (newItem.type === 'form-list') {
                  newItem.type = "input"
                }
                newItem.setting = {
                  ...newItem.setting,
                  name: x.key,
                  value: x.value,
                  onChange: changeItem.bind(this, { rowIndex, columnIndex }),
                  onValueChange: changeItem.bind(this, { rowIndex, columnIndex }),
                }
                if (["input", "input-group"].includes(newItem.type)) {
                  delete newItem.setting.onValueChange
                }
                return (
                  <div key={x.key} className={`${itemWidthClass} ${newItem?.setting?.className?.match(/hidden/i) ? "hidden" : ""} flex flex-col`} style={{ ...itemWidthStyle }}>
                    {heading && (rowIndex === 0) ? <h3 className={`inline-block text-base`}  >{newItem.label}</h3> : []}
                    <TypeCom className="w-full" coms={coms} item={newItem} id={x.key} type={newItem.type}></TypeCom>
                  </div>

                )
              })
            }
            <Button variant="outline" size="icon" className="rounded-full" disabled={formLoading} onClick={removeItem.bind(this, rowIndex)} >
              <X color="red" />
            </Button>
          </div >
        )
      })}
    </div>
  )

}