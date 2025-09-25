import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { InputDcPowerWp } from "@/components/ui/input-dc-power-wp";
import { InputNumber } from "@/components/ui/input-number";
import colSpanFromSize from "@/utils/colSpanFromSize";

import { formatDecimalBr } from "@/utils/format/format-decimal-br";
import { endOfDecade } from "date-fns";
import { fi } from "date-fns/locale";
import { useEffect, useState } from "react";
import { start } from "repl";

export default function FilterFieldInputDcPowerWp({ field, setField }: any) {
  const [startAt, setStartAt] = useState(0);
  const [endAt, setEndAt] = useState(0);

  useEffect(() => {
    console.log("---useEffect DCPOWER-------");
    console.log(
      JSON.stringify({
        start: (field?.filter?.gte ?? 0) * 1000,
        end: (field?.filter?.lte ?? 0) * 1000,
      })
    );
    setStartAt((field?.filter?.gte ?? 0) * 1000);
    setEndAt((field?.filter?.lte ?? 0) * 1000);
  }, [field]);

  useEffect(() => {
    let filter: any = {};

    if (startAt) {
      filter.gte = startAt / 1000;
    }

    if (endAt) {
      filter.lte = endAt / 1000;
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
        <InputDcPowerWp value={startAt} setValue={setStartAt}></InputDcPowerWp>
      </div>
      <div
        className={`col-span-12 ${
          field?.size ? `sm:col-span-${field?.size}` : "sm:col-span-3"
        }`}
      >
        <span>{field.label} - Até</span>
        <InputDcPowerWp value={endAt} setValue={setEndAt}></InputDcPowerWp>
      </div>
    </>
  );
}
