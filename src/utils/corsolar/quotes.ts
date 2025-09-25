import {
  Quote,
  QuoteGetAddressResponse,
  QuoteItem,
  QuoteKit,
  QuoteUpdateWithAddressDTO,
  Stage,
} from "@/types/quote";
import axios from "axios";
import sanitize from "../sanitize";
import stages from "./stages";
import corsolarApi from "./corsolarApi";
import businessUnit from "../global/businessUnit";

const quotes = {
  async create(quote: Quote, token: string) {
    try {
      let data: any = { ...quote, businessUnit };
      delete data["quote_items"];
      delete data["id"];

      if (quote.shippingAddress) {
        delete data.shippingAddress;
        data.shippingAddress = quote.shippingAddress.id;
      }

      if (quote.invoiceAddress) {
        delete data.invoiceAddress;
        data.shippingAddress = quote.invoiceAddress.id;
      }

      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quotes`,
        {
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return sanitize({ ...ans?.data?.data, stageId: 0 });
    } catch (error: any) {
      return false;
    }
  },

  async update(quote: Quote, token: string) {
    //create quote and return the same object with id;
    // alert(`Create quote:${JSON.stringify(quote)}`);

    try {
      // let data = {
      //   name: quote.name,
      //   priceInCents: quote.priceInCents,
      //   priceShippingInCents:quote.priceShippingInCents,
      //   priceItemsInCents:quote.priceItemsInCents,
      //   dcPower:quote.dcPower
      // };
      let data: any = { ...quote };
      delete data["quote_items"];

      // if (quote.shippingAddress) {
      //   delete data.shippingAddress;
      //   if (quote.shippingAddress.id)
      //     data.shippingAddress = quote.shippingAddress.id;
      // }

      // if (quote.invoiceAddress) {
      //   delete data.invoiceAddress;
      //   if (quote.invoiceAddress.id)
      //     data.invoiceAddress = quote.invoiceAddress.id;
      // }

      // if (quote.paymentMethod) {
      //   data.paymentMethod = quote.paymentMethod.id;
      // }

      let ans = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quotes/${quote.id}`,
        {
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${token ?? process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );

      // alert(JSON.stringify({ ans }));
      return sanitize(ans?.data?.data);
    } catch (error: any) {
      console.log(error);
      return false;
    }
  },

  //Page checkout
  async endQuote(id: number) {
    const stage = await corsolarApi.stages.getStageBySlug("checking-out");
    let endStage: {
      id: string;
      attributes: {
        name: string;
      };
    };
    if (stage) {
      if (stage.data.length > 0) {
        endStage = stage.data[0];
        try {
          const update = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/api/quotes/${id}`,
            {
              data: {
                stage: {
                  set: [Number(endStage.id)],
                },
              },
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
              },
            }
          );
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
    }
  },

  //sis_checkout
  async updateQuoteWithAddress(quote: QuoteUpdateWithAddressDTO) {
    const data = {
      invoiceAddress: quote.invoiceAddress ? quote.invoiceAddress : undefined,
      shippingAddress: quote.shippingAddress
        ? quote.shippingAddress
        : undefined,
      shippingType: quote.shippingType ? quote.shippingType : undefined,
    };
    try {
      let ans = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quotes/${quote.id}`,
        { data },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      return sanitize(ans?.data?.data);
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getKitFromPrice(token: string, priceId: number) {
    let query = {
      priceId,
    };

    try {
      let ans = await axios.post<any>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quote/getKitFromPrice`,
        query,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_READ_PRODUCTS}`,
          },
        }
      );
      return ans?.data?.quoteKit;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  //sis_checkout
  async getShippingAddressFromQuote(id: number) {
    var query = `
    query quote{
        quote(id:${id}){
          data{
            id
            attributes{
              shippingAddress{
                data{
                  id
                  attributes{
                    label
                    cityName
                    stateShortName
                    streetAddress
                    streetAddressLine2
                    streetAddressNumber
                    zipCode
                    customerSameAsOwner
                    customerName
                    customerType
                    customerDoc
                    customerIe
                    customerLegalName
                    type
                    customerEmail
                    customerPhone
                    neighborhood
                    city{
                      data{
                        id
                        attributes{
                          name
                          fullName
                          yield
                          yieldAverage
                          stateShortName
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    try {
      let ans = await axios.post<QuoteGetAddressResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        { query },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      if (
        ans.data.data.quote.data &&
        ans.data.data.quote.data.attributes.shippingAddress
      ) {
        const data = ans.data.data.quote.data.attributes.shippingAddress.data;

        if (data.attributes.city?.data) {
          const city = {
            id: Number(data.attributes.city.data.id),
            ...data.attributes.city.data.attributes,
          };

          delete data.attributes.city;

          return {
            id: Number(data.id),
            cityName: data.attributes.cityName,
            customerDoc: data.attributes.customerDoc,
            customerEmail: data.attributes.customerEmail,
            customerIe: data.attributes.customerIe,
            customerLegalName: data.attributes.customerLegalName,
            customerName: data.attributes.customerName,
            customerPhone: data.attributes.customerPhone,
            customerSameAsOwner: data.attributes.customerSameAsOwner,
            customerType: data.attributes.customerType,
            label: data.attributes.label,
            neighborhood: data.attributes.neighborhood,
            stateShortName: data.attributes.stateShortName,
            streetAddress: data.attributes.streetAddress,
            streetAddressLine2: data.attributes.streetAddressLine2,
            streetAddressNumber: data.attributes.streetAddressNumber,
            type: data.attributes.type,
            zipCode: data.attributes.zipCode,
            city: {
              fullName: city.fullName,
              id: city.id,
              name: city.name,
              yield: city.yield,
              yieldAverage: city.yieldAverage,
              stateShortName: city.stateShortName,
            },
          };
        } else {
          return {
            id: Number(data.id),
            cityName: data.attributes.cityName,
            customerDoc: data.attributes.customerDoc,
            customerEmail: data.attributes.customerEmail,
            customerIe: data.attributes.customerIe,
            customerLegalName: data.attributes.customerLegalName,
            customerName: data.attributes.customerName,
            customerPhone: data.attributes.customerPhone,
            customerSameAsOwner: data.attributes.customerSameAsOwner,
            customerType: data.attributes.customerType,
            label: data.attributes.label,
            neighborhood: data.attributes.neighborhood,
            stateShortName: data.attributes.stateShortName,
            streetAddress: data.attributes.streetAddress,
            streetAddressLine2: data.attributes.streetAddressLine2,
            streetAddressNumber: data.attributes.streetAddressNumber,
            type: data.attributes.type,
            zipCode: data.attributes.zipCode,
          };
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  //sis_checkout
  async getInvoiceAddressFromQuote(id: number) {
    var query = `
    query quote{
        quote(id:${id}){
          data{
            id
            attributes{
              invoiceAddress{
                data{
                  id
                  attributes{
                    label
                    cityName
                    stateShortName
                    streetAddress
                    streetAddressLine2
                    streetAddressNumber
                    zipCode
                    customerSameAsOwner
                    customerName
                    customerType
                    customerDoc
                    customerIe
                    customerLegalName
                    type
                    customerEmail
                    customerPhone
                    neighborhood
                    city{
                      data{
                        id
                        attributes{
                          name
                          fullName
                          yield
                          yieldAverage
                          stateShortName
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    try {
      let ans = await axios.post<QuoteGetAddressResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        { query },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      if (
        ans.data.data.quote.data &&
        ans.data.data.quote.data.attributes.invoiceAddress
      ) {
        const data = ans.data.data.quote.data.attributes.invoiceAddress.data;

        if (data.attributes.city?.data) {
          const city = {
            id: Number(data.attributes.city.data.id),
            ...data.attributes.city.data.attributes,
          };

          delete data.attributes.city;

          return {
            id: Number(data.id),
            cityName: data.attributes.cityName,
            customerDoc: data.attributes.customerDoc,
            customerEmail: data.attributes.customerEmail,
            customerIe: data.attributes.customerIe,
            customerLegalName: data.attributes.customerLegalName,
            customerName: data.attributes.customerName,
            customerPhone: data.attributes.customerPhone,
            customerSameAsOwner: data.attributes.customerSameAsOwner,
            customerType: data.attributes.customerType,
            label: data.attributes.label,
            neighborhood: data.attributes.neighborhood,
            stateShortName: data.attributes.stateShortName,
            streetAddress: data.attributes.streetAddress,
            streetAddressLine2: data.attributes.streetAddressLine2,
            streetAddressNumber: data.attributes.streetAddressNumber,
            type: data.attributes.type,
            zipCode: data.attributes.zipCode,
            city: {
              fullName: city.fullName,
              id: city.id,
              name: city.name,
              yield: city.yield,
              yieldAverage: city.yieldAverage,
              stateShortName: city.stateShortName,
            },
          };
        } else {
          return {
            id: Number(data.id),
            cityName: data.attributes.cityName,
            customerDoc: data.attributes.customerDoc,
            customerEmail: data.attributes.customerEmail,
            customerIe: data.attributes.customerIe,
            customerLegalName: data.attributes.customerLegalName,
            customerName: data.attributes.customerName,
            customerPhone: data.attributes.customerPhone,
            customerSameAsOwner: data.attributes.customerSameAsOwner,
            customerType: data.attributes.customerType,
            label: data.attributes.label,
            neighborhood: data.attributes.neighborhood,
            stateShortName: data.attributes.stateShortName,
            streetAddress: data.attributes.streetAddress,
            streetAddressLine2: data.attributes.streetAddressLine2,
            streetAddressNumber: data.attributes.streetAddressNumber,
            type: data.attributes.type,
            zipCode: data.attributes.zipCode,
          };
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  // async submitQuote(quote: Quote) {
  //   //update quote - price and others

  //   //update quote - price and others
  //   if (quote?.id) return await this.update(quote);
  //   else return await this.create(quote);
  // },

  //sis_checkout
  async changeStep(quote: Partial<Quote>, stage: Stage) {
    try {
      let ans = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quotes/${quote.id}`,
        {
          data: {
            stageId: Number(stage.id),
            stage: {
              set: [Number(stage.id)],
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );

      return sanitize(ans?.data?.data);
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getById(id: number, token: string) {
    //console.log(JSON.stringify({ token }));
    var query = `query quote{
      quote(id:${id}){
        data{
          id
          attributes{
            version
            sapDocEntry
            sapDocNum
            sapPurchaseRequestDocNum
            sapPurchaseRequestDocEntry
            sapCreatedAt
            sapUpdatedAt
            sapProdDocEntry
            sapProdDocNum
            sapProdCreatedAt
            sapProdUpdatedAt
            sapAltCatNum
            sapAltCatNum2
            name
            createdAt
            updatedAt
            priceInCents
            costKitsInCents
            priceKitsInCents
            priceKitsFinalInCents
            dcPower
            stageId
            shippingEstimationZipCode
            shippingEstimationCityName
            shippingEstimationStateShortName
            shippingEstimationPriceInCents
            shippingAddressStreetAddress
            priceShippingInCents
            manPriceShippingInCents
            shippingDate
            shippingType
            paymentDays
            priceListJson
            activeShippingAssistant
            priceShippingAssistantInCents
            activeEngineeringInsurance
            priceEngineeringInsuranceInCents
            shippingType
            discountType
            discountValue
            grossMargin
            contributionMargin
            grossMarginInCents
            contributionMarginInCents
            revenueInCents
            kitGrossMarginInCents
            kitGrossMargin
            kitContributionMarginInCents
            kitContributionMargin
            kitRevenueInCents
            costShippingInCents
            variables
            priceAssemblyInCents
            engineeringInsuranceFee
            paymentNumberOfInstallments
            paymentInterestAmountInCents
            integratorServicesInCents
            integratorServicesType
            integratorServicesValue
            billingEntity
            obs
            invoiceObs
            discountFinalValue
            approvedByCoordinator
            approvedByDirector
            kitFinalDiscountPercentage
            categoryDiscount
            transactionType
            shippingAddressInfo
            sapProject{
              data{
                id
                attributes{
                  Code
                  Name
                  Active
                }
              }
            }
            sapWarehouse{
              data{
                id
                attributes{
                  WarehouseCode
                  WarehouseName
                }
              }
            }
            paymentMethod{
             data{
                id
                attributes{
                  label
                }
              }
            }
            stage{
              data{
                id
                attributes{
                  name
                  slug
                  sortNumber
                  bgColor
                  textColor
                  accessLevel
                }
              }
            }
            creator{
              data{
                id
                attributes{
                    name
                    email
                }
              }
            }
            shippingEstimationCity{
              data{
                id
                attributes{
                  fullName
                  name
                  yieldAverage
                  yield
                  stateShortName
                  ploomesId
                }
              }
            }
            coupons{
              data{
                id
                attributes{
                  value
                  label
                  availableQuantity
                  expirationDate
                  initialQuantity
                }
              }
            }
            enterprise{
              data{
                id
                attributes{
                  sapCode
                  sapSupplierCode
                  erpId
                  name
                  email
                  phone
                  ie
                  cnpj
                  receitaActive
                  sintegraActive
                  receitaInfo
                  sintegraInfo
                  neighborhood
                  streetAddress
                  streetAddressLine2
                  streetAddressNumber
                  sintegraContribuinteIcms
                  zipCode
                  category{
                    data{
                      id
                      attributes{
                        name
                        discount
                      }
                    }
                  } 
                  city{
                    data{
                      id
                      attributes{
                        fullName
                        name
                        stateShortName
                        sapCounty
                      }
                    }
                  } 
                  owner{
                    data{
                      id
                      attributes{
                        name
                        email  
                      }
                    }
                  }
                  
                }
              }
            }
            contact{
              data{
                id
                attributes{
                  erpId
                  sapCode
                  name
                  phone
                  cpf
                  ie
                  cnpj
                  email
                  typeId
                  receitaActive
                  sintegraActive
                  sintegraInfo
                  receitaInfo
                  sintegraContribuinteIcms
                  city{
                    data{
                      id
                      attributes{
                        fullName
                        name
                        stateShortName
                        sapCounty
                      }
                    }
                  }  
                  enterprise{
                    data{
                      id
                      attributes{
                        name
                      }
                    }
                  }
                }
              }
            }
            shippingAddress{
              data{
                id
                attributes{
                    label
                    stateShortName
                    neighborhood
                    streetAddress	
                    streetAddressLine2
                    streetAddressNumber
                    neighborhood
                    zipCode
                    customerSameAsOwner
                    customerName
                    customerType
                    customerDoc
                    customerIe
                    customerLegalName
                    customerPhone
                    city{
                      data{
                        id
                        attributes{
                          fullName
                          name
                          stateShortName
                          sapCounty
                        }
                      }
                    }  
                }
              }
            }
            invoiceAddress{
              data{
                id
                attributes{
                    label
                    stateShortName
                    neighborhood
                    streetAddress	
                    streetAddressLine2
                    streetAddressNumber
                    neighborhood
                    zipCode
                    customerSameAsOwner
                    customerName
                    customerType
                    customerDoc
                    customerIe
                    customerLegalName
                    city{
                      data{
                        id
                        attributes{
                          fullName
                          name
                          stateShortName
                          sapCounty
                        }
                      }
                    }  
                }
              }
            }
            creator{
              data{
                id
                attributes{
                  email
                  username
                }
              }
            }
            sapOrders{
              data{
                id
                attributes{
                  DocEntry
                  DocNum
                  CardCode
                  TaxCode
                  ProdDocEntry
                  ProdDocNum
                  PaymentGroupCode
                  Usage
                  PaymentMethod
                  PurchaseRequestDocNum
                  PurchaseRequestDocEntry
                  singleItems
                  Cancelled
                  DocumentStatus
                }
              }
            }
            quoteKits(filters:{deleted:{eq:false}}){
              data{
                id
                attributes{
                  uuid
                  singleItems
                  name
                  quantity
                  priceInCents
                  deleted
                  dcPower
                  shippingDate
                  priceListJson
                  costInCents
                  structureName
                  layoutItems
                  assemblyFee
                  priceAssemblyInCents
                  quoteKitItems(sort:"createdAt", pagination:{pageSize:1000},filters:{deleted:{eq:false}  } ){
                    data{
                      id
                      attributes{
                        createdAt
                        uuid
                        name
                        quantity
                        priceInCents
                        shippingDate
                        priceListJson
                        code
                        deleted
                        deletedAt
                        erpId
                        cost
                        costInCents
                        type
                        finalPriceInCents
                        finalRevenueInCents
                        price{
                          data{
                            id
                            attributes{
                              valueInCents
                              sku
                              enabled
                              available
                              availableQuantity
                              product{
                                data{
                                  id
                                  attributes{
                                    dcPower
                                    acPower
                                    type
                                    name
                                    code
                                    width
                                    height
                                    erpId 
                                    sapCode
                                    stockQuantity
                                    enabled
                                    weight
                                    
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`;

    var graphql = {
      query,
      variables: {
        filters: {},
      },
    };

    var url = `${process.env.VUE_APP_STRAPI_URL}/graphql`;

    try {
      let ans = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        {
          ...graphql,
        },
        {
          headers: {
            Authorization: `Bearer ${token ?? process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      return sanitize(ans?.data?.data?.quote?.data);
    } catch (error: any) {
      if (error.response) {
        const { status, statusText, data } = error.response;
        throw new Error(data?.errors.map((el: any) => el.message)?.join(",")); // Rethrow or handle the error
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },

  async addKit(token: string, quoteId: number, priceId: number) {
    try {
      let data = {
        quoteId,
        priceId,
      };
      let ans: any = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quote/addKit`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (ans?.data?.quoteKit) {
        let quoteKit: QuoteKit | undefined = ans?.data?.quoteKit;

        return quoteKit;
      }
    } catch (error: any) {
      return false;
    }
  },

  async save(quote: Quote, token: string) {
    try {
      //Relations are translated on backend

      let data = {
        businessUnit,
        ...quote,
      };

      let ans: any = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quote/save`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token ?? process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      return ans?.data;
    } catch (error: any) {
      if (error.response) {
        const { status, name, message } = error.response.data.error;
        throw new Error(message); // Rethrow or handle the error
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },

  async clone(quote: Quote, token: string) {
    try {
      //Relations are translated on backend

      let data = {
        ...quote,
      };

      let ans: any = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quote/clone`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token ?? process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      return ans?.data;
    } catch (error: any) {
      if (error.response) {
        const { status, name, message } = error.response.data.error;
        throw new Error(message); // Rethrow or handle the error
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },

  async getItemsNok(quote: Quote, token: string) {
    try {
      //Relations are translated on backend
      let data = {
        ...quote,
      };

      let ans: any = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quote/getItemsNok`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token ?? process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      return ans?.data;
    } catch (error: any) {
      if (error.response) {
        const { status, name, message } = error.response.data.error;
        throw new Error(message); // Rethrow or handle the error
      } else if (error.request) {
        throw new Error("No response from the server.");
      } else {
        throw new Error("An error occurred while setting up the request.");
      }
    }
  },
};

export default quotes;
