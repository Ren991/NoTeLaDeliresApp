import React from "react";
import { exportToExcel } from "./ExportUtils"; // Creamos un archivo exportUtils.js para mantener las funciones de exportación separadas

const TableToExcel = ({ data, months }) => {
  // Función para generar y descargar el archivo Excel
  const generateExcel = () => {
    // Preparar los datos para el archivo Excel
    const excelData = prepareExcelData(data, months);

    // Generar el archivo Excel
    exportToExcel(excelData, 'Balance.xlsx');
  };

  // Función para preparar los datos para el archivo Excel
  const prepareExcelData = (data, months) => {
    const excelData = [];

    // Encabezados de columna
    const headers = ['Categoría', ...months];
    excelData.push(headers);

    // Filas de datos
    data.forEach(item => {
      const rowData = [item.category, ...item.expenses.map(expense => expense.amount)];
      excelData.push(rowData);
    });

    return excelData;
  };

  return (
    <div>
      <button onClick={generateExcel}>Exportar a Excel</button>
    </div>
  );
};

export default TableToExcel;

