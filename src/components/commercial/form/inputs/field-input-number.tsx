import { Input } from "@/components/ui/input";
import { InputNumber } from "@/components/ui/input-number";
import colSpanFromSize from "@/utils/colSpanFromSize";

export default function FieldInputNumber({ field, setField, disabled }: any) {
  function setValue(value: number) {
    let valueToUpdate = value;

    if (field.max) {
      if (value > field.max) {
        valueToUpdate = field.max;
      }
    }

    if (field.min) {
      if (value < field.min) {
        valueToUpdate = field.min;
      }
    }

    setField({
      ...field,
      value: valueToUpdate,
    });
  }

  return (
    <div className={colSpanFromSize(field?.size ? field.size : undefined)}>
      <span>{field.label ? field.label : undefined}</span>
      <InputNumber
        value={field.value}
        setValue={setValue}
        disabled={disabled}
      ></InputNumber>
      {field.max && <p>Máximo: {field.max}</p>}
      {field.min && <p>Mínimo: {field.min}</p>}
    </div>
  );
}
