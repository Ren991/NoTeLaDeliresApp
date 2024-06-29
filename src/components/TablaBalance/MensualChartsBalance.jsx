import React, { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from '@mui/x-charts/LineChart';

const MensualChartsBalance = ({ data, month }) => {
    const [datosMensuales, setDatosMensuales] = useState([]);

    console.log("hola");

    

    const gastosMensuales = data
        .filter(item => item.category !== "INGRESOS") // Filtrar la categoría "INGRESOS"
        .map(item => ({
            category: item.category,
            amount: item.expenses.find(expense => expense.month === month)?.amount || 0
    }));

    // Configuración de datos para el gráfico de pastel
    const pieChartData = gastosMensuales.map(item => ({
        id: item.category,
        label: item.category,
        value: item.amount
    }));

    // Configuración de datos para el gráfico de líneas
    const lineChartData = [{
        data: gastosMensuales.map(item => item.amount),
        label: 'Gastos Mensuales',
        area: true
    }];

    const xAxisCategories = data
    .filter(item => item.category !== "INGRESOS") // Filtrar la categoría "INGRESOS"
    .map(item => item.category);

    return (
        <div>
            {/* Gráfico de Pastel */}
            <h2>Gráfico de Pastel</h2>
            <PieChart series={[{ data: pieChartData }]} width={700} height={300} />

            {/* Gráfico de Líneas */}
            <h2>Gráfico de Líneas</h2>
            <LineChart
                width={800}
                height={300}
                series={lineChartData}
                xAxis={[{ scaleType: 'point', data: xAxisCategories }]}
                sx={{
                    '.MuiLineElement-root': {
                        display: 'none',
                    },
                }}
            />
        </div>
    );
};

export default MensualChartsBalance;