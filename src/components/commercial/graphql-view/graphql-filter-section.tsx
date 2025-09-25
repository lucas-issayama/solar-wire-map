import { Button } from "@/components/ui/button";
import FilterFormFields from "../form-filter/filter-form-fields";
import { LoadingIcon } from "@/components/icons/loading";
import useSession from "@/components/session/use-session";
import getAccessLevelFromRole from "@/utils/getAccessLevelFromRole";

export default function GraphqlFilterSection({
  fields,
  setFields,
  setPage,
  doFetch,
  isSearching,
  isDownloading,
  doRemoveFilters,
  downloadExcel,
  pageId,
}: any) {
  const { session, isLoading, logout } = useSession();
  const { user } = session;
  async function handleDoSearchClick() {
    setPage(1);
    await doFetch();
  }

  return (
    <div className="my-4 p-4 sm:p-10 bg-white rounded-md">
      <FilterFormFields
        fields={fields}
        setFields={setFields}
      ></FilterFormFields>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end mt-6 sm:mt-0">
        {pageId && (
          <Button
            className="w-full sm:w-auto"
            variant="outline"
            onClick={doRemoveFilters}
          >
            Apagar filtros
          </Button>
        )}
        <div className="flex gap-3">
          {getAccessLevelFromRole(user?.role?.type) >= 1 && (
            <Button
              className="flex-1 sm:w-auto"
              disabled={isDownloading}
              onClick={downloadExcel}
            >
              Download {isDownloading && <LoadingIcon></LoadingIcon>}
            </Button>
          )}
          <Button
            className="flex-1 sm:w-auto"
            disabled={isSearching}
            onClick={handleDoSearchClick}
          >
            Buscar {isSearching && <LoadingIcon></LoadingIcon>}
          </Button>
        </div>
      </div>
    </div>
  );
}
