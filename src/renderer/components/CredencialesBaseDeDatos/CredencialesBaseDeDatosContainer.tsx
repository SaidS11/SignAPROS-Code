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
import CredencialesBaseDeDatos from './CredencialesBaseDeDatos';
import { apiEndpoint } from '../Utilities/Constants';
import { useState } from 'react';
import { setFlagCredentials, setflagCreateDoctor } from 'redux/slices/LoginSlice';

const CredencialesBaseDeDatosContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();

  async function insertData(data: any) {
    const credObj = {
      user: data.user,
      host: data.host,
      database: data.database,
      password: data.password,
      port: data.port,

    };
    console.log(credObj)

    const writeCreds = await fetch(
      `${apiEndpoint}/writeCredentials`,
      {
        method: 'POST',
        body: JSON.stringify(credObj),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (writeCreds.status === 500) {
      // alert("Error al copiar los archivos: " + response.statusText);
      // console.log('error')
      appDispatch(setFallosAlCargar(true));
      appDispatch(
        setErrorDetails(
          `Problem detected while writting your credentials`
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
    const dbData = formData as object;
    console.log("DATA", dbData);

    let status = await insertData(dbData);
    if(status === 500){
      appDispatch(setIsLoading(false));
    }else{
      appDispatch(setIsLoading(false));
      appDispatch(setflagCreateDoctor(false));

    }

    // navigate('/login');
  };

  const onClickBack = () => {
    console.log('clickBack')
    appDispatch(setFlagCredentials(false));
    // navigate('/agregarDoctor')
  }
  return (
    <div>
      <CredencialesBaseDeDatos onClickNav={onClickNav} onClickBack={onClickBack}/>
    </div>
  );
};

export default CredencialesBaseDeDatosContainer;
