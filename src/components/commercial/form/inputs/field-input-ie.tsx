import { Input } from "@/components/ui/input";
import { InputCnpj } from "@/components/ui/input-cnpj";
import { InputIe } from "@/components/ui/input-ie";
import colSpanFromSize from "@/utils/colSpanFromSize";

export default function FieldInputIe({
  label,
  field,
  setField,
  disabled,
}: any) {
  function setValue(value: any) {
    setField({ ...field, value });
  }
  return (
    <div className={colSpanFromSize(field?.size ? field.size : undefined)}>
      <span>{label}</span>

      <InputIe
        value={field?.value}
        setValue={setValue}
        disabled={disabled}
      ></InputIe>
    </div>
  );
}
