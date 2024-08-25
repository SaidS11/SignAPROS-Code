import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setErrorDetails, setFallosAlCargar, setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomSelector, useCustomDispatch } from '../../../redux/hooks';

import Video from './Video';
import SensoresAdquisicionContainer from '../SensoresAdquisicion/SensoresAdquisicionContainer';
import { apiEndpoint } from '../Utilities/Constants';
import { setArduinoDataAdquirida, setEmgDataAdquirida, setMongoInsertObject } from 'redux/slices/SeñalesSlice';
import { calcularTimeGsr, igualarArreglos, limpiarNulos } from '../VideoDemo/VideoDemoContainer';

interface ConfLocal {
  emgs: number;
  acelerometro: boolean
  gsr: boolean
  temperatura: boolean
  frecuencia_cardiaca: boolean
  arduinos: number;
}


function parseEMG(arreglo: Array<Object>, cantidadEmgs: number) {

  const nuevoObjeto: any = {};

  for (let i = 0; i < arreglo.length; i++) {
    const objeto: any = arreglo[i];
    
    for (const clave in objeto) {
      if (nuevoObjeto.hasOwnProperty(clave)) {
        nuevoObjeto[clave].push(objeto[clave]);
      } else {
        nuevoObjeto[clave] = [objeto[clave]];
      }
    }
  }


  for (let i = cantidadEmgs + 1; i <= 4; i++) {
    const key = `emg${i}`;
    delete nuevoObjeto[key];
  }

  return nuevoObjeto;
}

const calcularFrecuenciaMuestreo = (tiempo: number, largoDeSeñales: number) => {

  return largoDeSeñales / tiempo
}

function calcularValorCorrectoGsr(arreglo: Array<number>) {
  const nuevoArreglo = [];

  for (let i = 0; i < arreglo.length; i += 10) {
    const grupo = arreglo.slice(i, i + 10); // Obtener un grupo de 10 posiciones

    const gsrAverage  = grupo.reduce((a, b) => a + b, 0) / grupo.length; // Calcular el promedio
    const volt = (gsrAverage*5)/1023;
    const hrOhms = ((5+2*volt)*10000) / (2.5-volt);
    nuevoArreglo.push(hrOhms); // Agregar el resultado al nuevo arreglo
  }

  return nuevoArreglo;
}


function parseArduinoData(arreglo: any) {
  const objetoTransformado: any = {};

  // Iterar sobre cada elemento del arreglo
  for (let i = 0; i < arreglo.length; i++) {
    // Eliminar espacios en blanco y dividir el elemento en pares de clave y valor
    const pares = arreglo[i].trim().split(", ");

    // Iterar sobre cada par de clave y valor
    for (let j = 0; j < pares.length; j++) {
      // Separar la clave y el valor
      const [clave, valor] = pares[j].split(": ");
      // Verificar si la clave ya existe en el objeto
      if (objetoTransformado.hasOwnProperty(clave)) {
        // Si la clave existe, agregar el valor al arreglo existente
        if(valor.includes(",")) {
          const correctValue = valor.split(",")[0];
          objetoTransformado[clave].push(Number(correctValue));

        } else {

          objetoTransformado[clave].push(Number(valor));
        }
      } else {
        // Si la clave no existe, crear un nuevo arreglo con el valor
        if(valor.includes(",")) {
          const correctValue = valor.split(",")[0];
          objetoTransformado[clave] = [Number(correctValue)];
        } else {
          objetoTransformado[clave] = [Number(valor)];
        }
      }
    }
  }
  return objetoTransformado;
}

