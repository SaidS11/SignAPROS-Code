/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import Plot from 'react-plotly.js';
import { Button } from '@mui/material';
import { useState } from 'react';
import {
  styleButtonBiggerGreen,
  styleButtonBiggerRed,
} from '../VerPaciente/ButtonStyle';
import { numOfPlotsToRender } from '../Utilities/Constants';


const SensoresAdquisicion = ({
  sensoresSelected,
  data,
  dataXGsr,
  dataYGsr,

  dataXFrecuencia,
  dataYFrecuencia,

  dataXTemperatura,
  dataYTemperatura,

  dataXInlcX,
  dataYInlcX,

  dataXInlcY,
  dataYInlcY,

  dataXInlcZ,
  dataYInlcZ,

  gsrIschecked,
  tempIschecked,
  frecuenciaIschecked,
  acelerometroIschecked,
}) => {


  // console.log("This is X", dataXEmg1);

  const trace1 = {
    x: dataXGsr,
    y: dataYGsr,
    xaxis: 'x5',
    yaxis: 'y5',
    type: 'scatter',
    line: { color: 'gray' },
    mode: 'markers+lines',
    name: 'GSR',
  };


  const trace2 = {
    x: dataXTemperatura,
    y: dataYTemperatura,
    xaxis: 'x6',
    yaxis: 'y6',
    type: 'scatter',
    line: { color: 'red' },
    mode: 'markers+lines',
    name: 'TC',
  };

  const trace3 = {
    x: dataXFrecuencia,
    y: dataYFrecuencia,
    xaxis: 'x7',
    yaxis: 'y7',
    type: 'scatter',
    line: { color: 'orange' },
    mode: 'markers+lines',
    name: 'HRLM',
  };

  const trace4 = {
    x: dataXInlcX,
    y: dataYInlcX,
    xaxis: 'x8',
    yaxis: 'y8',
    type: 'scatter',
    line: { color: 'yellow' },
    mode: 'markers+lines',
    name: 'INCLX',
  };

  const trace5 = {
    x: dataXInlcY,
    y: dataYInlcY,
      xaxis: 'x9',
      yaxis: 'y9',
      type: 'scatter',
      line: { color: 'green' },
      mode: 'markers+lines',
      name: 'INCLY',
  };

  const trace6 = {
      x: dataXInlcZ,
      y: dataYInlcZ,
      xaxis: 'x10',
      yaxis: 'y10',
      type: 'scatter',
      line: { color: 'brown' },
      mode: 'markers+lines',
      name: 'INCLZ',
  };

  
  const dataArr = [];

  // const dataArr = [
  //   trace1,
  //   trace2,
  //   trace3,
  //   trace4,
  //   trace5,
  //   trace6,
  // ];

  if(true) {
    dataArr.push(trace1)
  }

  if(true) {
      dataArr.push(trace2)
  }

  if(true) {
      dataArr.push(trace3)
  }

  if(true) {
      dataArr.push(trace4)
      dataArr.push(trace5)
      dataArr.push(trace6)
  }

  const numOfPlots = () => {
    const times = 8 - sensoresSelected;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < times; i++) {
      dataArr.pop();
    }
    // impar aumenta las columns
    let dynamicRows = 0;
    let dynamicColumns = 0;
    if (sensoresSelected === 1) {
      dynamicRows = 1;
      dynamicColumns = 1;
    }
    if (sensoresSelected === 2) {
      dynamicRows = 1;
      dynamicColumns = 2;
    }
    if (sensoresSelected > 2 && sensoresSelected < 5) {
      dynamicRows = 2;
      dynamicColumns = 2;
    }
    if (sensoresSelected > 4 && sensoresSelected < 7) {
      dynamicRows = 2;
      dynamicColumns = 3;
    }
    if (sensoresSelected >= 7) {
      dynamicRows = 2;
      dynamicColumns = 4;
    }
    const objGrid = {
      rows: dynamicRows,
      columns: dynamicColumns,
      pattern: 'independent',
    };
    return objGrid;
  };

  const gridLayout = numOfPlotsToRender(sensoresSelected);

  return (
    <div>
      <Plot
        data={dataArr}
        layout={{
          title: 'Sensores',
          autosize: true,
          grid: gridLayout,
          dragmode: 'select',
          xaxis: {
            title: 'Time (seconds)',
            side: 'bottom',
          },
          yaxis: {
            title: 'Amplitude',
            side: 'bottom',
          },
          xaxis2: {
            title: 'Time (seconds)',
            side: 'bottom',
          },
          yaxis2: {
            title: 'Amplitude',
            side: 'bottom',
          },
          xaxis3: {
            title: 'Time (seconds)',
            side: 'bottom',
          },
          yaxis3: {
            title: 'Amplitude',
            side: 'bottom',
          },
          xaxis4: {
            title: 'Time (seconds)',
            side: 'bottom',
          },
          yaxis4: {
            title: 'Amplitude',
            side: 'bottom',
          },
          xaxis5: {
            title: 'Time (seconds)',
            side: 'bottom',
          },
          yaxis5: {
            title: 'Amplitude',
            side: 'bottom',
          },
          xaxis6: {
            title: 'Time (seconds)',
            side: 'bottom',
          },
          yaxis6: {
            title: 'Amplitude',
            side: 'bottom',
          },
          xaxis7: {
            title: 'Time (seconds)',
            side: 'bottom',
          },
          yaxis7: {
            title: 'Amplitude',
            side: 'bottom',
          },
          xaxis8: {
            title: 'Time (seconds)',
            side: 'bottom',
          },
          yaxis8: {
            title: 'Amplitude',
            side: 'bottom',
          },
        }}
        config={{ scrollZoom: true, displayModeBar: false }}
        useResizeHandler
        style={{ height: '100%', width: '100%' }}
        divId="myDiv"
      />
    </div>
  );
};

export default SensoresAdquisicion;
