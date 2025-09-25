import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import corsolarApi from "@/utils/corsolar/corsolarApi";
import updatedFieldsFromObject from "@/utils/updatedFieldsFromObject";
import getValueFromFieldsToStrapi from "@/utils/getValueFromFields";
import { schemas } from "@/types/schemas/schemas";
import colSpanFromSize from "@/utils/colSpanFromSize";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import CardPrimary from "@/components/ui/card-primary";
import FieldInputData from "../field-inputs/field-input-data";
import useSession from "@/components/session/use-session";

interface DialogEditLeadProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  fields: any;
  schema: any;
  handleClickItem?: any;
  setRefreshParentCallKey: any;
  value: any;
  setValue?: (value: any) => void;
}

export default function DialogEditLead({
  open,
  setOpen,
  fields,
  schema,
  handleClickItem,
  setRefreshParentCallKey,
  value,
  setValue,
}: DialogEditLeadProps) {
  const { session, isLoading } = useSession();
  const { user } = session;

  const [editFields, setEditFields] = useState(
    fields?.map((el: any) => ({ ...el, value: "" }))
  );

  const [enterprise, setEnterprise] = useState<any>({});

  const roles = [
    {
      id: 2,
      name: "Public",
      type: "public",
    },
    {
      id: 3,
      name: "Integrador",
      type: "integrator",
    },
  ];

  useEffect(() => {
    setEditFields(updatedFieldsFromObject(fields, value));

    loadEnterprise();

    //Ler empresa pelo CNPJ e ao abrir criação puxar automaticamente dados do lead
  }, [value]);

  async function loadEnterprise() {
    // alert(`Search:${value?.cnpj}`);
    let ans = await corsolarApi.enterprises.getByCnpj(
      session?.token,
      value?.cnpj
    );
    setEnterprise(ans);
  }

  async function save() {
    let valueToSave: any = getValueFromFieldsToStrapi(editFields);

    valueToSave.id = value?.id;

    //Build object values from
    if (value.id) {
      let ans: any = await corsolarApi.graphql.update(
        schema,
        valueToSave,
        session?.token
      );
    } else {
      let ans: any = await corsolarApi.graphql.create(
        schema,
        valueToSave,
        session?.token
      );
    }

    setOpen(false);

    //Update prop to refresh parent
    setRefreshParentCallKey((prev: any) => prev + 1);
  }

  async function approve() {
    //Salvar user
    //Atrelar empresa com role integrator

    let userToUpdate = value.user;
    userToUpdate.enterprise = enterprise;
    userToUpdate.role = {
      id: 3,
      name: "Integrator",
      type: "integrator",
    };

    userToUpdate.blocked = false;

    let ans = await corsolarApi.users.update(session?.token, userToUpdate);
    setOpen(false);

    //Update prop to refresh parent
    setRefreshParentCallKey((prev: any) => prev + 1);
  }

  async function reject() {
    //Salvar user
    //Atrelar empresa com role integrator

    let userToUpdate = value.user;
    userToUpdate.enterprise = enterprise;
    userToUpdate.blocked = true;

    let ans = await corsolarApi.users.update(session?.token, userToUpdate);
    setOpen(false);

    //Update prop to refresh parent
    setRefreshParentCallKey((prev: any) => prev + 1);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="md:max-w-[80%] max-h-[90%] overflow-scroll ">
        <DialogHeader className="">
          <DialogTitle>Editar novo usuário</DialogTitle>
        </DialogHeader>

        <CardPrimary title="Dados do usuário" className="">
          <div className="grid grid-cols-12 gap-4 ">
            <div className={`${colSpanFromSize(4)}`}>
              <p>Nome</p>
              <Input
                disabled
                placeholder="Nome"
                value={value?.user?.name}
              ></Input>
            </div>
            <div className={`${colSpanFromSize(5)}`}>
              <p>Email</p>
              <Input
                placeholder="Email"
                disabled
                value={value?.user?.email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (setValue) {
                    setValue({
                      ...value,
                      user: { ...value.user, email: event.target.value },
                    });
                  }
                }}
              ></Input>
            </div>

            <div className={`${colSpanFromSize(3)}`}>
              <p>Celular</p>
              <Input
                disabled
                placeholder="Phone"
                value={value?.user?.phone}
              ></Input>
            </div>
          </div>
        </CardPrimary>

        <CardPrimary title="Dados do cadastro da empresa" className=" ">
          <div className="grid grid-cols-12 gap-4 space-y-4">
            <div className={`${colSpanFromSize(4)}`}>
              <p>Nome Fantasia</p>
              <Input
                disabled
                placeholder="Nome Fantasia"
                value={value?.name}
              ></Input>
            </div>
            <div className={`${colSpanFromSize(4)}`}>
              <p>Razão Social</p>
              <Input
                disabled
                placeholder="Razão Social"
                value={value?.legalName}
              ></Input>
            </div>
            <div className={`${colSpanFromSize(4)}`}>
              <p>CNPJ</p>
              <Input disabled placeholder="CNPJ" value={value?.cnpj}></Input>
            </div>

            <div className={`${colSpanFromSize(4)}`}>
              <p>I.E.</p>
              <Input disabled placeholder="I.E." value={value?.ie}></Input>
            </div>
            <div className={`${colSpanFromSize(4)}`}>
              <p>Email da Empresa</p>
              <Input
                disabled
                placeholder="Email da Empresa"
                value={value?.email}
              ></Input>
            </div>
            <div className={`${colSpanFromSize(4)}`}>
              <p>Telefone da Empresa</p>
              <Input
                disabled
                placeholder="Telefone da Empresa"
                value={value?.phone}
              ></Input>
            </div>

            <div className={`${colSpanFromSize(3)}`}>
              <p>Contribuinte ICMS</p>
              <Switch disabled checked={value?.sintegraContribuinteIcms} />
              <span className="ml-2 text-sm">
                {value?.sintegraContribuinteIcms ? "Sim" : "Não"}
              </span>
            </div>
            <div className={`${colSpanFromSize(3)}`}>
              <p>CEP</p>
              <Input disabled placeholder="CEP" value={value?.zipCode}></Input>
            </div>
            <div className={`${colSpanFromSize(4)}`}>
              <p>Rua</p>
              <Input
                disabled
                placeholder="Rua"
                value={value?.streetAddress}
              ></Input>
            </div>
            <div className={`${colSpanFromSize(2)}`}>
              <p>Número</p>
              <Input
                disabled
                placeholder="N.º"
                value={value?.streetAddressNumber}
              ></Input>
            </div>

            <div className={`${colSpanFromSize(4)}`}>
              <p>Complemento</p>
              <Input
                disabled
                placeholder="Complemento"
                value={value?.streetAddressLine2}
              ></Input>
            </div>
            <div className={`${colSpanFromSize(4)}`}>
              <p>Bairro</p>
              <Input
                disabled
                placeholder="Bairro"
                value={value?.neighborhood}
              ></Input>
            </div>
            <div className={`${colSpanFromSize(4)}`}>
              <p>Cidade</p>
              <Input
                disabled
                placeholder="Cidade"
                value={value?.city?.fullName || value?.city?.name}
              ></Input>
            </div>

            <div className={`${colSpanFromSize(6)}`}>
              <p>Website</p>
              <Input
                disabled
                placeholder="Website"
                value={value?.website}
              ></Input>
            </div>
            <div className={`${colSpanFromSize(6)}`}>
              <p>Facebook</p>
              <Input
                disabled
                placeholder="Facebook"
                value={value?.facebook}
              ></Input>
            </div>

            <div className={`${colSpanFromSize(6)}`}>
              <p>Instagram</p>
              <Input
                disabled
                placeholder="Instagram"
                value={value?.instagram}
              ></Input>
            </div>
            <div className={`${colSpanFromSize(6)}`}>
              <p>LinkedIn</p>
              <Input
                disabled
                placeholder="LinkedIn"
                value={value?.linkedin}
              ></Input>
            </div>

            <div className={`${colSpanFromSize(12)}`}>
              <p>Mensagem</p>
              <Input
                disabled
                placeholder="Mensagem"
                value={value?.message}
              ></Input>
            </div>
          </div>
        </CardPrimary>

        <CardPrimary title="Empresa cadastrada na Corsolar" className=" ">
          <h1 className="text-2xl font-extrabold my-10"></h1>

          {enterprise?.id && (
            <p>Confirme se a empresa é a mesma da cadastrada</p>
          )}

          {!enterprise?.id && (
            <p className="text-red-600">
              Cadastrar (clicando em +) o buscar empresa relacionada ao usuário
            </p>
          )}
          <FieldInputData
            schema={schemas.enterprise}
            label="Empresa cadastrada"
            value={enterprise}
            editable={true}
            setValue={(val: any) => {
              setEnterprise({ ...val });
            }}
            fieldsFromParent={[
              {
                name: "name",
                label: "Nome da empresa",
                type: "string",
                value: value?.name,
                size: 6,
              },
              {
                name: "legalName",
                label: "Razão Social",
                type: "string",
                value: value?.legalName,
                size: 4,
              },
              {
                name: "cnpj",
                label: "CNPJ",
                type: "string",
                value: value?.cnpj,
                filter: { eq: value?.cnpj },
                editable: false,
                size: 4,
              },
              {
                name: "ie",
                label: "I.E.",
                type: "string",
                value: value?.ie,
                size: 4,
              },
              {
                name: "email",
                label: "Email da Empresa",
                type: "string",
                value: value?.email,
                size: 4,
              },
              {
                name: "phone",
                label: "Telefone da Empresa",
                type: "string",
                value: value?.phone,
                size: 4,
              },
              {
                name: "sintegraContribuinteIcms",
                label: "Contribuinte ICMS",
                type: "boolean",
                value: value?.sintegraContribuinteIcms,
                size: 3,
              },
              {
                name: "zipCode",
                label: "CEP",
                type: "string",
                value: value?.zipCode,
                size: 3,
              },
              {
                name: "streetAddress",
                label: "Rua",
                type: "string",
                value: value?.streetAddress,
                size: 4,
              },
              {
                name: "streetAddressNumber",
                label: "Número",
                type: "string",
                value: value?.streetAddressNumber,
                size: 2,
              },
              {
                name: "streetAddressLine2",
                label: "Complemento",
                type: "string",
                value: value?.streetAddressLine2,
                size: 3,
              },
              {
                name: "neighborhood",
                label: "Bairro",
                type: "string",
                value: value?.neighborhood,
                size: 4,
              },
              {
                name: "city",
                label: "Cidade",
                type: "object",
                size: 4,
                object: {
                  name: "city",
                  singular: "city",
                  plural: "cities",
                  label: "Cidade",
                },
                value: value?.city,
                fields: [
                  {
                    name: "fullName",
                    label: "Cidade",
                    type: "string",
                    value: value?.city?.fullName || value?.city?.name,
                    default: true,
                  },
                ],
              },
              {
                name: "website",
                label: "Website",
                type: "string",
                value: value?.website,
                size: 6,
              },
              {
                name: "facebook",
                label: "Facebook",
                type: "string",
                value: value?.facebook,
                size: 6,
              },
              {
                name: "instagram",
                label: "Instagram",
                type: "string",
                value: value?.instagram,
                size: 6,
              },
              {
                name: "linkedin",
                label: "LinkedIn",
                type: "string",
                value: value?.linkedin,
                size: 6,
              },
              {
                name: "message",
                label: "Mensagem",
                type: "string",
                value: value?.message,
                size: 12,
              },
              {
                name: "owner",
                label: "Responsável",
                type: "object",
                size: 6,
                object: {
                  name: "usersPermissionsUser",
                  singular: "usersPermissionsUser",
                  plural: "usersPermissionsUsers",
                  label: "Responsável",
                },
                editable:
                  user?.role?.type == "director" ||
                  user?.role?.type == "sales-leader",
                fields: [
                  {
                    name: "id",
                    label: "Id",
                    type: "string",
                    value: value?.owner?.id,
                    hide: true,
                  },
                  {
                    name: "name",
                    label: "Nome",
                    type: "string",
                    value: value?.owner?.name,
                    default: true,
                  },
                  {
                    name: "role",
                    label: "",
                    type: "object",
                    hide: true,
                    object: {
                      name: "role",
                      singular: "role",
                      plural: "roles",
                      label: "Perfil",
                    },
                    filter: { type: { eq: "sales" } },
                    fields: [
                      {
                        name: "type",
                        label: "Tipo",
                        type: "string",
                        hide: true,
                      },
                    ],
                  },
                ],
              },
            ]}
          ></FieldInputData>
        </CardPrimary>

        <CardPrimary title="Informações de cadastro" className=" ">
          <div>
            <p>
              Acesso confirmado via email (Usuário pode confirmar por email)
            </p>

            <Switch
              checked={value?.user?.confirmed}
              onCheckedChange={(checked: boolean) => {
                if (setValue) {
                  setValue({
                    ...value,
                    user: { ...value.user, confirmed: checked },
                  });
                }
              }}
            ></Switch>
            {value?.user?.confirmed && "Sim"}
            {!value?.user?.confirmed && "Não"}
          </div>

          <br></br>
          <div className="flex justify-between">
            <Button className="bg-red-700" onClick={reject}>
              Reprovar
            </Button>
            {enterprise?.id && (
              <Button className="bg-green-700" onClick={approve}>
                Aprovar
              </Button>
            )}
          </div>
        </CardPrimary>
      </DialogContent>
    </Dialog>
  );
}
