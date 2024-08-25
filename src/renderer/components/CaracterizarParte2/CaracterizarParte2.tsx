/* eslint-disable react/jsx-props-no-spreading */
import { Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import { pink } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
  useTable,
  TableOptions,
  useSortBy,
  useFilters,
  HeaderGroup,
} from 'react-table';
import React from 'react';
import styleButton, {
  styleButtonBiggerGreen,
  styleButtonBiggerRed,
} from '../VerPaciente/ButtonStyle';
import './CaracterizarParte2.css';

export interface CaracterizarParte2Props {
  componentArray: any;
  OnClickNav: () => void;
  OnClickBack: () => void;
}

const CaracterizarParte2 = (props: CaracterizarParte2Props) => {
  const { componentArray, OnClickNav, OnClickBack } = props;
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
    console.log('Checked', event.target.value);
  };

  return (
    <div>
      <section className="display-center">
        <h1>Results</h1>
      </section>
      <section className="display-center">
        <h3>Table with window selection</h3>
      </section>
      {...componentArray}
      <section className="display-center">
        Data obtained after calculating using windows per sensor.
      </section>
      <section className="display-center" style={{ fontWeight: 'bold' }}>
        If featuring process was successful please continue.
      </section>
      
      <section className="display-center">
        <Button sx={styleButtonBiggerGreen} onClick={OnClickNav}>
          Continue
        </Button>
      </section>
      <section className="display-center">
        <Button sx={styleButtonBiggerRed} onClick={OnClickBack}>
          Cancel
        </Button>
      </section>
      <br />

    </div>
  );
};

export default CaracterizarParte2;
