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
import AnualChartsBalance from "./AnualChartsBalance";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Modal,Box,Typography } from "@mui/material";


const TablaBalance = () => {
  const [data, setData] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [balanceMensual, setBalanceMensual] = useState([]);
  const [ingresosMensuales, setIngresosMensuales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


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
    console.log(data)
  }, []);

  useEffect(() => {
    if (data.length > 0 && ingresos.length > 0) {
      const balance = [];
      const gastosMensuales = [];
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
            console.log(totalGastos);

          }
        }
        balance.push({
          month: ingreso.month,
          amount: ingreso.amount - totalGastos,
        });
        gastosMensuales.push(totalGastos)
      }
      setBalanceMensual(balance);
      setIngresosMensuales(gastosMensuales);
    }
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
 
  

  return (
    <div
      style={{
        marginTop: "100px",
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
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
              <TableCell style={{ color: "white" }}></TableCell>
              <TableCell style={{ color: "white" }}>Categorias</TableCell>
              <TableCell style={{ color: "white" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Enero</Link>
                <IconButton  aria-label="edit"><EditIcon /></IconButton>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Febrero</Link>
                <IconButton  aria-label="edit"><EditIcon /></IconButton>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Marzo</Link>
                <IconButton  aria-label="edit"><EditIcon /></IconButton>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Abril</Link>
                <IconButton  aria-label="edit"><EditIcon /></IconButton>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Mayo</Link>
                <IconButton  aria-label="edit"><EditIcon /></IconButton>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Junio</Link>
                <IconButton  aria-label="edit"><EditIcon /></IconButton>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Julio</Link>
                <IconButton  aria-label="edit"><EditIcon /></IconButton>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Agosto</Link>
                <IconButton  aria-label="edit"><EditIcon /></IconButton>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Septiembre</Link>
                <IconButton  aria-label="edit"><EditIcon /></IconButton>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Octubre</Link>
                <IconButton  aria-label="edit"><EditIcon /></IconButton>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Noviembre</Link>
                <IconButton  aria-label="edit"><EditIcon /></IconButton>
              </TableCell>
              <TableCell style={{ color: "white" }}>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Diciembre</Link>
                <IconButton  aria-label="edit"><EditIcon /></IconButton>
              </TableCell>

              
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {item.category !== "INGRESOS" && (
                  <>
                    <TableCell style={{ background: "#628979" }}>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDeleteRow(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => handleEditCategory(index)}
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
                      <TableCell key={expenseIndex}>{expense.amount}</TableCell>
                    ))}
                  </>
                )}
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                style={{ background: "#54DEA5", color: "white" }}
              ></TableCell>
              <TableCell style={{ background: "#54DEA5", color: "white" }}>
                INGRESOS
              </TableCell>
              {ingresos.map((income, index) => (
                <TableCell key={index}>{income.amount}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell
                style={{ background: "#54DEA5", color: "white" }}
              ></TableCell>
              <TableCell style={{ background: "#54DEA5", color: "white" }}>
                BALANCE MENSUAL
              </TableCell>
              {balanceMensual.map((balance, index) => (
                <TableCell key={index}>{balance.amount}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isModalOpen} onClose={closeCharts}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,

          }}
        >
          <Typography variant="h6" component="h2">
            Gráficos de Balance Anual
          </Typography>
          <AnualChartsBalance data={data} ingresosMensuales={ingresosMensuales}/>
        </Box>
      </Modal>
     
        
      
      
    </div>
  );
};

export default TablaBalance;
