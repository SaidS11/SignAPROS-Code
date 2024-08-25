// eslint-disable-next-line import/no-named-as-default
import { useCallback, useState } from 'react';
import { type } from 'os';
import { json } from 'stream/consumers';
import { setErrorDetails, setFallosAlCargar, setIsLoading } from '../../../redux/slices/StatusSlice';
// eslint-disable-next-line import/no-named-as-default
import Login from './Login';
import Loading from '../Loading/Loading';
import ModalDatos from './ModalDatos';
import ModalForgotPass from './ModalForgotPass';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import {
  setCantidadSujetos,
  setCantidadSujetosRespaldo,
} from '../../../redux/slices/SeñalesSlice';
import { setIsLogged, setLoggedUser, setflagCreateDoctor, setFlagCredentials } from '../../../redux/slices/LoginSlice';
import { apiEndpoint } from '../Utilities/Constants';
import { useNavigate } from 'react-router-dom';


const LoginContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();
  const doctor = 'isrroman';
  const passw = 'Isrogo_2000';
  /* let doctor = '';
  let passw = ''; */
  const [open, setOpen] = useState(false);
  const [openForgotPass, setOpenForgotPass] = useState(false);
  const loading = useCustomSelector((state) => state.status.isLoading);

  const toggleModal = () => {
    setOpen(!open);
  };

  const toggleModalForgotPass = () => {
    setOpenForgotPass(!openForgotPass); 
  };

  async function loadData(doctorArg: string, passwordArg: string) {
    appDispatch(setIsLoading(true));
    window.Bridge.loggearDoctor(doctor, passw);
    // window.Bridge.loggearDoctor(doctorArg, passwordArg);

  }
  window.Bridge.loggearD((event: any, resp: any) => {
    if (resp.length > 0) {
      console.log('si es', resp[0].usuario);
      appDispatch(setIsLogged(true));
      appDispatch(setLoggedUser(resp[0].usuario));
      appDispatch(setIsLoading(false));
    } else {
      toggleModal();
      appDispatch(setIsLoading(false));

    }
  });

  const onClickLogin = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dbConnection = await connectToDB();
    if(dbConnection) {
      const form = document.querySelector('form') as HTMLFormElement | undefined;
      const dataF = Object.fromEntries(new FormData(form).entries());
      console.log('la data', dataF);
  
      const usuario = dataF.username.toString()
      const password = dataF.password.toString()
      // Get user
      loadData(usuario, password);
    }

  };

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const onClickPasswForgotten = () => {
    console.log('clickforgotten')
    appDispatch(setflagCreateDoctor(true));
    // navigate('/agregarDoctor')
  }

  const onClickCredentials = () => {
    appDispatch(setFlagCredentials(true));
    // navigate('/agregarDoctor')
  }

  const onClickPasswForgottenNew = () => {
    console.log('clickforgottennew');
    setOpenForgotPass(true);
    //appDispatch(setflagCreateDoctor(true));
    // navigate('/agregarDoctor')
  }

  const connectToDB = async() => {
    const connection = await fetch(`${apiEndpoint}/connectDB`, {
        headers: {'Content-Type': 'application/json'}
      });

      const response = await connection.json()

      console.log("This is obj", response);

      if (connection.status === 200){
      
        console.log("CONNECTED");
        return true;

      }else{
        appDispatch(setFallosAlCargar(true));
        // appDispatch(setErrorDetails("Problem while connectiong to DB, please check if everything is correct"));
        appDispatch(setErrorDetails(response.error));



        return false;
      }
  }



  return (
    <div>
      <Login onClickPasswForgottenNew={onClickPasswForgottenNew} onClickPasswForgotten={onClickPasswForgotten} onClickLogin={onClickLogin} passwordShown={passwordShown} togglePassword={togglePassword} setPasswordShown={setPasswordShown} onClickCredentials={onClickCredentials} />
      {open && <ModalDatos toggleModal={toggleModal} open={open} />}
      {openForgotPass && <ModalForgotPass toggleModal={toggleModalForgotPass} open={openForgotPass} />}
      {loading && <Loading />}
    </div>
  );
};

export default LoginContainer;




export function obtenerPosicionesEnRango(arreglo: Array<string>, tiempoInicio: string, tiempoFin: string) {
  const inicio = convertirATiempoEnSegundos(tiempoInicio);
  const fin = convertirATiempoEnSegundos(tiempoFin);

  return arreglo.reduce((posicionesEnRango: any, tiempo: any, index: any) => {
    const tiempoEnSegundos = convertirATiempoEnSegundos(tiempo);

    if (tiempoEnSegundos >= inicio && tiempoEnSegundos <= fin) {
      posicionesEnRango.push(index);
    }

    return posicionesEnRango;
  }, []);
}

function convertirATiempoEnSegundos(tiempo: any) {
  const [horas, minutos, segundos] = tiempo.split(':').map(Number);
  return horas * 3600 + minutos * 60 + segundos;
}

export function equivalenteSegunPosiciones(arregloX: Array<number>, arregloY: Array<number>, posicionesEnRango: Array<number>) {
  const arregloXAux: Array<number> = [];
  const arregloYAux: Array<number> = [];

  const arregloRetorno: any = [];
  for (const posicion of posicionesEnRango) {
    if (posicion >= 0 && posicion < arregloX.length) {
      arregloXAux.push(arregloX[posicion]);
      arregloYAux.push(arregloY[posicion]);
    }
  }
  for (let i = 0; i < arregloXAux.length; i += 1) {
    arregloRetorno.push({
      x: arregloXAux[i],
      y: arregloYAux[i]
    })
  }
  return arregloRetorno;
}

