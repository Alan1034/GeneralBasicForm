import { useContext, useId } from "react";
import type { ItemType } from "../types/basicFrom";
import { TypeCom } from "../components/comType";
import { FormList } from "../components/CustomCom/form-list";
import { Spinner } from "../components/ui/spinner"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  // FieldContent,
  FieldLegend,
  FieldSeparator,
  // FieldSet,
  FieldError,
} from "./ui/field"
import { FormContext } from "./FormContext";
export const Form = (prop) => {
  const {
    formItem = [] as ItemType[],
    children,
    coms,
    fieldGroupSetting = {},
    footFieldSetting = {},
    fieldLabelSetting = {},
    // showSearch = true,
    formOnly = false,
    // afterReset = () => { },
    // size,
    // labelWidth,
    // parametersType="url",
    // DBPrimaryKey,
    // noInputBlank=false,
    // currentPageKey="page",
    // pageSizeKey="pageSize",
    // defCurrentPage=1,
    // defPageSize=10,

  } = prop;
  const { Button } = coms
  const { action, resetQuery, message, formLoading, formAction } = useContext(FormContext);
  return (
    <form action={action}>
      <FieldGroup {...fieldGroupSetting}>
        {formItem.map((item, index) => {
          const id = useId();
          return (
            <Field key={item.prop}
              data-invalid={message?.[item.prop] && message?.[item.prop].length > 0}
              {...item.fieldSetting}>
              {item.legend && <FieldLegend
                {...item.legend?.setting}
              >{item.legend?.legend || item.legend}</FieldLegend>}
              <FieldLabel htmlFor={id} {...fieldLabelSetting}>
                {item.label}
              </FieldLabel>
              <TypeCom coms={coms} item={item} id={id} type={item.type}></TypeCom>
              {
                /^form-list$/i.test(item.type) && (
                  <FormList
                    id={id}
                    coms={coms}
                    item={item}
                  />
                )
              }
              {item.description && item.description.length > 0 &&
                item.description.map((des, index) => {
                  return (
                    <FieldDescription key={index}>{des}</FieldDescription>
                  )
                })}
              <FieldError errors={message?.[item.prop] || []} ></FieldError>
              {item.separator && <FieldSeparator>{item.separator}</FieldSeparator>}

            </Field>
          )
        })}
        {children}
        {formOnly ? [] : <Field orientation="horizontal" {...footFieldSetting}>
          <Button disabled={formLoading} formAction={formAction}>{formLoading ? <Spinner /> : []}提交</Button>
          <Button disabled={formLoading} variant="outline" type="button" onClick={resetQuery}>
            重置
          </Button>
        </Field>}
      </FieldGroup>
    </form>
  );
}