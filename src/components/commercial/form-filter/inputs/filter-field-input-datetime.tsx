import { DatePicker } from "@/components/ui/date-picker";
import colSpanFromSize from "@/utils/colSpanFromSize";
import { useEffect, useState } from "react";

export default function FilterFieldInputDatetime({ field, setField }: any) {
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  function handleChangeString(event: React.ChangeEvent<HTMLInputElement>) {
    //setValue(event.target.value);
  }

  useEffect(() => {
    let filter: any = {};

    if (startAt) {
      let dStart = new Date(startAt);
      filter.gte = dStart.toISOString();
    }

    if (endAt) {
      let dEnd = new Date(endAt);
      dEnd.setDate(dEnd.getDate() + 1);
      filter.lte = dEnd.toISOString();
    }
    setField({
      ...field,
      filter,
    });
  }, [startAt, endAt]);

  // Sync internal state with field updates
  useEffect(() => {
    const fieldStartAt = field?.filter?.gte ?? "";
    const fieldEndAt = field?.filter?.lte ?? "";
    let valStartAt;
    let valEndAt;

    if (startAt) {
      const dStart = new Date(startAt);
      valStartAt = dStart.toISOString();
    }

    if (endAt) {
      const dEnd = new Date(endAt);
      dEnd.setDate(dEnd.getDate() + 1); // Include the full end date
      valEndAt = dEnd.toISOString();
    }

    if (fieldStartAt !== valStartAt) {
      setStartAt(fieldStartAt);
    }
    if (fieldEndAt !== valEndAt) {
      setEndAt(fieldEndAt);
    }
  }, [field]);

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
