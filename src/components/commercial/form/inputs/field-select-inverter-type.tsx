import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import colSpanFromSize from "@/utils/colSpanFromSize";
import inverterTypes from "@/utils/inverterTypes";

export default function FieldSelectInverterType({
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
            {inverterTypes.map((el) => (
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
