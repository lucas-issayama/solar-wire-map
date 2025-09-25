import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { InputNumber } from "@/components/ui/input-number";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import colSpanFromSize from "@/utils/colSpanFromSize";

import { formatDecimalBr } from "@/utils/format/format-decimal-br";
import { Switch } from "@mui/material";
import { endOfDecade } from "date-fns";
import { fi } from "date-fns/locale";
import { useEffect, useState } from "react";
import { start } from "repl";

export default function FilterFieldInputBoolean({ field, setField }: any) {
  // function onChange(ev: any) {
  //   let filter = { eq: ev.target.checked };

  //   if (setField) {
  //     setField({
  //       ...field,
  //       filter,
  //       value: ev.target.checked,
  //     });
  //   }
  // }

  function onChange(value: any) {
    let filter: any = {};

    if (value) {
      filter.eq = value == "SIM";
    }
    if (value == "none") filter = {};

    console.log(
      JSON.stringify({
        ...field,
        value: value == "none" ? null : value == "SIM",
        filter,
      })
    );
    setField({
      ...field,
      value: value == "none" ? null : value == "SIM",
      filter,
    });
  }

  let options = ["none", "SIM", "NÃO"];

  return (
    <div className={colSpanFromSize(field.size)}>
      <p>Filter</p>
      {/* <span>{field.label}</span>
      <span>{JSON.stringify({ field })}</span> */}
      {/* <p>
        {field.value === null || typeof field.value !== "boolean"
          ? "none"
          : field.value
          ? "SIM"
          : "NÃO"}
      </p> */}

      {/* <div>
        <Switch onChange={onChange} checked={field.value ? true : false} />
      </div> */}

      {/* <p>{field.value}</p> */}

      <Select
        value={
          field.value === null || typeof field.value !== "boolean"
            ? "none"
            : field.value
            ? "SIM"
            : "NÃO"
        }
        onValueChange={onChange}
        // disabled={field?.editable === false}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Escolher" />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option: string) => (
            <SelectItem key={option} value={option}>
              {option == "none" ? "Todos" : option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
