import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductFilter } from "@/hooks/useProductFilter";
import colSpanFromSize from "@/utils/colSpanFromSize";

export default function FilterFieldSelectModuleName({ field, setField }: any) {
  const { filterModules } = useProductFilter();
  function onChange(value: any) {
    let filter: any = {};

    if (value) {
      filter.contains = value;
    }

    if (value == "none") filter = {};

    setField({
      ...field,
      value,
      filter,
    });
  }

  // let options = [
  //   "none",
  //   // "AE SOLAR",
  //   // "CANADIAN SOLAR",
  //   "DAH",

  //   "HELIUS",
  //   // "JA SOLAR",
  //   // "QNSOLAR",
  //   "TRINA SOLAR",
  // ];

  // let options = [
  //   { label: "none", value: "none" },
  //   { label: "(HELIUS) HMF144M10-555H", value: "HMF144M10-555H" },
  //   { label: "(HELIUS) HMF144T10-585HL", value: "HMF144T10-585HL" },
  //   { label: "(DAH) DHN72X16/DG-585W BIFACIAL", value: "DHN72X16/DG-585W" },
  //   {
  //     label: "(TRINA SOLAR) TSM-DEG21C.20-660W BIFACIAL",
  //     value: "TSM-DEG21C.20 - 660W BIFACIAL",
  //   },

  //   //DHN72X16/DG-585W – BIFACIAL
  // ];

  let options = [
    { label: "none", value: "none" },
    ...filterModules.map((el: any) => ({
      label: `(${el.manufacturerName}) ${el.name}`,
      value: el.name,
    })),
  ];

  return (
    <div className={colSpanFromSize(field.size)}>
      <span>{field?.label} - De</span>
      <Select
        value={field.value?.toString() ?? ""}
        onValueChange={onChange}
        disabled={field?.editable === false}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Escolher" />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option: any) => (
            <SelectItem key={option.value} value={option.value}>
              {option == "none" ? "Escolher" : option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
