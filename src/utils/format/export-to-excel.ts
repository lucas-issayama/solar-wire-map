import * as XLSX from "xlsx";

/**
 * Exports data to an Excel file
 * @param data - An array of objects representing the data to export
 * @param fileName - The name of the Excel file to be generated (without extension)
 */
export const exportToExcel = (
  data: Record<string, any>[],
  fileName: string
): void => {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("No data provided for Excel export.");
    return;
  }

  // Create a new workbook
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();

  // Convert JSON data to a worksheet
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

  // // Add label in column A
  // worksheet[`A10`] = { t: "s", v: "Total" };

  // // Update sheet range so Excel knows the new bounds
  // const range = XLSX.utils.decode_range(worksheet["!ref"] ?? "A1:A1");
  // range.e.r = 11; // end row index (0-based)
  // worksheet["!ref"] = XLSX.utils.encode_range(range);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook to an Excel file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
