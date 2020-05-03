import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';
import { fetchIndianStates, fetchCassandraData } from '../../api';

const CountryPicker = ({ country, handleCountryChange, handleIndianStateChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);
    const [fetchedIndianStates, setFetchedIndianStates] = useState([]);
    const [fetchedCassandraData, setFetchedCassandraData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
            setFetchedIndianStates(await fetchIndianStates());
            setFetchedCassandraData(await fetchCassandraData());
        }
        fetchAPI();
    }, [setFetchedCountries, setFetchedIndianStates, setFetchedCassandraData]);

    //console.log("the record for countries");
    //console.log(fetchedCountries);
    //console.log("the record for indian states");
    //console.log(fetchedIndianStates);

    return (
        <div>
            <FormControl className={styles.formControl}>
                <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                    <option value="">Global</option>
                    {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
                </NativeSelect>
            </FormControl><br />
            {country === "India" ?
                <FormControl className={styles.formControl}>
                    <NativeSelect defaultValue="" onChange={(e) => handleIndianStateChange(e.target.value)}>
                        {fetchedIndianStates.map((state, i) => <option key={i} value={state}>{state}</option>)}
                    </NativeSelect>
                    <NativeSelect defaultValue="">
                        {fetchedCassandraData.map((firstname, i) => <option key={i} value={firstname}>{firstname}</option>)}
                    </NativeSelect>
                </FormControl>
                : <div></div>}

        </div>
    )
}

export default CountryPicker;