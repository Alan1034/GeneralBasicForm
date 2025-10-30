import Input from "../components/RBasic/input";
import Select from "../components/RBasic/select";

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
}