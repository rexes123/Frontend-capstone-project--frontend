import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { useState, useEffect } from "react";


// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChartTeam() {

    const [spendingData, setSpendingData] = useState([]);

    const [totalProjManAmount, setTotalProjManAmount] = useState(0);


    const [totalDesignTeamAmount, setTotalDesignTeamAmount] = useState(0);


    const [softDevExpense, setSoftDevExpense] = useState(0);


    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://backend-2txi.vercel.app/expenses');
            const data = await response.json();
            setSpendingData(data);

            const projMan = data.filter((obj) => obj.team === "Project management");

            const projManExpense = projMan.reduce((acc, item) => acc + parseFloat(item.amount), 0);

            setTotalProjManAmount(projManExpense);

            const designTeamName = data.filter((obj) => obj.team === "Design team");
            const designExpense = designTeamName.reduce((acc, item) => acc + parseFloat(item.amount), 0);
            setTotalDesignTeamAmount(designExpense)

            const softDevTeamName = data.filter((obj) => obj.team === "Software development");
            const softDevExpense = softDevTeamName.reduce((acc, item) => acc + parseFloat(item.amount), 0);
            setSoftDevExpense(softDevExpense)
        }
        getData();
    }, [])



    const data = {
        labels: ['PM', 'SD', 'DT'],
        datasets: [
            {
                label: 'Spending',
                data: [totalProjManAmount, softDevExpense, totalDesignTeamAmount],
                backgroundColor: ['Blue', 'Yellow', 'Orange'],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false,
                labels: {
                    color: 'black', // For visibility
                },
            },

            title: {
                display: true,
                text: 'Team Spending Trend',
                color: 'Black',
                font: {
                    size: 20,
                },
            },
        },

        scales: {
            x: {
                ticks: {
                    color: 'Black',
                },
            },

            y: {
                beginAtZero: true,
                ticks: {
                    color: 'Black',
                },
            },
        },
    };

    return <div style={{ width: "80%", height: "400px", margin: "0 auto" }}>
        <Bar data={data} options={options} />
    </div>

}