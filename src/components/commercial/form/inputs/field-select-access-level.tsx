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
import accessLevels from "@/utils/accessLevels";

export default function FieldSelectAccessLevel({
  field,
  setField,
  disabled,
}: any) {
  function onChange(value: any) {
    let filter: any = {};

    if (value) {
      filter.eq = parseInt(value);
    } else {
      filter = {};
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
        <span>{field?.label}</span>
        <Select
          disabled={disabled}
          value={field.value?.toString() ?? ""}
          onValueChange={onChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Escolher acesso" />
          </SelectTrigger>
          <SelectContent>
            {accessLevels.map((el) => (
              <SelectItem key={el.value} value={el.value}>
                {el.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