const VideoContainer = () => {
  const navigate = useNavigate();
  const [probando, setProbando] = useState(false);
  const [shouldStop, setShouldStop] = useState(false);
  const [dataIsReady, setDataIsReady] = useState(false);
  const [emgData, setEmgData] = useState({});
  const [arduinoDataArg, setArduinoDataArg] = useState({});
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCancel, setIsCancel] = useState(false);

  const appDispatch = useCustomDispatch();

  const multimediaObj = useCustomSelector(
    (state) => state.config.configMultimedia
  );


  const emgsTotal = useCustomSelector((state) => state.señales.cantidadSensores);

  const duracion = useCustomSelector(
    (state) => state.config.duracionProtocolo
  );

  const formatoRegEx = useCustomSelector(
    (state) => state.señales.regExSinAcelerometro
  );

  const gsrIsChecked = useCustomSelector(
    (state) => state.señales.gsrIsChecked
  );
  const tempIsChecked = useCustomSelector(
    (state) => state.señales.temperaturaIsChecked
  );
  const frecuenciaIsChecked = useCustomSelector(
    (state) => state.señales.frecuenciaIsChecked
  );
  const acelerometroIsChecked = useCustomSelector(
    (state) => state.señales.acelerometroIsChecked
  );
  console.log("Duracion", duracion);
  const confObj = useCustomSelector(
    (state) => state.config.configCompleta
  ) as Array<ConfLocal>;
  console.log("OBJ", confObj);
  const sensores = confObj[0].emgs;
  const cantidadEmgs = confObj[0].emgs;
  const cantidadArduinos = confObj[0].arduinos;

  const onClickNav = async () => {
    // setShouldStop(true);
    // const resp = await window.electron.ipcRenderer.sensoStop();
    // navigate('/procesamientoPrevio');
  };

  const onClickCancel = async () => {
    setIsCancel(true);
    // const stopArduinos = await fetch(`${apiEndpoint}/stopArduinos`);
    const stopNidaq = await fetch(`${apiEndpoint}/stopNidaq`);

    navigate('/videoDemo');
  };

  const onClickProbar = () => {
    if (probando === false) {
      setProbando(true);
    }
  };
  const onClickDetener = () => {
    if (probando === true) {
      setProbando(false);
    }
  };
  const video = document.getElementById('myVideo') as HTMLMediaElement | null;

  video?.addEventListener('play', (event) => {
    console.log(
      'The Boolean paused property is now false. Either the ' +
        'play() method was called or the autoplay attribute was toggled.'
    );
  });
  const urlRetrieved = `${multimediaObj[0].link_video}`;
  const url = urlRetrieved.includes('http')
    ? urlRetrieved
    : `${apiEndpoint}/${multimediaObj[0].link_video}`;

  const adquisicion = async ()=> {
    // const startArduinos = fetch(`${apiEndpoint}/multiplesArduinos`);
    // Comprobacion de emgs sino hay timer para controlar arduinos
    // No mandar decimales y redondedar hacia arriba
    // const startNidaq = await fetch(`${apiEndpoint}/nidaq?duracion=${duracion}&cantidadEmgs=${cantidadEmgs}`);
    const controller = new AbortController();
    const startNidaq = await fetch(`${apiEndpoint}/nidaqMul?duracion=${duracion}&cantidadEmgs=${cantidadEmgs}&arduinos=${cantidadArduinos}`, { signal: controller.signal });



    // const dataArduino = await startArduinos.json();
    // if(dataArduino.status === 500) {
    //   console.log("Data", dataArduino);
    //   console.log("Desconectado")
    // }

    const data = await startNidaq.json();

    if(data.message !== null) {
      console.log("READY", data.message);

      if (data.message.includes("SIGKILL")) {
        console.log("Abort")
        controller.abort("Cancelar")
      } else {
        console.log("Cantidad de arduinos", cantidadArduinos)
        if (cantidadArduinos === 0) {
          console.log("ENTER")
          stopEmg();
        } else {
          stopArduinos(data);
        }  
      }
      // if(data.message.includes("null")) {
      //   console.log("Error en nulo EMG");
      //   appDispatch(setFallosAlCargar(true));
      //   appDispatch(setErrorDetails(`Error al obtener la información, compruebe que las conexiones sean correctas`));
      //   setIsPlaying(false);
      //   navigate('/verPaciente');
      //   return;
      // }
      
      
    } else {
      // const stopArduinos = await fetch(`${apiEndpoint}/stopArduinos`);
      console.log("Cantidad de arduinos", cantidadArduinos)
      if (cantidadArduinos === 0) {
        console.log("ENTER")
        stopEmg();
      } else {
        const stopNidaq = await fetch(`${apiEndpoint}/stopNidaq`);
      }

    }
    
  }

  const stopEmg = async () => {

    let returnedEmg;

    if(cantidadEmgs > 0) {
      const objFromCsv = await fetch(`${apiEndpoint}/obtenerObjDeCsv`);

      const dataEmg = await objFromCsv.json()

      console.log("RESP", dataEmg.message);

      // setEmgData(parseEMG(test));
      returnedEmg = parseEMG(dataEmg.message, cantidadEmgs)
      console.log("EMG", returnedEmg);
    }

    const objetoUnido = {...returnedEmg}

    for (const key in objetoUnido) {
      if (objetoUnido.hasOwnProperty(key)) {
        const arr = objetoUnido[key];
        // Verificar si el valor es un arreglo
        if (Array.isArray(arr)) {
          // Reemplazar los valores null por 0 en el arreglo
          objetoUnido[key] = limpiarNulos(arr);
        }
      }
    }
    if(objetoUnido.emg1.length !== objetoUnido.emg2.length) {
      const [arreglo, arreglo2] = igualarArreglos(objetoUnido["emg1"], objetoUnido["emg2"]);
      objetoUnido.emg1 = arreglo
      objetoUnido.emg2 = arreglo2
    }
    if(objetoUnido.emg1.length !== objetoUnido.emg3.length) {
      const [arreglo, arreglo2] = igualarArreglos(objetoUnido["emg1"], objetoUnido["emg3"]);
      objetoUnido.emg1 = arreglo
      objetoUnido.emg3 = arreglo2
    }
    if(objetoUnido.emg1.length !== objetoUnido.emg4.length) {
      const [arreglo, arreglo2] = igualarArreglos(objetoUnido["emg1"], objetoUnido["emg4"]);
      objetoUnido.emg1 = arreglo
      objetoUnido.emg4 = arreglo2
    }
    if(objetoUnido.emg1.length !== objetoUnido.tiempoEmg.length) {
      const [arreglo, arreglo2] = igualarArreglos(objetoUnido["emg1"], objetoUnido["tiempoEmg"]);
      objetoUnido.emg1 = arreglo
      objetoUnido.tiempoEmg = arreglo2

      const [arregloEmg2, arregloAux] = igualarArreglos(objetoUnido["emg2"], objetoUnido["emg1"]);
      objetoUnido.emg2 = arregloEmg2

      const [arregloEmg3, arregloAux2] = igualarArreglos(objetoUnido["emg3"], objetoUnido["emg1"]);
      objetoUnido.emg3 = arregloEmg3

      const [arregloEmg4, arregloAux3] = igualarArreglos(objetoUnido["emg4"], objetoUnido["emg1"]);
      objetoUnido.emg4 = arregloEmg4

    }

    const transformedObj: any = {};
      for (const key in objetoUnido) {
        if (objetoUnido.hasOwnProperty(key)) {
          if(key.includes("tiempo")) {
            const value = objetoUnido[key]
            transformedObj[key] = value
          } else {
            const frecuenciaMuestreoInner = calcularFrecuenciaMuestreo(duracion, objetoUnido[key].length)
            const nTotalMuestrasInner = duracion * frecuenciaMuestreoInner
            const vectorTiempoInner: number[] = [];
  
            for (let i = 0; i < nTotalMuestrasInner; i++) {
              const tiempoActual = i / frecuenciaMuestreoInner;
              vectorTiempoInner.push(tiempoActual);
            }
            const newArray = objetoUnido[key].map((value: any, index: any) => ({ x: vectorTiempoInner[index], y: value }));
            transformedObj[key] = newArray;
  
  
          }
        }
      }
      const objWrapper = {
        signals: transformedObj
      }


      console.log("Wrapped", objWrapper);
      appDispatch(setMongoInsertObject(objWrapper));
      // appDispatch(setArduinoDataAdquirida(objetoArduinoMultiple));
      appDispatch(setEmgDataAdquirida(returnedEmg));
      navigate('/resultados');


  }

  const stopArduinos = async (arduinoSTOP: any) => {
    try {
      console.log("Stopping");
      // const stopArduinos = await fetch(`${apiEndpoint}/stopArduinos`);
      // const arduinoSTOP = await stopArduinos.json();

      console.log("ARDUINO STOP", arduinoSTOP.message);

      const arreglo = arduinoSTOP.message

      
      // Comprobacion de cual arduino tiene las claves que nos interesan para aplicarle los metodos correspondientes

      if (cantidadArduinos > 1) {
        console.log("Mas de 1 arduino");
        const encontrado = arreglo[0].some((elemento: string) => elemento.includes("INCLY"));

        let arregloArduinoConAcelerometro;
        let arregloArduinoSinAcelerometro;

        let timestampArduinoConAcelerometro;
        let timestampArduinoSinAcelerometro;

        if(encontrado) {
          arregloArduinoConAcelerometro = arreglo[0];
          timestampArduinoConAcelerometro = arreglo[2];
          arregloArduinoSinAcelerometro = arreglo[1];
          timestampArduinoSinAcelerometro = arreglo[3];
        } else {
          arregloArduinoConAcelerometro = arreglo[1];
          timestampArduinoSinAcelerometro = arreglo[3];
          arregloArduinoSinAcelerometro = arreglo[0];
          timestampArduinoConAcelerometro = arreglo[2];
        }

        const registrosCompletos = arregloArduinoSinAcelerometro.filter((registro: string) => {
          const formatoCompleto = formatoRegEx;
          return formatoCompleto.test(registro);
        });
    
    
        const registrosCompletos2 = arregloArduinoConAcelerometro.filter((registro: string) => {
          const formatoCompleto = /INCLX: -?\d+(?:\.\d+)?, INCLY: -?\d+(?:\.\d+)?, INCLZ: -?\d+(?:\.\d+)?/;
          return formatoCompleto.test(registro);
        });
    
        
        // Combinacion de ambos arduinos para guardar las señales posteriormente
        let objetoArduinoMultiple: any = {};
        // Objeto con los datos del primer Arduino 
        let objetoArduino1;
        // Objeto con los datos del segundo Arduino 
        let objetoArduino2;
    
        if (cantidadArduinos >= 1) {
          const arduino1Data = registrosCompletos;
          const returnObj = parseArduinoData(arduino1Data)
          if(gsrIsChecked) {
            const nuevoGsr = calcularValorCorrectoGsr(returnObj.GSR)
            returnObj.GSR = nuevoGsr
          }

          objetoArduino1 = returnObj;
          objetoArduinoMultiple = {...objetoArduinoMultiple, ...returnObj};
        }
        if (cantidadArduinos >= 2) {
          const arduino2Data = registrosCompletos2;
          const returnObj = parseArduinoData(arduino2Data)
          objetoArduino2 = returnObj;
          // Comentado por operaciones
          // objetoArduinoMultiple = {...objetoArduinoMultiple, ...returnObj};
        }
    
    
        // Limpieza de claves no permitidas
        const posiblesClaves = ['INCLX', 'INCLY', 'INCLZ', 'HRLM', 'TC', 'GSR']
      
        // Obtener las claves del objeto
        const clavesObjeto = Object.keys(objetoArduinoMultiple);
    
        // Iterar sobre las claves del objeto
        for (let clave of clavesObjeto) {
          // Verificar si la clave no está en el arreglo
          if (!posiblesClaves.includes(clave)) {
            // Eliminar la clave y su valor asociado del objeto
            delete objetoArduinoMultiple[clave];
          }
        }
    
        const clavesObjetoArduino1 = Object.keys(objetoArduino1);
    
        // Iterar sobre las claves del objeto
        for (let clave of clavesObjetoArduino1) {
          // Verificar si la clave no está en el arreglo
          if (!posiblesClaves.includes(clave)) {
            // Eliminar la clave y su valor asociado del objeto
            delete objetoArduino1[clave];
          }
        }
    
        const clavesObjetoArduino2 = Object.keys(objetoArduino2);
    
        // Iterar sobre las claves del objeto
        for (let clave of clavesObjetoArduino2) {
          // Verificar si la clave no está en el arreglo
          if (!posiblesClaves.includes(clave)) {
            // Eliminar la clave y su valor asociado del objeto
            delete objetoArduino2[clave];
          }
        }
        
        // Aplicar operaciones al acelerometro
        const diferenciaYRespectoaX = objetoArduino2.INCLY.length - objetoArduino2.INCLX.length;
        const diferenciaZRespectoaX = objetoArduino2.INCLZ.length - objetoArduino2.INCLX.length;
        let totalAEliminarAcelerometroTime;
        if (diferenciaYRespectoaX === diferenciaZRespectoaX) {
          totalAEliminarAcelerometroTime = diferenciaYRespectoaX
        }
        else {
          totalAEliminarAcelerometroTime = diferenciaYRespectoaX > diferenciaZRespectoaX ? diferenciaYRespectoaX : diferenciaZRespectoaX;
        }
        for(let i = 0; i <= diferenciaYRespectoaX; i += 1) {
          objetoArduino2.INCLY.pop()
        }
        for(let i = 0; i <= diferenciaZRespectoaX; i += 1) {
          objetoArduino2.INCLZ.pop()
        }
        for(let i = 0; i <= totalAEliminarAcelerometroTime; i += 1) {
          timestampArduinoConAcelerometro.pop()
        }

        const resultArrayX = [];
        const resultArrayY = [];
        const resultArrayZ = [];

        for (let i = 0; i < objetoArduino2.INCLX.length; i++) {
          const resultX = Math.atan(objetoArduino2.INCLX[i] / Math.sqrt((objetoArduino2.INCLY[i] * objetoArduino2.INCLY[i]) + (objetoArduino2.INCLZ[i] * objetoArduino2.INCLZ[i]))) * (180 / 3.14);
          const resultY = Math.atan(objetoArduino2.INCLY[i] / Math.sqrt((objetoArduino2.INCLX[i] * objetoArduino2.INCLX[i]) + (objetoArduino2.INCLZ[i] * objetoArduino2.INCLZ[i]))) * (180 / 3.14);
          const resultZ = Math.atan(objetoArduino2.INCLZ[i] / Math.sqrt((objetoArduino2.INCLX[i] * objetoArduino2.INCLX[i]) + (objetoArduino2.INCLY[i] * objetoArduino2.INCLY[i]))) * (180 / 3.14);

          
          resultArrayX.push(resultX);
          resultArrayY.push(resultY);
          resultArrayZ.push(resultZ);
          
        }
        objetoArduino2.INCLX = resultArrayX;
        objetoArduino2.INCLY = resultArrayY;
        objetoArduino2.INCLZ = resultArrayZ;


        objetoArduinoMultiple = {...objetoArduinoMultiple, ...objetoArduino2};
    
        console.log("OBJ", objetoArduinoMultiple);
    
        const generarCsv= await fetch(`${apiEndpoint}/generarCsv?nombre=${"arduino1Data.csv"}`, {
          method: 'POST',
          body: JSON.stringify(objetoArduino1),
          headers: {'Content-Type': 'application/json'}
        });
    
        const generarCsv2 = await fetch(`${apiEndpoint}/generarCsv?nombre=${"arduino2Data.csv"}`, {
          method: 'POST',
          body: JSON.stringify(objetoArduino2),
          headers: {'Content-Type': 'application/json'}
        });

        let returnedEmg;

        if(cantidadEmgs > 0) {
          const objFromCsv = await fetch(`${apiEndpoint}/obtenerObjDeCsv`);

          const dataEmg = await objFromCsv.json()

          console.log("RESP", dataEmg.message);

          // setEmgData(parseEMG(test));
          returnedEmg = parseEMG(dataEmg.message, cantidadEmgs)
          console.log("EMG", returnedEmg);
        }

        const objetoAdquirido = {...returnedEmg, ...objetoArduinoMultiple}

        const timeObj: any = {}
        if(gsrIsChecked) {
          timeObj.tiempoGSR =  calcularTimeGsr(timestampArduinoSinAcelerometro);
        }

        if(tempIsChecked) {
          timeObj.tiempoTC =  timestampArduinoSinAcelerometro;
        }
        if (frecuenciaIsChecked) {
          timeObj.tiempoHRLM =  timestampArduinoSinAcelerometro;
        }
        if(acelerometroIsChecked) {
          timeObj.tiempoINCLX =  timestampArduinoConAcelerometro;
          timeObj.tiempoINCLY =  timestampArduinoConAcelerometro;
          timeObj.tiempoINCLZ =  timestampArduinoConAcelerometro;
        } 

        const objetoUnido = {...objetoAdquirido, ...timeObj};

        // Clean signals and make lengths equal

      for (const key in objetoUnido) {
        if (objetoUnido.hasOwnProperty(key)) {
          const arr = objetoUnido[key];
          // Verificar si el valor es un arreglo
          if (Array.isArray(arr)) {
            // Reemplazar los valores null por 0 en el arreglo
            objetoUnido[key] = limpiarNulos(arr);
          }
        }
      }
      if(objetoUnido.emg1.length !== objetoUnido.emg2.length) {
        const [arreglo, arreglo2] = igualarArreglos(objetoUnido["emg1"], objetoUnido["emg2"]);
        objetoUnido.emg1 = arreglo
        objetoUnido.emg2 = arreglo2
      }
      if(objetoUnido.emg1.length !== objetoUnido.emg3.length) {
        const [arreglo, arreglo2] = igualarArreglos(objetoUnido["emg1"], objetoUnido["emg3"]);
        objetoUnido.emg1 = arreglo
        objetoUnido.emg3 = arreglo2
      }
      if(objetoUnido.emg1.length !== objetoUnido.emg4.length) {
        const [arreglo, arreglo2] = igualarArreglos(objetoUnido["emg1"], objetoUnido["emg4"]);
        objetoUnido.emg1 = arreglo
        objetoUnido.emg4 = arreglo2
      }
      if(objetoUnido.emg1.length !== objetoUnido.tiempoEmg.length) {
        const [arreglo, arreglo2] = igualarArreglos(objetoUnido["emg1"], objetoUnido["tiempoEmg"]);
        objetoUnido.emg1 = arreglo
        objetoUnido.tiempoEmg = arreglo2

        const [arregloEmg2, arregloAux] = igualarArreglos(objetoUnido["emg2"], objetoUnido["emg1"]);
        objetoUnido.emg2 = arregloEmg2

        const [arregloEmg3, arregloAux2] = igualarArreglos(objetoUnido["emg3"], objetoUnido["emg1"]);
        objetoUnido.emg3 = arregloEmg3

        const [arregloEmg4, arregloAux3] = igualarArreglos(objetoUnido["emg4"], objetoUnido["emg1"]);
        objetoUnido.emg4 = arregloEmg4

      }


      if(objetoUnido.GSR.length !== objetoUnido.tiempoGSR.length) {
        const [arreglo, arreglo2] = igualarArreglos(objetoUnido["GSR"], objetoUnido["tiempoGSR"]);
        objetoUnido.GSR = arreglo
        objetoUnido.tiempoGSR = arreglo2
      }

      if(objetoUnido.HRLM.length !== objetoUnido.tiempoHRLM.length) {
        const [arreglo, arreglo2] = igualarArreglos(objetoUnido["HRLM"], objetoUnido["tiempoHRLM"]);
        objetoUnido.HRLM = arreglo
        objetoUnido.tiempoHRLM = arreglo2
      }

      if(objetoUnido.INCLX.length !== objetoUnido.tiempoINCLX.length) {
        const [arregloINCLX, arregloTime] = igualarArreglos(objetoUnido["INCLX"], objetoUnido["tiempoINCLX"]);
        const [arregloINCLY, arregloTime2] = igualarArreglos(objetoUnido["INCLY"], objetoUnido["tiempoINCLX"]);
        const [arregloINCLZ, arregloTime3] = igualarArreglos(objetoUnido["INCLZ"], objetoUnido["tiempoINCLX"]);

        objetoUnido.INCLX = arregloINCLX
        objetoUnido.INCLY = arregloINCLY
        objetoUnido.INCLZ = arregloINCLZ
        objetoUnido.tiempoINCLX = arregloTime
      }

      if(objetoUnido.TC.length !== objetoUnido.tiempoTC.length) {
        const [arreglo, arreglo2] = igualarArreglos(objetoUnido["TC"], objetoUnido["tiempoTC"]);
        objetoUnido.TC = arreglo
        objetoUnido.tiempoTC = arreglo2
      }
      console.log("PREV OBJ", objetoUnido);

      


      const transformedObj: any = {};
      for (const key in objetoUnido) {
        if (objetoUnido.hasOwnProperty(key)) {
          if(key.includes("tiempo")) {
            const value = objetoUnido[key]
            transformedObj[key] = value
          } else {
            const frecuenciaMuestreoInner = calcularFrecuenciaMuestreo(duracion, objetoUnido[key].length)
            const nTotalMuestrasInner = duracion * frecuenciaMuestreoInner
            const vectorTiempoInner: number[] = [];
  
            for (let i = 0; i < nTotalMuestrasInner; i++) {
              const tiempoActual = i / frecuenciaMuestreoInner;
              vectorTiempoInner.push(tiempoActual);
            }
            const newArray = objetoUnido[key].map((value: any, index: any) => ({ x: vectorTiempoInner[index], y: value }));
            transformedObj[key] = newArray;
  
  
          }
        }
      }
      const objWrapper = {
        signals: transformedObj
      }


      console.log("Wrapped", objWrapper);
      appDispatch(setMongoInsertObject(objWrapper));
      appDispatch(setArduinoDataAdquirida(objetoArduinoMultiple));
      appDispatch(setEmgDataAdquirida(returnedEmg));
      navigate('/resultados');
        
        // navigate('/procesamientoPrevio');

      } 
      
      else if (confObj[0].acelerometro) {
        console.log("");
      }

    } 
    catch(error: any) {
      const killStatus = await fetch(`${apiEndpoint}/killStatus`);

      const currentResp = await killStatus.json();
      console.log("Response process", currentResp);
      if (currentResp.message === "Killed") {
        console.log("Was Killed");
        return;
      } else {
        console.log("Error en ardy");
        appDispatch(setFallosAlCargar(true));
        appDispatch(setErrorDetails(`Problem while getting the data, please confirm that the connections are correct: ${error}`));
        setIsPlaying(false);
        navigate('/verPaciente');
        return;
      }


    }
    
  };

  useEffect(() => {
    console.log("UPDATE")
    // const killStatus = fetch(`${apiEndpoint}/switchKilled`);

    
    adquisicion();
  
  }, [video]);
  return (
    <div>
      <Video onClickNav={onClickNav} url={url} onClickCancel={onClickCancel} isPlaying={isPlaying}/>
      {/* <SensoresAdquisicionContainer mode="LIVE" shouldStop={shouldStop} /> */}
    </div>
  );
};

export default VideoContainer;
