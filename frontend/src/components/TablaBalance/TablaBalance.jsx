import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const categorias = [
  "Alquiler",
  "Salidas",
  "Comida",
  "Servicios",
  "Tarjeta de crédito",
];

function createData(
  categoria,
  enero,
  febrero,
  marzo,
  abril,
  mayo,
  junio,
  julio,
  agosto,
  septiembre,
  octubre,
  noviembre,
  diciembre
) {
  return {
    categoria,
    enero,
    febrero,
    marzo,
    abril,
    mayo,
    junio,
    julio,
    agosto,
    septiembre,
    octubre,
    noviembre,
    diciembre,
  };
}

const initialRows = [
  createData("Alquiler", 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000),
  createData("Salidas", 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300),
  createData("Comida", 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850),
  createData("Servicios", 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150),
  createData("Tarjeta de crédito", 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500),
];

var añoActual = "2024";

export default function TablaBalance() {
  const [rows, setRows] = useState(initialRows);
  const [editableCells, setEditableCells] = useState(
    Array.from({ length: initialRows.length }, () =>
      Array.from({ length: 12 }, () => false)
    )
  );

  const handleToggleEdit = (rowIndex, cellIndex) => {
    setEditableCells(prevEditableCells => {
      const updatedEditableCells = [...prevEditableCells];
      updatedEditableCells[rowIndex][cellIndex] = !updatedEditableCells[rowIndex][cellIndex];
      return updatedEditableCells;
    });
  };

  return (
    <div style={{ marginTop: "100px", width: "70%", marginLeft: "auto", marginRight: "auto" }}>
      <h3>Balance anual {añoActual}</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ minWidth: "100px", maxWidth: "100px" }}>Categoría</StyledTableCell>
              {["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"].map((month, index) => (
                <StyledTableCell key={index} style={{ minWidth: "100px", maxWidth: "100px" }}>
                  {month}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <StyledTableRow key={rowIndex}>
                <StyledTableCell component="th" scope="row">
                  {row.categoria}
                </StyledTableCell>
                {Object.entries(row).slice(1).map(([key, value], cellIndex) => (
                  <StyledTableCell align="right" key={cellIndex}>
                    {editableCells[rowIndex][cellIndex] ? (
                      <TextField
                        value={value}
                        sx={{ width: "100%" }}
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={(event) => {
                          const newValue = event.target.value;
                          setRows(prevRows =>
                            prevRows.map((prevRow, prevRowIndex) =>
                              prevRowIndex === rowIndex
                                ? { ...prevRow, [key]: newValue }
                                : prevRow
                            )
                          );
                        }}
                      />
                    ) : (
                      value
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleToggleEdit(rowIndex, cellIndex)}
                    >
                      {editableCells[rowIndex][cellIndex] ? <DoneIcon /> : <EditIcon />}
                    </IconButton>
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
