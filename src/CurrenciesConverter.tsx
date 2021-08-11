import React, { useState } from "react";

import {
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  makeStyles,
  TextField,
} from "@material-ui/core";
type props = {
  currencies: object;
};
function CurrenciesConverter({ currencies }: props) {
  const newCurrenciesList = {
    RUB: {
      ID: "R1123",
      NumCode: "643",
      CharCode: "RUB",
      Nominal: 1,
      Name: "Российский рубль",
      Previous: 1,
      Value: 1,
    },
    ...currencies,
  };
  const useStyles = makeStyles({
    form: {
      width: "450px",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "50px",
    },
    label: {},
    select: {
      width: "220px",
    },
    formWrapper: {
      display: "flex",
      flexDirection: "column",
    },
    menuItem: {
      display: "flex",
      justifyContent: "space-between",
    },
    textField: {
      display: "block",
    },
  });
  const c = useStyles();
  console.dir(newCurrenciesList);
  const [firstInput, setFirstInput] = useState("RUB");
  const [secondInput, setSecondInput] = useState("USD");
  const [firstTextField, setFirstTextField] = useState(0);
  const [secondTextField, setSecondTextField] = useState(0);

  React.useEffect(() => {
    Object.entries(newCurrenciesList).forEach((i) => {
      if (i[0] === firstInput) {
        Object.entries(newCurrenciesList).forEach((q) => {
          if (q[0] === secondInput) {
            setSecondTextField(
              parseFloat(
                (
                  ((firstTextField as number) * (i[1].Value / i[1].Nominal)) /
                  (q[1].Value / q[1].Nominal)
                ).toFixed(4)
              )
            );
          }
        });
      }
    });
  }, [firstInput, secondInput]);

  const firstTextFieldHandler = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setFirstTextField(event.target.value as number);
    Object.entries(newCurrenciesList).forEach((i) => {
      if (i[0] === firstInput) {
        Object.entries(newCurrenciesList).forEach((q) => {
          if (q[0] === secondInput) {
            setSecondTextField(
              parseFloat(
                (
                  ((event.target.value as number) *
                    (i[1].Value / i[1].Nominal)) /
                  (q[1].Value / q[1].Nominal)
                ).toFixed(4)
              )
            );
          }
        });
      }
    });
  };

  const secondTextFieldHandler = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSecondTextField(event.target.value as number);
    Object.entries(newCurrenciesList).forEach((i) => {
      if (i[0] === firstInput) {
        Object.entries(newCurrenciesList).forEach((q) => {
          if (q[0] === secondInput) {
            setFirstTextField(
              parseFloat(
                (
                  ((event.target.value as number) *
                    (q[1].Value / q[1].Nominal)) /
                  (i[1].Value / i[1].Nominal)
                ).toFixed(4)
              )
            );
          }
        });
      }
    });
  };

  const firstInputHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFirstInput(event.target.value as string);
  };
  const secondInputHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSecondInput(event.target.value as string);
  };

  return (
    <div className={c.formWrapper}>
      <FormControl className={c.form}>
        <InputLabel id="input-label" className={c.label}>
          Выберите валюту
        </InputLabel>
        <Select
          className={c.select}
          labelId="input-label"
          id="currency-choose-selector"
          value={firstInput}
          onChange={firstInputHandler}
        >
          {Object.values(newCurrenciesList).map((item, index) => {
            return (
              <MenuItem
                className={c.menuItem}
                key={`${item}_${index}`}
                value={item.CharCode}
              >
                <p className="MuiSelect-selectMenu">{item.Name}</p>
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          id="outlined-basic"
          value={firstTextField}
          onChange={firstTextFieldHandler}
          variant="outlined"
          color="primary"
          type="number"
          onFocus={() => console.log(123)}
          onKeyDown={(e) =>
            e.keyCode === 187 || e.keyCode === 189 ? e.preventDefault() : null
          }
        />
      </FormControl>
      <FormControl className={c.form}>
        <InputLabel id="input-label-2" className={c.label}>
          Выберите валюту
        </InputLabel>
        <Select
          className={c.select}
          labelId="input-label-2"
          id="currency-choose-selector-2"
          value={secondInput}
          onChange={secondInputHandler}
        >
          {Object.values(newCurrenciesList).map((item, index) => {
            return (
              <MenuItem
                className={c.menuItem}
                key={`${item}_${index}`}
                value={item.CharCode}
              >
                <p className="MuiSelect-selectMenu">{item.Name}</p>
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          className={c.textField}
          id="outlined-basic"
          value={secondTextField}
          onChange={secondTextFieldHandler}
          variant="outlined"
          color="secondary"
          onKeyDown={(e) =>
            e.keyCode === 187 || e.keyCode === 189 ? e.preventDefault() : null
          }
        />
      </FormControl>
    </div>
  );
}

export default CurrenciesConverter;
