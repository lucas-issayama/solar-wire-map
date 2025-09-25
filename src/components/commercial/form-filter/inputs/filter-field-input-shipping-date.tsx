import { DatePicker } from "@/components/ui/date-picker";
import colSpanFromSize from "@/utils/colSpanFromSize";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface FilterFieldInputShippingDateProps {
  field: any;
  setField: (updatedField: any) => void;
}

export default function FilterFieldInputShippingDate({
  field,
  setField,
}: FilterFieldInputShippingDateProps) {
  const [startAt, setStartAt] = useState<string>(field?.filter?.gte ?? "");
  const [endAt, setEndAt] = useState<string>(field?.filter?.lte ?? "");

  // Sync internal state with field updates
  useEffect(() => {
    const fieldStartAt = field?.filter?.gte ?? "";
    const fieldEndAt = field?.filter?.lte ?? "";
    let valStartAt;
    let valEndAt;

    if (startAt) {
      const dStart = new Date(startAt);
      valStartAt = dStart.toISOString().substring(0, 10);
    }

    if (endAt) {
      const dEnd = new Date(endAt);
      dEnd.setDate(dEnd.getDate() + 1); // Include the full end date
      valEndAt = dEnd.toISOString().substring(0, 10);
    }

    if (fieldStartAt !== valStartAt) {
      setStartAt(fieldStartAt);
    }
    if (fieldEndAt !== valEndAt) {
      setEndAt(fieldEndAt);
    }
  }, [field]);

  // Update the field filter whenever startAt or endAt changes
  useEffect(() => {
    const filter: any = {};

    if (startAt) {
      const dStart = new Date(startAt);
      filter.gte = dStart.toISOString().substring(0, 10);
    }

    if (endAt) {
      const dEnd = new Date(endAt);
      dEnd.setDate(dEnd.getDate() + 1); // Include the full end date
      filter.lte = dEnd.toISOString().substring(0, 10);
    }

    // Prevent redundant updates by checking if the filter has changed
    const isFilterChanged =
      filter.gte !== field?.filter?.gte || filter.lte !== field?.filter?.lte;

    if (isFilterChanged) {
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
        <DatePicker dateText={startAt} setDateText={setStartAt} />
      </div>
      <div
        className={`col-span-12 ${
          field?.size ? `sm:col-span-${field?.size}` : "sm:col-span-3"
        }`}
      >
        <span>{field.label} - Até</span>
        <DatePicker dateText={endAt} setDateText={setEndAt} />
      </div>
    </>
  );
}
