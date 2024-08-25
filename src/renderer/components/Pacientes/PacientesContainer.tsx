/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch } from '../../../redux/hooks';
import {
  setUsuarioPaciente,
  setDatosPaciente,
} from '../../../redux/slices/PacienteSlice';
import Pacientes from './Pacientes';

const PacientesContainer = () => {
  const navigate = useNavigate();
  const onClickNavigate = () => {
    navigate('/agregarPaciente');
  };
  function obtenerFecha(fecha: Date) {
    const month = fecha.getUTCMonth() + 1; // months from 1-12
    const day = fecha.getUTCDate();
    const year = fecha.getUTCFullYear();

    const newdate = `${year}/${month}/${day}`;
    return newdate;
  }
  interface Cols {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
  }
  const [data, setData] = useState<Cols[]>([]);

  const [dataAux, setDataAux] = useState<Cols[]>([]);

  const columns: Array<
    Column<{
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
    }>
  > = React.useMemo(
    () => [
      {
        Header: 'Names',
        accessor: 'col1',
      },
      {
        Header: 'Paternal Surname',
        accessor: 'col2',
      },
      {
        Header: 'Maternal Surname',
        accessor: 'col3',
      },
      {
        Header: 'Birthdate',
        accessor: 'col4',
      },
      {
        Header: 'Email',
        accessor: 'col5',
      },
    ],
    []
  );
  const [filterInput, setFilterInput] = useState('');
  const appDispatch = useCustomDispatch();

  async function loadPaciente(
    nombre: string,
    apellidoP: string,
    apellidoM: string,
    email: string
  ) {
    appDispatch(setIsLoading(true));
    window.Bridge.selectPaciente(nombre, apellidoP, apellidoM, email);
  }
  let dataPaciente: Cols[] = [];
  window.Bridge.selectP((event: any, resp: any) => {
    if (resp.length > 0) {
      const fechaReturn = obtenerFecha(resp[0].fecha_nacimiento);
      dataPaciente.push({
        col1: resp[0].nombre,
        col2: resp[0].apellido_paterno,
        col3: resp[0].apellido_materno,
        // col1: '*****',
        // col2: '******',
        // col3: '********',
        col4: fechaReturn,
        col5: resp[0].email,
      });
      appDispatch(setUsuarioPaciente(resp[0].usuario));
      appDispatch(setDatosPaciente(dataPaciente));
      dataPaciente = [];
      navigate('/verPaciente');
      appDispatch(setIsLoading(false));
    } else {
      console.log('no existe');
    }
  });
  const datarRetrieved: Cols[] = [];
  const datarRetrievedAux: Cols[] = [];

  async function loadDatos() {
    appDispatch(setIsLoading(true));
    // window.Bridge.selectPacientes();
    const pacientes = await window.electron.ipcRenderer.selectPs();
    for (let i = 0; i < pacientes.length; i += 1) {
      const fechaReturn = obtenerFecha(pacientes[i].fecha_nacimiento);
      datarRetrievedAux.push({
        col1: pacientes[i].nombre,
        col2: pacientes[i].apellido_paterno,
        col3: pacientes[i].apellido_materno,
        col4: fechaReturn,
        col5: pacientes[i].email,
      })
      datarRetrieved.push({
        col1: pacientes[i].nombre,
        col2: pacientes[i].apellido_paterno,
        col3: pacientes[i].apellido_materno,
        // col1: '*****',
        // col2: '******',
        // col3: '********',
        col4: fechaReturn,
        col5: pacientes[i].email,
      });
    }
    setData(datarRetrieved);
    setDataAux(datarRetrievedAux);
    appDispatch(setIsLoading(false));
  }
  // window.Bridge.selectPs((event: any, resp: any) => {
  //   if (resp.length > 0) {
  //     // eslint-disable-next-line no-plusplus
  //     for (let i = 0; i < resp.length; i++) {
  //       const fechaReturn = obtenerFecha(resp[i].fecha_nacimiento);
  //       datarRetrieved.push({
  //         col1: resp[i].nombre,
  //         col2: resp[i].apellido_paterno,
  //         col3: resp[i].apellido_materno,
  //         col4: fechaReturn,
  //         col5: resp[i].email,
  //       });
  //     }
  //     setData(datarRetrieved);
  //     appDispatch(setIsLoading(false));
  //   }
  // });
  useEffect(() => {
    console.log('updated');
    loadDatos();
  }, []);
  const onClickRow = (element: any) => {
    console.log(element);
    console.log(element.cells);
    console.log("Paciente email", element.cells[4].value)
    console.log("Dispo array", dataAux);
    const selected = dataAux.find((objeto: Cols) => objeto.col5 === element.cells[4].value) || dataAux[0];
    console.log("Selected", selected);

    // loadPaciente(
    //   element.cells[0].value,
    //   element.cells[1].value,
    //   element.cells[2].value,
    //   element.cells[4].value
    // );


    loadPaciente(
      selected.col1,
      selected.col2,
      selected.col3,
      selected.col5
    );
  };
  const options: TableOptions<{
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
  }> = {
    data,
    columns,
  };

  async function testing() {
    window.Bridge.testSensores();
  }
  window.Bridge.testSenso((event: any, resp: any) => {
    console.log('entered');
  });
  return (
    <Pacientes
      filterInput={filterInput}
      setFilterInput={setFilterInput}
      options={options}
      onClickRow={onClickRow}
      onClickNavigate={onClickNavigate}
      data={data}
      columns={columns}
    />
  );
};

