import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableOptions, Column } from 'react-table';
import { useCustomSelector, useCustomDispatch } from '../../../redux/hooks';
import { setErrorDetails, setFallosAlCargar, setIsLoading } from '../../../redux/slices/StatusSlice';
import { mkConfig, generateCsv, download } from "export-to-csv";
import VerPaciente from './VerPaciente';
import { PacientesAnalisisMongo } from '../Utilities/Constants';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import { setMongoInsertObject, setArduinoDataAdquirida, setEmgDataAdquirida, setViewObject, setAcelerometroIsChecked, setCantidadSensores, setFrecuenciaIsChecked, setGsrIsChecked, setTemperaturaIsChecked, setTotalSensores } from 'redux/slices/SeñalesSlice';

// import { useNavigate } from "react-router-dom";
interface Cols {
  col1: string;
}

const VerPacienteContainer = () => {
  const usuario = useCustomSelector((state) => state.datos.usuarioPaciente);
  const datosArray = useCustomSelector((state) => state.datos.datosPaciente);
  const appDispatch = useCustomDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<Cols[]>([]);
  const [nombreSujeto, setNombreSujeto] = useState("");
  const [dataRetrieved, setDataRetrieved] = useState<Array<PacientesAnalisisMongo>>([]);
  const csvConfig = mkConfig({ useKeysAsHeaders: true });

  const datarRetrieved: Cols[] = [];
  async function loadPacientes() {
    appDispatch(setIsLoading(true));
    const document = {
      name: `${datosArray[0].col1} ${datosArray[0].col2} ${datosArray[0].col3}`,
      // name: "Sebastian Perez",

    };
    const jsonDocument = JSON.stringify(document);
    console.log("Datos array", datosArray);
    try {
      const pacientes = (await window.electron.ipcRenderer.buscarElementoM(
        jsonDocument
      )) as Array<PacientesAnalisisMongo>;
      console.log("RETRIEVED", pacientes)
      setDataRetrieved(pacientes);
      setNombreSujeto(pacientes.length > 0 ? pacientes[0].name : '');
      for (let i = 0; i < pacientes.length; i += 1) {
        datarRetrieved.push({
          col1: `${pacientes[i].name} Protocolo: ${pacientes[i].protocol} Etiqueta: ${pacientes[i].etiqueta}`,
          // col1: `******* ***** **** Experiment: ${pacientes[i].protocol} Label: ${pacientes[i].etiqueta}`,

        });
      }
      console.log('Retrieved', datarRetrieved);
      setData(datarRetrieved);
    } catch (error: any) {
      console.log('error',error)     
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails('Problem while loading the data' + error));
    }
    appDispatch(setIsLoading(false));
  }

  function encontrarObjeto(nombre: string, protocolo: string, etiqueta: string) {
    console.log('Buscando', dataRetrieved);
    console.log('Params', nombre, etiqueta, protocolo);

    return dataRetrieved.find(objeto =>
        objeto.name === nombre &&
        objeto.protocol === "Protocolo modular 11 nov" &&
        objeto.etiqueta === "Sano"
    );
}

  async function loadExcelData(nombre: string, protocolo: string, etiqueta: string) {
    appDispatch(setIsLoading(true));
    const document = {
      name: nombre,
      protocol: protocolo,
      etiqueta,
    };
    const jsonDocument = JSON.stringify(document);
    try {
      // const datos = (await window.electron.ipcRenderer.buscarElementoM(
      //   jsonDocument
      // )) as Array<PacientesAnalisisMongo>;

      const objetoEncontrado = encontrarObjeto(nombre, protocolo, etiqueta);
      if (!objetoEncontrado) {
        console.log("No encontrado")
        appDispatch(setIsLoading(false));
        return;
      }
      const datos = [objetoEncontrado];
      console.log('Datos Excel', datos);
      
      const fileType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      // const fileName = nombreSujeto;
      const fileName = "signals";
      const jsonObj = datos[0].signals;
      const jsonArr: any = jsonObj;
      console.log("JSON ARR OBT", jsonArr);
      const maxLength = Math.max(...Object.values(jsonArr).map((arr: any) => arr.length));

      const keys: any = Object.keys(jsonArr);


      const newArray = Array.from({ length: maxLength }, (_, index) => {
        const newObj: any = {};
        Object.keys(jsonArr).forEach(key => {
          // if (!key.includes('tiempo')) { // Excluir claves que contengan "tiempo"
          //   const value = jsonArr[key][index];
          //   newObj[key] = value ? value.y : 0;
          // }
          if (key.includes('tiempo')) { // Excluir claves que contengan "tiempo"
            const valueLocal = jsonArr[key][index];
            newObj[key] = valueLocal ? valueLocal : 0;
          } else {
            const value = jsonArr[key][index];
            newObj[key] = value ? value.y : 0;
          }
        });
        return newObj;
      });
      

      console.log("Generated", newArray);

      const csv = generateCsv(csvConfig)(newArray);

      download(csvConfig)(csv)

      
      
      // const ws = XLSX.utils.json_to_sheet(newArray);
      // console.log("WS", ws);
      // const wb = { Sheets: {'data': ws}, SheetNames: ['data']};
      // console.log("wb", wb);
      // const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
      // console.log("excel Buf", excelBuffer);
      // const data = new Blob([excelBuffer], {type: fileType});
      // console.log("Blob", data);
      // FileSaver.saveAs(data, fileName + fileExtension);
      

    } catch (error: any) {
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails(`Problem while loading the data: ${error}`));
    }
    appDispatch(setIsLoading(false));
  }



  async function loadSignal(nombre: string, protocolo: string, etiqueta: string) {
    appDispatch(setIsLoading(true));
    const document = {
      name: nombre,
      protocol: protocolo,
      etiqueta,
    };
    const jsonDocument = JSON.stringify(document);
    try {
      // const datos = (await window.electron.ipcRenderer.buscarElementoM(
      //   jsonDocument
      // )) as Array<PacientesAnalisisMongo>;

      const objetoEncontrado = encontrarObjeto(nombre, protocolo, etiqueta);
      if (!objetoEncontrado) {
        console.log("No encontrado")
        appDispatch(setIsLoading(false));
        return;
      }
      const datos = [objetoEncontrado];
      console.log('Datos Para ver', objetoEncontrado);
      const hasGSR = Object.keys(objetoEncontrado.signals).some(x => x === "GSR");
      if(hasGSR) {
        console.log("HAS GSR")
        appDispatch(setGsrIsChecked(true));
      } else {
        appDispatch(setGsrIsChecked(false));

      }
      const hasTemp = Object.keys(objetoEncontrado.signals).some(x => x === "TC");
      if(hasTemp) {
        console.log("HAS TEMP")

        appDispatch(setTemperaturaIsChecked(true));
      } else {
        appDispatch(setTemperaturaIsChecked(false));

      }
      const hasFrec = Object.keys(objetoEncontrado.signals).some(x => x === "HRLM");
      if(hasFrec) {
        console.log("HAS FREC")

        appDispatch(setFrecuenciaIsChecked(true));
      } else {
        appDispatch(setFrecuenciaIsChecked(false));

      }

      const hasAcele = Object.keys(objetoEncontrado.signals).some(x => x === "INCLY");
      if(hasAcele) {
        console.log("HAS ACELE")

        appDispatch(setAcelerometroIsChecked(true));
      } else {
        appDispatch(setAcelerometroIsChecked(false));

      }
      let contador = 0;

      for (const clave in objetoEncontrado.signals) {
        if (objetoEncontrado.signals.hasOwnProperty(clave) && !clave.includes("tiempo")) {
          contador++;
        }
      }
      console.log("Cantidad conta", contador)
      appDispatch(setCantidadSensores(4));
      appDispatch(setTotalSensores(contador));

      appDispatch(setViewObject(datos[0]));
      
      navigate('/verSignal');
      

    } catch (error: any) {
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails(`Problem while loading the data: ${error}`));
    }
    appDispatch(setIsLoading(false));
  }

  const columns: Array<Column<{ col1: string }>> = React.useMemo(
    () => [
      {
        Header: 'Records',
        accessor: 'col1',
      },
    ],
    []
  );
  const options: TableOptions<{
    col1: string;
  }> = {
    data,
    columns,
  };
  const onClickCaptura = () => {
    navigate('/escogerConfiguracion');
  };
  const onClickIrInicio = () => {
    navigate('/');
  };

  const onClickRow = (element: any) => {
    
    console.log(element);
    console.log(element.cells);

    const valorClickeado = element.cells[0].value
    // Separar el nombre
    // const nombreRegex = /^(.*?)\sProtocolo:/;
    // const nombreMatch = valorClickeado.match(nombreRegex);
    // const nombre = nombreMatch ? nombreMatch[1] : "";
    const nombre = nombreSujeto;


    // Separar el protocolo
    const protocoloRegex = /Protocolo:\s(.*?)\sEtiqueta:/;
    const protocoloMatch = valorClickeado.match(protocoloRegex);
    const protocolo = protocoloMatch ? protocoloMatch[1] : "";

    // Separar la etiqueta
    const etiquetaRegex = /Etiqueta:\s(.*)$/;
    const etiquetaMatch = valorClickeado.match(etiquetaRegex);
    const etiqueta = etiquetaMatch ? etiquetaMatch[1] : "";

    console.log("Nombre", nombre);
    console.log("protocolo", protocolo);
    console.log("etiqueta", etiqueta);

    loadExcelData(nombre, protocolo, etiqueta);

    // loadPaciente(
    //   element.cells[0].value,
    //   element.cells[1].value,
    //   element.cells[2].value,
    //   element.cells[4].value
    // );
  };

  const onClickVer = (element: any) => {
    console.log("VERRR")
    console.log(element);
    console.log(element.cells);

    const valorClickeado = element.cells[0].value
    // Separar el nombre
    // const nombreRegex = /^(.*?)\sProtocolo:/;
    // const nombreMatch = valorClickeado.match(nombreRegex);
    // const nombre = nombreMatch ? nombreMatch[1] : "";
    const nombre = nombreSujeto;


    // Separar el protocolo
    const protocoloRegex = /Protocolo:\s(.*?)\sEtiqueta:/;
    const protocoloMatch = valorClickeado.match(protocoloRegex);
    const protocolo = protocoloMatch ? protocoloMatch[1] : "";

    // Separar la etiqueta
    const etiquetaRegex = /Etiqueta:\s(.*)$/;
    const etiquetaMatch = valorClickeado.match(etiquetaRegex);
    const etiqueta = etiquetaMatch ? etiquetaMatch[1] : "";

    console.log("Nombre", nombre);
    console.log("protocolo", protocolo);
    console.log("etiqueta", etiqueta);

    loadSignal(nombre, protocolo, etiqueta);

    // loadPaciente(
    //   element.cells[0].value,
    //   element.cells[1].value,
    //   element.cells[2].value,
    //   element.cells[4].value
    // );
  };

  useEffect(() => {
    loadPacientes();
    appDispatch(setMongoInsertObject({
      name: '',
      protocol: '',
      signals: {},
      etiqueta: '',
    },));
    appDispatch(setArduinoDataAdquirida({}));
    appDispatch(setEmgDataAdquirida({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <VerPaciente
      options={options}
      datosArray={datosArray}
      onClickCaptura={onClickCaptura}
      onClickIrInicio={onClickIrInicio}
      onClickRow={onClickRow}
      onClickVer={onClickVer}
    />
  );
};

export default VerPacienteContainer;
