"use client";

import FormFields from "@/components/commercial/form/form-fields";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import corsolarApi from "@/utils/corsolar/corsolarApi";
import { generateGraphQLQueryFromFields } from "@/utils/generate-graphql-query-from-fields";
import updatedFieldsFromObject from "@/utils/updatedFieldsFromObject";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import getValueFromFieldsToStrapi from "@/utils/getValueFromFieldsToStrapi";
import { toHyphenatedCase } from "@/utils/format/to-hyphenated-case";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import useSession from "../session/use-session";
import { LoadingIcon } from "../icons/loading";
import saveStrapi from "@/utils/corsolar/save-strapi";
import getAccessLevelFromRole from "@/utils/getAccessLevelFromRole";
interface DefaultDataEditPageProps {
  minAccessLevel?: number;
  params: {
    id: string;
  };
  schema: any;
  customFields?: any;
  disabled?: boolean;
}

export default function DefaultDataEditPage({
  minAccessLevel,
  params,
  schema,
  customFields,
  disabled,
}: DefaultDataEditPageProps) {
  //.
  const { session, isLoading } = useSession();
  const { user } = session;
  const router = useRouter();
  const [object, setObject] = useState<any>(schema);
  const [fields, setFields] = useState(customFields ?? schema?.fields ?? []);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  let query = composeQuery(generateGraphQLQueryFromFields(fields));

  function composeQuery(query: string) {
    return `
    query ${object.singular}{
      ${object.singular}(id:${params.id}){
        ${query}
      }
    }
    `;
  }

  const prevParamsRef = useRef(params);

  useEffect(() => {
    const prevParams = prevParamsRef.current;
    if (params?.id && !loaded) {
      doFetch();
      setLoaded(true);
    }

    if (prevParams?.id !== params?.id) {
      doFetch();
    }

    prevParamsRef.current = params;
  }, [params]);

  useEffect(() => {}, [fields]);

  async function doFetch() {
    console.log(params.id);
    if (query && params?.id && params.id !== "new") {
      let ans: any = await corsolarApi.graphql.fetchOne(
        object,
        {},
        query,
        session.token
      );
      setObject({ ...object, value: ans });

      let updatedFields = updatedFieldsFromObject(fields, ans);

      setFields(updatedFields);
      setLoaded(true);
    }
  }

  async function save() {
    await saveStrapi(session?.token, object, fields);
  }

  let authorized = minAccessLevel
    ? getAccessLevelFromRole(user?.role?.type) >= minAccessLevel
    : true;
  return (
    <div className="defaultPage mt-10 ">
      {!authorized && <p>Acesso negado</p>}

      {authorized && (
        <>
          {" "}
          <h1 className="text-2xl font-extrabold my-10">{object.label}</h1>
          <Card className="p-10">
            <FormFields
              schema={schema}
              fields={fields}
              setFields={setFields}
              disabled={disabled}
            ></FormFields>
            {!disabled && (
              <div className="flex items-end justify-end">
                <Button className="my-10" disabled={saving} onClick={save}>
                  {saving && <LoadingIcon></LoadingIcon>} Salvar
                </Button>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
