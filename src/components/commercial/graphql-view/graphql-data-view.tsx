import { useEffect, useState } from "react";
import GraphqlDataTable from "./graphql-data-table";
import GraphqlFilterSection from "./graphql-filter-section";
import { PageNavigation } from "@/components/page-navigation";
import corsolarApi from "@/utils/corsolar/corsolarApi";
import useSession from "@/components/session/use-session";
import DialogDataDelete from "../dialogs/dialog-data-delete";
import { composeGraphQLQuery } from "@/utils/compose-graphql-query";
import DialogDataEdit from "../dialogs/dialog-data-edit";
import { Button } from "@/components/ui/button";
import getValueFromFields from "@/utils/getValueFromFields";
import DialogEditVariable from "../dialogs/dialog-edit-variable";
import { composeFilterFromFields } from "@/utils/compose-filter-from-fields";
import getAccessLevelFromRole from "@/utils/getAccessLevelFromRole";
import fieldsConcatenate from "@/utils/fieldsConcatenate";
import DialogEditLead from "../dialogs/dialog-edit-lead";
import { toast } from "@/hooks/use-toast";
import { customFilterChange } from "@/utils/custom-filter-change";
import { exportToExcel } from "@/utils/format/export-to-excel";
import { formatValuesToExcel } from "@/utils/format/format-values-to-excel";
import isJsonEqual from "@/utils/general/is-json-equal";

interface GraphqlDataViewProps {
  pageId?: string;
  schema: any;
  customFields?: any;
  handleClickItem?: any;
  handleNewItem?: any;
  startSort?: string;
  enableOpen?: boolean;
  enableDelete?: boolean;
  enableNewItem?: boolean;
  enableEdit?: boolean;
  dontLoadOnOpen?: boolean;
  fieldsFromParent?: any;
}

