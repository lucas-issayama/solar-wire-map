export default function limitStringLength(str: string, maxLength = 15) {
  return str?.length > maxLength ? str.slice(0, maxLength) : str;
}
