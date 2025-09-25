import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import FormFields from "../form/form-fields";
import { Button } from "@/components/ui/button";
import corsolarApi from "@/utils/corsolar/corsolarApi";
import updatedFieldsFromObject from "@/utils/updatedFieldsFromObject";
import getValueFromFieldsToStrapi from "@/utils/getValueFromFields";
import { schemas } from "@/types/schemas/schemas";
import useSession from "@/components/session/use-session";

interface DialogEditVariableProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  fields: any;
  schema: any;
  handleClickItem?: any;
  setRefreshParentCallKey: any;
  value: any;
  setValue?: (value: any) => void;
}

export default function DialogEditVariable({
  open,
  setOpen,
  fields,
  schema,
  handleClickItem,
  setRefreshParentCallKey,
  value,
  setValue,
}: DialogEditVariableProps) {
  const { session, isLoading, logout } = useSession();
  const [editFields, setEditFields] = useState(
    fields?.map((el: any) => ({ ...el, value: "" }))
  );

  function handleClickItemAndClose(item: any) {
    handleClickItem(item);
    setOpen(false);
  }

  //Load fields data from value
  useEffect(() => {
    //Para variáveis considerar máximo e mínimo se existir

    let max: any;
    if (value?.max) {
      max = value.max;
    }
    let min: any;
    if (value?.min) {
      min = value.min;
    }

    let updatedFields = updatedFieldsFromObject(fields, value);

    setEditFields(
      updatedFields.map((el: any) => {
        if (el.name == "value") {
          return { ...el, max, min };
        } else {
          return { ...el };
        }
      })
    );
  }, [value]);

  async function save() {
    let valueToSave: any = getValueFromFieldsToStrapi(editFields);

    valueToSave.id = value?.id;

    //Build object values from
    if (value.id) {
      let ans: any = await corsolarApi.graphql.update(
        schema,
        valueToSave,
        session?.token
      );
    } else {
      let ans: any = await corsolarApi.graphql.create(
        schema,
        valueToSave,
        session?.token
      );
    }

    setOpen(false);

    //Update prop to refresh parent
    setRefreshParentCallKey((prev: any) => prev + 1);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[80%] max-h-[90%] overflow-scroll ">
        <DialogHeader>
          <DialogTitle>Editar variável</DialogTitle>
        </DialogHeader>
        <Card className="p-10">
          <h1 className="text-2xl font-extrabold my-10">{schema.label}</h1>
          <FormFields
            schema={schemas.variable}
            fields={editFields}
            setFields={setEditFields}
          ></FormFields>
          <div className="flex items-end justify-end">
            <Button className="my-10" onClick={save}>
              Save
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
