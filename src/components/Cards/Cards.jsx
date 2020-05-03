import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate, deltaConfirmed, deltaRecovered, deltaDeaths, active }, country, state }) => {
    //console.log(props);
    if (!confirmed) {
        return 'Data is loading...';
    }
    return (
        <div className={styles.container}>
            <Typography className={styles.heading} variant="h3" color="textSecondary" gutterBottom>
                {country ? "Total Cases In " + country : "Total Cases In The World"} {country === "India" && state ? " - " + state : ""}
            </Typography>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.infected)}>
                    <CardContent className={styles.cardContent}>
                        <Typography color="textSecondary" gutterBottom>Total Infected</Typography>
                        <Typography variant="h4">
                            <CountUp start={0}
                                end={confirmed.value}
                                duration={2.5}
                                separator=",">
                            </CountUp>
                        </Typography>
                        <Typography color="textSecondary">Last Updated On - {new Date(lastUpdate).toLocaleString()}</Typography>
                        <Typography variant="h6">Today - <CountUp start={0}
                            end={deltaConfirmed.value ? deltaConfirmed.value : 0}
                            duration={2.5}
                            separator=",">
                        </CountUp>
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.active)}>
                    <CardContent className={styles.cardContent}>
                        <Typography color="textSecondary" gutterBottom>Total Active</Typography>
                        <Typography variant="h4">
                            <CountUp start={0}
                                end={active.value}
                                duration={2.5}
                                separator=",">
                            </CountUp>
                        </Typography>
                        <Typography color="textSecondary">Last Updated On - {new Date(lastUpdate).toLocaleString()}</Typography>
                        <Typography variant="h6"></Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.recovered)}>
                    <CardContent className={styles.cardContent}>
                        <Typography color="textSecondary" gutterBottom>Total Recovered</Typography>
                        <Typography variant="h4">
                            <CountUp start={0}
                                end={recovered.value}
                                duration={2.5}
                                separator=",">
                            </CountUp>
                        </Typography>
                        <Typography color="textSecondary">Last Updated On - {new Date(lastUpdate).toLocaleString()}</Typography>
                        <Typography variant="h6">Today - <CountUp start={0}
                            end={deltaRecovered.value ? deltaRecovered.value : 0}
                            duration={2.5}
                            separator=",">
                        </CountUp>
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={2} className={cx(styles.card, styles.deaths)}>
                    <CardContent className={styles.cardContent}>
                        <Typography color="textSecondary" gutterBottom>Total Deceased</Typography>
                        <Typography variant="h4">
                            <CountUp start={0}
                                end={deaths.value}
                                duration={2.5}
                                separator=",">
                            </CountUp>
                        </Typography>
                        <Typography color="textSecondary">Last Updated On - {new Date(lastUpdate).toLocaleString()}</Typography>
                        <Typography variant="h6">Today - <CountUp start={0}
                            end={deltaDeaths.value ? deltaDeaths.value : 0}
                            duration={2.5}
                            separator=",">
                        </CountUp>
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;