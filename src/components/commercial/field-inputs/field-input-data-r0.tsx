import { useEffect, useState } from "react";
import { SearchIcon } from "@/components/icons/search-icon";
import colSpanFromSize from "@/utils/colSpanFromSize";
import DialogSearchData from "../dialogs/dialog-search-data";
import DialogDataEdit from "../dialogs/dialog-data-edit";
import EditIcon from "@/components/icons/edit-icon";
import AddIcon from "@/components/icons/add-icon";
import getValueFromFields from "@/utils/getValueFromFields";

interface FieldInputDataProps {
  schema: any;
  label?: string;
  editable?: boolean;
  value: any;
  setValue: any;
  fieldsFromParent?: any;
  customFields?: any;
  deletable?: boolean;
}

export default function FieldInputData({
  schema,
  label,
  editable,
  value,
  setValue,
  fieldsFromParent,
  customFields,
  deletable,
}: FieldInputDataProps) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [fields, setFields] = useState([
    ...(customFields ?? schema?.fields ?? []),
    ...(fieldsFromParent ?? []),
  ]);

  const [valueToEdit, setValueToEdit] = useState<any>();

  useEffect(() => {
    setFields((prev) => [
      ...prev.filter((prevField) => {
        let found = fieldsFromParent?.find(
          (f: any) => f.name == prevField.name
        );
        return found ? false : true;
      }),
      ...(fieldsFromParent ?? []),
    ]);
  }, [fieldsFromParent]);

  function valueToShow() {
    let defaultField = fields?.find((el: any) => el.default);
    if (!defaultField)
      defaultField = fields?.find(
        (el: any) =>
          el.name !== "id" &&
          !el.type?.includes("object") &&
          !el.type?.includes("image")
      );

    return value?.[defaultField?.name ?? ""] ?? "";
  }

  function valueId() {
    return value?.id;
  }

  function handleClickItem(item: any) {
    setValue(item);
  }

  function deleteMe() {
    setValue(null);
  }

  function newItem() {
    setValueToEdit({ ...getValueFromFields(fieldsFromParent ?? []) });

    setOpenModalEdit(true);
  }

  return (
    <>
      <DialogSearchData
        open={openModal}
        setOpen={setOpenModal}
        customFields={fields}
        schema={schema}
        handleClickItem={handleClickItem}
      ></DialogSearchData>

      <DialogDataEdit
        open={openModalEdit}
        setOpen={setOpenModalEdit}
        fields={fields}
        schema={schema}
        setValue={setValue}
        value={valueToEdit}
      ></DialogDataEdit>
      <div className={colSpanFromSize(schema.size)}>
        <p className="text-primary font-bold">{label}</p>
        <p
          className={`${
            editable == false
              ? "text-gray-400 bg-gray-200"
              : "bg-var(--bg-secondary) text-var(--text-dark) "
          } items-stretch justify-between m-1 p-2  font-normal text-base flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 `}
        >
          {(valueId() ? true : false) ? (
            <button
              className="bg-gray-100 w-full text-left px-4 rounded-sm hover:bg-gray-100"
              disabled={editable == false}
              onClick={(e) => {
                setValueToEdit(value);
                setOpenModalEdit(true);
              }}
            >
              <div className="flex items-stretch justify-between">
                <span className="whitespace-nowrap"> {valueToShow()}</span>
                <EditIcon></EditIcon>
              </div>
            </button>
          ) : (
            <button
              className="w-full text-left"
              onClick={(e) => {
                if (editable !== false) setOpenModal(true);
              }}
            >
              Escolher ...
            </button>
          )}

          {(valueId() ? true : false) &&
            editable !== false &&
            deletable !== false && (
              <span
                className="text-red-600 cursor-pointer mx-4"
                onClick={deleteMe}
              >
                X
              </span>
            )}
          {(valueId() ? false : true) && (
            <button
              className=" cursor-pointer mx-4"
              onClick={(e) => {
                if (editable !== false) setOpenModal(true);
              }}
            >
              {!(editable == false) && <SearchIcon></SearchIcon>}
            </button>
          )}
          {(valueId() ? false : true) && (
            <button
              className=" cursor-pointer mx-4"
              onClick={(el) => {
                newItem();
              }}
            >
              <AddIcon></AddIcon>
            </button>
          )}
        </p>
      </div>
    </>
  );
}
