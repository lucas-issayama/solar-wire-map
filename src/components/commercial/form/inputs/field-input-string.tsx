import { Input } from "@/components/ui/input";
import colSpanFromSize from "@/utils/colSpanFromSize";
import { useEffect, useState } from "react";

export default function FieldInputString({
  label,
  // value,
  // setValue,
  field,
  setField,
  disabled,
}: any) {
  const [valueTemp, setValueTemp] = useState(field?.value);
  function handleChangeString(event: React.ChangeEvent<HTMLInputElement>) {
    setValueTemp(event.target.value);
  }
  function handleBlur() {
    //setValue(valueTemp);
    setField({ ...field, value: valueTemp });
  }

  useEffect(() => {
    if (valueTemp !== field?.value) setValueTemp(field?.value);
  }, [field]);

  return (
    <div className={colSpanFromSize(field?.size)}>
      <span>{label ?? field?.label ?? ""}</span>
      {/* <p>{JSON.stringify({ field })}</p> */}
      <Input
        className=" m-1 p-2  rounded-md bg-var(--bg-secondary) text-var(--text-dark) font-normal text-base "
        value={valueTemp ?? ""}
        onChange={handleChangeString}
        onBlur={handleBlur}
        disabled={disabled || field?.editable == false}
      ></Input>
    </div>
  );
}
