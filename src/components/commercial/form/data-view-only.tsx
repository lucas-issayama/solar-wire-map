import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import FormFields from "./form-fields";
import { Button } from "@/components/ui/button";
import corsolarApi from "@/utils/corsolar/corsolarApi";
import updatedFieldsFromObject from "@/utils/updatedFieldsFromObject";
import getValueFromFieldsToStrapi from "@/utils/getValueFromFieldsToStrapi";
import { toast } from "@/hooks/use-toast";
import { LoadingIcon } from "@/components/icons/loading";
import getValueFromFields from "@/utils/getValueFromFields";

import { Input } from "@/components/ui/input";
import useSession from "@/components/session/use-session";
import { se } from "date-fns/locale";
import uploadImage from "@/utils/corsolar/upload-image";

interface DataViewOnlyProps {
  fields: any;
  schema: any;
  handleClickItem?: any;
  setRefreshParentCallKey?: any;
  setValue?: any;
  value: any;
}

export default function DataViewOnly({
  fields,
  schema,
  handleClickItem,
  setRefreshParentCallKey,
  setValue,
  value,
}: DataViewOnlyProps) {
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
    //valueToSave.valueInCents = "teste";

    //Check zipCode
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

    console.log(JSON.stringify({ editFields }));
    console.log(JSON.stringify({ valueToSave }));

    if (value?.id) valueToSave.id = value.id;

    let fieldImage: any = editFields?.find((el: any) =>
      el.type.includes("image")
    );

    if (!value[fieldImage?.name]) {
      if (fieldImage) {
        let fieldUrl = fieldImage?.fields.find((el: any) => el.name == "url");
        if (fieldUrl?.file) {
          //let ans = await corsolarApi.uploadImage(fieldUrl?.file);
          let ans: any = await uploadImage(session?.token, fieldUrl?.file);

          if (ans?.[0]?.id) {
            valueToSave[fieldImage?.name] = ans?.[0]?.id;
          }
        }
      }
    }

    //Build object values from
    console.log(JSON.stringify({ valueToSave }));

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

      if (setRefreshParentCallKey)
        setRefreshParentCallKey((prev: any) => prev + 1);

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
    <div>
      <FormFields
        schema={schema}
        fields={editFields}
        setFields={setEditFields}
        disabled={true}
      ></FormFields>
    </div>
  );
}
