import { useState, useContext, useEffect, useId } from "react";
import { X, Plus } from 'lucide-react';
import { TypeCom } from "../../comType";
import { FormContext } from "../../BasicForm";
export const FormList = (props) => {
  const { coms, item = {}, id = useId() } = props
  const { setting = {}, prop } = item
  const { ndim = 1, columns = [] } = setting
  const { Button } = coms
  const x_list = []
  const gap = 3
  for (let i = 0; i < ndim; i++) {
    x_list.push({})
  }
  const { dispatchQueryParams, queryParams, formLoading, } = useContext(FormContext);
  const newXList = (rowIndex, value = "" as any) => {
    const newList = []
    for (let columnIndex = 0; columnIndex < x_list.length; columnIndex++) {
      const x = { key: "", value: "" }
      x.key = `${prop}[${rowIndex}][${columnIndex}]`
      x.value = typeof value === "object" ? value?.[columns?.[columnIndex]?.prop] : value
      newList.push(x)
    }
    return newList
  }
  const [list, setList] = useState([[...newXList(0)]]);

  const addItem = () => {
    setList([...list, [...newXList(list.length)]]);
  }
  const removeItem = (rowIndex) => {
    const newList = [...list]
    newList.splice(rowIndex, 1)
    setList(newList)
    dispatchQueryParams({ data: { ...queryParams, [item.prop]: newList } })
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
    setFormData()
  }
  const setFormData = () => {
    let newList = []
    if (ndim === 1) {
      newList = list.flat().map(x => x.value)
    } else {
      newList = list.map(x => {
        const obj = {};
        x.forEach((y, index) => {
          obj[columns[index]?.prop] = y.value
        })
        return obj
      })
    }
    dispatchQueryParams({ data: { ...queryParams, [item.prop]: newList } })
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
  return (
    <div id={id}>
      <div className={`flex gap-${gap} mb-${gap} justify-end`}>
        <Button onClick={addItem} disabled={formLoading}><Plus />添加{item.label}</Button>
      </div>

      {list.map((ele, rowIndex) => {
        return (
          <div key={rowIndex} className={`flex gap-${gap} mb-${gap}`}>
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
                  value: queryParams?.[item.prop]?.[rowIndex]?.[columns?.[columnIndex]?.prop] || x.value,
                  onChange: changeItem.bind(this, { rowIndex, columnIndex }),
                  onValueChange: changeItem.bind(this, { rowIndex, columnIndex }),
                }
                if (newItem.type === "input") {
                  delete newItem.setting.onValueChange
                }
                return (
                  <TypeCom key={x.key} coms={coms} item={newItem} id={x.key} type={newItem.type}></TypeCom>
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