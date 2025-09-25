import FilterFieldInput from "./filter-field-input";

export default function FilterFormFields({ fields, setFields }: any) {
  function getHideFromProductType(field: any, propductType: string) {
    if (field?.productTypes) {
      if (field?.productTypes?.includes(propductType)) {
        // return field.hide ? true : false;
        return false;
      } else {
        //Hide when propductType is not on the list
        return true;
      }
    } else {
      return field.hide;
    }
  }

  function setField(field: any) {
    //Rules to hide
    //Para mostrar somente campos relacionados ao tipo de produto
    if (field.name == "product") {
      let productTypeField = field?.fields?.find(
        (el: any) => el.name == "type"
      );

      if (field?.fields) {
        field.fields = field?.fields?.map((field: any) => ({
          ...field,
          hide: getHideFromProductType(field, productTypeField?.value),
        }));
      }
    }
    setFields(
      fields?.map((el: any) => {
        if (field.name == el.name) return field;
        else return el;
      })
    );
  }
  return (
    <div className="grid grid-cols-12 gap-4 ">
      {fields
        ?.filter((el: any) => !el?.hide && !el?.hide)
        ?.map((el: any, index: number) => (
          <FilterFieldInput
            key={`${el.name}-${index}`}
            field={el}
            setField={setField}
          ></FilterFieldInput>
        ))}
    </div>
  );
}
