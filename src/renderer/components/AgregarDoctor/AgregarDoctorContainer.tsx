import { useNavigate } from 'react-router-dom';
import {
  setErrorDetails,
  setFailUpload,
  setFallosAlCargar,
  setIsLoading,
  setIsUploaded,
} from '../../../redux/slices/StatusSlice';
import { useCustomDispatch } from '../../../redux/hooks';
/*import {
  setUsuarioPaciente,
  setDatosPaciente,
} from '../../../redux/slices/PacienteSlice';*/
import AgregarDoctor from './AgregarDoctor';
import { apiEndpoint } from '../Utilities/Constants';
import { useState } from 'react';
import { setflagCreateDoctor } from 'redux/slices/LoginSlice';

const AgregarDoctorContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();

  async function insertData(data: any) {
    const user =
      data.nombreDoctor.slice(0, 2).toString() +
      data.apellidoPaterno.slice(0, 2).toString() +
      data.apellidoMaterno.slice(0, 2).toString();

    //appDispatch(setUsuarioPaciente(user.toLowerCase()));
    // appDispatch(setDatosPaciente(dataPaciente));
    // dataPaciente = [];
    // window.Bridge.insertPaciente(
    //   user.toLowerCase(),
    //   data.email,
    //   data.telefono,
    //   data.fechaNacimiento,
    //   data.nombrePaciente,
    //   data.apellidoPaterno,
    //   data.apellidoMaterno
    // );
    const doctorObj = {
      usuario: user,
      password: data.password,
      email: data.email,
      telefono: data.telefono,
      fecha_nacimiento: data.fecha_nacimiento,
      nombre: data.nombreDoctor,
      apellidoP: data.apellidoPaterno,
      apellidoM: data.apellidoMaterno,

    };
    console.log(doctorObj)

    const insertImplementacion = await fetch(
      `${apiEndpoint}/insertarDoctor`,
      {
        method: 'POST',
        body: JSON.stringify(doctorObj),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (insertImplementacion.status === 500) {
      // alert("Error al copiar los archivos: " + response.statusText);
      // console.log('error')
      appDispatch(setFallosAlCargar(true));
      appDispatch(
        setErrorDetails(
          `Verify that the data is correct`
        )

      );
      return 500;
    }

    appDispatch(setIsUploaded(true));
    return 200
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
    const dataDoctor = formData as object;
    console.log("DATA", dataDoctor);

    let status = await insertData(dataDoctor);
    if(status === 500){
      appDispatch(setIsLoading(false));
    }else{
      appDispatch(setIsLoading(false));
      appDispatch(setflagCreateDoctor(false));
    }

    //navigate('/login');
  };

  const onClickBack = () => {
    console.log('clickBack')
    appDispatch(setflagCreateDoctor(false));
    // navigate('/agregarDoctor')
  }
  return (
    <div>
      <AgregarDoctor onClickNav={onClickNav} onClickBack={onClickBack}/>
    </div>
  );
};

export default AgregarDoctorContainer;
