import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectObjectProps {
  label: any;
  placeholder?: string;
  value: any;
  items: any;
  onValueChange: any;
  disabled: any;
}

export default function SelectObject({
  label,
  placeholder,
  value,
  items,
  onValueChange,
  disabled,
}: SelectObjectProps) {
  return (
    <div>
      <span>{label}</span>
      {/* <p>{value}</p>
      <p>{JSON.stringify(items)}</p> */}
      <Select
        value={value?.toString() ?? ""}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder ?? "Escolher"} />
        </SelectTrigger>
        <SelectContent>
          {/* <SelectItem value="none">Não selecionado</SelectItem> */}
          {items
            ?.filter((el: any) => el.value)
            ?.map((el: any) => (
              <SelectItem key={el.value} value={el.value?.toString()}>
                {el.text}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
