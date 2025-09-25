import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDiscount({ value, setValue, disabled }: any) {
  function onChange(newValue: any) {
    // let filter: any = {};
    // alert(newValue);

    setValue(newValue);

    // if (value) {
    //   filter.eq = value;
    // }

    // setField({
    //   ...field,
    //   value,
    //   filter,
    // });
  }

  return (
    <>
      <div className="mx-2">
        <span>Tipo de desconto</span>
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
