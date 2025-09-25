export function getIndIeDest(contact: any) {
  if (contact?.ie && contact?.sintegraContribuinteIcms) return 1;
  if (contact?.ie && !contact?.sintegraContribuinteIcms) return 2;
  if (!contact?.ie) return 9;
  return 0;
}
