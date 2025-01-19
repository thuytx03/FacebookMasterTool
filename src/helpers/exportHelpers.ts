import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { ColumnWidth, Header } from "../types/excel";

export const exportToExcel = (dataArray: any[], fileName: string, wscols: ColumnWidth[], header: Header[]) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  // Tạo worksheet và thêm header tiếng Việt or Tiếng Anh...
  const ws = XLSX.utils.json_to_sheet(header, { skipHeader: true });

  // Thêm dữ liệu chính vào worksheet
  XLSX.utils.sheet_add_json(ws, dataArray, {
    skipHeader: true,
    origin: "A2", // Dữ liệu bắt đầu từ dòng 2
  });

  // Thiết lập độ rộng cột
  ws["!cols"] = wscols;

  // Tạo workbook
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

  // Xuất workbook thành buffer
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Tạo Blob và lưu file
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};
export const exportToTXT = (data: string, fileName:string) => {
  const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(blob, fileName);
}
