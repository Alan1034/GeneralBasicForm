

import { FormProvider } from "./FormContext";
import { useId, useEffect, useState } from 'react';
import { TypeCom } from "./comType";
export const Basic = (props) => {
  const { coms, onFormChange = () => { }, loading = false, item = {}, value = '' } = props;
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
      <TypeCom coms={coms} item={item} id={id} type={item.type}></TypeCom>
    </FormProvider>

  );
}