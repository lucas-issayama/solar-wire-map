export function generateGraphQLQuery(data: any, indentation = 1) {
  let query = "";

  // Iterate over the keys of the object
  if (data) {
    Object.keys(data).forEach((key) => {
      if (key !== "password") {
        if (key == "type")
          console.log(
            `is type:${JSON.stringify({
              typeOf: typeof data[key],
              key,
              val: data[key],
            })} `
          );
        if (data[key] && typeof data[key] === "object") {
          if (key == "type") console.log("type is object");
          // If the value is an object, recursively generate the sub-query
          query += `${"  ".repeat(indentation)}${key} {\n`;
          query += generateGraphQLQuery(data[key], indentation + 1);
          query += `${"  ".repeat(indentation)}}\n`;
        } else {
          // If the value is a scalar, add it directly
          query += `${"  ".repeat(indentation)}${key}\n`;
        }
      }
    });
  }

  return query;
}
