import { DatePicker } from "@/components/ui/date-picker";
import colSpanFromSize from "@/utils/colSpanFromSize";
import { textToDate } from "@/utils/format/text-to-date";

export default function FieldInputShippingDate({
  field,
  setField,
  disabled,
}: any) {
  function setDateValue(value: any) {
    console.log(value);
    if (value) {
      let dStart = new Date(value);

      setField({
        ...field,
        value: dStart?.toISOString()?.substring(0, 10),
      });
    } else {
      setField({
        ...field,
        value,
      });
    }
  }

  return (
    <div className={colSpanFromSize(field.size)}>
      <div className={`col-span-${field.size ?? 3}`}>
        <span>{field.label}</span>
        <DatePicker
          disabled={disabled}
          dateText={textToDate(field.value)}
          setDateText={setDateValue}
        ></DatePicker>
      </div>
    </div>
  );
}
