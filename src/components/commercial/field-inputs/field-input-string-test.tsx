import { Input } from "@/components/ui/input";
import colSpanFromSize from "@/utils/colSpanFromSize";
import { useEffect, useState } from "react";

export default function FieldInputStringTest({
  label,
  value,
  setValue,
  field,
  setField,
}: any) {
  const [valueTemp, setValueTemp] = useState(value);
  function handleChangeString(event: React.ChangeEvent<HTMLInputElement>) {
    setValueTemp(event.target.value);
  }
  function handleBlur() {
    //setValue(valueTemp);
    if (setField) setField({ ...field, value: valueTemp });
    if (setValue) {
      setValue(valueTemp, field?.name);
    }
  }

  useEffect(() => {
    if (valueTemp !== value) setValueTemp(value);
  }, [field]);

  return (
    <div className={colSpanFromSize(field?.size)}>
      <span>{label ?? field.label ?? ""}</span>
      <Input
        className=" m-1 p-2  rounded-md bg-var(--bg-secondary) text-var(--text-dark) font-normal text-base "
        value={valueTemp ?? ""}
        onChange={handleChangeString}
        onBlur={handleBlur}
        disabled={field?.editable == false}
      ></Input>
    </div>
  );
}
