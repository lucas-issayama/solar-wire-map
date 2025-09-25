import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import GraphqlFilterSection from "./graphql-filter-section";
import { formatDate } from "@/utils/format/format-date";
import { formatDateTime } from "@/utils/format/format-date-time";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

export default function GraphqlDataTh({
  field,
  parentField,
  setField,
  setFieldOnParent,
}: any) {
  function thClicked() {
    let sort = field.sort;
    if (!sort) {
      handleSetField({ ...field, sort: 1 });
      return;
    }

    if (sort == 1) {
      handleSetField({ ...field, sort: 2 });
      return;
    }

    if (sort == 2) {
      handleSetField({ ...field, sort: 0 });
      return;
    }
  }

  function handleSetField(field: any) {
    if (parentField && setFieldOnParent) {
      setFieldOnParent({ ...field });
      return;
    }
    if (setField) {
      setField({ ...field });
      return;
    }
  }

  function handleSetSubfield(subfield: any) {
    if (field.fields && setField) {
      setField({
        ...field,
        fields: field.fields.map((el: any) => {
          if (el.name == subfield.name) return subfield;
          else return { ...el, sort: 0 };
        }),
      });
    }

    if (field.fields && setFieldOnParent) {
      setFieldOnParent({
        ...field,
        fields: field.fields.map((el: any) => {
          if (el.name == subfield.name) return subfield;
          else return el;
        }),
      });
    }
  }

  return (
    <>
      {!field?.hide && !field?.hideView && (
        <>
          {!field.type?.includes("object") && (
            <th
              className="bg-primary border text-start pr-4 pl-3 text-white font-normal  p-4 "
              onClick={(ev) => {
                thClicked();
              }}
            >
              <div className="flex justify-between cursor-pointer font-bold">
                {field.label?.toUpperCase()}
                <span>{field?.hide ? "hide" : ""}</span>{" "}
                <span>{field?.hideView ? "-hideView" : ""}</span>
                {field.sort == 1 && (
                  <ArrowDownIcon className="mt-1"></ArrowDownIcon>
                )}
                {field.sort == 2 && (
                  <ArrowUpIcon className="mt-1"></ArrowUpIcon>
                )}
              </div>
            </th>
          )}
          {field.type?.includes("object") &&
            field?.fields?.map((subfield: any, index: number) => (
              <GraphqlDataTh
                key={`${field.name}${subfield.name}`}
                field={subfield}
                setFieldOnParent={handleSetSubfield}
                parentField={field}
              ></GraphqlDataTh>
            ))}
        </>
      )}
    </>
  );
}
