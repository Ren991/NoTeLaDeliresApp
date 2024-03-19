import { PieChart } from "@mui/x-charts/PieChart";

const AnualChartsBalance = ({ data }) => {
  
    if (!data || data.length === 0) {
        return <div>No hay datos disponibles para mostrar</div>;
      }
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

  return (
    <div >
      
      <div style={{display:"flex"}}>
        <div>
            <h2>Gráfico de gastos</h2>
            <PieChart series={series} width={500} height={200}  />
        </div>
        <div>
            <h3>Balances mensuales en el año 2024</h3>
        </div>
      </div>
      
    </div>
  );
};

export default AnualChartsBalance;