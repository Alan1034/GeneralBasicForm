import { useState } from "react";
import type { ItemType } from "../types/basicFrom";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldError,
} from "./ui/field"
import { useId } from 'react';
// import { HandleParamsData } from "network-spanner"
const BasicForm = (props) => {
  const {
    formItem = [] as ItemType[],
    children,
    coms: { Input, Button },
  } = props;
  const handleQuery = (e) => {
    // HandleParamsData.handleQuery({
    //   queryParameter, vm: this
    // })
    e.preventDefault()
    console.log(e.target)
    // 读取表单数据
    const form = e.target;
    const formData = new FormData(form);
    // console.log(formData.get("bsName"))
    // console.log(formData.getAll("bsName"))
    console.log(formData.forEach((value, key) => console.log(key, value)))
  }
  return (
    <form onSubmit={handleQuery}>
      <FieldGroup>
        {formItem.map((item, index) => {
          const id = useId();
          return (
            <Field key={item.prop}>
              <FieldLabel htmlFor={id} >
                {item.label}
              </FieldLabel>
              {
                /^input$/i.test(item.type) && (
                  <Input
                    id={id}
                    name={item.prop}
                    {...item.setting}
                  />
                )
              }

              {/* <FieldError errors={errors.username} >Enter a valid email address.</FieldError> */}
            </Field>
          )
        })}
        {children}
        <Field orientation="horizontal">
          <Button type="submit">Submit</Button>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </Field>
      </FieldGroup>

    </form>
  );
}

export default BasicForm;