export default PacientesContainer;

/* setData(
        (data).concat({ 
        col1: 'Isaac',
        col2: 'Rayas',
        col3: 'Chacon',
        col4: '11/05/1998',
        col5: 'isaac@gmail.com', })
      ) */
/* const data = React.useMemo(
    (): Cols[] => [
      {
        col1: 'Isaac',
        col2: 'Rayas',
        col3: 'Chacon',
        col4: '11/05/1998',
        col5: 'isaac@gmail.com',
      },
    ],
    []
  ); */
/* {
  col1: 'Carlos Said',
  col2: 'Silva',
  col3: 'Chacon',
  col4: '11/06/2001',
  col5: 'saidsilva@gmail.com',
},
{
  col1: 'Fernando',
  col2: 'Castro',
  col3: 'Galan',
  col4: '09/05/1999',
  col5: 'fercas@gmail.com',
},
{
  col1: 'Alma Karen',
  col2: 'Bañuelos',
  col3: 'Mezquitan',
  col4: '11/11/2002',
  col5: 'almakaren@gmail.com',
},
{
  col1: 'Franco',
  col2: 'Chacon',
  col3: 'Castro',
  col4: '18/12/2002',
  col5: 'franco@gmail.com',
},
{
  col1: 'Isaac',
  col2: 'Chacon',
  col3: 'Rayas',
  col4: '11/05/1998',
  col5: 'isaac@gmail.com',
},
{
  col1: 'Isaac',
  col2: 'Chacon',
  col3: 'Rayas',
  col4: '11/05/1998',
  col5: 'isaac@gmail.com',
},
{
  col1: 'Isaac',
  col2: 'Chacon',
  col3: 'Rayas',
  col4: '11/05/1998',
  col5: 'isaac@gmail.com',
},
{
  col1: 'Carlos Said',
  col2: 'Silva',
  col3: 'Chacon',
  col4: '11/06/2001',
  col5: 'saidsilva@gmail.com',
},
{
  col1: 'Fernando',
  col2: 'Castro',
  col3: 'Galan',
  col4: '09/05/1999',
  col5: 'fercas@gmail.com',
},
{
  col1: 'Alma Karen',
  col2: 'Bañuelos',
  col3: 'Mezquitan',
  col4: '11/11/2002',
  col5: 'almakaren@gmail.com',
},
{
  col1: 'Franco',
  col2: 'Chacon',
  col3: 'Castro',
  col4: '18/12/2002',
  col5: 'franco@gmail.com',
},
{
  col1: 'Isaac',
  col2: 'Chacon',
  col3: 'Rayas',
  col4: '11/05/1998',
  col5: 'isaac@gmail.com',
},
{
  col1: 'Isaac',
  col2: 'Chacon',
  col3: 'Rayas',
  col4: '11/05/1998',
  col5: 'isaac@gmail.com',
},
{
  col1: 'Isaac',
  col2: 'Chacon',
  col3: 'Rayas',
  col4: '11/05/1998',
  col5: 'isaac@gmail.com',
},
{
  col1: 'Carlos Said',
  col2: 'Silva',
  col3: 'Chacon',
  col4: '11/06/2001',
  col5: 'saidsilva@gmail.com',
},
{
  col1: 'Fernando',
  col2: 'Castro',
  col3: 'Galan',
  col4: '09/05/1999',
  col5: 'fercas@gmail.com',
},
{
  col1: 'Alma Karen',
  col2: 'Bañuelos',
  col3: 'Mezquitan',
  col4: '11/11/2002',
  col5: 'almakaren@gmail.com',
},
{
  col1: 'Franco',
  col2: 'Chacon',
  col3: 'Castro',
  col4: '18/12/2002',
  col5: 'franco@gmail.com',
},
{
  col1: 'Isaac',
  col2: 'Chacon',
  col3: 'Rayas',
  col4: '11/05/1998',
  col5: 'isaac@gmail.com',
},
{
  col1: 'Isaac',
  col2: 'Chacon',
  col3: 'Rayas',
  col4: '11/05/1998',
  col5: 'isaac@gmail.com',
}, */
