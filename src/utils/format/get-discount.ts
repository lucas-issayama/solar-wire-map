export function getDiscount(user: any, enterprise?: any) {
  if (enterprise?.category?.discount)
    return enterprise?.category?.discount / 100;

  if (user?.enterprise?.category?.discount)
    return user?.enterprise?.category?.discount / 100;
  return 0;
}
