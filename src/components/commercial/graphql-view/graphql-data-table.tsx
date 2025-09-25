import { LoadingIcon } from "@/components/icons/loading";
import GraphqlDataTd from "./graphql-data-td";
import GraphqlDataTh from "./graphql-data-th";
import { Button } from "@/components/ui/button";
import EditIcon from "@/components/icons/edit-icon";
import ChooseIcon from "@/components/icons/choose-icon";
import Link from "next/link";
import { toHyphenatedCase } from "@/utils/format/to-hyphenated-case";

export default function GraphqlDataTable({
  fields,
  setFields,
  values,
  handleClickItem,
  handleEditItem,
  handleDeleteItem,
  isSearching,
  enableOpen,
  enableDelete,
  enableEdit,
  setSort,
  schema,
}: any) {
  function subFieldsFieldsSort(_fields: any) {
    return _fields?.map((_field: any) => {
      if (_field?.fields) {
        return {
          ..._field,
          sort: 0,
          fields: subFieldsFieldsSort(_field?.fields),
        };
      } else {
        return { ..._field, sort: 0 };
      }
    });
  }

  function getSort(baseSort: string, _field: any) {
    if (_field?.sort == 1) {
      return `${baseSort}${_field.name}`;
    }
    if (_field?.sort == 2) {
      return `${baseSort}${_field.name}:desc`;
    }
    if (_field?.fields) {
      let sortSubFields = _field?.fields
        ?.map((el: any) => getSort(`${_field.name}.`, el))
        .find((el: any) => el);

      if (sortSubFields) return sortSubFields;
    }
  }

  function setField(field: any) {
    //Erase sort
    let updatedFields = fields?.map((el: any) => {
      if (field.name == el.name) return field;
      else {
        if (el.fields)
          return { ...el, sort: 0, fields: subFieldsFieldsSort(el.fields) };
        else return { ...el, sort: 0 };
      }
    });

    if (setSort) {
      let sortText = getSort("", field);
      setSort(sortText);
    }

    setFields(updatedFields);
  }

  function getHref(value: any) {
    if (
      schema.singular?.includes("quoteKitItem") &&
      value?.quoteKit?.quote?.id
    ) {
      //alert(JSON.stringify(value));
      return `/commercial/quote/${value?.quoteKit?.quote?.id}`;
    }

    return `/commercial/${toHyphenatedCase(schema.singular)}/${value.id}`;
  }
  return (
    <div className="mb-4 bg-white p-2 rounded-md w-full min-h-[600px] overflow-scroll">
      {/* Desktop/Tablet Table View */}
      <div className="hidden md:block">
        <table
          className={`p-4 rounded-md min-w-full w-[${
            fields?.reduce((acc: any, curr: any) => acc + (curr?.size ?? 1), 0) *
            300
          }px]`}
        >
          <thead>
            <tr className="h-12">
              {(handleClickItem || enableOpen) && (
                <th className="bg-primary border text-start pr-4 pl-3 text-white font-normal p-4 w-[60px]"></th>
              )}
              {enableEdit && (
                <th className="bg-primary border text-start pr-4 pl-3 text-white font-normal p-4 w-[60px]"></th>
              )}
              {fields
                ?.filter((el: any) => el.type !== "password")
                ?.map((field: any, index: number) => (
                  <GraphqlDataTh
                    key={`${field.name}-${index}`}
                    field={field}
                    setField={setField}
                  ></GraphqlDataTh>
                ))}
              {enableDelete && (
                <th className="bg-primary border text-start pr-4 pl-3 text-white font-normal p-4 w-[60px]"></th>
              )}
            </tr>
          </thead>
          {isSearching && (
            <tbody className="flex items-center justify-center">
              <tr>
                <td>
                  <LoadingIcon></LoadingIcon>
                </td>
              </tr>
            </tbody>
          )}
          {!isSearching && (
            <tbody>
              {values?.map((value: any) => (
                <tr
                  className="hover:bg-gray-100 cursor-pointer h-12"
                  key={value.id}
                  onDoubleClick={(el) => {
                    if (handleClickItem) handleClickItem(value);
                  }}
                >
                  {enableOpen && (
                    <td>
                      <Link href={getHref(value)}>
                        <Button className="bg-white">
                          <ChooseIcon></ChooseIcon>
                        </Button>
                      </Link>
                    </td>
                  )}
                  {!enableOpen && handleClickItem && (
                    <td>
                      <Button
                        className="bg-white"
                        onClick={(el) => handleClickItem(value)}
                      >
                        <ChooseIcon></ChooseIcon>
                      </Button>
                    </td>
                  )}
                  {enableEdit && (
                    <td>
                      <Button
                        className="bg-white"
                        onClick={(el) => handleEditItem(value)}
                      >
                        <EditIcon></EditIcon>
                      </Button>
                    </td>
                  )}
                  {fields?.map((field: any, index: number) => (
                    <GraphqlDataTd
                      key={`${field.name}-${index}`}
                      parentField={field}
                      field={field}
                      value={value}
                    ></GraphqlDataTd>
                  ))}
                  {enableDelete && (
                    <td>
                      <Button
                        className="bg-red-400"
                        onClick={(el) => handleDeleteItem(value)}
                      >
                        X
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden">
        {isSearching && (
          <div className="flex items-center justify-center py-8">
            <LoadingIcon></LoadingIcon>
          </div>
        )}
        {!isSearching && (
          <div className="space-y-4">
            {values?.map((value: any) => (
              <div
                key={value.id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
                onDoubleClick={() => {
                  if (handleClickItem) handleClickItem(value);
                }}
              >
                <div className="space-y-3">
                  {fields
                    ?.filter((el: any) => el.type !== "password")
                    ?.map((field: any, index: number) => (
                      <div key={`${field.name}-${index}`} className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {field.displayName || field.name}
                        </span>
                        <div className="text-sm text-gray-900 mt-1">
                          <GraphqlDataTd
                            field={field}
                            parentField={field}
                            value={value}
                          />
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex flex-wrap justify-between items-center gap-2 mt-4 pt-3 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {!enableOpen && handleClickItem && (
                      <Button
                        size="sm"
                        className="bg-primary text-white"
                        onClick={() => handleClickItem(value)}
                      >
                        <ChooseIcon />
                        <span className="ml-1">Selecionar</span>
                      </Button>
                    )}
                    {enableEdit && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditItem(value)}
                      >
                        <EditIcon />
                        <span className="ml-1">Editar</span>
                      </Button>
                    )}
                    {enableDelete && (
                      <Button
                        size="sm"
                        className="bg-red-400 text-white"
                        onClick={() => handleDeleteItem(value)}
                      >
                        Deletar
                      </Button>
                    )}
                  </div>
                  {enableOpen && (
                    <Link href={getHref(value)}>
                      <Button size="sm" className="bg-primary text-white">
                        <ChooseIcon />
                        <span className="ml-1">Abrir</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
