export default function formatFirstUppercase(inputString: string) {
  const modStr = inputString?.[0]?.toUpperCase() + inputString.slice(1);
  return modStr;
}
