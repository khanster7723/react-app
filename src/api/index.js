import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
const urlCovid19India = 'https://api.covid19india.org';
const urlLocalSpringBoot = 'http://localhost:4001/cassandra/getAllUsers';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
        changeableUrl = `${url}/countries/${country}`;
    }

    try {
        if (country === "India") {
            changeableUrl = `${urlCovid19India}/data.json`;
            const { data: { statewise } } = await axios.get(changeableUrl);
            console.log(statewise[0]);
            const confirmed = {
                "value": Number(statewise[0].confirmed)
            };
            const recovered = {
                "value": Number(statewise[0].recovered)
            };
            const deaths = {
                "value": Number(statewise[0].deaths)
            };
            const deltaConfirmed = {
                "value": Number(statewise[0].deltaconfirmed)
            };
            const deltaRecovered = {
                "value": Number(statewise[0].deltarecovered)
            };
            const deltaDeaths = {
                "value": Number(statewise[0].deltadeaths)
            };
            const active = {
                "value": Number(statewise[0].active)
            };
            const lastUpdate = statewise[0].lastupdatedtime;
            return {
                confirmed,
                recovered,
                deaths,
                lastUpdate,
                deltaConfirmed,
                deltaRecovered,
                deltaDeaths,
                active
            }

        } else {
            const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

            const deltaConfirmed = {
                "value": 0
            };
            const deltaRecovered = {
                "value": 0
            };
            const deltaDeaths = {
                "value": 0
            };
            const active = {
                "value": confirmed.value - (recovered.value + deaths.value)
            };

            return {
                confirmed,
                recovered,
                deaths,
                lastUpdate,
                deltaConfirmed,
                deltaRecovered,
                deltaDeaths,
                active
            };
        }
        //const thisData = await axios.get(changeableUrl);
        //console.log("the data coming is")
        //console.log(thisData);

        //console.log(response);
    } catch (error) {
        console.log(error);
        const confirmed = {
            "value": 0
        };
        const recovered = {
            "value": 0
        };
        const deaths = {
            "value": 0
        };
        const lastUpdate = '0';
        const deltaConfirmed = {
            "value": 0
        };
        const deltaRecovered = {
            "value": 0
        };
        const deltaDeaths = {
            "value": 0
        };
        const active = {
            "value": 0
        };

        return {
            confirmed,
            recovered,
            deaths,
            lastUpdate,
            deltaConfirmed,
            deltaRecovered,
            deltaDeaths,
            active
        };

    }
}

export const fetchDataOfIndianState = async (state) => {
    let changeableUrl = urlCovid19India;

    try {
        changeableUrl = `${urlCovid19India}/data.json`;
        const { data: { statewise } } = await axios.get(changeableUrl);
        //console.log(statewise[0]);
        var stateData = statewise.filter(function (states) {
            return states.state === state;
        });
        console.log(stateData);
        const confirmed = {
            "value": Number(stateData[0].confirmed)
        };
        const recovered = {
            "value": Number(stateData[0].recovered)
        };
        const deaths = {
            "value": Number(stateData[0].deaths)
        };
        const deltaConfirmed = {
            "value": Number(stateData[0].deltaconfirmed)
        };
        const deltaRecovered = {
            "value": Number(stateData[0].deltarecovered)
        };
        const deltaDeaths = {
            "value": Number(stateData[0].deltadeaths)
        };
        const active = {
            "value": Number(stateData[0].active)
        };
        const lastUpdate = stateData[0].lastupdatedtime;
        return {
            confirmed,
            recovered,
            deaths,
            lastUpdate,
            deltaConfirmed,
            deltaRecovered,
            deltaDeaths,
            active
        }

        //const thisData = await axios.get(changeableUrl);
        //console.log("the data coming is")
        //console.log(thisData);

        //console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))
        return modifiedData;
        //console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyDataIndia = async () => {
    try {
        const { data: { cases_time_series } } = await axios.get(`${urlCovid19India}/data.json`);
        const modifiedData = cases_time_series.map((dailyData) => ({
            confirmed: dailyData.totalconfirmed,
            recovered: dailyData.totalrecovered,
            deaths: dailyData.totaldeceased,
            date: dailyData.date
        }))
        return modifiedData;
        //console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
        //console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export const fetchIndianStates = async () => {
    try {
        const { data: { statewise } } = await axios.get(`${urlCovid19India}//data.json`);

        return statewise.map((states) => states.state);
        //console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export const fetchCassandraData = async () => {
    try {
        const response = await axios.get(`${urlLocalSpringBoot}`);
        console.log(response);
        const user = response.data;
        console.log(user);
        return user.map((names) => names.firstname);
        //return data;
    } catch (error) {
        console.log(error);
    }
}