import viacepApi from "@/utils/viacep/viacepApi";
import FormFieldInput from "./form-field-input";
import corsolarApi from "@/utils/corsolar/corsolarApi";
import { toast } from "@/hooks/use-toast";
import useSession from "@/components/session/use-session";

interface FormFieldsProps {
  schema: any;
  fields: any;
  setFields: any;
  fieldsUpdated?: any;
  disabled?: boolean;
  value?: any;
}

export default function FormFields({
  schema,
  fields,
  setFields,
  fieldsUpdated,
  disabled,
  value,
}: FormFieldsProps) {
  const { session, isLoading } = useSession();
  async function updateAddressFields(zipCode: string) {
    let ans: any = await viacepApi.searchZipCode(zipCode);

    if (ans?.cityFullName) {
      let city = await corsolarApi.cities.getByName(
        session?.token,
        ans.cityFullName
      );

      if (city?.id) {
        setFields(
          fields.map((field: any) => {
            if (field.name == "city") {
              return {
                ...field,
                fields: field.fields.map((subField: any) => {
                  if (subField?.name == "fullName")
                    return { ...subField, value: city.fullName };
                  if (subField?.name == "id")
                    return { ...subField, value: city.id };
                  if (subField?.name == "name")
                    return { ...subField, value: city.name };
                  if (subField?.name == "stateShortName")
                    return { ...subField, value: city.stateShortName };

                  return subField;
                }),
              };
            }

            if (field.name == "neighborhood")
              return { ...field, value: ans?.neighborhood };
            if (field.name == "streetAddress")
              return { ...field, value: ans?.streetAddress };
            if (field.name == "zipCode") return { ...field, value: zipCode };

            return field;
          })
        );
      } else {
        setFields(
          fields.map((field: any) => {
            if (field.name == "neighborhood")
              return { ...field, value: ans?.neighborhood };
            if (field.name == "streetAddress")
              return { ...field, value: ans?.streetAddress };
            if (field.name == "zipCode") return { ...field, value: zipCode };

            return field;
          })
        );
      }
    } else {
      toast({
        title: "Buscador de CEP",
        description: "CEP não encontrado",
        variant: "warning",
      });
    }
  }

  function setField(field: any) {
    let updatedFields = fields?.map((el: any) => {
      if (field.name == el.name) return field;
      else return el;
    });

    //Regras de visualização de campo

    if (schema?.singular == "contact") {
      if (field.name == "typeId") {
        updatedFields = updatedFields.map((el: any) => {
          if (el.name == "cnpj")
            return { ...el, hide: field?.value == 2 ? true : false, value: "" };
          // if (el.name == "ie")
          //   return { ...el, hide: field?.value == 2 ? true : false };
          if (el.name == "cpf")
            return { ...el, hide: field?.value == 1 ? true : false, value: "" };
          if (field.name == el.name) return field;
          return { ...el };
        });
      }
    }

    if (schema?.singular == "quote") {
      if (field.name == "shippingEstimationCity") {
        let fieldCityName = field?.fields?.find((el: any) => el.name == "name");

        let fieldStateShortName = field?.fields?.find(
          (el: any) => el.name == "stateShortName"
        );

        updatedFields = updatedFields.map((el: any) => {
          if (el.name == "shippingEstimationZipCode")
            return { ...el, value: "" };
          return { ...el };
        });

        updatedFields = updatedFields.map((el: any) => {
          if (el.name == "shippingEstimationCityName")
            return { ...el, value: fieldCityName?.value };
          return { ...el };
        });

        updatedFields = updatedFields.map((el: any) => {
          if (el.name == "shippingEstimationStateShortName")
            return { ...el, value: fieldStateShortName?.value };
          return { ...el };
        });
      }
    }

    if (schema?.singular == "address") {
      if (field.name == "zipCode") {
        if (field?.value?.length == 8) {
          updateAddressFields(field?.value);
        }
      }
    }

    //Inserir aqui busca de CEP

    setFields(updatedFields);

    if (fieldsUpdated) {
      fieldsUpdated(updatedFields);
    }
  }
  return (
    <div className="grid grid-cols-12 gap-4 ">
      {fields
        ?.filter((el: any) => !el?.hide && !el?.hideForm)
        ?.map((el: any) => (
          <FormFieldInput
            key={el.name}
            field={el}
            setField={setField}
            disabled={disabled}
            value={value}
          ></FormFieldInput>
        ))}
    </div>
  );
}
