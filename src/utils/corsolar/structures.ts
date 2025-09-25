import { Quote, QuoteItem } from "@/types/quote";
import axios from "axios";
import sanitize from "../sanitize";
import { checkPrimeSync } from "crypto";

function getUniqueStrings(arr: any) {
  return Array.from(new Set(arr));
}

const structures = {
  //active:{eq:true}

  //next route
  async get() {
    console.log("fetch structure");
    let filters: any = {};

    let query = `query structures{
      structures(filters:{active:{eq:true}},pagination:{page:1,pageSize:50}, sort:"name"){
        data{
          id
          attributes{
            name
            structureType
            calcMethod
            supports{
              data{
                id
                attributes{
                  product{
                  	data{
                      id
                    	attributes{
                        name
                        type
                        nModules
                        length
                        erpId
                        costInCents
                         prices{
                          data{
                            id
                            attributes{
                             costInCents
                              valueInCents
                              sku
                              priceList {
                                data {
                                  id
                                  attributes {
                                    name
                                    shippingDate
                                    labelText
                                    labelColor
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
            rails{
              data{
                id
                attributes{
                  product{
                  	data{
                      id
                    	attributes{
                        name
                        erpId
                        type
                        nModules
                        length
                        costInCents
                         prices{
                          data{
                            id
                            attributes{
                              sku
                              costInCents
                              valueInCents
                              priceList {
                                data {
                                  id
                                  attributes {
                                    name
                                    shippingDate
                                    labelText
                                    labelColor
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
            railConnectors{
              data{
                id
                attributes{
                  product{
                  	data{
                      id
                    	attributes{
                        name
                        type
                        nModules
                        length
                        erpId
                        costInCents
                         prices{
                          data{
                            id
                            attributes{
                              sku
                              valueInCents
                              costInCents
                              priceList {
                                data {
                                  id
                                  attributes {
                                    name
                                    shippingDate
                                    labelText
                                    labelColor
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
            clamps{
              data{
                id
                attributes{
                  product{
                  	data{
                      id
                    	attributes{
                        name
                        erpId
                        type
                        nModules
                        length
                        costInCents
                         prices{
                          data{
                            id
                            attributes{
                              sku
                              valueInCents
                              costInCents
                              priceList {
                                data {
                                  id
                                  attributes {
                                    name
                                    shippingDate
                                    labelText
                                    labelColor
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
            structureItems{
            	data{
                id
                attributes{
                  product{
                    data{
                      id
                      attributes{
                        type
                        name
                        manufacturerName
                        code
                        acPower
                        dcPower
                        erpId
                        costInCents
                        prices{
                          data{
                            id
                            attributes{
                              valueInCents
                              costInCents
                              priceList {
                                data {
                                  id
                                  attributes {
                                    name
                                    shippingDate
                                    labelText
                                    labelColor
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  quantityFormula
                }
              }
            }
          }
        }
      }
    }
    `;
    var graphql = {
      query,
      variables: {},
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
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );

      let pagination = ans?.data?.data?.structures?.meta?.pagination;
      let values = sanitize(ans?.data?.data?.structures?.data);

      console.log(
        JSON.stringify(values?.map((el: any) => ({ id: el.id, name: el.name })))
      );

      return values;
    } catch (error: any) {
      console.log("ERROR");
      console.log(error);
      return false;
    }
  },

  async getById(token: string, id: number) {
    console.log("fetch structure");
    let filters: any = {};

    let query = `query structures{
      structure(id:${id}){
        data{
          id
          attributes{
            name
            structureType
            calcMethod
            supports{
              data{
                id
                attributes{
                  product{
                  	data{
                      id
                    	attributes{
                        name
                        type
                        nModules
                        length
                         prices{
                          data{
                            id
                            attributes{
                              valueInCents
                              priceList {
                                data {
                                  id
                                  attributes {
                                    name
                                    shippingDate
                                    labelText
                                    labelColor
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
            rails{
              data{
                id
                attributes{
                  product{
                  	data{
                      id
                    	attributes{
                        name
                        type
                        nModules
                        length
                         prices{
                          data{
                            id
                            attributes{
                              valueInCents
                              priceList {
                                data {
                                  id
                                  attributes {
                                    name
                                    shippingDate
                                    labelText
                                    labelColor
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
            railConnectors{
              data{
                id
                attributes{
                  product{
                  	data{
                      id
                    	attributes{
                        name
                        type
                        nModules
                        length
                         prices{
                          data{
                            id
                            attributes{
                              valueInCents
                              priceList {
                                data {
                                  id
                                  attributes {
                                    name
                                    shippingDate
                                    labelText
                                    labelColor
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
            clamps{
              data{
                id
                attributes{
                  product{
                  	data{
                      id
                    	attributes{
                        name
                        type
                        nModules
                        length
                         prices{
                          data{
                            id
                            attributes{
                              valueInCents
                              priceList {
                                data {
                                  id
                                  attributes {
                                    name
                                    shippingDate
                                    labelText
                                    labelColor
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
            structureItems{
            	data{
                id
                attributes{
                  product{
                    data{
                      id
                      attributes{
                        type
                        name
                        manufacturerName
                        code
                        acPower
                        dcPower
                        erpId
                        costInCents
                        prices{
                          data{
                            id
                            attributes{
                              valueInCents
                              priceList {
                                data {
                                  id
                                  attributes {
                                    name
                                    shippingDate
                                    labelText
                                    labelColor
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  quantityFormula
                }
              }
            }
          }
        }
      }
    }
    `;
    var graphql = {
      query,
      variables: {},
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let value = sanitize(ans?.data?.data?.structure?.data);
      return value;
    } catch (error: any) {
      console.log("ERROR");
      console.log(error);
      return false;
    }
  },
};

export default structures;
