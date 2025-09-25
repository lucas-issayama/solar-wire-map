import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectCalcType({ value, setValue, disabled }: any) {
  function onChange(newValue: any) {
    setValue(newValue);
  }

  return (
    <>
      <div className="mx-2">
        <span>Tipo de cálculo</span>
        <Select
          value={value?.toString() ?? ""}
          onValueChange={onChange}
          disabled={disabled}
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
