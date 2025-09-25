import { toast } from "@/hooks/use-toast";
import getValueFromFieldsToStrapi from "../getValueFromFieldsToStrapi";
import corsolarApi from "./corsolarApi";
import uploadImage from "./upload-image";

async function saveStrapi(token: string, object: any, fields: any) {
  try {
    let value: any = getValueFromFieldsToStrapi(fields);

    value.id = object?.value?.id;

    if (!value?.image) {
      //
      let fieldImage: any = fields?.find((el: any) =>
        el.type.includes("image")
      );
      if (fieldImage) {
        let fieldUrl = fieldImage?.fields.find((el: any) => el.name == "url");
        if (fieldUrl?.file) {
          let ans = await uploadImage(token, fieldUrl?.file);
          if (ans?.[0]?.id) {
            value.image = ans?.[0]?.id;
          }
        }
      }
    }

    if (value.id) {
      let ans: any = await corsolarApi.graphql.update(object, value, token);
    } else {
      let ans: any = await corsolarApi.graphql.create(object, value, token);
    }
    toast({
      title: "Salvo com sucesso",
      description: "",
      variant: "success",
    });
  } catch (error: any) {
    toast({
      title: "Erro",
      description: error?.message,
      variant: "destructive",
    });
  }
}

export default saveStrapi;
