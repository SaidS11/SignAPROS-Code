import { useEffect, useState } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { setRealTimeSignal } from '../../../redux/slices/SeñalesSlice';
import SensoresAdquisicion from './SensoresAdquisicion';

interface SensoresAdquisicionInterface {
  dataToGraph: string
  shouldStop: boolean
  cantidadAGraficarTiempoReal: number;
}

const SensoresAdquisicionContainer = (props: SensoresAdquisicionInterface) => {
  const { dataToGraph, shouldStop, cantidadAGraficarTiempoReal } = props;

  const [isReady, setIsReady] = useState(false);
  
  console.log("DATA", dataToGraph);


  const count = 30;
  const startingNumbers = Array(count)
    .fill(1)
    .map((_, i) => i);
  const [data, setData] = useState({
    x: startingNumbers,
    y: startingNumbers,
  });



  const [dataXGsr, setDataXGsr] = useState<any>([...startingNumbers]);
  const [dataYGsr, setDataYGsr] = useState<any>([]);

  const [dataXFrecuencia, setDataXFrecuencia] = useState<any>([...startingNumbers]);
  const [dataYFrecuencia, setDataYFrecuencia] = useState<any>([]);

  const [dataXTemperatura, setDataXTemperatura] = useState<any>([...startingNumbers]);
  const [dataYTemperatura, setDataYTemperatura] = useState<any>([]);

  const [dataXInlcX, setDataXInlcX] = useState<any>([...startingNumbers]);
  const [dataYInlcX, setDataYInlcX] = useState<any>([]);

  const [dataXInlcY, setDataXInlcY] = useState<any>([...startingNumbers]);
  const [dataYInlcY, setDataYInlcY] = useState<any>([]);

  const [dataXInlcZ, setDataXInlcZ] = useState<any>([...startingNumbers]);
  const [dataYInlcZ, setDataYInlcZ] = useState<any>([]);


  // const [dataXEmg1, setDataXEmg1] = useState<any>([...startingNumbers]);
  // const [dataYEmg1, setDataYEmg1] = useState<any>([]);

  // const [dataXEmg2, setDataXEmg2] = useState<any>([...startingNumbers]);
  // const [dataYEmg2, setDataYEmg2] = useState<any>([]);

  // const [dataXEmg3, setDataXEmg3] = useState<any>([...startingNumbers]);
  // const [dataYEmg3, setDataYEmg3] = useState<any>([]);

  // const [dataXEmg4, setDataXEmg4] = useState([...startingNumbers]);
  // const [dataYEmg4, setDataYEmg4] = useState<any>([]);

  const appDispatch = useCustomDispatch();

  const gsrIschecked = useCustomSelector((state) => state.señales.gsrIsChecked);
  const tempIschecked = useCustomSelector((state) => state.señales.temperaturaIsChecked);
  const frecuenciaIschecked = useCustomSelector((state) => state.señales.frecuenciaIsChecked);
  const acelerometroIschecked = useCustomSelector((state) => state.señales.acelerometroIsChecked);


  // const gsrIschecked = true
  // const tempIschecked = true
  // const frecuenciaIschecked = true
  // const acelerometroIschecked = true



  const gsrData: Array<string> = [];
  const tempData: Array<string> = [];
  const frecData: Array<string> = [];

  const inclXData: Array<string> = [];
  const inclYData: Array<string> = [];
  const inclZData: Array<string> = [];


  if (shouldStop) {
    detenerIntervalo();
    setIsReady(false);

  }

  async function loadSensores() {
    setIsReady(true);
    console.log("DATA", dataToGraph);
    const dataLocal = dataToGraph;
    const separado = dataLocal.split(',');
    const regexNumero = /(\d+)/;
    if (separado.length >= cantidadAGraficarTiempoReal) {
      for(let i =  0; i < separado.length; i +=1) {
        // Obtenemos el valor numerico separando la entreda recibida
        const valorSeparado = separado[i].match(regexNumero) || ["NULL:", "0"];
        const valorNumerico = valorSeparado[1];

        if(separado[i].includes("GSR")) {
          gsrData.push(valorNumerico);
        } else if(separado[i].includes("TC")) {
          tempData.push(valorNumerico);
        } else if(separado[i].includes("HRLM")) {
          frecData.push(valorNumerico);
        } else if(separado[i].includes("INCLX")) {
          inclXData.push(valorNumerico);
        } else if(separado[i].includes("INCLY")) {
          inclYData.push(valorNumerico);
        } else if(separado[i].includes("INCLX")) {
          inclZData.push(valorNumerico);
        }

      }

      //Original
      // testData.push(separado[0]);
      // testData2.push(separado[1]);
      // testData3.push(separado[2]);
    }
   
  }


  function intervalFunction() {
    const objectToStore = {};
    if (gsrIschecked) {
      setDataYGsr(gsrData.slice(-dataXGsr.length));
    }
    if (tempIschecked) {
      setDataYTemperatura(tempData.slice(-dataXTemperatura.length));
    }
    if (frecuenciaIschecked) {
      setDataYFrecuencia(frecData.slice(-dataXFrecuencia.length));
    }
    if (acelerometroIschecked) {

      setDataYInlcX(inclXData.slice(-dataXInlcX.length));
      setDataYInlcY(inclYData.slice(-dataXInlcY.length));
      setDataYInlcZ(inclZData.slice(-dataXInlcZ.length));

    }
    appDispatch(setRealTimeSignal(objectToStore));
    // }
  }
  const auxFunc = (intervalToClean: any) => {
    clearInterval(intervalToClean);
  };

  const cleanUpTimed = (intervalToClean: any) => {
    setTimeout(() => auxFunc(intervalToClean), 5000);
  };

  let timeoutID: string | number | NodeJS.Timeout | undefined;
  function iniciarIntervalo() {
    timeoutID = setTimeout(function () {
      loadSensores()
      intervalFunction();
      iniciarIntervalo(); // Vuelve a iniciar el intervalo
    }, 100); // Elige el tiempo deseado (en milisegundos) para el intervalo
  }
  function detenerIntervalo() {
    clearTimeout(timeoutID);
  }

  useEffect(() => {
    let intervalID;
    if (isReady) {
      // intervalID = setInterval(intervalFunction, 100);
      iniciarIntervalo();
    } else {
      detenerIntervalo();
      // clearInterval(intervalID);
    }
  }, [isReady]);


  return (
    <div>
      {cantidadAGraficarTiempoReal != 0 &&
      <SensoresAdquisicion
        sensoresSelected={cantidadAGraficarTiempoReal}
        data={data}
        dataXGsr={dataXGsr}
        dataYGsr={dataYGsr}

        dataXFrecuencia={dataXFrecuencia}
        dataYFrecuencia={dataYFrecuencia}

        dataXTemperatura={dataXTemperatura}
        dataYTemperatura={dataYTemperatura}

        dataXInlcX={dataXInlcX}
        dataYInlcX={dataYInlcX}

        dataXInlcY={dataXInlcY}
        dataYInlcY={dataYInlcY}

        dataXInlcZ={dataXInlcZ}
        dataYInlcZ={dataYInlcZ}

        gsrIschecked={gsrIschecked}
        tempIschecked={tempIschecked}
        frecuenciaIschecked={frecuenciaIschecked}
        acelerometroIschecked={acelerometroIschecked}
        />
      
      }

      {cantidadAGraficarTiempoReal === 0 &&
      <h1>No hay sensores para graficar en tiempo real</h1>
      
      }
    </div>
  );
};

export default SensoresAdquisicionContainer;


{/* <SensoresAdquisicion
        data={data}
        dataXEmg1={dataXEmg1}
        dataYEmg1={dataYEmg1}
        dataXEmg2={dataXEmg2}
        dataYEmg2={dataYEmg2}
        dataXEmg3={dataXEmg3}
        dataYEmg3={dataYEmg3}
        dataXEmg4={dataXEmg4}
        dataYEmg4={dataYEmg4}
        dataXGsr={dataXGsr}
        dataYGsr={dataYGsr}
        dataXFrecuencia={dataXFrecuencia}
        dataYFrecuencia={dataYFrecuencia}
        dataXAcelerometro={dataXAcelerometro}
        dataYAcelerometro={dataYAcelerometro}
      /> */}