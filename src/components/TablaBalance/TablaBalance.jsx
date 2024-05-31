import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Modal, Box } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AnualChartsBalance from "./AnualChartsBalance";
import MensualChartsBalance from "./MensualChartsBalance";
import Swal from "sweetalert2";
import TableToPdf from "./TableToPdf";
import { useUser } from "../../Context/UserContext";

const TablaBalance = () => {
  const { user } = useUser();
  const [data, setData] = useState([]);
  const [balanceMensual, setBalanceMensual] = useState([]);
  const [isAnualModalOpen, setIsAnualModalOpen] = useState(false);
  const [editingMonth, setEditingMonth] = useState(null);
  const [totalGastos, setTotalGastos] = useState([]);
  const [isMonthlyModalOpen, setIsMonthlyModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  useEffect(() => {
    if (user && user.balanceAnual && user.balanceAnual.length > 0) {
      setData(user.balanceAnual[0].data);
      console.log(data);
    }
  }, [user]);

  useEffect(() => {
    updateMonthlyData();
  }, [data]);

  const updateMonthlyData = () => {
    const ingresos = data.find(item => item.category === "INGRESOS")?.expenses || [];

    const gastosMensuales = months.map((_, monthIndex) => {
      let totalGastosMes = 0;
      data.forEach(categoria => {
        if (categoria.category !== "INGRESOS") {
          const gastoMes = categoria.expenses[monthIndex]?.amount || 0;
          totalGastosMes += gastoMes;
        }
      });
      return totalGastosMes;
    });

    setTotalGastos(gastosMensuales);

    const balancesMensuales = ingresos.map((ingreso, index) => {
      const balance = ingreso.amount - (gastosMensuales[index] || 0);
      return { month: ingreso.month, balance, gastosMensuales: gastosMensuales[index] };
    });

    setBalanceMensual(balancesMensuales);
  };

  const handleEditCategory = (index) => {
    const newData = [...data];
    Swal.fire({
      title: "Ingrese el nuevo nombre de la categoría",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const newCategory = result.value;
        newData[index].category = newCategory;
        setData(newData);
      }
    });
  };

  const handleDeleteRow = (index) => {
    Swal.fire({
      title: "¿Está seguro de que desea eliminar esta categoría?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
        Swal.fire("Eliminado", "La categoría ha sido eliminada correctamente", "success");
      }
    });
  };

  const openAnualCharts = () => {
    setIsAnualModalOpen(true);
  };

  const closeAnualCharts = () => {
    setIsAnualModalOpen(false);
  };

  const editarMes = (index) => () => {
    if (editingMonth === index) {
      setEditingMonth(null);
    } else {
      setEditingMonth(index);
    }
  };

  const handleExpenseChange = (categoryIndex, monthIndex, newValue) => {
    const parsedValue = parseFloat(newValue);
    const newData = [...data];

    newData[categoryIndex].expenses[monthIndex].amount = isNaN(parsedValue) ? 0 : parsedValue;
    setData(newData);

    updateMonthlyData();
  };

  const handleAddCategory = () => {
    Swal.fire({
      title: "Ingrese el nombre de la nueva categoría",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const newCategory = result.value;
        const newCategoryExpenses = months.map(month => ({ month, "amount": 0 }));
        const ingresosIndex = data.findIndex(item => item.category === "INGRESOS");
        const newData = [...data.slice(0, ingresosIndex), { category: newCategory, expenses: newCategoryExpenses }, ...data.slice(ingresosIndex)];
        setData(newData);
      }
    });
  };

  const openMonthlyModal = (month) => {
    setSelectedMonth(month); // Guardar el mes seleccionado
    setIsMonthlyModalOpen(true); // Abrir el modal mensual
  };

  const closeMonthlyModal = () => {
    setIsMonthlyModalOpen(false);
  };

  return (
    <div style={{ marginTop: "100px", width: "70%", marginLeft: "auto", marginRight: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems:"center"}}>
        <h3 style={{color:"black",fontSize:"20px"}}>Balance anual 2024</h3>
        <Button variant="text" style={{color:"black",fontSize:"20px"}} onClick={openAnualCharts}>
          Mostrar Gráficos
        </Button>
        <TableToPdf data={data} months={months} monthlyBalance={balanceMensual} monthlyExpenses={totalGastos}/>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ background: "#628979" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>
                <IconButton aria-label="delete" color="error">
                  <AddCircleIcon onClick={handleAddCategory} />
                </IconButton>
              </TableCell>
              <TableCell style={{ color: "white" }}>Categorías</TableCell>
              {months.map((month, index) => (
                <TableCell style={{ color: 'white' }} key={index}>
                  <Link style={{ color: 'white', textDecoration: 'none' }} onClick={() => openMonthlyModal(month)}>{month}</Link>
                  <IconButton aria-label="edit" onClick={editarMes(index)}><EditIcon /></IconButton>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {item.category && (
                  <>
                    <TableCell style={{ background: "#628979" }}>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        disabled={item.category === "INGRESOS"}
                        onClick={() => handleDeleteRow(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => handleEditCategory(index)}
                        disabled={item.category === "INGRESOS"}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell style={{ background: "#628979", color: "white" }}>
                      {item.category}
                    </TableCell>
                    {item.expenses.map((expense, expenseIndex) => (
                      <TableCell key={expenseIndex}>
                        <input
                          disabled={editingMonth !== expenseIndex}
                          value={expense.amount}
                          onChange={(e) => handleExpenseChange(index, expenseIndex, e.target.value)}
                          style={{ width: "150px", height: "50px", borderRadius: "0.5rem" }}
                        />
                      </TableCell>
                    ))}
                  </>
                )}
              </TableRow>
            ))}
            <TableRow>
              <TableCell style={{ background: "black", color: "white" }}></TableCell>
              <TableCell style={{ background: "black", color: "white" }}>
                Gastos Mensuales
              </TableCell>
              {totalGastos.map((gastos, index) => (
                <TableCell key={index} style={{ borderRadius: "0.5rem" }}>
                  {gastos}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell style={{ background: "black", color: "white" }}></TableCell>
              <TableCell style={{ fontSize: "15px", background: "black", color: "white" }}>
                BALANCE MENSUAL
              </TableCell>
              {balanceMensual.map((balance, index) => (
                <TableCell key={index} style={{ borderRadius: "0.5rem", color: "white", backgroundColor: balance.balance < 0 ? 'red' : 'green' }}>{balance.balance}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isAnualModalOpen} onClose={closeAnualCharts}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 900, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, p: 4 }}>
          <AnualChartsBalance data={data} gastosMensuales={totalGastos}/>
        </Box>
      </Modal>

      <Modal open={isMonthlyModalOpen} onClose={closeMonthlyModal}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 900, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, p: 4 }}>
          <h2>{selectedMonth}</h2>
          <MensualChartsBalance month={selectedMonth} data={data}/>
        </Box>
      </Modal>
    </div>
  );
};

export default TablaBalance;
