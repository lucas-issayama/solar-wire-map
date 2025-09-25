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
import inverterTypes from "@/utils/inverterTypes";

export default function FilterFieldSelectInverterType({
  field,
  setField,
}: any) {
  function onChange(value: any) {
    let filter: any = {};

    if (value && value !== "none") {
      filter.eq = value;
    }

    setField({
      ...field,
      value,
      filter,
    });
  }

  return (
    <div className={colSpanFromSize(field.size)}>
      <span>{field?.label}</span>
      <Select
        value={field.value?.toString() ?? ""}
        onValueChange={onChange}
        disabled={field?.editable === false}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Escolher tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Não selecionado</SelectItem>
          {inverterTypes.map((el) => (
            <SelectItem key={el.value} value={el.value}>
              {el.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
