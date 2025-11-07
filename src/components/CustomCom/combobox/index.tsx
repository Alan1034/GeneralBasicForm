import { useContext, useId, useEffect, useState } from 'react';
import Command from "../../RBasic/command";

import { useMediaQuery } from '@custom-react-hooks/use-media-query';

import { FormContext } from "../../BasicForm";

export const Combobox = (props) => {
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

  } = item
  const { queryParams } = useContext(FormContext);
  const [open, setOpen] = useState(false)
  const [valDict, setValDict] = useState({})
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const onSelect = (value) => {
    setOpen(false)
  }
  useEffect(() => {
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

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start ">
            {valDict[queryParams[item.prop]] || valDict[setting?.value] || setting?.placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command
            id={id}
            coms={coms}
            item={item}
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {valDict[queryParams[item.prop]] || valDict[setting?.value] || setting?.placeholder}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <Command
            id={id}
            coms={coms}
            item={item}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}


