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
  Button,
} from "./ui/field"
const BasicForm = (props) => {
  const {
    formItem = [] as ItemType[],
    children,
    coms: { Input },
  } = props;

  return (
    <form>
      <FieldGroup>
        {formItem.map((item, index) => {

          return (
            <Field>
              <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                Name on Card
              </FieldLabel>
              <Input
                id="checkout-7j9-card-name-43j"
                placeholder="Evil Rabbit"
                required
              />
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
