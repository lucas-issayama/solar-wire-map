import { ResponsiveModal } from "@/components/ui/responsive-modal";
import GraphqlDataView from "../graphql-view/graphql-data-view";

export default function DialogSearchData({
  pageId,
  open,
  setOpen,
  customFields,
  handleClickItem,
  schema,
}: any) {
  function handleClickItemAndClose(item: any, fields: any) {
    //Send fields used to search item - its used for kits
    handleClickItem(item, fields);
    setOpen(false);
  }

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={setOpen}
      title="Buscar"
      className="p-3 sm:p-6"
    >
      <GraphqlDataView
        pageId={pageId}
        schema={schema}
        customFields={customFields}
        handleClickItem={handleClickItemAndClose}
      />
    </ResponsiveModal>
  );
}
