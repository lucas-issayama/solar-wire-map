import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import colSpanFromSize from "@/utils/colSpanFromSize";
import { useEffect, useState } from "react";

export default function FilterFieldInputDate({ field, setField }: any) {
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  function handleChangeString(event: React.ChangeEvent<HTMLInputElement>) {
    //setValue(event.target.value);
  }

  useEffect(() => {
    let filter: any = {};
    //alert(startAt);
    if (startAt) {
      let dStart = new Date(startAt);
      //dStart.setHours(dStart.getHours() + 12);
      // /  alert(dStart.toISOString());
      filter.gte = dStart.toISOString()?.substring(0, 10);
    }

    if (endAt) {
      let dEnd = new Date(endAt);
      //dEnd.setDate(dEnd.getDate() + 1);
      //dEnd.setHours(dEnd.getHours() + 12);
      filter.lte = dEnd.toISOString()?.substring(0, 10);
    }

    // if (startAt) {
    //   let dStart = new Date(startAt);
    //   // dStart.setHours(dStart.getHours() + 3);
    //   // /  alert(dStart.toISOString());
    //   filter.gte = startAt?.substring(0, 10);
    // }

    // if (endAt) {
    //   //let dEnd = new Date(endAt);
    //   //dEnd.setDate(dEnd.getDate() + 1);
    //   // dEnd.setHours(dEnd.getHours() + 3);
    //   // filter.lte = dEnd.toISOString()?.substring(0, 10);
    //   filter.lte = endAt?.substring(0, 10);
    // }

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
      valStartAt = dStart.toISOString()?.substring(0, 10);
    }

    if (endAt) {
      const dEnd = new Date(endAt);
      dEnd.setDate(dEnd.getDate() + 1); // Include the full end date
      valEndAt = dEnd.toISOString()?.substring(0, 10);
    }

    if (fieldStartAt !== valStartAt) {
      setStartAt(fieldStartAt);
    }
    if (fieldEndAt !== valEndAt) {
      setEndAt(fieldEndAt);
    }
  }, [field]);

  // Sync internal state with field updates
  // useEffect(() => {
  //   const fieldStartAt = field?.filter?.gte ?? "";
  //   const fieldEndAt = field?.filter?.lte ?? "";
  //   let valStartAt;
  //   let valEndAt;

  //   if (startAt) {
  //     const dStart = new Date(startAt);
  //     valStartAt = dStart.toISOString()?.substring(0, 10);
  //   }

  //   if (endAt) {
  //     const dEnd = new Date(endAt);
  //     dEnd.setDate(dEnd.getDate() + 1); // Include the full end date
  //     valEndAt = dEnd.toISOString()?.substring(0, 10);
  //   }

  //   if (fieldStartAt !== valStartAt) {
  //     setStartAt(fieldStartAt);
  //   }
  //   if (fieldEndAt !== valEndAt) {
  //     setEndAt(fieldEndAt);
  //   }
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
