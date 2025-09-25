import { Input } from "@/components/ui/input";
import colSpanFromSize from "@/utils/colSpanFromSize";

export default function FilterFieldInputString({ field, setField }: any) {
  function handleChangeString(event: React.ChangeEvent<HTMLInputElement>) {
    let filter: any = {};
    let value = event.target.value;
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

      <Input
        className=" m-1 p-2  rounded-md bg-var(--bg-secondary) text-var(--text-dark) font-normal text-base "
        value={field.value ?? ""}
        onChange={handleChangeString}
      ></Input>
    </div>
  );
}
