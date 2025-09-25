import { Quote } from "@/types/quote";
import * as XLSX from "xlsx";

/**
 * Exports data to an Excel file
 * @param data - An array of objects representing the data to export
 * @param fileName - The name of the Excel file to be generated (without extension)
 */
export const exportToExcelQuote = (
  quote: Quote,
  data: Record<string, any>[],
  data2: Record<string, any>[],
  fileName: string
): void => {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("No data provided for Excel export.");
    return;
  }

  // Create a new workbook
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();

  let worksheet = createSheetKpis(quote, data);
  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Preço total");

  let worksheet2 = createSheetKpis(quote, data2);
  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet2, "Preço kit");

  // Write the workbook to an Excel file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

function createSheetKpis(quote: Quote, data: any) {
  // Convert JSON data to a worksheet
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  let countItems = quote?.quoteKits?.[0]?.quoteKitItems?.filter(
    (el: any) => !el.deleted
  )?.length;
  let lineLastItem = (countItems ?? 0) + 1;
  let lastLine = data?.length + 1;
  let line = data?.length + 1;
  //alert(line);
  if (lineLastItem > 0) {
    line += 1;
    // alert(line);
    worksheet[`A${line}`] = { t: "s", v: "Total" };

    worksheet[`C${line}`] = { t: "n", f: `SUM(C2:C${lastLine})` };
    worksheet[`D${line}`] = { t: "n", f: `SUM(D2:D${lastLine})` };
    worksheet[`E${line}`] = { t: "n", f: `SUM(E2:E${lastLine})` };

    line += 1;
    worksheet[`B${line}`] = { t: "s", v: `MB (R$)` };
    worksheet[`C${line}`] = {
      t: "n",
      f: `D${lastLine + 1} - SUM(C2:C${lastLine - 1}) `,
    };

    worksheet[`D${line}`] = { t: "s", v: `MB (%)` };
    worksheet[`E${line}`] = {
      t: "n",
      f: `C${line}/ D${lastLine + 1}`,
    };

    line += 1;
    worksheet[`B${line}`] = { t: "s", v: `MC (R$)` };
    worksheet[`C${line}`] = {
      t: "n",
      f: `D${lastLine + 1} - SUM(C2:C${lastLine}) `,
    };

    //line += 1;
    worksheet[`D${line}`] = { t: "s", v: `MC (%)` };
    worksheet[`E${line}`] = {
      t: "n",
      f: `C${line}/ D${lastLine + 1}`,
    };
  }

  // Update sheet range so Excel knows the new bounds
  const range = XLSX.utils.decode_range(worksheet["!ref"] ?? "A1:A1");
  range.e.r = line + 5; // end row index (0-based)
  worksheet["!ref"] = XLSX.utils.encode_range(range);

  return worksheet;
}
