export function formatCityFullNameFromAddress(address: any) {
  if (address?.city?.name && address.city.stateShortName) {
    return `${address.city?.name}-${address.city.stateShortName}`;
  }
  if (address?.city?.fullName) {
    return `${address.city?.fullName}`;
  }
}
