import { useContext, useId, useEffect, useState, useRef } from 'react';
import Command from "../../RBasic/command";
import { CheckboxList } from "../checkbox-list";
import {
  DrawerTitle,
  DrawerHeader,
  DrawerDescription,
} from "../../ui/drawer"
import { Badge } from "../../ui/badge"
import { useMediaQuery } from '@custom-react-hooks/use-media-query';
import { RcTree } from "../rc-tree"
import { FormContext } from "../../BasicForm";

export const Combobox = (props) => {
  const checkboxListRef = useRef(null);
  const { coms = {}, item = {
    options: [{
      label: "",
      children: []
    }],
  }, id = useId() } = props
  const {
    Button,
    Drawer,
    DrawerContent,
    DrawerTrigger,
    Popover,
    PopoverContent,
    PopoverTrigger,
  } = coms
  const {
    setting = {},
    gap = 3
  } = item
  const width = 200
  let { prop } = item
  // type: "command" | "checkbox-list" | "rc-tree"
  const { type = "command", value } = setting
  const { queryParams } = useContext(FormContext);
  const [open, setOpen] = useState(false)
  const [valDict, setValDict] = useState({})
  const [checkedList, setCheckedList] = useState([])
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const onSelect = (value) => {
    setOpen(false)
  }
  useEffect(() => {
    if (!item.options) {
      return
    }
    if (type !== "command") {
      return
    }
    const newDict = {}
    for (let i = 0; i < item.options?.length; i++) {
      for (let j = 0; j < item.options[i]?.children?.length; j++) {

        item.options[i].children[j].onSelect = onSelect;
        const ele = item.options[i].children[j]
        newDict[ele.value] = ele.label
      }
    }
    setValDict({ ...newDict })
  }, [item.options])
  useEffect(() => {
    if (!item.options) {
      return
    }
    if (type !== "rc-tree") {
      return
    }
    const newDict = {}
    const getDictValue = (options,) => {
      options.forEach(ele => {
        const { value, label, children } = ele
        newDict[value] = label
        if (children) {
          getDictValue(children)
        }
      })

    }
    getDictValue(item.options)
    setValDict({ ...newDict })
  }, [item.options])
  useEffect(() => {
    if (!item.option) {
      return
    }
    if (type !== "checkbox-list") {
      return
    }
    const newDict = {}
    for (let i = 0; i < item.option?.length; i++) {
      const ele = item.option[i]
      newDict[ele.value] = ele.label
    }
    setValDict({ ...newDict })
  }, [item.option])
  useEffect(() => {
    // ✅ 可以在 Effect 中读取和写入 ref
    if (queryParams[prop] && queryParams[prop].length > 0) {
      setCheckedList(queryParams[prop])
    }
    if (value && value.length > 0) {
      setCheckedList(value)
    }
    if (checkboxListRef?.current) {
      setCheckedList(checkboxListRef.current.checkedList)
    }
  });
  const startButton = () => {
    let val
    if (type === "command" && valDict[queryParams[item.prop]]) {
      val = valDict[queryParams[item.prop]]
    }
    if (type === "rc-tree" && valDict[queryParams[item.prop]]) {
      val = queryParams[item.prop].map(item => {
        return (
          <Badge key={item} >{valDict[item]}</Badge>
        )
      })
    }
    if (type === "checkbox-list" && checkedList && checkedList.length > 0) {
      val = checkedList.map(item => {
        return (
          <Badge key={item} >{valDict[item]}</Badge>
        )
      })
    }
    return (
      <Button variant="outline" className="w-full justify-center-safe" style={{ maxWidth: "200px", overflowX: "auto", overflowY: "hidden" }} >
        {val || valDict[setting?.value] || setting?.placeholder}
      </Button>
    )
  }
  const content = () => {
    if (type === "command") {
      return (<Command
        id={id}
        coms={coms}
        item={item}
      />)
    }
    if (type === "rc-tree") {
      return (
        <div className={`p-${gap}`} style={{ minWidth: `${width}px` }} >
          <RcTree
            id={id}
            coms={coms}
            item={item}
          />
        </div>
      )
    }
    if (type === "checkbox-list") {
      delete item.setting.onValueChange
      return (
        <div className={`px-${gap} pt-${gap}`} style={{ minWidth: `${width}px` }} >
          <CheckboxList
            ref={checkboxListRef}
            id={id}
            coms={coms}
            item={item}
          />
        </div>

      )
    }
  }
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild>
          {startButton()}
        </PopoverTrigger>
        <PopoverContent className={`w-[${width}px] p-0`} align="start">
          {content()}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {startButton()}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="hidden">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="mt-4 border-t">
          {content()}
        </div>
      </DrawerContent>
    </Drawer>
  )
}


