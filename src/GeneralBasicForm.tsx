/** @format */

// import { useState } from "react";
import { BasicForm } from "./components/BasicForm";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "./components/ui/select"
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
    }}></BasicForm>
  );
}


