import Input from "./RBasic/input";
import Select from "./RBasic/select";
// import Checkbox from "../components/RBasic/checkbox";
import { CheckboxList } from "./CustomCom/checkbox-list";

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
      <CheckboxList
        id={id}
        coms={coms}
        item={item}
      />
    )
  }
}