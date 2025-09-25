export function formatAddressSingleLine(address: any) {
  let addressArray: Array<string> = [];
  if (address) {
    if (address.streetAddress) addressArray.push(address.streetAddress);
    if (address.streetAddressNumber)
      addressArray.push(address.streetAddressNumber);
    if (address.neighborhood) addressArray.push(address.neighborhood);
    if (address.zipCode) addressArray.push(address.zipCode);
    if (address.city)
      addressArray.push(
        `${address.city?.name}-${address.city?.stateShortName}`
      );
    return addressArray?.join(", ");
  }
}
