import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingIcon } from "@/components/icons/loading";

interface SelectObjectProps {
  label: any;
  placeholder?: string;
  value: any;
  items: any;
  onValueChange: any;
  disabled: any;
  loading?: boolean;
}

export default function SelectObject({
  label,
  placeholder,
  value,
  items,
  onValueChange,
  disabled,
  loading = false,
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
          <div className="truncate pr-8">
            <SelectValue placeholder={placeholder ?? "Escolher"} />
          </div>
          {loading && (
            <div className="absolute right-8 flex items-center">
              <LoadingIcon className="animate-spin h-4 w-4 text-gray-400" />
            </div>
          )}
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
