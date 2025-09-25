import { useState } from "react";
import updatedFieldsFromObject from "@/utils/updatedFieldsFromObject";
import colSpanFromSize from "@/utils/colSpanFromSize";

export default function FieldInputImage({ field, setField, disabled }: any) {
  function valueSubFields() {
    let fieldUrl = field?.fields?.find((el: any) => el.name == "url");
    let defaultField = field?.fields?.find((el: any) => el.name !== "id");
    return `${defaultField?.value}${
      fieldUrl?.value ? ` (${fieldUrl?.value})` : ``
    } `;
    return "";
  }

  function valueUrl() {
    let defaultField = field?.fields?.find((el: any) => el.name == "url");
    if (defaultField?.value)
      return defaultField?.value?.includes("blob")
        ? `${defaultField?.value}`
        : `${process.env.NEXT_PUBLIC_API_URL}${defaultField?.value}`;
    else return "";
  }

  function valueId() {
    let defaultField = field?.fields?.find((el: any) => el.name == "id");
    return defaultField?.value;
  }

  function handleClickItem(item: any) {
    setField({ ...field, fields: updatedFieldsFromObject(field.fields, item) });
  }

  function deleteMe() {
    setField({
      ...field,
      fields: field?.fields?.map((el: any) => ({
        ...el,
        value: el.name == "id" ? null : "",
        file: null,
      })),
    });
  }

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setField({
        ...field,
        fields: field?.fields?.map((el: any) => ({
          ...el,
          value:
            el.name == "url" ? imageUrl : el.name == "id" ? null : el.value,
          file: el.name == "url" ? e.target.files[0] : null,
        })),
      });
    }
  };

  return (
    <>
      <div className={colSpanFromSize(field?.size ? field.size : undefined)}>
        <p>{field?.label}</p>
        <div className="flex">
          <input
            disabled={disabled}
            id="picture"
            type="file"
            onChange={handleImageChange}
          />
          {(valueUrl() ? true : false) && field?.editable !== false && (
            <span className="text-red-600 cursor-pointer" onClick={deleteMe}>
              X
            </span>
          )}
        </div>

        {valueUrl() && (
          <img
            src={valueUrl() ?? ""}
            alt="Uploaded"
            style={{ maxWidth: "100%" }}
          />
        )}
      </div>
    </>
  );
}
