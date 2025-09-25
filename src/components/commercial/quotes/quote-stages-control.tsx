import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import DialogDoApproval from "../dialogs/dialog-do-approval";
import DialogReqApproval from "../dialogs/dialog-req-approval";
import DialogRejection from "../dialogs/dialog-rejection";
import { useQuoteProps } from "@/hooks/useQuoteProps";
import useSession from "@/components/session/use-session";
import getAccessLevelFromRole from "@/utils/getAccessLevelFromRole";
import DialogFinishOrder from "../dialogs/dialog-finish-order";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import quoteContainsInverter from "@/utils/quoteContainsInverter";
import { quoteIsExpired } from "@/utils/format/quote-is-expired";

export default function QuoteStagesControl({
  quote,
  maxDiscount,
  minContributionMargin,
  openGeneratedPdf,
  setOpenGeneratedPdf,
  setQuoteAndSave,
}: any) {
  const router = useRouter();
  const [openDialogDoApproval, setOpenDialogDoApproval] = useState(false);
  const [openDialogRejection, setOpenDialogRejection] = useState(false);
  const [openDialogReqApproval, setOpenDialogReqApproval] = useState(false);
  const [openDialogFinishOrder, setOpenDialogFinishOrder] = useState(false);

  // const [ openDialogItems, setOpenDialogItems] = useState(false);

  // open={openDialogReqApproval}
  // setOpen={setOpenDialogReqApproval}
  const [myStages, setMyStages] = useState<any>([]);
  const { stages } = useQuoteProps();

  const { session, isLoading } = useSession();
  const { user } = session;

  useEffect(() => {
    if (user && stages) {
      let accessLevel = getAccessLevelFromRole(user.role?.name);
      setMyStages(stages.filter((el) => (el.accessLevel ?? 0) <= accessLevel));
    }
  }, [stages, user]);
  function getDiscountPercentage() {
    if (quote) {
      if (quote.discountType == "percentage") return quote.discountValue / 100;

      if (quote?.priceKitsInCents)
        return (quote.discountValue ?? 0) / quote?.priceKitsInCents;
    }
    return 0;
  }

  function quoteOKtoProceed() {
    let accessLevel = getAccessLevelFromRole(user?.role?.name ?? "");
    if (!quote) return false;

    let discountOK =
      getDiscountPercentage() <= maxDiscount &&
      quote.kitFinalDiscountPercentage <= maxDiscount;
    let marginOk =
      quote.contributionMargin &&
      quote.contributionMargin >= minContributionMargin;

    if (quote.kitContributionMargin) {
      marginOk =
        quote.kitContributionMargin &&
        quote.kitContributionMargin >= minContributionMargin;
    }

    if (getAccessLevelFromRole(user?.role?.name) >= 3) {
      return true;
    }

    if (!discountOK || !marginOk) {
      console.log("is low");
      if (
        accessLevel < 2 &&
        (quote.approvedByDirector || quote.approvedByCoordinator)
      )
        return true;

      if (
        getAccessLevelFromRole(user?.role?.name ?? "") == 2 &&
        quote.approvedByDirector
      ) {
        return true;
      }

      return false;
    } else {
      return true;
    }

    // return (
    //   (quote &&
    //     ) ||
    //   getAccessLevelFromRole(user?.role?.name) >= 3
    // );
  }

  function backToLastStage() {
    //alert("backToLastStage");
    //||   quote?.stage?.slug == "order-summary";

    if (quote?.stage?.slug == "checking-out" && quoteOKtoProceed()) {
      let stageTo = myStages.find((el: any) => el.slug == "created");
      if (stageTo) {
        setQuoteAndSave({
          ...quote,
          stage: stageTo,
        });
      } else {
        alert("Erro na finalização do pedido");
      }
      return;
    }

    if (
      quote?.stage?.slug?.includes("rejected") ||
      quote?.stage?.slug?.includes("approved")
    ) {
      let stageTo = myStages.find((el: any) => el.slug == "created");
      if (stageTo) {
        setQuoteAndSave({
          ...quote,
          stage: stageTo,
        });
      } else {
        alert("Erro na finalização do pedido");
      }
      return;
    }

    let index = myStages?.findIndex((el: any) => el.id == quote?.stage?.id);

    // alert(JSON.stringify({ index }));
    if (index > 0) {
      setQuoteAndSave({
        ...quote,
        stage: myStages[index - 1],
      });
    }
  }

  function goNextStage() {
    // validateAndProceed();
    // return;

    if (!validateBeforeProceed()) {
      return;
    }

    if (
      (quote?.stage?.slug == "created" && quoteOKtoProceed()) ||
      quote?.stage?.slug?.includes("approved")
    ) {
      let stageTo = myStages.find((el: any) => el.slug == "checking-out");

      if (stageTo) {
        setQuoteAndSave({
          ...quote,
          stage: stageTo,
        });
      } else {
        alert("Erro na finalização do pedido");
      }

      return;
    }

    //If

    //console.log(quote?.stage?.id);
    let index = myStages
      // ?.filter?.((el: any) => !el.slug?.includes("canceled"))
      ?.findIndex((el: any) => el.id == quote?.stage?.id);

    if (index < myStages?.length) {
      setQuoteAndSave({
        ...quote,
        stage: myStages[index + 1],
      });
    }
  }

  function validateBeforeProceed() {
    // alert("validateBeforeProceed");
    let errorMessages = [] as any;

    if (!quote?.enterprise?.id) {
      toast({
        title: "",
        description: "Preencher integrador",
        variant: "warning",
      });
      return false;
    }

    if (user?.role?.type == "sales" && quote?.enterprise.id == 1) {
      toast({
        title: "",
        description: "Preencher integrador correto (Não CorSolar)",
        variant: "warning",
      });
      return false;
    }

    if (
      quote?.stage?.slug == "created" ||
      quote?.stage?.slug == "created-by-integrator"
    ) {
      if (user?.role?.type == "integrator") {
        if (!quoteContainsInverter(quote)) {
          errorMessages.push("Adicionar pelo menos um inversor no orçamento");
        }
      }
    }

    //Checking out
    if (
      quote?.stage?.slug == "checking-out" ||
      quote?.stage?.slug == "integrator-checking-out"
    ) {
      if (!quote?.shippingAddressInfo && quote.shippingType == "cif") {
        errorMessages.push("Preencher informação de endereço de entrega");
      }

      if (!quote?.billingEntity) {
        errorMessages.push("Entidade de faturamento");
      }

      if (quote?.billingEntity == "contact") {
        if (!quote.contact) errorMessages.push("Cliente");
        else {
          if (!quote.contact?.typeId)
            errorMessages.push("Preencher tipo de pessoa");
          if (quote.contact?.typeId == 1 && !quote.contact?.cnpj)
            errorMessages.push("Preencher cnpj de cliente");

          if (quote.contact?.typeId == 2 && !quote.contact?.cpf)
            errorMessages.push("Preencher cpf de cliente");

          if (!quote.contact?.email)
            errorMessages.push("Preencher email de cliente");
        }
      }

      if (quote?.billingEntity == "enterprise" && !quote.invoiceAddress) {
        errorMessages.push("Empresa");
      }

      if (!quote.shippingAddress) {
        errorMessages.push("Endereço de entrega");
      } else {
        errorMessages = [
          ...errorMessages,
          ...validateAddress(quote.shippingAddress, "Endereço de entrega"),
        ];
      }

      // if (!quote.invoiceAddress) {
      //   errorMessages.push("Endereço de faturamento");
      // }
      if (!quote.invoiceAddress) {
        errorMessages.push("Endereço de faturamento");
      } else {
        errorMessages = [
          ...errorMessages,
          ...validateAddress(quote.invoiceAddress, "Endereço de faturamento"),
        ];
      }
      if (!quote.shippingType) {
        errorMessages.push("Tipo de frete");
      }
    }

    if (quoteIsExpired(quote.createdAt)) {
      toast({
        title: "",
        description: "Prazo da proposta vencido",
        variant: "warning",
      });
    }

    if (errorMessages.length) {
      toast({
        title: "Preencher campos obrigatórios para prosseguir",
        description: errorMessages.join(", "),
        variant: "warning",
      });
      return false;
    } else {
      return true;
    }
  }

  function validateAddress(address: any, addressType: string) {
    let errorMessages = [];
    if (!address?.city) {
      errorMessages.push(`Cidade do ${addressType}`);
    }
    if (!address?.streetAddress) {
      errorMessages.push(`Logradouro do ${addressType}`);
    }
    if (!address?.neighborhood) {
      errorMessages.push(`Bairro do ${addressType}`);
    }
    // if (!address?.streetAddressNumber) {
    //   errorMessages.push(`Número do ${addressType}`);
    // }
    if (!address?.zipCode) {
      errorMessages.push(`Cep do ${addressType}`);
    }
    return errorMessages;
  }

  function isFirstStage() {
    let index = myStages
      ?.filter?.((el: any) => !el.slug?.includes("canceled"))
      .findIndex((el: any) => el.id == quote?.stage?.id);
    return index == 0;
  }

  function isLastStage() {
    let index = myStages
      ?.filter?.((el: any) => !el.slug?.includes("canceled"))
      ?.findIndex((el: any) => el.id == quote?.stage?.id);
    return (
      index >=
      (myStages?.filter?.((el: any) => !el.slug?.includes("canceled"))
        ?.length ?? 0) -
        1
    );
  }

  function isBeforeLastStage() {
    // let index = myStages?.findIndex((el: any) => el.id == quote?.stage?.id);
    // return index == (myStages?.length ?? 0) - 2;

    if (
      user?.role?.type == "integrator" &&
      quote?.stage?.slug == "integrator-order-summary"
    )
      return true;

    let index = myStages
      ?.filter((el: any) => el.sortNumber < 100)
      ?.filter?.((el: any) => !el.slug?.includes("canceled"))
      .findIndex((el: any) => el.id == quote?.stage?.id);
    // console.log(
    //   JSON.stringify(
    //     myStages
    //       ?.filter((el: any) => el.sortNumber < 100)
    //       ?.filter?.((el: any) => !el.slug?.includes("canceled"))
    //   )
    // );
    // console.log(
    //   JSON.stringify({
    //     index,
    //     length1:
    //       (myStages
    //         ?.filter?.((el: any) => !el.slug?.includes("canceled"))
    //         ?.filter((el: any) => el.sortNumber < 100)?.length ?? 0) - 1,
    //   })
    // );
    return (
      index ==
      (myStages
        ?.filter?.((el: any) => !el.slug?.includes("canceled"))
        ?.filter((el: any) => el.sortNumber < 100)?.length ?? 0) -
        1
    );
  }

  function isStageToApprove() {
    let stagesToSearch = [
      "awaiting-coordinator-approval",
      "awaiting-director-approval",
    ];

    let stageFound = stagesToSearch.find((el) => el == quote?.stage?.slug);
    return stageFound ? true : false;
  }

  function enableGoNext() {
    let accessLevel = getAccessLevelFromRole(user?.role?.type);
    if (quote.stage.accessLevel > accessLevel) return false;
    let stagesEnable = [
      "order-completed-by-integrator",
      "approved-by-coordinator",
      "approved-by-director",
      "checking-out",
      //"created-by-integrator",
      //"integrator-checking-out",
      //"integrator-order-summary",
    ];

    let stageFound = stagesEnable.find((el) => el == quote?.stage?.slug);
    return quoteOKtoProceed() || (stageFound ? true : false);
  }

  function disableGoNext() {
    if (
      user?.role?.type == "integrator" &&
      quote?.stage?.slug == "order-completed-by-integrator"
    )
      return true;

    if (quote?.stage?.sortNumber >= 100) return true;
    let stagesToSearch = [
      "rejected-by-coordinator",
      "awaiting-director-approval",
      "rejected-by-director",
      "awaiting-director-approval",
    ];

    let stageBlock = stagesToSearch.find((el) => el == quote?.stage?.slug);

    if (stageBlock) {
      return true;
    }

    // let stagesEnableGoNext = [
    //   "approved-by-coordinator",
    //   "approved-by-director",
    //   "checking-out",
    //   //"created-by-integrator",
    //   //"integrator-checking-out",
    //   //"integrator-order-summary",
    // ];
    // let stageEnabled = stagesToSearch.find((el) => el == quote?.stage?.slug);
    // if (stageEnabled) {
    //   return false;
    // }

    return false;
    //return (stageBlock ? true : false) ;
  }

  function disableGoBack() {
    let accessLevel = getAccessLevelFromRole(user?.role?.type);
    if (quote.stage.accessLevel > accessLevel) return true;

    //Pedido finalizado
    if (quote?.stage?.sortNumber >= 100) return true;

    let stagesToSearch = [
      "created",
      "order-completed-by-integrator",
      // "awaiting-coordinator-approval",
      // "awaiting-director-approval",

      //"approved-by-coordinator",
      //"rejected-by-coordinator",
      //"approved-by-director",
      //"rejected-by-director",
      //  "checking-out",
    ];

    let stageFound = stagesToSearch.find((el) => el == quote?.stage?.slug);

    return stageFound ? true : false;
  }

  function showButtonApproval() {
    if (
      getAccessLevelFromRole(user?.role?.name ?? "") >= 2 &&
      quote?.stage?.slug == "awaiting-coordinator-approval"
    ) {
      return true;
    }
    if (
      getAccessLevelFromRole(user?.role?.name ?? "") >= 3 &&
      quote?.stage?.slug == "awaiting-director-approval"
    ) {
      return true;
    }
    return false;
  }

  function showButtonRequestApproval() {
    let accessLevel = getAccessLevelFromRole(user?.role?.name ?? "");

    if (
      quote?.stage?.slug?.includes("created") &&
      accessLevel > 0 &&
      !quoteOKtoProceed()
    ) {
      return true;
    }
    // if (
    //   getAccessLevelFromRole(user?.role?.name ?? "") == 2 &&
    //   quote?.stage?.slug == "awaiting-coordinator-approval"
    // ) {
    //   return true;
    // }
    return false;
    // !quoteOKtoProceed() &&
    //   ((quote?.stage?.slug?.includes("created") &&
    //     accessLevel > 0 &&
    //     accessLevel < 2) ||
    //     (getAccessLevelFromRole(user?.role?.name ?? "") == 2 &&
    //       quote?.stage?.slug == "awaiting-coordinator-approval"));
  }

  function goToCheckoutPage() {
    router.push(`/commercial/quote/${quote?.id}/checkout`);
  }

  function goToCheckoutPage2() {
    router.push(`/commercial/quote/${quote?.id}/checkout2`);
  }

  function enableCheckout() {
    return (
      (user?.role?.name == "backoffice" || user?.role?.name == "director") &&
      quote?.stage?.sortNumber >= 99
    );
  }

  return (
    <>
      <DialogFinishOrder
        open={openDialogFinishOrder}
        setOpen={setOpenDialogFinishOrder}
        quote={quote}
        setQuote={setQuoteAndSave}
        stages={myStages}
      ></DialogFinishOrder>
      <DialogReqApproval
        open={openDialogReqApproval}
        setOpen={setOpenDialogReqApproval}
        quote={quote}
        setQuote={setQuoteAndSave}
      ></DialogReqApproval>
      <DialogDoApproval
        open={openDialogDoApproval}
        setOpen={setOpenDialogDoApproval}
        quote={quote}
        setQuote={setQuoteAndSave}
      ></DialogDoApproval>

      <DialogRejection
        open={openDialogRejection}
        setOpen={setOpenDialogRejection}
        quote={quote}
        setQuote={setQuoteAndSave}
      ></DialogRejection>

      <>
        {showButtonRequestApproval() && (
          <Button
            className="m-5 text-xl p-5 font-bold"
            onClick={(el) => {
              setOpenDialogReqApproval(true);
            }}
          >
            SOLICITAR APROVAÇÃO
          </Button>
        )}

        {quoteOKtoProceed() && isStageToApprove() && showButtonApproval() && (
          <Button
            className="m-5 text-xl p-5 font-bold "
            onClick={(el) => {
              setOpenDialogDoApproval(true);
            }}
          >
            APROVAR
          </Button>
        )}

        {isStageToApprove() && isStageToApprove() && showButtonApproval() && (
          <Button
            className="m-5 text-xl p-5 font-bold"
            onClick={(el) => {
              setOpenDialogRejection(true);
            }}
          >
            RECUSAR
          </Button>
        )}

        {!isFirstStage() && !disableGoBack() && (
          <>
            <Button
              className="m-5 text-xl p-5 font-bold"
              onClick={(el) => {
                backToLastStage();
              }}
            >
              VOLTAR
            </Button>
          </>
        )}

        {enableGoNext() &&
          !isLastStage() &&
          !isBeforeLastStage() &&
          !disableGoNext() && (
            <>
              <Button
                className="m-5 text-xl p-5 px-8 bg-secondary font-bold"
                onClick={(el) => {
                  goNextStage();
                }}
              >
                AVANÇAR
              </Button>
            </>
          )}

        {/* {isBeforeLastStage() ? "Sim" : "Não"} */}
        {isBeforeLastStage() && !disableGoNext() && (
          <>
            <Button
              className="m-5 text-xl p-5 font-bold"
              onClick={(el) => {
                setOpenDialogFinishOrder(true);
              }}
            >
              FINALIZAR PEDIDO
            </Button>
          </>
        )}

        {enableCheckout() && (
          <>
            <Button
              className="m-5 text-xl p-5 font-bold"
              onClick={(el) => {
                goToCheckoutPage();
              }}
            >
              INTEGRAR PEDIDO
            </Button>
          </>
        )}
        {/* <p>{getAccessLevelFromRole(user?.role?.type)}</p> */}
        {enableCheckout() && getAccessLevelFromRole(user?.role?.type) >= 3 && (
          <>
            <Button
              className="m-5 text-xl p-5 font-bold"
              onClick={(el) => {
                goToCheckoutPage2();
              }}
            >
              INTEGRAR PEDIDO SAP
            </Button>
          </>
        )}
      </>
    </>
  );
}
