/** @format */

// import { useState } from "react";
import { BasicForm } from "./components/BasicForm";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "./components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "./components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./components/ui/input-group"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "./components/ui/native-select"
export const GeneralBasicForm = (props) => {
  return (
    <BasicForm  {...props} coms={{
      Input,
      Button,
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
      SelectGroup,
      Checkbox,
      Command,
      CommandEmpty,
      CommandGroup,
      CommandInput,
      CommandItem,
      CommandList,
      CommandSeparator,
      CommandShortcut,
      Drawer,
      DrawerContent,
      DrawerTrigger,
      Popover,
      PopoverContent,
      PopoverTrigger,
      InputGroup,
      InputGroupAddon,
      InputGroupButton,
      InputGroupInput,
      InputGroupText,
      InputGroupTextarea,
      NativeSelect,
      NativeSelectOptGroup,
      NativeSelectOption,
    }}></BasicForm>
  );
}


