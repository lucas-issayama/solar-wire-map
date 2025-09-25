export default function colSpanFromSize(size: number) {
  let classDiv = `col-span-12  ${!size ? "md:col-span-3" : ""} 
      ${size == 1 ? "sm:col-span-1" : ""}
      ${size == 2 ? "sm:col-span-2" : ""}
      ${size == 3 ? "sm:col-span-3" : ""}
      ${size == 4 ? "sm:col-span-4" : ""}
      ${size == 5 ? "sm:col-span-5" : ""}
      ${size == 6 ? "sm:col-span-6" : ""}
      ${size == 7 ? "sm:col-span-7" : ""}
      ${size == 8 ? "sm:col-span-8" : ""}
      ${size == 9 ? "sm:col-span-9" : ""}
      ${size == 10 ? "sm:col-span-10" : ""}
      ${size == 11 ? "sm:col-span-11" : ""}
      ${size == 12 ? "sm:col-span-12" : ""}
      `;
  return classDiv;
}
