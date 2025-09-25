import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/utils/format/format-date";
import { formatPriceInCents } from "@/utils/format/format-price-in-cents";
import getAccessLevelFromRole from "@/utils/getAccessLevelFromRole";
import { Trash2, Calendar, DollarSign, Package } from "lucide-react";

interface QuoteKitInfoCardProps {
  quoteKit: any;
  editable: any;
  deleteMe: any;
  setQuantity: any;
  user: any;
}

export function QuoteKitInfoCard({
  quoteKit,
  editable,
  deleteMe,
  setQuantity,
  user,
}: QuoteKitInfoCardProps) {
  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <CardTitle className="text-lg text-primary">
                Kit
                {quoteKit?.dcPower && (
                  <span className="ml-2 px-2 py-1 bg-secondary/20 text-secondary-foreground text-sm font-medium rounded-md">
                    {quoteKit.dcPower}kWp
                  </span>
                )}
              </CardTitle>
              {quoteKit?.name && (
                <CardDescription className="text-sm mt-1">
                  {quoteKit.name}
                </CardDescription>
              )}
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

      <CardContent className="space-y-4">
        {/* Cost Section - Only for authorized users */}
        {getAccessLevelFromRole(user?.role?.type) >= 2 && (
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Custo</span>
            </div>
            <span className="font-semibold text-sm">
              {formatPriceInCents(quoteKit?.costInCents * quoteKit?.quantity)}
            </span>
          </div>
        )}

        {/* Shipping Date Section */}
        <div className="flex items-center justify-between p-3 bg-background border rounded-lg">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Prazo de entrega</span>
          </div>
          <span className="font-semibold text-sm">
            {quoteKit?.shippingDate
              ? formatDate(quoteKit?.shippingDate)
              : "Imediato"}
          </span>
        </div>

        {/* Items Header */}
        {/* <div className="flex items-center gap-2 p-3 bg-tertiary text-white rounded-lg">
          <Package className="w-4 h-4" />
          <span className="font-medium">Itens do Kit</span>
        </div> */}
      </CardContent>
    </Card>
  );
}
