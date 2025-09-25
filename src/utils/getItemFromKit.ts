export function getItemFromKitWithType(quoteKitItems: any[], type: string) {
  return quoteKitItems?.find((el: any) => el.type == type);
}
