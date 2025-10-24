/** @format */

import { useState } from "react";
import BasicForm from "./components/BasicForm";
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
const GeneralBasicForm = (props) => {
  return (
    <BasicForm  {...props} coms={{ Input, Button }}></BasicForm>
  );
}
export default GeneralBasicForm;

