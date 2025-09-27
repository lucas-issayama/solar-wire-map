import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingIcon } from "@/components/icons/loading";

interface SelectObjectProps {
  label: string;
  placeholder?: string;
  value: string | number;
  items: { value: string | number; text: string }[];
  onValueChange: (value: string) => void;
  disabled: boolean;
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
            ?.filter((el) => el.value)
            ?.map((el) => (
              <SelectItem key={el.value} value={el.value?.toString()}>
                {el.text}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
