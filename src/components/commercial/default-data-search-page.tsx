"use client";

import GraphqlDataView from "@/components/commercial/graphql-view/graphql-data-view";
import { toHyphenatedCase } from "@/utils/format/to-hyphenated-case";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSession from "../session/use-session";
import getAccessLevelFromRole from "@/utils/getAccessLevelFromRole";

interface DefaultDataSearchPageProps {
  minAccessLevel?: number;
  pageId?: string;
  schema: any;
  customFields?: any;
  startSort?: string;
  enableEditDialog?: boolean;
  enableNewItem?: boolean;
  fieldsFromParent?: any;
  //accesDenied?: boolean;
  enableDelete?: boolean;
}

export default function DefaultDataSearchPage({
  minAccessLevel,
  pageId,
  schema,
  enableEditDialog,
  enableNewItem,
  customFields,
  startSort,
  fieldsFromParent,
  //accesDenied,
  enableDelete,
}: DefaultDataSearchPageProps) {
  const router = useRouter();
  const { session, isLoading } = useSession();
  const { user } = session;

  // const [fields, setFields] = useState(schema.fields);

  function handleClickItem(value: any) {
    router.push(`/commercial/${toHyphenatedCase(schema.singular)}/${value.id}`);
  }

  function newItem() {
    router.push(`/commercial/${toHyphenatedCase(schema.singular)}/new`);
  }

  let authorized = minAccessLevel
    ? getAccessLevelFromRole(user?.role?.type) >= minAccessLevel
    : true;
  return (
    <div className="defaultPage">
      {/* <p>{minAccessLevel}</p> */}
      {authorized && (
        <GraphqlDataView
          enableOpen={schema.singular == "lead" ? false : true}
          pageId={pageId}
          schema={schema}
          customFields={customFields}
          startSort={startSort}
          handleClickItem={schema.singular == "lead" ? false : handleClickItem}
          handleNewItem={newItem}
          enableEdit={enableEditDialog}
          enableNewItem={enableNewItem === undefined ? true : enableNewItem}
          enableDelete={enableDelete}
          fieldsFromParent={fieldsFromParent}
        ></GraphqlDataView>
      )}
      {!authorized && <p>Acesso negado</p>}
    </div>
  );
}
