/* eslint-disable react/prop-types */
import Plot from 'react-plotly.js';
import './ProbarSensores.css';
import { Button } from '@mui/material';
import { useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

/* export interface ProbarSensoresInterface {
  onClickAdd: () => void
  dataX: Number[]
  dataY : Number[]
} */

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ProbarSensores = ({ sensoresSelected }) => {
  // const { onClickAdd } = props;
  /* const dataX = [];
  const dataY = [];
  console.log(dataX); */
  const [dataX, setDataX] = useState([0]);
  const [dataY, setDataY] = useState([0]);
  const [scatter, setScatter] = useState({
    x: [1, 2, 3],
    y: [2, 5, 3],
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: 'red' },
  });
  console.log('llegaron', sensoresSelected);
  const [data, setData] = useState([scatter]);

  const dataFake = [];
  const dataFake2 = [];
  let numY = 0;
  let numX = 0;

  const onClickAdd = () => {
    /* const newScatter = {...scatter};
    setScatter(newScatter);
    setData([scatter]); */
    /* dataX.push(1);
    dataY.push(1);
    console.log(dataX); */
    numX = dataX.at(-1) + 2;
    numY = dataY.at(-1) + 1;
    /* dataX.push(numX)
    dataY.push(numY) */
    console.log(dataX);

    setDataX(dataX.concat(numX));
    setDataY(dataY.concat(numY));
  };
  const numOfPlots = () => {
    const plots = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sensoresSelected; i++) {
      plots.push(<option>{i}</option>);
    }
    return plots;
  };
  /* const plotsArr = numOfPlots(); */
  return (
    <div>
      <section className="display-flex">
        <Button onClick={onClickAdd}>Presioname</Button>
        {numOfPlots()}
      </section>
    </div>
  );
  /* return (
    <div >
      <div className="display-centerSensores">
        {numOfPlots()}
      </div>
      <section className="display-flex">
        <Button onClick={onClickAdd}>Presioname</Button>
      </section>
    </div>
  ); */
};

export default ProbarSensores;
