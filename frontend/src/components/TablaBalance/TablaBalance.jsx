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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulación de fetch del JSON local
                setData(jsonData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, []);

    return (
        <div style={{ marginTop: "100px", width: "70%", marginLeft: "auto", marginRight: "auto" }}>
            <h3>Balance anual 2024</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Enero</TableCell>
                            <TableCell>Febrero</TableCell>
                            <TableCell>Marzo</TableCell>
                            <TableCell>Abril</TableCell>
                            <TableCell>Mayo</TableCell>
                            <TableCell>Junio</TableCell>
                            <TableCell>Julio</TableCell>
                            <TableCell>Agosto</TableCell>
                            <TableCell>Septiembre</TableCell>
                            <TableCell>Octubre</TableCell>
                            <TableCell>Noviembre</TableCell>
                            <TableCell>Diciembre</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(data) && data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.category}</TableCell>
                                {item.expenses.map((expense, expenseIndex) => (
                                    <TableCell key={expenseIndex}>{expense.amount}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TablaBalance;
