export function sapMergeAddresses(
  sapCode: string,
  sapContact: any,
  ansSapContact: any
) {
  //Merge Addresses
  let BPAddresses = ansSapContact.BPAddresses?.map((address: any) => {
    let find = sapContact.BPAddresses?.find(
      (el: any) => address.AddressName == el?.AddressName
    );
    if (find) {
      return {
        ...find,
        BPCode: address.BPCode,
        RowNum: address.RowNum,
      };
    } else {
      return address;
    }
  });

  // console.log("after merge");
  // console.log(JSON.stringify({ BPAddresses }));
  for (let i = 0; i < sapContact.BPAddresses?.length; i++) {
    let find = BPAddresses.find(
      (el: any) => el.AddressName == sapContact.BPAddresses[i]?.AddressName
    );
    if (!find) {
      BPAddresses.push({
        ...sapContact.BPAddresses[i],
        BPCode: sapCode,
      });
    }
  }

  // console.log("after addition");
  // console.log(JSON.stringify({ BPAddresses }));

  BPAddresses = BPAddresses.map((el: any) => {
    let item = el;
    if (item.AddressName && (item.RowNum || item.RowNum === 0))
      delete item.AddressName;
    return item;
  });

  // console.log("after delete");
  // console.log(JSON.stringify({ BPAddresses }));

  return BPAddresses;
}
