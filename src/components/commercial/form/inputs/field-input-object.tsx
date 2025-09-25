import { useState } from "react";
import DialogSearchData from "../../dialogs/dialog-search-data";
import updatedFieldsFromObject from "@/utils/updatedFieldsFromObject";
import { SearchIcon } from "@/components/icons/search-icon";
import { formatDate } from "@/utils/format/format-date";
import colSpanFromSize from "@/utils/colSpanFromSize";

export default function FieldInputObject({ field, setField, disabled }: any) {
  const [openModal, setOpenModal] = useState(false);

  function valueSubFields() {
    let shippingDateField = field?.fields?.find(
      (el: any) => el.type == "shippingDate"
    );

    let defaultField = field?.fields?.find((el: any) => el.name !== "id");
    if (shippingDateField?.value)
      return `${defaultField?.value ?? ""}${
        shippingDateField?.value
          ? ` (${formatDate(shippingDateField?.value)})`
          : ``
      } `;
    else return defaultField?.value;
  }

  function valueId() {
    let defaultField = field?.fields?.find((el: any) => el.name == "id");
    return defaultField?.value;
  }

  function handleClickItem(item: any) {
    // alert(JSON.stringify(updatedFieldsFromObject(field.fields, item)));
    setField({ ...field, fields: updatedFieldsFromObject(field.fields, item) });
  }

  function deleteMe() {
    setField({
      ...field,
      fields: field?.fields?.map((el: any) => ({
        ...el,
        value: el.name == "id" ? null : "",
      })),
    });
  }

  return (
    <>
      <DialogSearchData
        open={openModal}
        setOpen={setOpenModal}
        customFields={field?.fields}
        object={field?.object}
        schema={{ ...field?.object, fields: field?.fields }}
        handleClickItem={handleClickItem}
      ></DialogSearchData>

      <div className={colSpanFromSize(field?.size ? field.size : undefined)}>
        <p>{field?.label}</p>
        <p
          className={`${
            disabled || field?.editable == false
              ? "text-gray-400 bg-gray-200"
              : "bg-var(--bg-secondary) text-var(--text-dark) "
          } items-stretch justify-between m-1 p-2  font-normal text-base flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 `}
        >
          <button
            disabled={disabled || field?.editable == false}
            onClick={(e) => {
              setOpenModal(true);
            }}
          >
            {valueSubFields()}
          </button>
          {(valueId() ? true : false) &&
            field?.editable !== false &&
            !disabled && (
              <span className="text-red-600 cursor-pointer" onClick={deleteMe}>
                X
              </span>
            )}

          {(valueId() ? false : true) && (
            <button
              onClick={(e) => {
                if (disabled || field?.editable !== false) setOpenModal(true);
              }}
            >
              {!(disabled || field?.editable == false) && (
                <SearchIcon></SearchIcon>
              )}
            </button>
          )}
        </p>
      </div>
    </>
  );
}
