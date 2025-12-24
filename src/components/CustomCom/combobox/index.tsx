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
import { ATree } from "../../RABasic/tree";
import { FormContext } from "../../FormContext";

enum ComTypes {
  "command" = "command",
  "rc-tree" = "rc-tree",
  "ant-tree" = "ant-tree",
  "checkbox-list" = "checkbox-list",
}
enum ContainerTypes {
  "Popover" = "Popover",
  "Drawer" = "Drawer",
  "Dialog" = "Dialog",
}
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
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } = coms
  const {
    setting = {},
    container = "" as ContainerTypes,
    gap = 3
  } = item
  let { prop } = item
  const { type = "command" as ComTypes, value, width = `200px` } = setting
  const { queryParams } = useContext(FormContext);
  const [open, setOpen] = useState(false)
  const [valDict, setValDict] = useState({})
  const [checkedList, setCheckedList] = useState([])
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const closeCombobox = (value) => {
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
      if (item.options[i]?.children && item.options[i]?.children.length > 0) {
        for (let j = 0; j < item.options[i]?.children?.length; j++) {

          item.options[i].children[j].onSelect = closeCombobox;
          const ele = item.options[i].children[j]
          newDict[ele.value] = ele.label
        }
      } else {
        item.options[i].onSelect = closeCombobox;
        const ele = item.options[i]
        newDict[ele.value] = ele.label

      }

    }
    setValDict({ ...newDict })
  }, [JSON.stringify(item.options)])
  useEffect(() => {
    if (!item.options) {
      return
    }
    if (!["rc-tree", 'ant-tree'].includes(type)) {
      return
    }
    const newDict = {}
    const getDictValue = (options,) => {
      options.forEach(ele => {
        const { value, label, key, title, children } = ele
        if (value) {
          newDict[value] = label
        }
        if (key) {
          newDict[key] = title
        }
        const { fieldNames } = setting
        if (fieldNames) {
          newDict[ele[fieldNames.key]] = ele[fieldNames.title]
        }

        if (children) {
          getDictValue(children)
        }
      })
    }
    getDictValue(item.options)
    if (!item.setting) {
      item.setting = {}
    }
    item.setting.closeCombobox = closeCombobox
    setValDict({ ...newDict })
  }, [JSON.stringify(item.options)])
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
  }, [JSON.stringify(item.option)])
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
    if (["rc-tree", 'ant-tree'].includes(type) && queryParams[item.prop]) {
      let rawVal = queryParams[item.prop]
      if (!(queryParams[item.prop] instanceof Array)) {
        rawVal = [queryParams[item.prop]]
      }
      val = rawVal.map(item => {
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
      <Button variant="outline" className="w-full justify-center-safe" style={{ maxWidth: `${width}`, overflowX: "auto", overflowY: "hidden" }} >
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
        <div className={`p-${gap}`} style={{ minWidth: `${width}` }} >
          <RcTree
            id={id}
            coms={coms}
            item={item}
          />
        </div>
      )
    }
    if (type === "ant-tree") {
      return (
        <div className={`p-${gap}`} style={{ minWidth: `${width}` }} >
          <ATree
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
        <div className={`px-${gap} pt-${gap}`} style={{ minWidth: `${width}` }} >
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
  if (container === "Dialog") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {startButton()}
        </DialogTrigger>
        <DialogContent >
          <DialogHeader className="hidden">
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto" style={{ maxHeight: window.innerHeight / 3 * 2 }}>
            {content()}
          </div>

        </DialogContent>
      </Dialog>
    )
  }
  if (isDesktop || container === "Popover") {
    return (
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild>
          {startButton()}
        </PopoverTrigger>
        <PopoverContent className={`w-[${width}] p-0`} align="start">
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
      <DrawerContent hideWhenDetached={true} className="w-[${width}] p-0">
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


