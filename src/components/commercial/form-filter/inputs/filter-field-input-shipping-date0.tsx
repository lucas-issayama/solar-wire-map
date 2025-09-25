import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import colSpanFromSize from "@/utils/colSpanFromSize";
import { fi } from "date-fns/locale";
import { useEffect, useState } from "react";
import { start } from "repl";

export default function FilterFieldInputShippingDate({ field, setField }: any) {
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  useEffect(() => {
    let filter: any = {};

    if (startAt) {
      let dStart = new Date(startAt);
      filter.gte = dStart.toISOString()?.substring(0, 10);
    }

    if (endAt) {
      let dEnd = new Date(endAt);
      dEnd.setDate(dEnd.getDate() + 1);
      filter.lte = dEnd.toISOString()?.substring(0, 10);
    }

    if (!startAt && !endAt) {
      let d = new Date();
      filter.gte = d.toISOString()?.substring(0, 10);
    }

    setField({
      ...field,
      filter,
    });
  }, [startAt, endAt]);

  // useEffect(() => {
  //   console.log("----------");
  //   let dStart = new Date(startAt);
  //   let dEnd = new Date(endAt);
  //   if (field?.filter?.gte !== dStart?.toISOString()?.substring(0, 10))
  //     setStartAt(field?.filter?.gte ?? "");
  //   if (field?.filter?.lte !== dEnd?.toISOString()?.substring(0, 10))
  //     setEndAt(field?.filter?.lte ?? "");
  // }, [field]);

  return (
    <>
      <div className={colSpanFromSize(field.size)}>
        <span>{field.label} - De</span>
        <DatePicker dateText={startAt} setDateText={setStartAt}></DatePicker>
      </div>
      <div
        className={`col-span-12 ${
          field?.size ? `sm:col-span-${field?.size}` : "sm:col-span-3"
        }`}
      >
        <span>{field.label} - Até</span>
        <DatePicker dateText={endAt} setDateText={setEndAt}></DatePicker>
      </div>
    </>
  );
}
