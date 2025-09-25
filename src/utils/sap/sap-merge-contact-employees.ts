export function sapMergeContactEmployees(
  sapCode: string,
  sapContact: any,
  ansSapContact: any
) {
  //Merge contactEmployeees
  let ContactEmployees = ansSapContact.ContactEmployees?.map(
    (contactEmployee: any) => {
      let find = sapContact.ContactEmployees?.find(
        (el: any) => contactEmployee.Name == el?.Name
      );
      if (find) {
        return {
          ...contactEmployee,
          ...find,
          CardCode: contactEmployee.CardCode,
        };
      } else {
        return contactEmployee;
      }
    }
  );

  for (let i = 0; i < sapContact.ContactEmployees?.length; i++) {
    let find = ContactEmployees.find(
      (el: any) => el.Name == sapContact.ContactEmployees[i]?.Name
    );
    if (!find) {
      ContactEmployees.push({
        ...sapContact.ContactEmployees[i],
        CardCode: sapCode,
      });
    }
  }
  ContactEmployees = ContactEmployees.map((el: any) => {
    let item = el;
    if (item.Name && (item.InternalCode || item.InternalCode === 0))
      delete item.Name;
    return item;
  });

  return ContactEmployees;
}
