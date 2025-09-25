import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { InputNumber } from "@/components/ui/input-number";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import colSpanFromSize from "@/utils/colSpanFromSize";

export default function FilterFieldSelectAcVoltage({ field, setField }: any) {
  function onChange(value: any) {
    let filter: any = {};

    if (value) {
      filter.eq = parseInt(value);
    }
    if (value == "none") filter = {};

    setField({
      ...field,
      value,
      filter,
    });
  }

  let options = [
    // "none",
    { label: "Todos", value: "none" },
    { label: "220V", value: "220" },
    { label: "380V", value: "380" },
  ];

  return (
    <div className={colSpanFromSize(field.size)}>
      <span>{field?.label} - De</span>
      <Select
        value={field.value?.toString() ?? ""}
        onValueChange={onChange}
        disabled={field?.editable === false}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Escolher" />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option: any) => (
            <SelectItem key={option.value} value={option.value}>
              {option == "none" ? "Escolher" : option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
