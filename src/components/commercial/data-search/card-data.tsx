"use client";
import GraphqlDataView from "../graphql-view/graphql-data-view";

export default function CardData({
  fieldsFromParent,
  handleClickItem,
  schema,
  customFields,
  enableNewItem,
  enableEditDialog,
  enableDelete,
  enableOpen,
}: any) {
  return (
    <div className="defaultPage">
      <GraphqlDataView
        schema={schema}
        customFields={customFields}
        fieldsFromParent={fieldsFromParent}
        enableNewItem={enableNewItem === undefined ? true : enableNewItem}
        enableEdit={enableEditDialog}
        handleClickItem={handleClickItem}
        enableDelete={enableDelete}
        enableOpen={enableOpen}
      ></GraphqlDataView>
    </div>
  );
}
