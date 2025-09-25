import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import colSpanFromSize from "@/utils/colSpanFromSize";

export default function FieldSelectTypeContact({
  label,
  field,
  setField,
  disabled,
}: any) {
  function onChange(value: any) {
    setValue(parseInt(value));
  }

  function setValue(value: any) {
    setField({ ...field, value });
  }
  return (
    <div className={colSpanFromSize(field.size)}>
      <span>{label}</span>

      <Select
        disabled={disabled}
        value={field?.value?.toString() ?? ""}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Escolher tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Pessoa jurídica</SelectItem>
          <SelectItem value="2">Pessoa física</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
