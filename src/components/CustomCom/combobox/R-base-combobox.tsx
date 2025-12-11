import { Combobox as RCombobox } from './index';
import { Button } from "../../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "../../ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../../ui/command"

import { Checkbox } from "../../ui/checkbox"
import { FormProvider } from "../../FormContext";
import { useRef, useImperativeHandle, useId, useEffect, useState } from 'react';
export const BaseCombobox = (props) => {
  const { onFormChange = () => { }, loading = false, item = {}, value = '' } = props;
  const id = useId();
  item.prop = id;
  const FormProviderRef = useRef(null);
  useImperativeHandle(props.ref, () => {
    return {
      formAction: FormProviderRef?.current?.formAction,
      queryParams: FormProviderRef?.current?.queryParams
    }
  })
  const [formData, setFormData] = useState({ [id]: value })
  useEffect(() => { setFormData({ [id]: value }) }, [value])
  return (
    <FormProvider
      loading={loading}
      formData={formData}
      ref={FormProviderRef}
      parametersType="data"
      onFormChange={(params) => {
        onFormChange(params[id]);
      }}>
      <RCombobox {...props} coms={{
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
        Command,
        CommandEmpty,
        CommandGroup,
        CommandInput,
        CommandItem,
        CommandList,
        CommandSeparator,
        CommandShortcut,
        Checkbox,
      }}
      >
      </RCombobox>
    </FormProvider>

  );
}