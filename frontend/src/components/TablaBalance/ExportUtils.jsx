import * as XLSX from "xlsx"
export const exportToExcel = async (data, filename) => {
    try {
    
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, filename);
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
    }
  };
  