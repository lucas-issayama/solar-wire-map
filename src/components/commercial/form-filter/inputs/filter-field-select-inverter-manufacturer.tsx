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

export default function FilterFieldSelectInverterManufacturer({
  field,
  setField,
}: any) {
  function onChange(value: any) {
    let filter: any = {};

    if (value) {
      filter.eq = value;
    }
    if (value == "none") filter = {};

    setField({
      ...field,
      value,
      filter,
    });
  }

  let options = [
    "none",
    "CHINT POWER",
    "CORDEIRO-SOLIS",
    //"DEYE",
    //"GROWATT",
    "HOYMILES",
    //"REFUSOL",
    "SMA",
    //"SOLAREDGE",
    "SOLAX",
    "SOLIS",
    "SUNGROW",
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
          {options?.map((option: string) => (
            <SelectItem key={option} value={option}>
              {option == "none" ? "Escolher" : option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
