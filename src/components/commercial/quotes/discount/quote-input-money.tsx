import { InputMoneyCents } from "@/components/ui/input-money-cents";

export default function QuoteInputMoney({
  value,
  setValue,
  disabled,
  label,
}: any) {
  return (
    <>
      <div className="mx-2">
        <span>{label}</span>

        <InputMoneyCents
          value={value}
          setValue={setValue}
          disabled={disabled}
        ></InputMoneyCents>
      </div>
    </>
  );
}
