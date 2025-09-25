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
import deviceTypes from "@/utils/deviceTypes";

export default function FilterFieldSelectDeviceType({ field, setField }: any) {
  function onChange(value: any) {
    let filter: any = {};

    if (value && value == "notKit") {
      filter.ne = "kit";
    } else {
      if (value && value !== "none") {
        filter.eq = value;
      }
    }

    //alert(JSON.stringify({ filter }));
    setField({
      ...field,
      value,
      filter,
    });
  }

  return (
    <div className={colSpanFromSize(field.size)}>
      <span>{field?.label}</span>
      <Select
        value={field.value?.toString() ?? ""}
        onValueChange={onChange}
        disabled={field?.editable === false}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Escolher tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Não selecionado</SelectItem>
          <SelectItem value="notKit">Todos exceto kit</SelectItem>

          {deviceTypes.map((el) => (
            <SelectItem key={el.value} value={el.value}>
              {el.label}
            </SelectItem>
          ))}
          {/* <SelectItem value="none">Não selecionado</SelectItem>
          <SelectItem value="module">Módulo</SelectItem>
          <SelectItem value="inverter">Inversor</SelectItem>
          <SelectItem value="cable">Cabo</SelectItem>
          <SelectItem value="clamp">Terminais intermediários</SelectItem>
          <SelectItem value="connector">Conector MC4</SelectItem>
          <SelectItem value="rail">Trilho</SelectItem>
          <SelectItem value="rail-connector">Emenda trilho</SelectItem>
          <SelectItem value="stringbox">Strinbox</SelectItem>
          <SelectItem value="support">Suporte trilho</SelectItem>
          <SelectItem value="component">Componentes</SelectItem>
          <SelectItem value="structure-component">
            Componentes de estruturas
          </SelectItem>
          <SelectItem value="kit">Kit</SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  );
}
