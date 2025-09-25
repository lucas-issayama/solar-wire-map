import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { InputMoneyCents } from "@/components/ui/input-money-cents";
import { InputNumber } from "@/components/ui/input-number";
import { InputNumberInCents } from "@/components/ui/input-number-in-cents";
import colSpanFromSize from "@/utils/colSpanFromSize";

import { formatDecimalBr } from "@/utils/format/format-decimal-br";
import { endOfDecade } from "date-fns";
import { fi } from "date-fns/locale";
import { useEffect, useState } from "react";
import { start } from "repl";

export default function FieldInputPrice({ field, setField, disabled }: any) {
  function setValue(value: number) {
    setField({
      ...field,
      value,
    });
  }

  return (
    <>
      <div className={colSpanFromSize(field?.size ? field.size : undefined)}>
        <span>{field.label}</span>
        <InputNumberInCents
          prefix="R$"
          value={field?.value}
          setValue={setValue}
          disabled={disabled}
        ></InputNumberInCents>
      </div>
    </>
  );
}
