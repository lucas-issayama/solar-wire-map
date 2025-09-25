import { Input } from "@/components/ui/input";
import { InputCnpj } from "@/components/ui/input-cnpj";
import colSpanFromSize from "@/utils/colSpanFromSize";

export default function FieldInputCnpj({
  label,
  field,
  setField,
  disabled,
  value,
}: any) {
  let maxLength = 14;
  function setValue(value: any) {
    setField({ ...field, value: value?.substring(0, maxLength) });
  }

  function disableCnpj() {
    return value?.id && value.cnpj;
  }

  return (
    <>
      <div className={colSpanFromSize(field?.size ? field.size : undefined)}>
        <span>{label}</span>
        {/* <Input></Input> */}
        <p>{value?.id}</p>
        <p>{value?.cpf}</p>
        <InputCnpj
          // className=" m-1 p-2  rounded-md bg-var(--bg-secondary) text-var(--text-dark) font-normal text-base "
          value={field?.value}
          setValue={setValue}
          // disabled={disabled}
          disabled={disabled || field?.editable == false}
        ></InputCnpj>
      </div>
    </>
  );
}
