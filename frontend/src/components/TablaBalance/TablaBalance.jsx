import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import jsonData from './data.json';

const TablaBalance = () => {
    const [data, setData] = useState([]);
    const [ingresos, setIngresos] = useState([]); // array para almacenar los gastos de las categorías.
    const [balanceMensual, setBalanceMensual] = useState([]); // array para almacenar los balances mensuales

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(jsonData.data);
                setIngresos(jsonData.data.find(item => item.category === "INGRESOS").expenses); // se obtienen todas los gastos de las diferentes categorías
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0 && ingresos.length > 0) {
            const balance = ingresos.map(ingreso => {
                const totalGastos = data
                    .filter(item => item.category !== "INGRESOS" && item.category !== "BALANCE MENSUAL")
                    .reduce((total, item) => {
                        const expense = item.expenses.find(expense => expense.month === ingreso.month);
                        return total + (expense ? expense.amount : 0);
                    }, 0);
                return { month: ingreso.month, amount: ingreso.amount - totalGastos };
            });
            setBalanceMensual(balance);
        }
    }, [data, ingresos]);

    return (
        <div style={{ marginTop: "100px", width: "70%", marginLeft: "auto", marginRight: "auto" }}>
            <h3>Balance anual 2024</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead style={{ background: "black" }}> {/* Estilo para la cabecera */}
                        <TableRow>
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
                                <TableCell>{item.category}</TableCell>
                                {item.expenses.map((expense, expenseIndex) => (
                                    <TableCell key={expenseIndex}>{expense.amount}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                        <TableRow>
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
