import { Column } from 'react-table';
import React from 'react';
import { useCustomSelector } from '../../../redux/hooks';
import ResultsTable from './ResultsTable';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

interface ResultsTableContainerInterface {
  stringObjData: string;
}

const ResultsTableContainer = (props: ResultsTableContainerInterface) => {
  const { stringObjData } = props;
  const cantidadSensores = useCustomSelector(
    (state) => state.señales.cantidadSensores
  );
  const gsrChecked = useCustomSelector(
    (state) => state.señales.gsrIsChecked
  );
  const acelerometroChecked = useCustomSelector(
    (state) => state.señales.acelerometroIsChecked
  );
  const frecuenciaChecked = useCustomSelector(
    (state) => state.señales.frecuenciaIsChecked
  );

  const temperaturaChecked = useCustomSelector(
    (state) => state.señales.temperaturaIsChecked
  );
  interface Cols {
    nombre?: string;
    // EMG's
    colMediaABSEMG1?: string;
    colMedianaEMG1?: string;
    colRMSEMG1?: string;
  
    colMediaABSEMG2?: string;
    colMedianaEMG2?: string;
    colRMSEMG2?: string;
  
    colMediaABSEMG3?: string;
    colMedianaEMG3?: string;
    colRMSEMG3?: string;
  
    colMediaABSEMG4?: string;
    colMedianaEMG4?: string;
    colRMSEMG4?: string;
    // Acelerometro
    colMediaABSAcelerometroX?: string;
    colMedianaAcelerometroX?: string;
    colRMSAcelerometroX?: string;
  
    colMediaABSAcelerometroY?: string;
    colMedianaAcelerometroY?: string;
    colRMSAcelerometroY?: string;
  
    colMediaABSAcelerometroZ?: string;
    colMedianaAcelerometroZ?: string;
    colRMSAcelerometroZ?: string;
  
    // Temp
    colMediaABSTemp?: string;
    colMedianaTemp?: string;
    colRMSTemp?: string;
  
    // GSR
    colMediaABSGsr?: string;
    colMedianaGsr?: string;
    colRMSGsr?: string;
  
    // SPO2
    colMediaABSFrecuencia?: string;
    colMedianaFrecuencia?: string;
    colRMSFrecuencia?: string;
  
    // Clase
    etiqueta?: string;
  }

  // const respStringTest = '{"colMediaABSEMG1":{"0":3.33,"1":10.75,"2":3.33,"3":10.75,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colMedianaEMG1":{"0":3.0,"1":10.5,"2":3.0,"3":10.5,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colRMSEMG1":{"0":3.56,"1":10.85,"2":3.56,"3":10.85,"4":2.55,"5":8.12,"6":2.55,"7":8.12},"colMediaABSEMG2":{"0":8.5,"1":16.0,"2":8.5,"3":16.0,"4":4.5,"5":14.5,"6":4.5,"7":14.5},"colMedianaEMG2":{"0":8.5,"1":16.0,"2":8.5,"3":16.0,"4":4.5,"5":14.5,"6":4.5,"7":14.5},"colRMSEMG2":{"0":8.57,"1":16.06,"2":8.57,"3":16.06,"4":4.81,"5":14.6,"6":4.81,"7":14.6},"colMediaABSGsr":{"0":3.33,"1":10.75,"2":3.33,"3":10.75,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colMedianaGsr":{"0":3.0,"1":10.5,"2":3.0,"3":10.5,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colRMSGsr":{"0":3.56,"1":10.85,"2":3.56,"3":10.85,"4":2.55,"5":8.12,"6":2.55,"7":8.12},"colMediaABSAcelerometro":{"0":3.33,"1":10.75,"2":3.33,"3":10.75,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colMedianaAcelerometro":{"0":3.0,"1":10.5,"2":3.0,"3":10.5,"4":2.5,"5":8.0,"6":2.5,"7":8.0},"colRMSAcelerometro":{"0":3.56,"1":10.85,"2":3.56,"3":10.85,"4":2.55,"5":8.12,"6":2.55,"7":8.12},"etiqueta":{"0":"sano","1":"diabetico","2":"sano","3":"diabetico","4":"sano","5":"sano","6":"sano","7":"sano"},"nombre":{"0":"Karla","1":"Karla","2":"Martha Garcia Lopez","3":"Martha Garcia Lopez","4":"Sujeto Prueba 1","5":"Sujeto Prueba 1","6":"Sujeto Prueba 2","7":"Sujeto Prueba 2"}}'
  const parsedRespObj = JSON.parse(stringObjData);

  const getData = () => {
    const objSensoresData: Cols[] = [];
    const keys = Object.keys(parsedRespObj.nombre);
    const numberOfKeys = keys.length;
    console.log('len', numberOfKeys);
    for (let i = 0; i < numberOfKeys; i += 1) {
      const dataJson = {};
      Object.assign(dataJson, { nombre: parsedRespObj.nombre[i] });
      if (cantidadSensores >= 1) {
        Object.assign(dataJson, {
          colMediaABSEMG1: parsedRespObj.colMediaABSEMG1[i],
          colMedianaEMG1: parsedRespObj.colMedianaEMG1[i],
          colRMSEMG1: parsedRespObj.colRMSEMG1[i],
        });
      }
      if (cantidadSensores >= 2) {
        Object.assign(dataJson, {
          colMediaABSEMG2: parsedRespObj.colMediaABSEMG2[i],
          colMedianaEMG2: parsedRespObj.colMedianaEMG2[i],
          colRMSEMG2: parsedRespObj.colRMSEMG2[i],
        });
      }
      if (cantidadSensores >= 3) {
        Object.assign(dataJson, {
          colMediaABSEMG3: parsedRespObj.colMediaABSEMG3[i],
          colMedianaEMG3: parsedRespObj.colMedianaEMG3[i],
          colRMSEMG3: parsedRespObj.colRMSEMG3[i],
        });
      }
      if (cantidadSensores >= 4) {
        Object.assign(dataJson, {
          colMediaABSEMG4: parsedRespObj.colMediaABSEMG4[i],
          colMedianaEMG4: parsedRespObj.colMedianaEMG4[i],
          colRMSEMG4: parsedRespObj.colRMSEMG4[i],
        });
      }
      if (gsrChecked) {
        Object.assign(dataJson, {
          colMediaABSGsr: parsedRespObj.colMediaABSGsr[i],
          colMedianaGsr: parsedRespObj.colMedianaGsr[i],
          colRMSGsr: parsedRespObj.colRMSGsr[i],
        });
      }
      if (acelerometroChecked) {
        Object.assign(dataJson, {
          colMediaABSAcelerometroX: parsedRespObj.colMediaABSAcelerometroX[i],
          colMedianaAcelerometroX: parsedRespObj.colMedianaAcelerometroX[i],
          colRMSAcelerometroX: parsedRespObj.colRMSAcelerometroX[i],

          colMediaABSAcelerometroY: parsedRespObj.colMediaABSAcelerometroY[i],
          colMedianaAcelerometroY: parsedRespObj.colMedianaAcelerometroY[i],
          colRMSAcelerometroY: parsedRespObj.colRMSAcelerometroY[i],

          colMediaABSAcelerometroZ: parsedRespObj.colMediaABSAcelerometroZ[i],
          colMedianaAcelerometroZ: parsedRespObj.colMedianaAcelerometroZ[i],
          colRMSAcelerometroZ: parsedRespObj.colRMSAcelerometroZ[i],
        });
      }

      if (frecuenciaChecked) {
        Object.assign(dataJson, {
          colMediaABSFrecuencia: parsedRespObj.colMediaABSFrecuencia[i],
          colMedianaFrecuencia: parsedRespObj.colMedianaFrecuencia[i],
          colRMSFrecuencia: parsedRespObj.colRMSFrecuencia[i],
        });
      }

      if (temperaturaChecked) {
        Object.assign(dataJson, {
          colMediaABSTemperatura: parsedRespObj.colMediaABSTemperatura[i],
          colMedianaTemperatura: parsedRespObj.colMedianaTemperatura[i],
          colRMSTemperatura: parsedRespObj.colRMSTemperatura[i],
        });
      }

      Object.assign(dataJson, { etiqueta: parsedRespObj.etiqueta[i] });
      objSensoresData.push(dataJson);
    }
    return objSensoresData;
  };
  const parsedData = getData();
  const data = React.useMemo(
    (): Cols[] => [...parsedData],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const sensoresNames = ['EMG1', 'EMG2', 'EMG3', 'EMG4'];
  const sensoresExtraNames = ['GSR Promedio', 'Acelerometro Promedio'];
  const getColumns = (sizeEMG: number, sizeSensoresExtra: number) => {
    const internalArray: Array<
      Column<{ Header: string; show: boolean; accessor: string }>
    > = [];
    internalArray.push({
      Header: 'Name',
      show: true,
      columns: [
        {
          Header: 'Name',
          accessor: 'nombre',
        },
      ],
    });
    for (let i = 0; i < sizeEMG; i += 1) {
      console.log('Itera');
      internalArray.push({
        Header: sensoresNames[i],
        show: false,
        columns: [
          {
            Header: 'Absolute average',
            accessor: `colMediaABSEMG${i + 1}`,
          },
          {
            Header: 'Median',
            accessor: `colMedianaEMG${i + 1}`,
          },
          {
            Header: 'RMS',
            accessor: `colRMSEMG${i + 1}`,
          },
        ],
      });
    }
    if (gsrChecked) {
      internalArray.push({
        Header: 'Average GSR',
        show: false,
        columns: [
          {
            Header: 'Absolute average',
            accessor: `colMediaABSGsr`,
          },
          {
            Header: 'Median',
            accessor: `colMedianaGsr`,
          },
          {
            Header: 'RMS',
            accessor: `colRMSGsr`,
          },
        ],
      });
    }
    if (acelerometroChecked) {
      internalArray.push({
        Header: 'Average Accelerometer',
        show: false,
        columns: [
          {
            Header: 'Absolute average',
            accessor: `colMediaABSAcelerometroX`,
          },
          {
            Header: 'Median',
            accessor: `colMedianaAcelerometroX`,
          },
          {
            Header: 'RMS',
            accessor: `colRMSAcelerometroX`,
          },

          {
            Header: 'Absolute average',
            accessor: `colMediaABSAcelerometroY`,
          },
          {
            Header: 'Median',
            accessor: `colMedianaAcelerometroY`,
          },
          {
            Header: 'RMS',
            accessor: `colRMSAcelerometroY`,
          },

          {
            Header: 'Absolute average',
            accessor: `colMediaABSAcelerometroZ`,
          },
          {
            Header: 'Median',
            accessor: `colMedianaAcelerometroZ`,
          },
          {
            Header: 'RMS',
            accessor: `colRMSAcelerometroZ`,
          },
        ],
      });
    }
    if (frecuenciaChecked) {
      internalArray.push({
        Header: 'Average Frequency',
        show: false,
        columns: [
          {
            Header: 'Absolute average',
            accessor: `colMediaABSFrecuencia`,
          },
          {
            Header: 'Median',
            accessor: `colMedianaFrecuencia`,
          },
          {
            Header: 'RMS',
            accessor: `colRMSFrecuencia`,
          },
        ],
      });
    }
    if (temperaturaChecked) {
      internalArray.push({
        Header: 'Average Temperature',
        show: false,
        columns: [
          {
            Header: 'Absolute average',
            accessor: `colMediaABSTemperatura`,
          },
          {
            Header: 'Median',
            accessor: `colMedianaTemperatura`,
          },
          {
            Header: 'RMS',
            accessor: `colRMSTemperatura`,
          },
        ],
      });
    }
    internalArray.push({
      Header: 'Label',
      show: true,
      columns: [
        {
          Header: 'Class',
          accessor: 'etiqueta',
        },
      ],
    });
    return internalArray;
  };
  const columns = getColumns(cantidadSensores, 2);

  const options = {
    data,
    columns,
  };

  console.log("DATA", data);

  const defaultTheme = createTheme();


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
        component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <ResultsTable options={options} dataInitial={data} columns={columns} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ResultsTableContainer;
