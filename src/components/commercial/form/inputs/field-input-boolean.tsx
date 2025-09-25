import colSpanFromSize from "@/utils/colSpanFromSize";
import { Switch } from "@mui/material";

export default function FieldInputBoolean({ field, setField, disabled }: any) {
  function onChange(ev: any) {
    let filter = { eq: ev.target.checked };

    if (setField) {
      setField({
        ...field,
        filter,
        value: ev.target.checked,
      });
    }
  }
  return (
    <>
      <div className={colSpanFromSize(field.size)}>
        <span>{field.label}</span>
        <div>
          <Switch
            disabled={disabled || field?.editable === false}
            onChange={onChange}
            checked={field.value ? true : false}
          />
        </div>
      </div>
    </>
  );
}
