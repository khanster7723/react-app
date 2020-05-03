import React, { useState, useEffect } from 'react';
import { fetchDailyData, fetchDailyDataIndia } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths, active }, country }) => {
    const [dailyData, setDailyData] = useState([]);
    const [dailyDataIndia, setDailyDataIndia] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData())
            setDailyDataIndia(await fetchDailyDataIndia())
        }
        //console.log(dailyData);
        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length
            ? (<Line data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deceased',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true
                }]
            }}></Line>) : null
    );

    const lineChartForIndia = (
        dailyDataIndia.length
            ? (<Line data={{
                labels: dailyDataIndia.map(({ date }) => date),
                datasets: [{
                    data: dailyDataIndia.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: dailyDataIndia.map(({ recovered }) => recovered),
                    label: 'Recovered',
                    borderColor: 'rgba(0, 255, 0, 0.788)',
                    fill: true
                }, {
                    data: dailyDataIndia.map(({ deaths }) => deaths),
                    label: 'Deceased',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true
                }]
            }}></Line>) : null
    );

    const barChart = (
        confirmed
            ? (
                <Bar data={{
                    labels: ['Infected', 'Active', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgba(8, 8, 231, 0.842)', 'rgba(207, 35, 179, 0.856)', 'rgb(0, 255, 0, 0.5)', 'rgb(255, 0, 0, 0.5)'],
                        data: [confirmed.value, active.value, recovered.value, deaths.value]
                    }]
                }} options={{
                    legends: { display: false },
                    title: { display: true, text: `Current State in ${country}` }
                }}></Bar>
            ) : null
    );

    return (
        <div className={styles.container}>
            {country ? (country === "India" ? lineChartForIndia : barChart) : lineChart}

        </div>
    )
}

export default Chart;