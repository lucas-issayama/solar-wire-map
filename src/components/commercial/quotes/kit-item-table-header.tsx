import getAccessLevelFromRole from "@/utils/getAccessLevelFromRole";

export function KitItemTableHeader({ user }: any) {
  return (
    <thead className="bg-primary">
      <tr>
        <th scope="col" className="px-6 py-3 text-left  text-white font-bold">
          SKU
        </th>
        <th scope="col" className="px-6 py-3 text-left  text-white font-bold">
          DESCRIÇÃO
        </th>
        <th scope="col" className="px-6 py-3 text-left  text-white font-bold">
          QUANTIDADE
        </th>
        {getAccessLevelFromRole(user?.role?.type) >= 2 && (
          <th scope="col" className="px-6 py-3 text-left  text-white font-bold">
            Custo
          </th>
        )}
        {user?.role?.name !== "integrator" && (
          <th scope="col" className="px-6 py-3 text-left  text-white font-bold">
            Preço
          </th>
        )}

        {user?.role?.name !== "integrator" && (
          <th scope="col" className="px-6 py-3 text-left  text-white font-bold">
            Total
          </th>
        )}
        <th scope="col" className="px-6 py-3 text-left  text-white font-bold">
          Prazo
        </th>

        {getAccessLevelFromRole(user?.role?.type) >= 1 && (
          <th scope="col" className="px-6 py-3 text-left  text-white font-bold">
            Estoque disponível
          </th>
        )}
        <th
          scope="col"
          className="px-6 py-3 text-left  text-white font-bold"
        ></th>
      </tr>
    </thead>
  );
}
