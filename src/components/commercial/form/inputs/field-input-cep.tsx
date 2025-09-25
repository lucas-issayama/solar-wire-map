import { Input } from "@/components/ui/input";
import { InputCep } from "@/components/ui/input-cep";
import colSpanFromSize from "@/utils/colSpanFromSize";

export default function FieldInputCep({
  label,
  field,
  setField,
  disabled,
}: any) {
  let maxLength = 8;

  function setValue(value: any) {
    setField({ ...field, value: value?.substring(0, maxLength) });
  }

  return (
    <>
      <div className={colSpanFromSize(field?.size ? field.size : undefined)}>
        <span>{label}</span>

        <InputCep
          value={field?.value}
          setValue={setValue}
          disabled={disabled}
        ></InputCep>
      </div>
    </>
  );
}
