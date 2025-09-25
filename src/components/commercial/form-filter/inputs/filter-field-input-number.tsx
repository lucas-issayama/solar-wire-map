import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { InputNumber } from "@/components/ui/input-number";
import colSpanFromSize from "@/utils/colSpanFromSize";

import { formatDecimalBr } from "@/utils/format/format-decimal-br";
import { endOfDecade } from "date-fns";
import { fi } from "date-fns/locale";
import { useEffect, useState } from "react";
import { start } from "repl";

export default function FilterFieldInputNumber({ field, setField }: any) {
  //Checar problema para filtrar valores iguais a zero ou outros tipos
  const [startAt, setStartAt] = useState(field?.filter?.gte ?? 0);
  const [endAt, setEndAt] = useState(field?.filter?.lte ?? 0);

  useEffect(() => {
    console.log("----- useEffect number-----");
    setStartAt(field?.filter?.gte ?? 0);
    setEndAt(field?.filter?.lte ?? 0);
  }, [field]);

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

  return (
    <>
      <div className={colSpanFromSize(field.size)}>
        <span>{field.label} - De</span>
        <InputNumber value={startAt} setValue={setStartAt}></InputNumber>
      </div>
      <div
        className={`col-span-12 ${
          field?.size ? `sm:col-span-${field?.size}` : "sm:col-span-3"
        }`}
      >
        <span>{field.label} - Até</span>
        <InputNumber value={endAt} setValue={setEndAt}></InputNumber>
      </div>
    </>
  );
}
