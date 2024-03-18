import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import jsonData from "./data.json";

const TablaBalance = () => {
  const [data, setData] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [balanceMensual, setBalanceMensual] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(jsonData.data);
        setIngresos(
          jsonData.data.find((item) => item.category === "INGRESOS").expenses
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && ingresos.length > 0) {
      const balance = [];
      for (const ingreso of ingresos) {
        let totalGastos = 0;
        for (const item of data) {
          if (
            item.category !== "INGRESOS" &&
            item.category !== "BALANCE MENSUAL"
          ) {
            const expense = item.expenses.find(
              (expense) => expense.month === ingreso.month
            );
            totalGastos += expense ? expense.amount : 0;
          }
        }
        balance.push({
          month: ingreso.month,
          amount: ingreso.amount - totalGastos,
        });
      }
      setBalanceMensual(balance);
    }
  }, [data, ingresos]);

  return (
    <div
      style={{
        marginTop: "100px",
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h3>Balance anual 2024</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ background: "#628979" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>Acciones</TableCell>
              <TableCell style={{ color: "white" }}>Categoría</TableCell>
              <TableCell style={{ color: "white" }}>Enero</TableCell>
              <TableCell style={{ color: "white" }}>Febrero</TableCell>
              <TableCell style={{ color: "white" }}>Marzo</TableCell>
              <TableCell style={{ color: "white" }}>Abril</TableCell>
              <TableCell style={{ color: "white" }}>Mayo</TableCell>
              <TableCell style={{ color: "white" }}>Junio</TableCell>
              <TableCell style={{ color: "white" }}>Julio</TableCell>
              <TableCell style={{ color: "white" }}>Agosto</TableCell>
              <TableCell style={{ color: "white" }}>Septiembre</TableCell>
              <TableCell style={{ color: "white" }}>Octubre</TableCell>
              <TableCell style={{ color: "white" }}>Noviembre</TableCell>
              <TableCell style={{ color: "white" }}>Diciembre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {item.category !== "INGRESOS" && (
                  <>
                    <TableCell>
                      <IconButton aria-label="delete" color="error">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton aria-label="edit" color="primary">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    {item.expenses.map((expense, expenseIndex) => (
                      <TableCell key={expenseIndex}>{expense.amount}</TableCell>
                    ))}
                  </>
                )}
              </TableRow>
            ))}
            <TableRow>
              <TableCell></TableCell>
              <TableCell>INGRESOS</TableCell>
              {ingresos.map((income, index) => (
                <TableCell key={index}>{income.amount}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>BALANCE MENSUAL</TableCell>
              {balanceMensual.map((balance, index) => (
                <TableCell key={index}>{balance.amount}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TablaBalance;
