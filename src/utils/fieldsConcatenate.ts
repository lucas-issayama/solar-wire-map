export default function fieldsConcatenate(fields: any, fields2: any) {
  return [
    ...(fields ?? []),
    ...(fields2
      ? fields2.filter((el: any) => {
          let found = fields.find((f: any) => f.name == el.name);
          return found ? false : true;
        })
      : []),
  ];
}
