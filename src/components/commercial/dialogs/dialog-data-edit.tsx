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
import getValueFromFieldsToStrapi from "@/utils/getValueFromFieldsToStrapi";
import { toast } from "@/hooks/use-toast";
import { LoadingIcon } from "@/components/icons/loading";
import getValueFromFields from "@/utils/getValueFromFields";

import { Input } from "@/components/ui/input";
import useSession from "@/components/session/use-session";
import uploadImage from "@/utils/corsolar/upload-image";

interface DialogDataEditProps {
  open: boolean;
  setOpen: any;
  fields: any;
  schema: any;
  handleClickItem?: any;
  setRefreshParentCallKey?: any;
  setValue?: any;
  value: any;
}

export default function DialogDataEdit({
  open,
  setOpen,
  fields,
  schema,
  handleClickItem,
  setRefreshParentCallKey,
  setValue,
  value,
}: DialogDataEditProps) {
  const { session, isLoading, logout } = useSession();
  const [loading, setLoading] = useState(false);
  const [editFields, setEditFields] = useState(
    fields?.map((el: any) => ({ ...el, value: "" }))
  );

  useEffect(() => {
    setEditFields(updatedFieldsFromObject(fields, value));
  }, [value]);

  async function save() {
    setLoading(true);
    let valueToSave: any = getValueFromFieldsToStrapi(editFields);
    //Check zipCode
    //alert(JSON.stringify({ valueToSave }));
    if (schema.singular == "address") {
      if (valueToSave?.zipCode?.length < 8) {
        toast({
          title: "Erro",
          description: "Preencher cep",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (!valueToSave?.city) {
        toast({
          title: "Erro",
          description: "Preencher cidade",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
    }

    if (value?.id) valueToSave.id = value.id;

    let fieldImage: any = editFields?.find((el: any) =>
      el.type.includes("image")
    );

    if (!value[fieldImage?.name]) {
      if (fieldImage) {
        let fieldUrl = fieldImage?.fields.find((el: any) => el.name == "url");
        if (fieldUrl?.file) {
          //let ans = await corsolarApi.uploadImage(fieldUrl?.file);
          let ans: any = uploadImage(session?.token, fieldUrl?.file);

          if (ans?.[0]?.id) {
            valueToSave[fieldImage?.name] = ans?.[0]?.id;
          }
        }
      }
    }

    try {
      let ans: any;
      if (valueToSave.id) {
        ans = await corsolarApi.graphql.update(
          schema,
          valueToSave,
          session?.token
        );
      } else {
        ans = await corsolarApi.graphql.create(
          schema,
          valueToSave,
          session?.token
        );

        if (ans?.id) {
          valueToSave.id = ans.id;
        }
      }

      //If object is user treat diffrently

      if (setValue) {
        let valueToUpdate = getValueFromFields(editFields);
        valueToUpdate.id = valueToSave.id;
        setValue(valueToUpdate);
      }

      setOpen(false);
      if (setRefreshParentCallKey)
        setRefreshParentCallKey((prev: any) => prev + 1);

      toast({
        title: "Salvo com sucesso",
        description: "",
        variant: "success",
      });
      //setLoading(false);
    } catch (error: any) {
      // Depending on the error type, you might want to provide a more specific message

      toast({
        title: "Erro",
        description: error?.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[80%] max-h-[90%] overflow-scroll ">
        <DialogHeader>
          <DialogTitle>{value?.id ? "Editar" : "Novo"} </DialogTitle>
        </DialogHeader>
        <Card className="p-10">
          <h1 className="text-2xl font-extrabold my-10">{schema.label}</h1>
          <FormFields
            schema={schema}
            fields={editFields}
            setFields={setEditFields}
            value={value}
          ></FormFields>
          <div className="flex items-end justify-end">
            <Button disabled={loading} className="my-10" onClick={save}>
              Save {loading && <LoadingIcon></LoadingIcon>}
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
