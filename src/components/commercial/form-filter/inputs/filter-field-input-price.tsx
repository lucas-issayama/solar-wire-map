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

export default function FilterFieldInputPrice({ field, setField }: any) {
  const [startAt, setStartAt] = useState(field?.filter?.gte ?? 0);
  const [endAt, setEndAt] = useState(field?.filter?.lte ?? 0);
  function handleChangeString(event: React.ChangeEvent<HTMLInputElement>) {
    //setValue(event.target.value);
  }

  useEffect(() => {
    let filter: any = {};

    if (startAt) {
      filter.gte = startAt;
    }

    if (endAt) {
      filter.lte = endAt;
    }
    if (setField) {
      setField({
        ...field,
        filter,
      });
    }
  }, [startAt, endAt]);

  useEffect(() => {
    console.log("----------");
    setStartAt(field?.filter?.gte ?? 0);
    setEndAt(field?.filter?.lte ?? 0);
  }, [field]);

  return (
    <>
      <div className={colSpanFromSize(field.size)}>
        <span>{field.label} - De</span>
        <InputNumberInCents
          prefix="R$"
          value={startAt}
          setValue={setStartAt}
        ></InputNumberInCents>
      </div>
      <div
        className={`col-span-12 ${
          field?.size ? `sm:col-span-${field?.size}` : "sm:col-span-3"
        }`}
      >
        <span>{field.label} - Até</span>
        <InputNumberInCents
          prefix="R$"
          value={endAt}
          setValue={setEndAt}
        ></InputNumberInCents>
      </div>
    </>
  );
}
