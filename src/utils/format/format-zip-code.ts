function formatZipCode(inputString: string) {
  const numericString = inputString.replace(/[^\d]/g, "");
  const formattedString = `${numericString.substring(0, 2)}${
    numericString.length > 2 ? `.${numericString.substring(2, 5)}` : ``
  }${numericString.length > 5 ? `-${numericString.substring(5, 8)}` : ``}`;
  return formattedString;
}

export default formatZipCode;
