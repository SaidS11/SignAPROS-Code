import { Channels } from '../main/preload';
import {
  PacientesAnalisis,
  MultimediaObj,
  PacientesAnalisisMongo,
  Algoritmo,
  ModeloIAInterface,
  ConfigDetalle,
  ProtocoloNombre,
  ConfiguracionNombre,
} from './components/Utilities/Constants';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        copiarArchivo(fileImagenDB: string, destino: string): unknown;
        copiarAr(arg0: (event: any, resp: any) => void): unknown;
        sensores(): unknown;
        senso(arg0: (event: any, resp: any) => void): unknown;
        sensoresStop(): unknown;
        sensoStop(): unknown;
        multiplesSensores(): unknown;
        multiplesSenso(arg0: (event: any, resp: any) => void): unknown;
        sensoresStopMultiple(): unknown;
        sensoresStopMulti(): unknown;
        insertarElementoM(arg0: (event: any, resp: any) => void): unknown;
        insertarElementoMongo(archivo: string): unknown;

        insertarElementoMParte1(arg0: (event: any, resp: any) => void): unknown;
        insertarElementoMongoParte1(archivo: string): unknown;

        insertarElementoMParte2(arg0: (event: any, resp: any) => void): unknown;
        insertarElementoMongoParte2(archivo: string): unknown;


        buscarElementoM(archivo: string): Array<object>;
        buscarElementoMongo(archivo: string): unknown;
        seleccionarTodoM(arg0: (event: any, resp: any) => void): unknown;
        seleccionarTodoMongo(): unknown;
        borrarElementoM(arg0: (event: any, resp: any) => void): unknown;
        borrarElementoMongo(archivo: string): unknown;
        updateImplementacion(
          precision: string,
          desviacion: string,
          entrenado: string,
          modelo: string
        ): unknown;
        updateIm(arg0: (event: any, resp: any) => void): unknown;
        updateModelo(
          resultados: string,
          entrenado: string,
          modelo: string
        ): unknown;
        updateMod(arg0: (event: any, resp: any) => void): unknown;
        selectImplementacionNombreIA(name: string): unknown;
        selectImplemenIA( // selectC(arg0: (event: any, resp: any) => void): unknown;
          arg0: (event: any, resp: any) => void
        ): unknown;
        selectImplementacionPorNombre(arg0: string): unknown;
        selectImplementacionPorN(
          arg0: (event: any, resp: any) => void
        ): unknown;
        selectModNom(): unknown;
        selectAlgos(): Array<Algoritmo>;
        selectAIA(): unknown;
        selectModIA(): Array<ModeloIAInterface>;
        preAnalisisPython(datos: string): unknown;
        preAnalisisP(arg0: (event: any, resp: any) => void): unknown;
        arduinoTest(duration: string, cantidadEmgs: string): unknown;
        arduinoT(arg0: (event: any, resp: any) => void): unknown;
        insertModeloIA(
          nombre: string,
          algoritmo_ia: string,
          entrenado: boolean,
          protocolo: string,
          resultados: string
        ): unknown;
        insertModIA(arg0: (event: any, resp: any) => void): Array<unknown>;
        selectC(): unknown;
        selectPrs(): Array<ProtocoloNombre>;
        analisisP(arg0: (event: any, resp: any) => void): unknown;
        analisisPython(
          type: string,
          typeIA: string,
          params: string,
          nombre: string,
          iteraciones: string,
          reducedPercentage: string,
          datos: string
        ): unknown;

        // analisisP(type: string, typeIA: string, params: string, nombre: string, iteraciones: string, reducedPercentage: string, datos: string): string;
        // analisisPython(
        //   type: string,
        //   typeIA: string,
        //   params: string,
        //   nombre: string,
        //   iteraciones: string,
        //   reducedPercentage: string,
        //   datos: string
        // ): unknown;
        selectCD(nombre: string): Array<ConfigDetalle>;
        selectConfiguracionDetalle(nameConf: string): unknown;
        selectConfiguracionNombre(protocolo: any): unknown;
        selectCN(nombre: string): Array<ConfiguracionNombre>;
        selectModIaPorAlgoritmo(algoritmo: string): Array<ModeloIAInterface>;
        selectModIAPorAlgoritmoEnt(algoritmo: string): Array<ModeloIAInterface>;

        selectPs(): Array<PacientesAnalisis>;
        selectMultimediaConfig(configuracion: any): unknown;
        selectMC(nombre: string): Array<MultimediaObj>;
        // selectC(arg0: (event: any, resp: any) => void): unknown;
        selectConfiguracion(): unknown;
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
        removeListener(
          channel: string,
          func: (...args: unknown[]) => void
        ): void;
        removeAllListeners(channel: string): void;
      };
    };
  }
}

export {};
