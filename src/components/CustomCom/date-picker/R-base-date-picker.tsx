import { DatePicker as RDatePicker } from './index';
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover"

import { FormProvider } from "../../FormContext";
import { useId, useEffect, useState } from 'react';
export const BaseDatePicker = (props) => {
  const { onFormChange = () => { }, loading = false, item = {}, value = '' } = props;
  const id = useId();
  item.prop = id;

  const [formData, setFormData] = useState({ [id]: value })
  useEffect(() => { setFormData({ [id]: value }) }, [value])
  return (
    <FormProvider
      loading={loading}
      formData={formData}
      ref={props.ref}
      parametersType="data"
      onFormChange={(params) => {
        onFormChange(params[id]);
      }}>
      <RDatePicker {...props} coms={{
        Button,
        Popover,
        PopoverContent,
        PopoverTrigger,
        Calendar,
      }}
      >
      </RDatePicker>
    </FormProvider>

  );
}