import { useNavigate } from 'react-router-dom';
import {
  setErrorDetails,
  setFailUpload,
  setFallosAlCargar,
  setIsLoading,
  setIsUploaded,
} from '../../../redux/slices/StatusSlice';
import { useCustomDispatch } from '../../../redux/hooks';
import {
  setUsuarioPaciente,
  setDatosPaciente,
} from '../../../redux/slices/PacienteSlice';
import AgregarPaciente from './AgregarPaciente';
import { apiEndpoint } from '../Utilities/Constants';
import { useState } from 'react';

interface Cols {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
}

interface PacienteInterface {
  email: string;
  telefono: string;
  fechaNacimiento: Date;
  nombrePaciente: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  sexo: string;
  peso: number;
  estatura: number;
}

const AgregarPacienteContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();

  let dataPaciente: Cols[] = [];
  async function insertData(data: any) {
    const user =
      data.nombrePaciente +
      data.apellidoPaterno.slice(0, 2).toString() +
      data.apellidoMaterno.slice(0, 2).toString() +
      data.fechaNacimiento.slice(0, 4).toString();
    dataPaciente.push({
      col1: data.nombrePaciente,
      col2: data.apellidoPaterno,
      col3: data.apellidoMaterno,
      col4: data.fechaNacimiento,
      col5: data.email,
    });
    appDispatch(setUsuarioPaciente(user.toLowerCase()));
    appDispatch(setDatosPaciente(dataPaciente));
    dataPaciente = [];
    // window.Bridge.insertPaciente(
    //   user.toLowerCase(),
    //   data.email,
    //   data.telefono,
    //   data.fechaNacimiento,
    //   data.nombrePaciente,
    //   data.apellidoPaterno,
    //   data.apellidoMaterno
    // );
    const pacienteObj = {
      usuario: user.toLowerCase(),
      email: data.email,
      telefono: data.telefono,
      fechaNacimiento: data.fechaNacimiento,
      nombre: data.nombrePaciente,
      apellidoP: data.apellidoPaterno,
      apellidoM: data.apellidoMaterno,
      sexo: data.sexo,
      peso: data.peso,
      estatura: data.estatura,
    };
    const insertImplementacion = await fetch(
      `${apiEndpoint}/insertarPaciente`,
      {
        method: 'POST',
        body: JSON.stringify(pacienteObj),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (insertImplementacion.status === 500) {
      // alert("Error al copiar los archivos: " + response.statusText);
      appDispatch(setFallosAlCargar(true));
      appDispatch(
        setErrorDetails(
          `Error while adding the patient
          
          : ${insertImplementacion.statusText}`
        )
      );
      return;
    }
    appDispatch(setIsUploaded(true));
  }
  // window.Bridge.insertP((event: any, resp: any) => {
  //   if (resp[0] === 0) {
  //     console.log('Despacho error', resp[1]);
  //     appDispatch(setFailUpload(true));
  //     appDispatch(setIsLoading(false));
  //     appDispatch(setErrorDetails(resp[1]));
  //   } else {
  //     console.log('Correcto');
  //     appDispatch(setIsLoading(false));
  //     appDispatch(setIsUploaded(true));
  //     navigate('/verPaciente');
  //   }
  // });
  const onClickNav = async (e: React.FormEvent<HTMLFormElement>) => {
    appDispatch(setIsLoading(true));
    e.preventDefault();
    /* navigate('/escogerConfiguracion'); */
    const form = document.querySelector('form') as HTMLFormElement | undefined;
    // console.log('el form', form);
    const formData = Object.fromEntries(new FormData(form).entries());
    const dataPaciente = formData as object;
    console.log("DATA", dataPaciente);

    await insertData(dataPaciente);
    appDispatch(setIsLoading(false));
    navigate('/verPaciente');
  };
  return (
    <div>
      <AgregarPaciente onClickNav={onClickNav} />
    </div>
  );
};

export default AgregarPacienteContainer;
