import { Card } from "@/components/ui/card";
import { InputQuantity } from "@/components/ui/input-quantity";
import { createQuoteKitItem } from "@/utils/createQuoteKitItem";
import formatShippingDateFromPrice from "@/utils/formatShippingDateFromPrice";
import quoteKitRecalc from "@/utils/quoteFunctions/quoteKitRecalc";
export function CustomizerSelect({
  cables,
  length,
  color,
  quoteKit,
  setQuoteKit,
  customDefinition,
  setCustomDefinition,
}: any) {
  function selectItem(price: any) {
    let item = createQuoteKitItem(price, customDefinition.quantity ?? 1);
    setQuoteKit((prev: any) =>
      quoteKitRecalc({
        ...prev,
        quoteKitItems: [
          ...prev.quoteKitItems.filter((el: any) =>
            customDefinition?.filterFunction?.(el.price.product) ? false : true
          ),
          item,
        ],
      })
    );

    if (setCustomDefinition) {
      setCustomDefinition({
        ...customDefinition,
        selected: price,
        selectedId: price?.id,
      });
    }
  }

  function deleteSelection() {
    setQuoteKit((prev: any) =>
      quoteKitRecalc({
        ...prev,
        quoteKitItems: [
          ...prev.quoteKitItems.filter((el: any) =>
            customDefinition?.filterFunction?.(el.price.product) ? false : true
          ),
        ],
      })
    );

    setCustomDefinition({
      ...customDefinition,
      selected: null,
      selectedId: -1,
    });
  }

  function setQuantity(value: number) {
    setCustomDefinition({
      ...customDefinition,
      quantity: value,
    });

    setQuoteKit((prev: any) =>
      quoteKitRecalc({
        ...prev,
        quoteKitItems: prev.quoteKitItems?.map((el: any) => ({
          ...el,
          quantity:
            el.price?.id == customDefinition?.selected?.id
              ? value
              : el.quantity,
        })),
      })
    );
  }
  return (
    <Card className="my-6 rounded-lg border-tertiary">
      <h1 className="text-xl font-extrabold  bg-primary text-white p-4 ">
        {customDefinition?.label?.toUpperCase()}
      </h1>
      <Card
        onClick={(ev) => {
          console.log("select");
          deleteSelection();
        }}
        className={`cursor-pointer p-4 pt-5 mt-5 mx-2   ${
          !customDefinition?.selected ? " border-tertiary" : ""
        }`}
      >
        <p>Nenhum</p>
      </Card>

      {/* <p>{JSON.stringify(customDefinition?.prices)}</p> */}
      {customDefinition?.prices
        ?.filter((el: any) => customDefinition?.filterFunction?.(el.product))
        ?.map((price: any) => (
          <Card
            key={price?.product?.name + price?.id}
            onClick={(ev) => {
              selectItem(price);
            }}
            className={`cursor-pointer p-4 pt-5 mt-5 mx-2 mb-2  ${
              customDefinition?.selected?.id == price?.id
                ? " border-tertiary "
                : ""
            }`}
          >
            <p>{price?.product?.name}</p>
            <b>Entrega {formatShippingDateFromPrice(price)}</b>
          </Card>
        ))}

      {customDefinition?.selected && (
        <div className="p-2 mt-5 mb-1 white bg-[#f8f7f7] ">
          <div className="flex justify-left mx-4 ">
            <span className="mt-5">Quantidade</span>
            <div className="mx-2 mt-3">
              <InputQuantity
                value={customDefinition?.quantity ?? 0}
                setValue={(value) => {
                  setQuantity(value);
                }}
              ></InputQuantity>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
