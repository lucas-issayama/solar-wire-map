import { Input } from "@/components/ui/input";
import { InputNumber } from "@/components/ui/input-number";

export default function QuoteInputPercentage({
  value,
  setValue,
  disabled,
  label,
}: any) {
  return (
    <>
      <div className="mx-2">
        <span>{label}</span>

        <InputNumber
          value={value}
          setValue={setValue}
          disabled={disabled}
        ></InputNumber>
      </div>
    </>
  );
}
