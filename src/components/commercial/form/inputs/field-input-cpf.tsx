import { Inputcpf } from "@/components/ui/input-cpf";
import colSpanFromSize from "@/utils/colSpanFromSize";

export default function FieldInputCpf({
  label,
  field,
  setField,
  disabled,
  value,
}: any) {
  let maxLength = 11;
  function setValue(value: any) {
    setField({ ...field, value: value?.substring(0, maxLength) });
  }

  function disableCpf() {
    return value?.id && value.cpf;
  }
  return (
    <div className={colSpanFromSize(field?.size ? field.size : undefined)}>
      <span>{label}</span>
      {/* <p>{value?.id}</p> */}

      <Inputcpf
        value={field?.value}
        setValue={setValue}
        // disabled={disabled}
        disabled={disabled || field?.editable == false}
      ></Inputcpf>
    </div>
  );
}
