import { QuoteKit, QuoteKitItem } from "@/types/quote";
import quoteKitRecalc from "@/utils/quoteFunctions/quoteKitRecalc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useSession from "@/components/session/use-session";
import DialogLayout from "../dialogs/dialog-layout";
import isTypeStructure from "@/utils/isTypeStructure";
import { schemas } from "@/types/schemas/schemas";
import DialogSearchData from "../dialogs/dialog-search-data";
import { fieldsPrice2 } from "@/types/fields/fields-price-2";
import { KitItemsTable } from "./kit-items-table";
import { KitItemsCard } from "./kit-items-card";
import { QuoteKitInfoCard } from "./quote-kit-info-card";
import { formatDecimalBr } from "@/utils/format/format-decimal-br";
import { Switch } from "@/components/ui/switch";
import { SelectStructure } from "../customizer/select-structure";
import { Plus } from "lucide-react";
import { useProductFilter } from "@/hooks/useProductFilter";

interface QuoteKitCardProps {
  quoteKit: QuoteKit;
  setQuoteKit: (quoteKit: QuoteKit) => void;
  editable: boolean;
  quote?: any;
}

export function QuoteKitCard({
  quoteKit,
  setQuoteKit,
  editable,
  quote,
}: QuoteKitCardProps) {
  const [openDialogLayout, setOpenDialogLayout] = useState(false);
  const [openDialogProduct, setOpenDialogProduct] = useState(false);
  const { session } = useSession();
  const { user } = session;
  const { structures } = useProductFilter();
  //Test
  function setQuoteKitItem(quoteKitItemToUpdate: QuoteKitItem) {
    if (setQuoteKit) {
      setQuoteKit(
        quoteKitRecalc({
          ...quoteKit,
          quoteKitItems: quoteKit?.quoteKitItems?.map((el) => {
            if (el.uuid == quoteKitItemToUpdate.uuid)
              return quoteKitItemToUpdate;
            else return el;
          }),
        })
      );
    }
  }

  function setQuantity(value: number) {
    if (setQuoteKit) {
      setQuoteKit(
        quoteKitRecalc({
          ...quoteKit,
          quantity: value,
        })
      );
    }
  }

  function addItem(item: any) {
    if (setQuoteKit && quoteKit?.quoteKitItems) {
      setQuoteKit(
        quoteKitRecalc({
          ...quoteKit,
          quoteKitItems: [...quoteKit?.quoteKitItems, item],
        })
      );
    }
  }

  function deleteMe() {
    let d = new Date();
    if (setQuoteKit) {
      setQuoteKit(
        quoteKitRecalc({
          ...quoteKit,
          deleted: true,
          deletedAt: d.toISOString(),
        })
      );
    }
  }

  function handleAddProduct(price: any) {
    const uuid = uuidv4();
    //alert(uuid);
    let d = new Date();

    let item = {
      createdAt: d.toISOString(),
      name: price?.product?.name,
      quantity: 1,
      priceInCents: price?.valueInCents,
      price,
      shippingDate: price?.priceList?.shippingDate,
      priceListJson: price?.priceList,
      code: price?.product?.code,
      deleted: false,
      erpId: price?.sku ?? price?.product?.erpId,
      cost: price?.product?.cost,
      costInCents: price?.costInCents ?? price?.product?.costInCents,
      uuid,
      type: price?.product.type,
    };
    addItem(item);
  }


  function setSingleItem(value: boolean) {
    if (setQuoteKit && quoteKit?.quoteKitItems) {
      setQuoteKit(
        quoteKitRecalc({
          ...quoteKit,
          singleItems: value,
        })
      );
    }
  }

  return (
    quoteKit && (
      <div className="w-full">
        <DialogLayout
          open={openDialogLayout}
          setOpen={setOpenDialogLayout}
          quoteKit={quoteKit}
          setQuoteKit={setQuoteKit}
        ></DialogLayout>
        <DialogSearchData
          pageId="quote-product-search"
          open={openDialogProduct}
          setOpen={setOpenDialogProduct}
          customFields={fieldsPrice2}
          schema={schemas.price}
          handleClickItem={handleAddProduct}
        ></DialogSearchData>

        <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div>
                  <CardTitle className="text-xl sm:text-2xl text-primary">
                    KIT
                    {quoteKit?.dcPower > 0 && (
                      <span className="ml-2 px-2 py-1 bg-secondary/20 text-secondary-foreground text-sm font-medium rounded-md">
                        {formatDecimalBr(quoteKit.dcPower)} kWp
                      </span>
                    )}
                  </CardTitle>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-2">
                <CardDescription className="text-sm">
                  Considerar ítens avulsos?
                </CardDescription>
                <div className="flex items-center gap-2">
                  <Switch
                    disabled={!editable}
                    onCheckedChange={setSingleItem}
                    checked={quoteKit.singleItems ? true : false}
                  />
                  {quoteKit.singleItems && (
                    <span className="px-2 py-1 border border-border bg-background text-xs font-medium rounded-md">
                      Sim
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Large screen */}
            <div className="hidden lg:block space-y-6">
              <div>
                <div className="overflow-x-auto">
                  <KitItemsTable
                    editable={editable}
                    quoteKitItems={quoteKit?.quoteKitItems?.filter(
                      (item) => !isTypeStructure(item.type)
                    )}
                    setQuoteKitItem={setQuoteKitItem}
                    user={user}
                    quote={quote}
                  />
                </div>
              </div>

              <div className="border-t border-border" />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">ESTRUTURAS</h3>
                  {quoteKit.structureName && (
                    <span className="px-2 py-1 border border-border bg-background text-xs font-medium rounded-md">
                      {quoteKit.structureName}
                    </span>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <KitItemsTable
                    editable={editable}
                    quoteKitItems={quoteKit?.quoteKitItems?.filter((item) =>
                      isTypeStructure(item.type)
                    )}
                    setQuoteKitItem={setQuoteKitItem}
                    user={user}
                    quote={quote}
                  />
                </div>
              </div>
            </div>

            {/* Small screen */}
            <div className="block lg:hidden space-y-6">
              <QuoteKitInfoCard
                deleteMe={deleteMe}
                setQuantity={setQuantity}
                editable={editable}
                quoteKit={quoteKit}
                user={user}
              />

              <div>
                <KitItemsCard
                  editable={editable}
                  quoteKitItems={quoteKit?.quoteKitItems?.filter(
                    (item) => !isTypeStructure(item.type)
                  )}
                  setQuoteKitItem={setQuoteKitItem}
                  user={user}
                  quote={quote}
                />
              </div>

              <div className="border-t border-border" />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">ESTRUTURAS</h3>
                  {quoteKit.structureName && (
                    <span className="px-2 py-1 border border-border bg-background text-xs font-medium rounded-md">
                      {quoteKit.structureName}
                    </span>
                  )}
                </div>
                <KitItemsCard
                  editable={editable}
                  quoteKitItems={quoteKit?.quoteKitItems?.filter((item) =>
                    isTypeStructure(item.type)
                  )}
                  setQuoteKitItem={setQuoteKitItem}
                  user={user}
                />
              </div>
            </div>

            {/* Add Product Section */}
            {editable && (
              <div className="flex justify-center pt-4">
                <Button
                  className="bg-secondary hover:bg-secondary/90 font-semibold gap-2"
                  onClick={() => setOpenDialogProduct(true)}
                >
                  <Plus className="w-4 h-4" />
                  Adicionar produto
                </Button>
              </div>
            )}

            {/* Structure Selection */}
            {editable && (
              <div className="pt-4 border-t">
                <SelectStructure
                  structures={structures}
                  quoteKit={quoteKit}
                  setQuoteKit={setQuoteKit}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  );
}