export default function GraphqlDataView({
  pageId,
  schema,
  customFields,
  handleClickItem,
  handleNewItem,
  startSort,
  enableOpen,
  enableDelete,
  enableNewItem,
  enableEdit,
  dontLoadOnOpen,
  fieldsFromParent,
}: GraphqlDataViewProps) {
  const { session } = useSession();
  const { user } = session;
  const [sort, setSort] = useState(
    startSort ?? schema.startSort ?? "createdAt:desc"
  );
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  //State to update data after data editing
  const [refreshCallKey, setRefreshCallKey] = useState(0);
  const [itemToDelete, setItemToDelete] = useState<any>({});
  const [valueToEdit, setValueToEdit] = useState<any>({});
  const [firstLoad, setFirstLoad] = useState(true);
  const [values, setValues] = useState(() => {
    const storedValues = pageId
      ? localStorage.getItem(`values-${pageId}`)
      : null;
    return storedValues ? JSON.parse(storedValues) : [];
  });

  const [fields, setFields] = useState(() => {
    let _fields = fieldsConcatenate(
      fieldsFromParent ?? [],
      customFields ?? schema?.fields ?? []
    );

    const storedFields = pageId
      ? localStorage.getItem(`fields-${pageId}`)
      : null;

    let isEqual = false;
    if (storedFields) {
      isEqual = isJsonEqual(
        storedFields
          ? JSON.parse(storedFields)?.map((el: any) => ({
              name: el.name,
              label: el.label,
              hide: el.hide,
            }))
          : null,
        _fields?.map((el: any) => ({
          name: el.name,
          label: el.label,
          hide: el.hide,
        }))
      );
    }

    if (isEqual)
      return storedFields && pageId ? JSON.parse(storedFields) : _fields;
    else return _fields;
  });

  const [pagination, setPagination] = useState(() => {
    const storedPagination = pageId
      ? localStorage.getItem(`pagination-${pageId}`)
      : null;
    return storedPagination ? JSON.parse(storedPagination) : {};
  });

  useEffect(() => {
    if (!dontLoadOnOpen) {
      setPage(1);
    }

    let accessLevel = getAccessLevelFromRole(user?.role?.name ?? "");
    setFields(
      fields.map((el: any) => {
        if (el.name == "accessLevel")
          return { ...el, filter: { lte: accessLevel } };
        else return { ...el };
      })
    );
  }, []);

  useEffect(() => {
    // Save fields to localStorage whenever they change
    if (pageId)
      localStorage.setItem(`fields-${pageId}`, JSON.stringify(fields));
  }, [fields]);

  useEffect(() => {
    // Save fields to localStorage whenever they change
    if (pageId)
      localStorage.setItem(`values-${pageId}`, JSON.stringify(values));
  }, [values]);

  useEffect(() => {
    // Save fields to localStorage whenever they change
    if (pageId)
      localStorage.setItem(`pagination-${pageId}`, JSON.stringify(pagination));
  }, [pagination]);

  useEffect(() => {
    if (!firstLoad) {
      doFetch();
    } else if (values?.length <= 0) {
      doFetch();
    }

    setFirstLoad(false);
  }, [refreshCallKey, query]);

  useEffect(() => {
    if (schema?.singular == "city") {
      setSort("fullName");
    }

    if (page > 0) {
      setQuery(composeGraphQLQuery(fields, schema, sort, page, pageSize));
    }
  }, [page]);

  useEffect(() => {
    if (schema?.singular == "city") {
      setPage(1);
    }

    if (page > 0) {
      setQuery(composeGraphQLQuery(fields, schema, sort, page, pageSize));
    }
  }, [sort]);

  async function downloadExcel() {
    if (!query) return;

    setIsDownloading(true);

    let filters: any = composeFilterFromFields(fields);

    filters = customFilterChange(filters, schema);
    try {
      let ans: any = await corsolarApi.graphql.fetch(
        session?.token,
        schema,
        filters,
        composeGraphQLQuery(
          fields,
          schema,
          sort,
          page,
          getAccessLevelFromRole(user?.role?.type) >= 3
            ? 6000
            : getAccessLevelFromRole(user?.role?.type) == 2
            ? 1000
            : 100
        )
      );
      let items = formatValuesToExcel(ans?.values, fields);

      // Export the data to Excel
      exportToExcel(items, schema.labelPlural ?? "export");
      setIsDownloading(false);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error?.message,
        variant: "destructive",
      });
    }
  }

  async function doFetch() {
    if (!query) return;

    setIsSearching(true);

    let filters: any = composeFilterFromFields(fields);

    filters = customFilterChange(filters, schema);
    try {
      let ans: any = await corsolarApi.graphql.fetch(
        session?.token,
        schema,
        filters,
        query
      );

      setValues(ans?.values);
      setPagination(ans?.pagination);
      setIsSearching(false);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error?.message,
        variant: "destructive",
      });
    }
  }

  function handleDeleteItem(item: any) {
    setOpenModalDelete(true);
    setItemToDelete(item);
  }

  function handleEditItem(value: any) {
    setValueToEdit({
      ...value,
      ...getValueFromFields(fieldsFromParent ?? []),
    });

    setOpenModalEdit(true);
  }

  function newItem() {
    if (handleNewItem) {
      handleNewItem();
    } else {
      setValueToEdit({ ...getValueFromFields(fieldsFromParent ?? []) });
      setOpenModalEdit(true);
    }
  }

  function doRemoveFilters() {
    setFields(
      fieldsConcatenate(
        fieldsFromParent ?? [],
        customFields ?? schema?.fields ?? []
      )
    );
    setPagination({});
  }

  return (
    <div className="my-10 px-1">
      <div className="flex items-end justify-end">
        {enableNewItem && (
          <Button className="" onClick={newItem}>
            + Novo
          </Button>
        )}
      </div>

      {schema?.singular === "variable" && (
        <DialogEditVariable
          open={openModalEdit}
          setOpen={setOpenModalEdit}
          fields={fields}
          schema={schema}
          value={valueToEdit}
          setRefreshParentCallKey={setRefreshCallKey}
        />
      )}

      {schema?.singular === "lead" && (
        <DialogEditLead
          open={openModalEdit}
          setOpen={setOpenModalEdit}
          fields={fields?.map((el: any) => ({
            ...el,
            type: el.name === "product" ? "object" : el.type,
          }))}
          schema={schema}
          value={valueToEdit}
          setValue={setValueToEdit}
          setRefreshParentCallKey={setRefreshCallKey}
        />
      )}

      {schema?.singular !== "variable" && schema?.singular !== "lead" && (
        <DialogDataEdit
          open={openModalEdit}
          setOpen={setOpenModalEdit}
          fields={fields?.map((el: any) => ({
            ...el,
            type: el.name === "product" ? "object" : el.type,
          }))}
          schema={schema}
          value={valueToEdit}
          setRefreshParentCallKey={setRefreshCallKey}
        />
      )}

      <DialogDataDelete
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        item={itemToDelete}
        schema={schema}
        setRefreshParentCallKey={setRefreshCallKey}
      />

      <h1 className="text-2xl font-extrabold text-primary">
        {schema.labelPlural?.toUpperCase() ?? schema.label?.toUpperCase()}
      </h1>

      <GraphqlFilterSection
        fields={fields}
        setFields={setFields}
        query={query}
        setValues={setValues}
        page={page}
        setPage={setPage}
        pagination={pagination}
        setPagination={setPagination}
        doFetch={doFetch}
        isSearching={isSearching}
        isDownloading={isDownloading}
        doRemoveFilters={doRemoveFilters}
        downloadExcel={downloadExcel}
        pageId={pageId}
      />

      <div className="flex flex-row justify-between p-2">
        <br />
        {page > 0 && (
          <PageNavigation
            page={page}
            setPage={setPage}
            pagination={pagination}
          />
        )}
      </div>

      <GraphqlDataTable
        schema={schema}
        fields={fields}
        setFields={setFields}
        setSort={setSort}
        query={query}
        setValues={setValues}
        values={values}
        isSearching={isSearching}
        handleClickItem={handleClickItem}
        handleDeleteItem={handleDeleteItem}
        handleEditItem={handleEditItem}
        enableOpen={enableOpen}
        enableDelete={enableDelete}
        enableEdit={enableEdit}
      />
    </div>
  );
}