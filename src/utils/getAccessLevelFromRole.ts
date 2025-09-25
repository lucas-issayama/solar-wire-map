export default function getAccessLevelFromRole(roleName: string | undefined) {
  if (roleName == "integrator") return 0;
  if (roleName == "sales") return 1;
  if (roleName == "sales-leader" || roleName == "sales_leader") return 2;
  if (roleName == "director") return 3;
  if (roleName == "admin" || roleName == "backoffice") return 4;
  return 0;
}
