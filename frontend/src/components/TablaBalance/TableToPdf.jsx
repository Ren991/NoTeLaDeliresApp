import React from "react";
import { exportToExcel } from "./ExportUtils";

const TableToExcel = ({ data, months, monthlyBalance, monthlyExpenses }) => {
  console.log(monthlyExpenses)
  console.log(monthlyBalance)
  const balancesMensuales= monthlyBalance.map(item => item.balance);
  const generateExcel = () => {
    const excelData = prepareExcelData(data, months, monthlyBalance, monthlyExpenses);
    exportToExcel(excelData, 'Balance.xlsx');
  };

  const prepareExcelData = (data, months, monthlyBalance, monthlyExpenses) => {
    const excelData = [];

    // Encabezados de columna
    const headers = ['Categoría', ...months];
    excelData.push(headers);

    // Datos de la tabla
    data.forEach((item) => {
      const rowData = [
        item.category,
        ...item.expenses.map(expense => expense.amount)
      ];
      excelData.push(rowData);
    });

    // Agregar fila para gastos mensuales
    const expensesRow = ['Gastos Mensuales', ...monthlyExpenses];
    excelData.push(expensesRow);

    // Agregar fila para balance mensual
    const balanceRow = ['Balance Mensual', ...balancesMensuales];
    excelData.push(balanceRow);

    return excelData;
  };

  return (
    <div>
      <button onClick={generateExcel}>Exportar a Excel</button>
    </div>
  );
};

export default TableToExcel;
