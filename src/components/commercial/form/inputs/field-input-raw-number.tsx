import { InputQuantity } from "@/components/ui/input-quantity";
import { InputQuantityRaw } from "@/components/ui/input-quantity-raw";
import colSpanFromSize from "@/utils/colSpanFromSize";

export default function FieldInputRawNumber({ field, setField, label, editable }: any) {
  return (
    <div className={colSpanFromSize(field?.size ? field.size : undefined)}>
      <span>{label}</span>
      <InputQuantityRaw value={field} setValue={setField} editable={editable} />
    </div>
  );
}
