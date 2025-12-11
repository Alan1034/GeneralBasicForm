import { FormProvider } from "./FormContext";
import { Form } from "./Form";
import { useRef, useImperativeHandle } from 'react';
export const BasicForm = (prop) => {
  const FormProviderRef = useRef(null);
  useImperativeHandle(prop.ref, () => {
    return {
      formAction: FormProviderRef?.current?.formAction,
      queryParams: FormProviderRef?.current?.queryParams
    }
  })
  return (
    <FormProvider ref={FormProviderRef} {...prop}>
      <Form {...prop} />
    </FormProvider>
  );
}

