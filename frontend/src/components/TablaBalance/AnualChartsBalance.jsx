import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

const AnualChartsBalance = ({ data , ingresosMensuales}) => {
   console.log(data);
   console.log(ingresosMensuales);
  
    if (!data || data.length === 0) {
        return <div>No hay datos disponibles para mostrar</div>;
      }
      const transformData = (data) => {
        if (!Array.isArray(data.expenses)) {
          return [];
        }
        const months = data.expenses[0].map(expense => expense.month);
        const amounts = data.expenses.map(expense => expense.amount);    
      
        return [
          { data: amounts },
        ];
      };
      
    const series = [
        {
          data: data
            .filter(({ category }) => category !== "INGRESOS")
            .map(({ category, expenses }, index) => {
              let totalAmount = 0;
              for (const expense of expenses) {
                totalAmount += expense.amount;
              }
              return {
                id: index,
                value: totalAmount,
                label: category
              };
            }),
        },
      ];

      const uData = ingresosMensuales;
      const xLabels = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      

  return (
    <div >
      
      <div style={{display:"flex"}}>
        <div>
            <h2>Categorias gastos Anuales</h2>
            <PieChart series={series} width={600} height={300}  />
            <h2>Gráfico de gastos por mes</h2>
            <LineChart
              width={600}
              height={300}
              series={[{ data: uData, label: 'Gastos Totales por mes', area: true, showMark: false }]}
              xAxis={[{ scaleType: 'point', data: xLabels }]}
              sx={{
                '.MuiLineElement-root': {
                  display: 'none',
                },
              }}
            />
        </div>
       
      </div>
      
    </div>
  );
};

export default AnualChartsBalance;