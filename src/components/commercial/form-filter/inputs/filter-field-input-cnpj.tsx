import { Input } from "@/components/ui/input";
import { InputCnpj } from "@/components/ui/input-cnpj";
import colSpanFromSize from "@/utils/colSpanFromSize";

export default function FilterFieldInputCnpj({ field, setField }: any) {
  function handleChangeString(value: string) {
    let filter: any = {};
    if (value !== null) {
      if (value) filter.containsi = value;
      if (setField) {
        setField({
          ...field,
          value: value,
          filter,
        });
      }
    }
  }

  return (
    <div className={colSpanFromSize(field.size)}>
      <span>{field?.label}</span>

      <InputCnpj
        className=" m-1 p-2  rounded-md bg-var(--bg-secondary) text-var(--text-dark) font-normal text-base "
        value={field.value ?? ""}
        setValue={handleChangeString}
      ></InputCnpj>
    </div>
  );
}
