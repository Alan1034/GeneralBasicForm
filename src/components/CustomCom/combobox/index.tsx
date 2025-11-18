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

  let { prop } = item
  // type: "command" | "checkbox-list"
  const { type = "command", value } = setting
  const { queryParams } = useContext(FormContext);
  const [open, setOpen] = useState(false)
  const [valDict, setValDict] = useState({})
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const onSelect = (value) => {
    setOpen(false)
  }
  useEffect(() => {
    if (!item.options) {
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
    if (!item.option) {
      return
    }
    const newDict = {}
    for (let i = 0; i < item.option?.length; i++) {
      const ele = item.option[i]
      newDict[ele.value] = ele.label
    }
    setValDict({ ...newDict })
  }, [item.option])
  const startButton = () => {
    let val
    if (type === "command" && valDict[queryParams[item.prop]]) {
      val = valDict[queryParams[item.prop]]
    }

    // console.log(checkboxListRef)
    // console.log(checkboxListRef.current.checkedList())
    let checkedList = []
    if (queryParams[prop] && queryParams[prop].length > 0) {
      checkedList = queryParams[prop]
    }
    if (value && value.length > 0) {
      checkedList = value
    }
    if (checkboxListRef.current) {
      checkedList = checkboxListRef.current.checkedList()
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
    if (type === "checkbox-list") {
      delete item.setting.onValueChange
      return (
        <div className={`px-${gap} pt-${gap}`} style={{ minWidth: "200px" }} >
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
        <PopoverContent className="w-[200px] p-0" align="start">
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


