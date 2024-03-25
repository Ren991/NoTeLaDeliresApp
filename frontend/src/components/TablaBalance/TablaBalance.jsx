import React, { useState, useEffect } from "react";
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button,TextField,Modal,Box} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import jsonData from "./data.json";
import AnualChartsBalance from "./AnualChartsBalance";

const TablaBalance = () => {
  const [data, setData] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [balanceMensual, setBalanceMensual] = useState([]);
  const [ingresosMensuales, setIngresosMensuales] = useState([]);
  const [gastosMensuales, setGastosMensuales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableValues, setEditableValues] = useState([]);
  const [editingMonth, setEditingMonth] = useState(null);

  const months = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];

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
    const calculateMonthlyExpenses = () => {
        const gastosMensuales = data.reduce((acumulador, categoria) => {
            if (categoria.category !== "INGRESOS") {
                categoria.expenses.forEach((gasto, index) => {
                    if (!acumulador[index]) {
                        acumulador[index] = 0;
                    }
                    acumulador[index] += gasto.amount;
                });
            }
            return acumulador;
        }, []);

        const balancesMensuales = ingresos.map(ingreso => {
            const balance = ingreso.amount - gastosMensuales.reduce((total, gasto) => total + gasto, 0);
            return { month: ingreso.month, balance };
        });

        setBalanceMensual(balancesMensuales);
        setGastosMensuales(gastosMensuales);
    };

    calculateMonthlyExpenses();

}, [data, ingresos]);

useEffect(() => {
  const initialBalances = ingresos.map(ingreso => {
      const totalGastos = data.filter(item => item.category !== "INGRESOS" && item.category !== "BALANCE MENSUAL")
                              .reduce((total, category) => total + (category.expenses.find(expense => expense.month === ingreso.month)?.amount || 0), 0);
      return { month: ingreso.month, balance: ingreso.amount - totalGastos };
  });
  setBalanceMensual(initialBalances);
}, [data, ingresos]);
  
  const handleEditCategory = (index) => {
    const newData = [...data];
    const newCategory = prompt("Ingrese el nuevo nombre de la categoría");
    if (newCategory !== null) {
      newData[index].category = newCategory;
      setData(newData);
    }
  };

  const handleDeleteRow = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  }; 

  const openCharts = () => {
    setIsModalOpen(true);
  };

  const closeCharts = () => {
    setIsModalOpen(false);
  };

  const editarMes = (index) => () => {
    console.log('Editando el mes:', months[index]);
    if (editingMonth === index) {
      setEditingMonth(null);
    } else {
      setEditingMonth(index);
    }
  };

  const handleExpenseChange = (categoryIndex, monthIndex, newValue) => {
    const newData = [...data];
    const parsedValue = parseFloat(newValue);

    if (newData[categoryIndex].category === "INGRESOS") {
        newData[categoryIndex].expenses[monthIndex].amount = isNaN(parsedValue) ? 0 : parsedValue;
    } else {
        if (newData[categoryIndex].category !== "BALANCE MENSUAL") {
            newData[categoryIndex].expenses[monthIndex].amount = isNaN(parsedValue) ? 0 : parsedValue;
        }
    }

    setData(newData);

    const month = months[monthIndex];
    const totalGastos = newData.filter(item => item.category !== "INGRESOS" && item.category !== "BALANCE MENSUAL")
                                .reduce((total, category) => total + (category.expenses.find(expense => expense.month === month)?.amount || 0), 0);
    const newBalance = ingresos.find(ingreso => ingreso.month === month).amount - totalGastos;
    setBalanceMensual(prevBalances => prevBalances.map(balance => balance.month === month ? { ...balance, balance: newBalance } : balance));
};

const handleAddCategory = () => {
    const newData = [...data];
    const newCategory = prompt("Ingrese el nombre de la nueva categoría");
    if (newCategory !== null) {
      const newCategoryExpenses = months.map(month => ({ month, "amount": 0 }));
      newData.splice(newData.length - 2, 0, { category: newCategory, expenses: newCategoryExpenses });
      setData(newData);
    }
    console.log()
  };

  
  console.log(balanceMensual)

  return (
    <div style={{ marginTop: "100px",  width: "70%", marginLeft: "auto", marginRight: "auto" }}>
      <div style={{display:"flex",justifyContent:"space-around"}}>
      <Button>{"<"}</Button>
        <h3>Balance anual 2024</h3>        
          <Button variant="text" onClick={openCharts}>
            Mostrar Gráficos
          </Button>        
        <Button>{">"}</Button>
      </div>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ background: "#628979" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}> <IconButton
                        aria-label="delete"
                        color="error"
                        
                      >
                        <AddCircleIcon onClick={handleAddCategory}/>
                      </IconButton></TableCell>
              <TableCell style={{ color: "white" }}>Categorias</TableCell>
              {months.map((month, index) => (              
                  <TableCell style={{ color: 'white' }} key={index}>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>{month}</Link>
                    <IconButton aria-label="edit" onClick={editarMes(index)}><EditIcon /></IconButton>
                  </TableCell>  
              ))}              
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {item.category  && (
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
                    <TableCell
                      style={{ background: "#628979", color: "white" }}
                    >
                      {item.category}
                    </TableCell>
                    {item.expenses.map((expense, expenseIndex) => (
                      <TableCell key={expenseIndex}>
                           <input 
                              /* type="number" */
                              disabled={editingMonth !== expenseIndex} 
                              value={expense.amount}
                              onChange={(e) => handleExpenseChange(index, expenseIndex, e.target.value)}
                            
                              style={{width:"150px", height:"50px" , borderRadius:"0.5rem"}} 
                            />                       
                      </TableCell> 
                    ))}
                  </>
                )}
              </TableRow>
            ))}
            <TableRow>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ background: "#54DEA5", color: "white" }}
              ></TableCell>
              <TableCell style={{ background: "#54DEA5", color: "white" }}>
                BALANCE MENSUAL
              </TableCell>
              {balanceMensual.map((balance, index) => (
                  <TableCell key={index} style={{ borderRadius:"0.5rem",color:"white",backgroundColor: balance.balance < 0 ? 'red' : 'green' }}>{balance.balance}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell
                style={{ background: "#54DEA5", color: "white" }}
              ></TableCell>
              <TableCell style={{ background: "#54DEA5", color: "white" }}>
                GASTOS MENSUALES
              </TableCell>
              {gastosMensuales.map((gasto, index) => (
                <TableCell key={index}>{gasto}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isModalOpen} onClose={closeCharts}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 900, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24,p: 4,}}>
          <AnualChartsBalance data={data} ingresosMensuales={ingresosMensuales}/>
        </Box>
      </Modal>    
    </div>
  );
};
export default TablaBalance;