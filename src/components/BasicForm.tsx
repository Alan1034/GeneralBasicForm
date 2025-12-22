import { FormProvider } from "./FormContext";
import { Form } from "./Form";
export const BasicForm = (prop) => {

  return (
    <FormProvider ref={prop.ref} {...prop}>
      <Form {...prop} />
    </FormProvider>
  );
}

