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

export default function FieldSelectVariableType({
  field,
  setField,
  disabled,
}: any) {
  function onChange(value: any) {
    let filter: any = {};

    if (value) {
      filter.eq = value;
    }

    setField({
      ...field,
      value,
      filter,
    });
  }

  return (
    <>
      <div className={colSpanFromSize(field.size)}>
        <span>{field?.label} - De</span>
        <Select
          disabled={disabled || !field?.editable}
          value={field.value?.toString() ?? ""}
          onValueChange={onChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Escolher tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="percentage">%</SelectItem>
            <SelectItem value="money">R$</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
