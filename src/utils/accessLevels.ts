const accessLevels = [
  { value: "0", label: "Integrador" },
  { value: "1", label: "Vendedor" },
  { value: "2", label: "Coordenador" },
  { value: "3", label: "Diretor" },
  { value: "4", label: "Admin" },
];

export default accessLevels;

// export default function getAccessLevelFromRole(roleName: string | undefined) {
//   if (roleName == "integrator") return 0;
//   if (roleName == "sales") return 1;
//   if (roleName == "sales-leader") return 2;
//   if (roleName == "director") return 3;
//   if (roleName == "admin" || roleName == "backoffice") return 4;
//   return 0;
// }
