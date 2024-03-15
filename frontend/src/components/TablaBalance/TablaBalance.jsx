import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

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

const categorias = ["Alquiler", "Salidas", "Comida", "Servicios", "Tarjeta de crédito"];

function createData(categoria, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre) {
  return { categoria, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre };
}

const rows = [
  createData("Alquiler", 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000),
  createData("Salidas", 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300),
  createData("Comida", 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850),
  createData("Servicios", 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150),
  createData("Tarjeta de crédito", 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500),
];

var añoActual = "2024";

export default function TablaBalance() {
  return (
    <div style={{ marginTop: "100px", width: "70%", marginLeft: "auto", marginRight: "auto" }}>
      <h3>Balance anual {añoActual}</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
                <StyledTableCell align="right" style={{ minWidth: '100px', maxWidth: '100px' }}>Categoría</StyledTableCell>
                <StyledTableCell align="right" style={{ minWidth: '100px', maxWidth: '100px' }}>Enero</StyledTableCell>
                <StyledTableCell align="right" style={{ minWidth: '100px', maxWidth: '100px' }}>Febrero</StyledTableCell>
                <StyledTableCell align="right" style={{ minWidth: '100px', maxWidth: '100px' }}>Marzo</StyledTableCell>
                <StyledTableCell align="right" style={{ minWidth: '100px', maxWidth: '100px' }}>Abril</StyledTableCell>
                <StyledTableCell align="right" style={{ minWidth: '100px', maxWidth: '100px' }}>Mayo</StyledTableCell>
                <StyledTableCell align="right" style={{ minWidth: '100px', maxWidth: '100px' }}>Junio</StyledTableCell>
                <StyledTableCell align="right" style={{ minWidth: '100px', maxWidth: '100px' }}>Julio</StyledTableCell>
                <StyledTableCell align="right" style={{ minWidth: '100px', maxWidth: '100px' }}>Agosto</StyledTableCell>
                <StyledTableCell align="right" style={{ minWidth: '100px', maxWidth: '100px' }}>Septiembre</StyledTableCell>
                <StyledTableCell align="right" style={{ minWidth: '100px', maxWidth: '100px' }}>Octubre</StyledTableCell>
                <StyledTableCell align="right" style={{ minWidth: '100px', maxWidth: '100px' }}>Noviembre</StyledTableCell>
                <StyledTableCell align="right" style={{ minWidth: '100px', maxWidth: '100px' }}>Diciembre</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.categoria}
                </StyledTableCell>
                {Object.keys(row).slice(1).map((key, keyIndex) => (
                  <StyledTableCell align="right" key={keyIndex}>
                    <TextField
                      id={`${index}-${keyIndex}`}
                      
                      value={row[key]}
                      sx={{ width: "100%" }}
                      InputProps={{ inputProps: { min: 0 } }}
                      onChange={(event) => {
                        const value = event.target.value;
                        const updatedRows = [...rows];
                        updatedRows[index][key] = value;
                        // Actualiza el estado con las filas actualizadas
                      }}
                    />
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