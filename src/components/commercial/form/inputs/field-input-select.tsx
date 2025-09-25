import colSpanFromSize from "@/utils/colSpanFromSize";
import { MenuItem, Select } from "@mui/material";

type FieldInputSelectProps = {
  label?: string;
  setField: any;
  field: any;
  disabled?: boolean;
  values: any[];
};

export default function FieldInputSelect({
  label,
  values,
  field,
  setField,
  disabled,
}: FieldInputSelectProps) {
  return (
    <div className={colSpanFromSize(field?.size ? field.size : undefined )}>
      <span>{label}</span>
      <Select
        key={field}
        value={field}
        onChange={setField}
        size="small"
        sx={{ minWidth: 180, maxHeight: 30 }}
        disabled={disabled}
      >
        {values.map((el: any, index: number) => {
          return (
            <MenuItem key={index} value={el}>
              {el}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}
