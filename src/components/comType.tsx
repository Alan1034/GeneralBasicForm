import Input from "./RBasic/input";
import Select from "./RBasic/select";
import NativeSelect from "./RBasic/native-select";
import Checkbox from "./RBasic/checkbox";
import { CheckboxList } from "./CustomCom/checkbox-list";
import { Combobox } from "./CustomCom/combobox";
import Command from "./RBasic/command";
import InputGroup from "./RBasic/input-group";
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
  if (/^native-select$/i.test(type)) {
    return (
      <NativeSelect
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
  if (/^input-group$/i.test(type)) {
    return (
      <InputGroup
        id={id}
        coms={coms}
        item={item}
      />
    )
  }
}