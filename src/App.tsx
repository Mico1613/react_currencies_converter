import React, { useState, useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Currencies from "./Currencies";
import CurrenciesConverter from "./CurrenciesConverter";
import axios from "axios";

function App() {
  const [currencies, setCurrencies] = useState({});
  useEffect(() => {
    axios("https://www.cbr-xml-daily.ru/daily_json.js").then(({ data }) => {
      setCurrencies(data.Valute);
    });
  }, []);

  console.dir(currencies);
  const useStyles = makeStyles({
    main: {
      height: "100%",
      padding: "50px 0",
      backgroundColor: "#EEF5FA",
      fontSize: "18px",
    },
    wrapper: {
      border: "2px solid #A1D7F8",
      borderRadius: "20px",
      height: "100%",
    },
    currenciesList: {
      borderRight: "2px solid #A1D7F8",
      padding: "20px",
    },
    currenciesConverter: {
      padding: "20px",
      height: "200px",
    },
  });
  const classes = useStyles();
  return (
    <Container
      disableGutters
      component="main"
      maxWidth="lg"
      className={classes.main}
    >
      <Grid className={classes.wrapper} container>
        <Grid className={classes.currenciesList} item xs={7}>
          <Currencies currencies={currencies} />
        </Grid>
        <Grid item xs={5} className={classes.currenciesConverter}>
          <CurrenciesConverter currencies={currencies} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
