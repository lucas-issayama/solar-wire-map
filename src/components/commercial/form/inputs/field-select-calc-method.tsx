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
import calcMethods from "@/utils/calcMethods";
import calcMethod from "@/utils/calcMethods";
import colSpanFromSize from "@/utils/colSpanFromSize";
import deviceTypes from "@/utils/deviceTypes";

export default function FieldSelectCalcMethod({
  field,
  setField,
  disabled,
}: any) {
  function onChange(value: any) {
    let filter: any = {};

    if (value) {
      filter.eq = parseInt(value);
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
            <SelectValue placeholder="Escolher tipo" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="none">Não selecionado</SelectItem> */}
            {calcMethods.map((el) => (
              <SelectItem key={el.value} value={el.value?.toString()}>
                {el.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
