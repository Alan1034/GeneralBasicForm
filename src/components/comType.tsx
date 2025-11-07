import Input from "./RBasic/input";
import Select from "./RBasic/select";
import Checkbox from "./RBasic/checkbox";
import { CheckboxList } from "./CustomCom/checkbox-list";
import { Combobox } from "./CustomCom/combobox";
import Command from "./RBasic/command";
export const TypeCom = (props) => {
  const { coms, item, id, type = "input" } = props;

  if (/^input$/i.test(type)) {
    return (
      <Input
        id={id}
        coms={coms}
        item={item}
      />
    );
  }
  if (/^select$/i.test(type)) {
    return (
      <Select
        id={id}
        coms={coms}
        item={item}
      />
    )
  }
  if (/^checkbox$/i.test(type)) {
    return (
      <Checkbox
        id={id}
        coms={coms}
        item={item}
      />
    )
  }
  if (/^checkbox-list$/i.test(type)) {
    return (
      <CheckboxList
        id={id}
        coms={coms}
        item={item}
      />
    )
  }
  if (/^command$/i.test(type)) {
    return (
      <Command
        id={id}
        coms={coms}
        item={item}
      />
    )
  }
  if (/^combobox$/i.test(type)) {
    return (
      <Combobox
        id={id}
        coms={coms}
        item={item}
      />
    )
  }
}