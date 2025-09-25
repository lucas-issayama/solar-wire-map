import { DeleteIcon } from "@/components/icons/delete-icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InputNumber } from "@/components/ui/input-number";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import colSpanFromSize from "@/utils/colSpanFromSize";
import inverterTypes from "@/utils/inverterTypes";

export default function FieldMppts({ field, setField, disabled }: any) {
  function onChange(value: any) {
    let filter: any = {};

    if (value) {
      filter.eq = value;
    }

    setField({
      ...field,
      value,
      filter,
    });
  }

  return (
    <>
      <div className={colSpanFromSize(field.size)}>
        <Card className="p-2">
          <h1 className="text-xl">Mppts</h1>
          {field?.value?.length > 0 &&
            field.value?.map((el: any, index: number) => (
              <div className="flex justify-stretch" key={index}>
                <button
                  onClick={() => {
                    // Remove the MPPT at the current index
                    const updatedMppts = field.value.filter(
                      (_: any, i: number) => i !== index
                    );
                    // Update the field with the new array
                    setField({
                      ...field,
                      value: updatedMppts,
                    });
                  }}
                >
                  <DeleteIcon></DeleteIcon>
                </button>
                <p className="font-bold mt-2 mx-2 ">{index + 1}</p>
                <div>
                  <p className="font-bold">Corrente máxima (A)</p>
                  <InputNumber
                    value={el.dcCurrentMax}
                    setValue={(newValue: number) => {
                      // Create a new array of mppts where the current index is updated
                      const updatedMppts = field.value.map(
                        (mppt: any, i: number) =>
                          i === index
                            ? { ...mppt, dcCurrentMax: newValue }
                            : mppt
                      );

                      // Call setField with the updated value array
                      setField({
                        ...field,
                        value: updatedMppts,
                      });
                    }}
                  ></InputNumber>
                </div>

                <div>
                  <p className="font-bold">Tensão mínima (V)</p>
                  <InputNumber
                    value={el.dcVoltageMin}
                    setValue={(newValue: number) => {
                      // Create a new array of mppts where the current index is updated
                      const updatedMppts = field.value.map(
                        (mppt: any, i: number) =>
                          i === index
                            ? { ...mppt, dcVoltageMin: newValue }
                            : mppt
                      );

                      // Call setField with the updated value array
                      setField({
                        ...field,
                        value: updatedMppts,
                      });
                    }}
                  ></InputNumber>
                </div>
                <div>
                  <p className="font-bold">Tensão máxima (V)</p>
                  <InputNumber
                    value={el.dcVoltageMax}
                    setValue={(newValue: number) => {
                      // Create a new array of mppts where the current index is updated
                      const updatedMppts = field.value.map(
                        (mppt: any, i: number) =>
                          i === index
                            ? { ...mppt, dcVoltageMax: newValue }
                            : mppt
                      );

                      // Call setField with the updated value array
                      setField({
                        ...field,
                        value: updatedMppts,
                      });
                    }}
                  ></InputNumber>
                </div>
              </div>
            ))}

          <div className="flex justify-center">
            <Button
              onClick={(ev: any) => {
                if (field.value?.length > 0) {
                  setField({
                    ...field,
                    value: [...field.value, field.value[0]],
                  });
                } else {
                  setField({
                    ...field,
                    value: [
                      { dcCurrentMax: 0, dcVoltageMax: 0, dcVoltageMin: 0 },
                    ],
                  });
                }
              }}
            >
              Adicionar+
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
