/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import VerInicio from './VerInicio';
import { useCustomDispatch } from 'redux/hooks';
import { setPythonResponse } from 'redux/slices/ResponsesSlice';
import { setAcelerometroIsChecked, setCantidadSensores, setFrecuenciaIsChecked, setGsrIsChecked, setMongoInsertObject, setTemperaturaIsChecked, setTotalSensores } from 'redux/slices/SeñalesSlice';
import { MongoInsertObjectInterface, PacientesAnalisisMongo, adqWithTimeAndSignals, apiEndpoint } from '../Utilities/Constants';
import { setIsLoading, setFallosAlCargar, setErrorDetails, setErrorNSplits } from 'redux/slices/StatusSlice';
// import zlib from 'zlib';
// import io from 'socket.io-client';

// const socket = io("http://localhost:4000");
// const socket2 = io("http://localhost:4000")



const InicioContainer = () =>{
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();

  function parseEMG2(arreglo: Array<Object>, cantidadEmgs: number) {

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

  const parseLocal = (arreglo: Array<Object>, cantidadEmgs: number) => {
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

  const onClickPacientes = async () => {
    navigate('/buscarPaciente');

    // const document = {
    //   name: `Martha Garcia Lopez`,
    //   protocol: "Completo",
    //   etiqueta: "sano"
    // };
    // const jsonDocument = JSON.stringify(document);
    // const pacientes = (await window.electron.ipcRenderer.buscarElementoM(
    //   jsonDocument
    // )) as Array<PacientesAnalisisMongo>;

    // const objFromCsv = await fetch(`${apiEndpoint}/obtenerObjDeCsv`);

    // const dataEmg = await objFromCsv.json()

    
    // const returnedEmg = parseLocal(dataEmg.message, 4)
    // console.log("DATAEMG", returnedEmg);
    // console.log("Pacientes Prev", pacientes);

    // pacientes[0].signals.emg1 = returnedEmg.emg1
    // pacientes[0].signals.emg2 = returnedEmg.emg2
    // pacientes[0].signals.emg3 = returnedEmg.emg3
    // pacientes[0].signals.emg4 = returnedEmg.emg4
    // pacientes[0].signals.tiempoEmg = returnedEmg.tiempoEmg
    // pacientes[0].name = "PRUEBA"



    // console.log("Pacientes", pacientes[0]);

    // const jsonDocumentRest = JSON.stringify(pacientes[0]);

    // window.electron.ipcRenderer.insertarElementoMongo(jsonDocumentRest);

    // const datosComprimidos = zlib.deflateSync(pacientes);

    // const firstObj = {
    //   name: pacientes[0].name,
    //   etiqueta: pacientes[0].etiqueta,
    //   protocol: pacientes[0].protocol,
    // }

    // const jsonDocumentParte1 = JSON.stringify(firstObj);

    // window.electron.ipcRenderer.insertarElementoMongoParte1(jsonDocumentParte1);


    // const testOBJEmg = {
    //   emg1: pacientes[0].signals.emg1,
    //   emg2: pacientes[0].signals.emg2,
    //   emg3: pacientes[0].signals.emg3,
    //   emg4: pacientes[0].signals.emg4,
    //   tiempoEmg: pacientes[0].signals.tiempoEmg,


    // }

    // const jsonDocumentParte2 = JSON.stringify(testOBJEmg);



    // window.electron.ipcRenderer.insertarElementoMongoParte2(jsonDocumentParte2);


    // const testOBJResto = {
    //   GSR: pacientes[0].signals.GSR,
    //   HRLM: pacientes[0].signals.HRLM,
    //   INCLX: pacientes[0].signals.INCLX,
    //   INCLY: pacientes[0].signals.INCLY,
    //   INCLZ: pacientes[0].signals.INCLZ,
    //   TC: pacientes[0].signals.TC,
    //   tiempoGSR: pacientes[0].signals.tiempoGSR,
    //   tiempoHRLM: pacientes[0].signals.tiempoHRLM,
    //   tiempoINCLX: pacientes[0].signals.tiempoINCLX,
    //   tiempoINCLY: pacientes[0].signals.tiempoINCLY,
    //   tiempoINCLZ: pacientes[0].signals.tiempoINCLZ,
    //   tiempoTC: pacientes[0].signals.tiempoTC,

    // }
    // const jsonDocumentRest = JSON.stringify(testOBJResto);

    // window.electron.ipcRenderer.insertarElementoMongo(jsonDocumentRest);



    // const insertOBJ = await fetch(`${apiEndpoint}/insertarElementoMongo`, {
    //   method: 'POST',
    //   body: JSON.stringify(pacientes),
    //   headers: { 'Content-Type': 'application/json' },
    // });



    // let output = '';
    // for (let i = 0; i < jsonDocument2.length; i++) {
    //   output += jsonDocument2[i].charCodeAt(0).toString(2) + " ";
    // }
    // console.log(output);

    // window.electron.ipcRenderer.insertarElementoMongo(output.trimEnd());

    
    
    
    // appDispatch(setGsrIsChecked(true));
    // appDispatch(setTemperaturaIsChecked(true));
    // appDispatch(setFrecuenciaIsChecked(true));
    // appDispatch(setAcelerometroIsChecked(true));
    // appDispatch(setCantidadSensores(4));

    // appDispatch(setPythonResponse('Tree|0.500|0.500|0.500|0.50|0.00|{"colMediaABSEMG1":{"0":107.98,"1":497.81,"2":146.58,"3":411.87,"4":122.65,"5":514.34,"6":113.73,"7":538.6},"colMedianaEMG1":{"0":106.0,"1":499.0,"2":147.0,"3":410.0,"4":120.5,"5":513.0,"6":113.5,"7":537.0},"colRMSEMG1":{"0":110.34,"1":498.09,"2":147.43,"3":412.14,"4":125.55,"5":514.95,"6":115.85,"7":538.74},"colMediaABSEMG2":{"0":109.49,"1":582.72,"2":104.8,"3":536.02,"4":135.59,"5":581.19,"6":157.56,"7":586.9},"colMedianaEMG2":{"0":108,"1":584,"2":100,"3":536,"4":134,"5":580,"6":157,"7":588},"colRMSEMG2":{"0":111.44,"1":583.45,"2":108.16,"3":536.37,"4":136.71,"5":581.33,"6":158.09,"7":587.07},"colMediaABSEMG3":{"0":183.13,"1":651.27,"2":209.6,"3":855.18,"4":139.07,"5":623.42,"6":144.64,"7":488.48},"colMedianaEMG3":{"0":184.0,"1":652.0,"2":210.5,"3":855.0,"4":141.0,"5":626.0,"6":144.0,"7":488.0},"colRMSEMG3":{"0":184.82,"1":651.45,"2":210.1,"3":855.38,"4":139.94,"5":623.56,"6":145.28,"7":488.75},"colMediaABSEMG4":{"0":127.56,"1":560.81,"2":216.34,"3":637.0,"4":89.32,"5":440.69,"6":222.78,"7":530.5},"colMedianaEMG4":{"0":126.5,"1":560.0,"2":216.0,"3":637.0,"4":91.0,"5":441.0,"6":221.5,"7":529.5},"colRMSEMG4":{"0":127.98,"1":561.1,"2":217.08,"3":637.24,"4":90.02,"5":440.95,"6":223.35,"7":530.69},"colMediaABSGsr":{"0":10.0,"1":15.0,"2":10.0,"3":12.5,"4":10.0,"5":15.0,"6":10.0,"7":15.0},"colMedianaGsr":{"0":10.0,"1":15.0,"2":10.0,"3":12.5,"4":10.0,"5":15.0,"6":10.0,"7":15.0},"colRMSGsr":{"0":10.03,"1":15.02,"2":10.03,"3":12.51,"4":10.03,"5":15.02,"6":10.03,"7":15.02},"colMediaABSAcelerometroX":{"0":40.0,"1":63.0,"2":40.0,"3":51.5,"4":40.0,"5":63.0,"6":40.0,"7":63.0},"colMedianaAcelerometroX":{"0":40.0,"1":63.0,"2":40.0,"3":51.5,"4":40.0,"5":63.0,"6":40.0,"7":63.0},"colRMSAcelerometroX":{"0":40.12,"1":63.08,"2":40.12,"3":51.62,"4":40.12,"5":63.08,"6":40.12,"7":63.08},"colMediaABSAcelerometroY":{"0":40.0,"1":63.0,"2":40.0,"3":51.5,"4":40.0,"5":63.0,"6":40.0,"7":63.0},"colMedianaAcelerometroY":{"0":40.0,"1":63.0,"2":40.0,"3":51.5,"4":40.0,"5":63.0,"6":40.0,"7":63.0},"colRMSAcelerometroY":{"0":40.12,"1":63.08,"2":40.12,"3":51.62,"4":40.12,"5":63.08,"6":40.12,"7":63.08},"colMediaABSAcelerometroZ":{"0":40.0,"1":63.0,"2":40.0,"3":51.5,"4":40.0,"5":63.0,"6":40.0,"7":63.0},"colMedianaAcelerometroZ":{"0":40.0,"1":63.0,"2":40.0,"3":51.5,"4":40.0,"5":63.0,"6":40.0,"7":63.0},"colRMSAcelerometroZ":{"0":40.12,"1":63.08,"2":40.12,"3":51.62,"4":40.12,"5":63.08,"6":40.12,"7":63.08},"colMediaABSFrecuencia":{"0":92,"1":142,"2":92,"3":117,"4":92,"5":142,"6":92,"7":142},"colMedianaFrecuencia":{"0":92,"1":142,"2":92,"3":117,"4":92,"5":142,"6":92,"7":142},"colRMSFrecuencia":{"0":92.28,"1":142.18,"2":92.28,"3":117.22,"4":92.28,"5":142.18,"6":92.28,"7":142.18},"colMediaABSTemperatura":{"0":92,"1":142,"2":92,"3":117,"4":92,"5":142,"6":92,"7":142},"colMedianaTemperatura":{"0":92,"1":142,"2":92,"3":117,"4":92,"5":142,"6":92,"7":142},"colRMSTemperatura":{"0":92.28,"1":142.18,"2":92.28,"3":117.22,"4":92.28,"5":142.18,"6":92.28,"7":142.18},"etiqueta":{"0":"Diabetico","1":"Diabetico","2":"Diabetico","3":"Diabetico","4":"Diabetico","5":"Diabetico","6":"Diabetico","7":"Sano"},"nombre":{"0":"Martha Garcia Lopez","1":"Martha Garcia Lopez","2":"Isaac Rayas Chacon","3":"Isaac Rayas Chacon","4":"Probando pr pr","5":"Probando pr pr","6":"Sujeto Prueba 1","7":"Sujeto Prueba 1"}}|true'));
    // navigate('/resultadoEntrenar');
  };
  const onClickProtocolo = () => {
    // appDispatch(setGsrIsChecked(true));
    // appDispatch(setTemperaturaIsChecked(true));
    // appDispatch(setFrecuenciaIsChecked(true));
    // appDispatch(setAcelerometroIsChecked(true));
    // appDispatch(setCantidadSensores(4));
    // appDispatch(setTotalSensores(10));

    // appDispatch(setMongoInsertObject(adqWithTimeAndSignals));
    
    // navigate('/resultados');

    navigate('/verProtocolo');
    
    // socket.emit('end');
    // socket.on('last', (message: any)=>{
    //   console.log('last')
    //   console.log(message)
    // })

    // socket2.emit('end2');
    // socket2.on('last2', (message)=>{
    //   console.log('last2')
    //   console.log(message)
    // })

  };

  const handleRedirect = (e: any) => {
    e.preventDefault()
    // require('electron').shell.openExternal("https://github.com/franco-e-s-c/GoGamblerGo-System/blob/main/GoGamblerGo.zip")
  }

  const onClickAnalisis = async () => {
    navigate('/prediccion');

    // const objFromCsv = await fetch(`${apiEndpoint}/obtenerTxt`);

    // const dataEmg = await objFromCsv.json()

    // const dataMessage = dataEmg.message

    // const parsedMessage = JSON.parse(dataMessage)

    // console.log("Recibido", parsedMessage);

    // const tiempo = 213


    // // const frecuenciaMuestreo = calcularFrecuenciaMuestreo(tiempo, parsedMessage.GSR.length)

    // // console.log("Frecuencia muestreo", frecuenciaMuestreo);

    // // const nTotalMuestras = tiempo * frecuenciaMuestreo

    // // console.log("N total", nTotalMuestras);


    // // const vectorTiempo2: number[] = [];
    // // for (let i = 0; i < nTotalMuestras; i++) {
    // //   const tiempoActual = i / frecuenciaMuestreo;
    // //   vectorTiempo2.push(tiempoActual);
    // // }

    // // console.log("Vector 2", vectorTiempo2);

    // const parsedOnlySignalsMessage = {...parsedMessage.signals}

    // console.log("SOLO Signals", parsedOnlySignalsMessage)

    // const transformedObj: any = {};
    // for (const key in parsedOnlySignalsMessage) {
    //   if (parsedOnlySignalsMessage.hasOwnProperty(key)) {
    //     if(key.includes("tiempo")) {
    //       const value = parsedOnlySignalsMessage[key]
    //       transformedObj[key] = value
    //     } else {
    //       const frecuenciaMuestreoInner = calcularFrecuenciaMuestreo(tiempo, parsedOnlySignalsMessage[key].length)
    //       const nTotalMuestrasInner = tiempo * frecuenciaMuestreoInner
    //       const vectorTiempoInner: number[] = [];

    //       for (let i = 0; i < nTotalMuestrasInner; i++) {
    //         const tiempoActual = i / frecuenciaMuestreoInner;
    //         vectorTiempoInner.push(tiempoActual);
    //       }
          
    //       // Para señales sin x, y ya transformado
    //       // const newArray = parsedOnlySignalsMessage[key].map((value: any, index: any) => ({ x: vectorTiempoInner[index], y: value }));
    //       // transformedObj[key] = newArray;


    //       const newArray =  parsedOnlySignalsMessage[key].map((objeto: any, indice: any) => {
    //         // Verifica si hay un nuevo valor para 'x' en el segundo arreglo
    //         if (vectorTiempoInner[indice] !== undefined) {
    //           objeto.x = vectorTiempoInner[indice];
    //         }
    //         return objeto;
    //       });

    //       transformedObj[key] = newArray;


    //     }
    //   }
    // }

    // console.log("TRANSFORMED", transformedObj);

    // transformedObj["GSR"] = transformedObj["cd "];
    // delete transformedObj["cd "];


    // const objWrapper = {
    //   signals: transformedObj
    // }

    // appDispatch(setGsrIsChecked(true));
    // appDispatch(setTemperaturaIsChecked(true));
    // appDispatch(setFrecuenciaIsChecked(true));
    // appDispatch(setAcelerometroIsChecked(true));
    // appDispatch(setCantidadSensores(4));
    // appDispatch(setTotalSensores(10));

    // appDispatch(setMongoInsertObject(objWrapper));
    
    // navigate('/resultados');



    // socket.emit('message', 'socket1')
    // socket.on('message', (message: any)=>{
    //     console.log(message)
    //     socket.emit('message', 'socket1')
    // })

    

    // socket2.emit('message2', 'socket2')
    // // When the server pongs we receive the message and get in a kind of
    // // 'while' that keep sending and receiving information
    // socket2.on('message2', (message)=>{
    //     console.log(message)
    //     socket2.emit('message2', 'socket2')
    // })
    

    // navigate('/preAnalisis');

    
  };

  const calcularFrecuenciaMuestreo = (tiempo: number, largoDeSeñales: number) => {

    return largoDeSeñales / tiempo
  }

  // console.log("TIME", `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);

  return (
    <div>
      <VerInicio onClickPacientes={onClickPacientes} onClickProtocolo={onClickProtocolo} onClickAnalisis={onClickAnalisis} handleRedirect={handleRedirect}/>
    </div>
  );
};

export default InicioContainer;