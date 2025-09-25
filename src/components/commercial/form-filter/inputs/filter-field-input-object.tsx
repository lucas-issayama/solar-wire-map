import { Input } from "@/components/ui/input";
import { useState } from "react";
import DialogSearchData from "../../dialogs/dialog-search-data";
import updatedFieldsFromObject from "@/utils/updatedFieldsFromObject";
import { SearchIcon } from "@/components/icons/search-icon";
import colSpanFromSize from "@/utils/colSpanFromSize";

export default function FieldFilterInputObject({ field, setField }: any) {
  const [openModal, setOpenModal] = useState(false);

  function valueSubFields() {
    let defaultField = field?.fields?.find((el: any) => el.name !== "id");
    return defaultField?.value;
  }

  function valueId() {
    let defaultField = field?.fields?.find((el: any) => el.name == "id");
    return defaultField?.value;
  }

  function handleClickItem(item: any) {
    setField({
      ...field,
      fields: updatedFieldsFromObject(field.fields, item),
      filter: { id: { eq: item.id } },
    });
  }

  function deleteMe() {
    setField({
      ...field,
      filter: {},
      fields: field?.fields?.map((el: any) => ({
        ...el,
        value: el.name == "id" ? null : "",
        filter: {},
      })),
    });
  }

  return (
    <div className={colSpanFromSize(field.size)}>
      <DialogSearchData
        open={openModal}
        setOpen={setOpenModal}
        customFields={field?.fields}
        object={field?.object}
        schema={{ ...field?.object, fields: field?.fields }}
        handleClickItem={handleClickItem}
      ></DialogSearchData>
      <div>
        <p>{field?.label}</p>
        <p className="items-stretch justify-between m-1 p-2 bg-var(--bg-secondary) text-var(--text-dark) font-normal text-base flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ">
          <button
            disabled={field?.editable == false}
            onClick={(e) => {
              setOpenModal(true);
            }}
          >
            {valueSubFields()}
          </button>
          {(valueId() ? true : false) && field?.editable !== false && (
            <span className="text-red-600 cursor-pointer" onClick={deleteMe}>
              X
            </span>
          )}

          {(valueId() ? false : true) && (
            <button
              onClick={(e) => {
                if (field?.editable !== false) setOpenModal(true);
              }}
            >
              <SearchIcon></SearchIcon>
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
