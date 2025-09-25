export function formatSisContact(
  contact: any,
  invoiceAddress: any,
  shippingAddress: any,
  creator: any
) {
  return {
    id: contact.id,
    name: contact.name,
    phone: contact.phone,
    mobile: contact.mobile,
    email: contact.email,
    billingAddress: {
      cityName: invoiceAddress?.city?.name,
      neighborhood: invoiceAddress?.neighborhood,
      stateName: invoiceAddress?.city.stateShortName,
      streetAddress: invoiceAddress?.streetAddress,
      streetAddressLine2: invoiceAddress?.streetAddressLine2,
      streetAddressNumber: invoiceAddress?.streetAddressNumber ?? "S/N",
      zipCode: invoiceAddress?.zipCode,
    },
    deliveryAddress: {
      cityName: shippingAddress?.city.name,
      neighborhood: shippingAddress?.neighborhood,
      stateName: shippingAddress?.city.stateShortName as string,
      streetAddress: shippingAddress?.streetAddress,
      streetAddressLine2: shippingAddress?.streetAddressLine2,
      streetAddressNumber: shippingAddress?.streetAddressNumber ?? "S/N",
      zipCode: shippingAddress.zipCode,
      contactName: shippingAddress?.customerName,
      contactPhone: shippingAddress?.customerPhone,
      contactEmail: shippingAddress?.customerEmail,
      needSchedule: shippingAddress?.needSchedule ?? false,
    },
    cordeiro: {
      receita: {
        active: contact.receitaActive as boolean,
      },
      sintegra: {
        active: contact.sintegraActive as boolean,
        ie: contact.ie as string,
        info: contact.sintegraInfo ? contact.sintegraInfo : {},
      },
      sis: {
        create: true,
        creating: true,
        created: true,
      },
    },
    cnpj: contact.cnpj && contact.cnpj !== "" ? contact.cnpj : null,
    cpf: contact.cpf && contact.cpf !== "" ? contact.cpf : null,
    typeId: contact.typeId ?? (contact.cpf ? 2 : 1),
    owner: {
      email: creator.email,
      name: creator.name,
    },
    ownerId: creator.email,
  };
}
