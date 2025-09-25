import useSession from "@/components/session/use-session";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputQuantity } from "@/components/ui/input-quantity";
import { QuoteKit, QuoteKitItem } from "@/types/quote";
import { formatDate } from "@/utils/format/format-date";
import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import getAccessLevelFromRole from "@/utils/getAccessLevelFromRole";
import getQuoteKitItemSku from "@/utils/getQuoteKitItemSku";
import { Trash2, Calendar, DollarSign, Package, Hash, ShoppingCart } from "lucide-react";

interface QuoteKitItemCardProps {
  quoteKitItem: QuoteKitItem;
  setQuoteKitItem?(quoteKitItem: QuoteKitItem): void;
  editable: boolean;
  quote?: any;
}

export function QuoteKitItemCard({
  quoteKitItem,
  setQuoteKitItem,
  editable,
  quote,
}: QuoteKitItemCardProps) {
  const { session } = useSession();
  const { user } = session;
  function setQuantity(value: number) {
    if (setQuoteKitItem) setQuoteKitItem({ ...quoteKitItem, quantity: value });
  }

  function deleteMe() {
    let d = new Date();
    if (setQuoteKitItem) {
      setQuoteKitItem({ ...quoteKitItem, deleted: true });
    }
  }

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-l-secondary" key={quoteKitItem?.id}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-full">
              <Package className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-base text-secondary flex items-center gap-2">
                <Hash className="w-4 h-4" />
                {getQuoteKitItemSku(quoteKitItem) ?? "Item"}
              </CardTitle>
              <CardDescription className="text-sm mt-1 line-clamp-2">
                {quoteKitItem.name}
              </CardDescription>
            </div>
          </div>

          {editable && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => deleteMe()}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Cost Section - Only for authorized users */}
          {getAccessLevelFromRole(user?.role?.type) >= 2 && (
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-medium">Custo</span>
              </div>
              <span className="font-semibold text-xs">
                {formatPriceInCents(quoteKitItem.costInCents)}
              </span>
            </div>
          )}

          {/* Price Section - Not for integrators */}
          {user?.role?.name !== "integrator" && (
            <div className="flex items-center justify-between p-2 bg-primary/5 rounded-md">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium">Preço</span>
              </div>
              <span className="font-semibold text-xs text-primary">
                {formatPriceInCents(
                  quoteKitItem.priceInCents * (1 - (quote?.categoryDiscount ?? 0))
                )}
              </span>
            </div>
          )}

          {/* Shipping Date */}
          <div className="flex items-center justify-between p-2 bg-background border rounded-md">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-medium">Prazo</span>
            </div>
            <span className="font-semibold text-xs">
              {quoteKitItem.shippingDate
                ? formatDate(quoteKitItem.shippingDate)
                : "Imediato"}
            </span>
          </div>
        </div>

        {/* Quantity Section */}
        <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Quantidade</span>
          </div>
          <div className="flex-shrink-0">
            <InputQuantity
              value={quoteKitItem.quantity}
              setValue={setQuantity}
              editable={editable}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
