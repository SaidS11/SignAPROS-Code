import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    sensores(nombre: string) {
      ipcRenderer.send('sensores', nombre);
    },
    senso: (callback: any) => ipcRenderer.on('senso', callback),
    sensoresStop() {
      ipcRenderer.send('sensoresStop');
    },
    sensoStop: (callback: any) => ipcRenderer.invoke('sensoresStop', callback),
    multiplesSensores(nombre: string) {
      ipcRenderer.send('multiplesSensores', nombre);
    },
    multiplesSenso: (callback: any) => ipcRenderer.on('multiplesSenso', callback),
    sensoresStopMultiple() {
      ipcRenderer.send('sensoresStopMultiple');
    },
    sensoresStopMulti: (callback: any) => ipcRenderer.invoke('sensoresStopMulti', callback),
    selectConfiguracion() {
      ipcRenderer.send('selectConfiguracion');
    },
    selectC: () => ipcRenderer.invoke('selectConfiguracion'),
    selectPacientes() {
      ipcRenderer.send('selectPacientes');
    },
    selectPs: () => ipcRenderer.invoke('selectPacientes'),
    selectProtocolos() {
      ipcRenderer.send('selectProtocolos');
    },
    selectPrs: () => ipcRenderer.invoke('selectProtocolos'),
    selectModelosNombre() {
      ipcRenderer.send('selectModelosNombre');
    },
    selectModNom: () => ipcRenderer.invoke('selectModelosNombre'),
    selectAlgoritmos() {
      ipcRenderer.send('selectAlgoritmos');
    },
    selectAlgos: () => ipcRenderer.invoke('selectAlgoritmos'),
    selectAlgoritmosIA() {
      ipcRenderer.send('selectAlgoritmosIA');
    },
    selectAIA: () => ipcRenderer.invoke('selectAlgoritmosIA'),
    selectMultimediaConfig(nombre: string) {
      ipcRenderer.send('selectMultimediaConfig', nombre);
    },
    selectMC: (callback: any) =>
      ipcRenderer.invoke('selectMultimediaConfig', callback),
    selectConfiguracionNombre(nombre: string) {
      ipcRenderer.send('selectConfiguracionNombre', nombre);
    },
    selectCN: (callback: any) =>
      ipcRenderer.invoke('selectConfiguracionNombre', callback),
    selectModelosIAPorAlgoritmo(algoritmo: string) {
      ipcRenderer.send('selectModelosIAPorAlgoritmo', algoritmo);
    },
    selectModIaPorAlgoritmo: (callback: any) =>
      ipcRenderer.invoke('selectModelosIAPorAlgoritmo', callback),

    selectModelosIAPorAlgoritmoEntrenado(algoritmo: string) {
      ipcRenderer.send('selectModelosIAPorAlgoritmoEntrenado', algoritmo);
    },
    selectModIAPorAlgoritmoEnt: (callback: any) =>
      ipcRenderer.invoke('selectModelosIAPorAlgoritmoEntrenado', callback),
    selectImplementacionNombreIA(nombre: string) {
      ipcRenderer.send('selectImplementacionNombreIA', nombre);
    },
    selectImplemenIA: (callback: any) =>
      ipcRenderer.on('selectImplemenIA', callback),
    insertarElementoMongo(json: string) {
      ipcRenderer.send('insertarElementoMongo', json);
    },
    insertarElementoM: (callback: any) =>
      ipcRenderer.on('insertarElementoM', callback),


    insertarElementoMongoParte1(json: string) {
      ipcRenderer.send('insertarElementoMongoParte1', json);
    },
    insertarElementoMParte1: (callback: any) =>
      ipcRenderer.on('insertarElementoMParte1', callback),

    insertarElementoMongoParte2(json: string) {
      ipcRenderer.send('insertarElementoMongoParte2', json);
    },
    insertarElementoMParte2: (callback: any) =>
      ipcRenderer.on('insertarElementoMParte2', callback),

    copiarArchivo(file: string, destino: string) {
      ipcRenderer.send('copiarArchivo', file, destino);
    },
    copiarAr: (callback: any) => ipcRenderer.on('copiarAr', callback),

    buscarElementoMongo(json: string) {
      ipcRenderer.send('buscarElementoMongo', json);
    },
    buscarElementoM: (callback: any) =>
      ipcRenderer.invoke('buscarElementoMongo', callback),
    seleccionarTodoMongo() {
      ipcRenderer.send('seleccionarTodoMongo');
    },
    seleccionarTodoM: (callback: any) =>
      ipcRenderer.on('seleccionarTodoM', callback),
    borrarElementoMongo(json: string) {
      ipcRenderer.send('borrarElementoMongo', json);
    },
    borrarElementoM: (callback: any) =>
      ipcRenderer.on('borrarElementoM', callback),
    updateImplementacion(
      precision: string,
      desviacion: string,
      entrenado: string,
      modelo: string
    ) {
      ipcRenderer.send(
        'updateImplementacion',
        precision,
        desviacion,
        entrenado,
        modelo
      );
    },
    updateIm: (callback: any) => ipcRenderer.on('updateIm', callback),
    updateModelo(resultados: string, entrenado: string, modelo: string) {
      ipcRenderer.send('updateModelo', resultados, entrenado, modelo);
    },
    updateMod: (callback: any) => ipcRenderer.on('updateMod', callback),
    selectImplementacionPorN: (callback: any) =>
      ipcRenderer.on('selectImplementacionPorN', callback),
    selectConfiguracionDetalle(nombre: string) {
      ipcRenderer.send('selectConfiguracionDetalle', nombre);
    },
    selectCD: (callback: any) =>
      ipcRenderer.invoke('selectConfiguracionDetalle', callback),
    selectModelosIA() {
      ipcRenderer.send('selectModelosIA');
    },
    selectModIA: (callback: any) =>
      ipcRenderer.invoke('selectModelosIA', callback),
    insertModeloIA(
      nombre: string,
      algoritmo_ia: string,
      entrenado: boolean,
      protocolo: string,
      resultados: string
    ) {
      ipcRenderer.send(
        'insertModeloIA',
        nombre,
        algoritmo_ia,
        entrenado,
        protocolo,
        resultados
      );
    },
    insertModIA: (callback: any) => ipcRenderer.on('insertModIA', callback),
    selectImplementacionPorNombre(nombre: string) {
      ipcRenderer.send('selectImplementacionPorNombre', nombre);
    },
    analisisPython(
      type: string,
      typeIA: string,
      params: string,
      nombre: string,
      iteraciones: string,
      reducedPercentage: string,
      datos: string
    ) {
      ipcRenderer.invoke(
        'analisisPython',
        type,
        typeIA,
        params,
        nombre,
        iteraciones,
        reducedPercentage,
        datos
      );
    },
    analisisP: (callback: any) => ipcRenderer.on('analisisP', callback),

    // analisisPython(
    //   type: string,
    //   typeIA: string,
    //   params: string,
    //   nombre: string,
    //   iteraciones: string,
    //   reducedPercentage: string,
    //   datos: string
    // ) {
    //   ipcRenderer.send(
    //     'analisisPython',
    //     type,
    //     typeIA,
    //     params,
    //     nombre,
    //     iteraciones,
    //     reducedPercentage,
    //     datos,
    //   );
    // },
    // analisisP: (callback: any) => ipcRenderer.invoke('analisisPython', callback),
    preAnalisisPython(datos: string,) {
      ipcRenderer.invoke('preAnalisisPython', datos);
    },
    preAnalisisP: (callback: any) => ipcRenderer.on('preAnalisisP', callback),

    arduinoTest(duration: string, cantidadEmgs: string) {
      ipcRenderer.invoke('arduinoTest', duration, cantidadEmgs);
    },
    arduinoT: (callback: any) => ipcRenderer.on('arduinoT', callback),

    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    removeListener(channel: string, func: (...args: unknown[]) => void) {
      ipcRenderer.removeListener(channel, (_event, ...args) => func(...args));
    },
    removeAllListeners(channel: string) {
      ipcRenderer.removeAllListeners(channel);
    },
  },
});

function loggearDoctor(user: string, pass: string) {
  ipcRenderer.send('loggearDoctor', user, pass);
}
function selectPaciente(
  nombre: string,
  apellidoP: string,
  apellidoM: string,
  email: string
) {
  ipcRenderer.send('selectPaciente', nombre, apellidoP, apellidoM, email);
}
function selectPacientes() {
  ipcRenderer.send('selectPacientes');
}
function insertPaciente(
  usario: string,
  email: string,
  telefono: string,
  fechaNacimiento: any,
  nombre: string,
  apellidoP: string,
  apellidoM: string
) {
  ipcRenderer.send(
    'insertPaciente',
    usario,
    email,
    telefono,
    fechaNacimiento,
    nombre,
    apellidoP,
    apellidoM
  );
}

function insertModelo(
  modelo: string,
  prueba: string,
  algoritmo_ia: string,
  parametros: any
) {
  ipcRenderer.send('insertModelo', modelo, prueba, algoritmo_ia, parametros);
}

// function selectProtocolos() {
//   ipcRenderer.send('selectProtocolos');
// }

function selectConfiguracionNombre(nombre: string) {
  ipcRenderer.send('selectConfiguracionNombre', nombre);
}

function selectMultimediaConfig(nombre: string) {
  ipcRenderer.send('selectMultimediaConfig', nombre);
}

function insertRegistro(
  datosCrudos: any,
  fecha: any,
  pacienteNombre: string,
  protocoloNombre: string
) {
  ipcRenderer.send(
    'insertRegistro',
    datosCrudos,
    fecha,
    pacienteNombre,
    protocoloNombre
  );
}

function selectConfiguracion() {
  ipcRenderer.send('selectConfiguracion');
}

function insertConfiguracion(
  configuracionNombre: string,
  configuracionGsr: any,
  configuracionFrecuencia: any,
  configuracionRitmoCardiaco: any,
  configuracionEmgs: any,
  configuracionAcelerometro: any,
  configuracionSubido: any,
  configuracionDescripcion: string
) {
  ipcRenderer.send(
    'insertConfiguracion',
    configuracionNombre,
    configuracionGsr,
    configuracionFrecuencia,
    configuracionRitmoCardiaco,
    configuracionEmgs,
    configuracionAcelerometro,
    configuracionSubido,
    configuracionDescripcion
  );
}

function insertMultimedia(
  multimediaNombre: string,
  link_video: any,
  link_imagen: any,
  subido: any,
  configuracion: string
) {
  ipcRenderer.send(
    'insertMultimedia',
    multimediaNombre,
    link_video,
    link_imagen,
    subido,
    configuracion
  );
}

function insertProtocolo(
  protocoloAdquisicionNombre: string,
  protocoloAdquisicionDoctor: string,
  protocoloAdquisicionConfiguracion: string,
  protocoloAdquisicionDescripcion: string
) {
  ipcRenderer.send(
    'insertProtocolo',
    protocoloAdquisicionNombre,
    protocoloAdquisicionDoctor,
    protocoloAdquisicionConfiguracion,
    protocoloAdquisicionDescripcion
  );
}

function selectRegistrosProtocolo(nombre: string) {
  ipcRenderer.send('selectRegistrosProtocolo', nombre);
}

function selectProtocoloDetalle(nombre: string) {
  ipcRenderer.send('selectProtocoloDetalle', nombre);
}

function selectConfiguracionDetalle(nombre: string) {
  ipcRenderer.send('selectConfiguracionDetalle', nombre);
}

// function sensores() {
//   ipcRenderer.send('sensores');
// }

// function sensoresStop() {
//   ipcRenderer.send('sensoresStop');
// }

function testSensores() {
  ipcRenderer.send('testSensores');
}

function testSensoresStop() {
  ipcRenderer.send('testSensoresStop');
}
function cargarPuertos() {
  ipcRenderer.send('cargarPuertos');
}

function loadPort(opcion: string, baud: number) {
  ipcRenderer.send('loadPort', opcion, baud);
}

function loadMultiplePorts(opcion: string, baud: number, opcion2: string, baud2: number) {
  ipcRenderer.send('loadMultiplePorts', opcion, baud, opcion2, baud2);
}
const indexBridge = {
  loggearDoctor,
  loggearD: (callback: any) => ipcRenderer.on('loggearD', callback),
  cargarPuertos,
  cargarP: (callback: any) => ipcRenderer.on('cargarP', callback),
  // sensores(nombre: string) {
  //   ipcRenderer.send('sensores', nombre);
  // },
  // senso: (callback: any) => ipcRenderer.on('senso', callback),
  // sensoresStop,
  // sensoStop: (callback: any) => ipcRenderer.on('sensoStop', callback),
  loadPort,
  loadMultiplePorts,
  sensoresStopNewTest() {
    ipcRenderer.send('sensoresStopNewTest');
  },
  sensoStopNewTest: (callback: any) =>
    ipcRenderer.on('sensoStopNewTest', callback),
  sensoresNewTest() {
    ipcRenderer.send('sensoresNewTest');
  },
  sensoNewTest: (callback: any) => ipcRenderer.on('sensoNewTest', callback),
  // sensores,
  // senso: (callback: any) => ipcRenderer.on('senso', callback),
  testSensores,
  testSenso: (callback: any) => ipcRenderer.on('testSenso', callback),
  testSensoresStop,
  testSensoStop: (callback: any) => ipcRenderer.on('testSensoStop', callback),
  selectPaciente,
  selectP: (callback: any) => ipcRenderer.on('selectP', callback),
  selectPacientes,
  selectPs: (callback: any) => ipcRenderer.on('selectPs', callback),
  insertPaciente,
  insertP: (callback: any) => ipcRenderer.on('insertP', callback),
  insertModelo,
  insertMod: (callback: any) => ipcRenderer.on('insertMod', callback),
  // selectProtocolos,
  // selectPrs: (callback: any) => ipcRenderer.on('selectPrs', callback),
  selectConfiguracionNombre,
  selectCN: (callback: any) => ipcRenderer.on('selectCN', callback),
  selectMultimediaConfig,
  selectMC: (callback: any) => ipcRenderer.on('selectMC', callback),
  insertRegistro,
  insertR: (callback: any) => ipcRenderer.on('insertR', callback),
  selectConfiguracion,
  selectC: (callback: any) => ipcRenderer.on('selectC', callback),
  insertConfiguracion,
  insertC: (callback: any) => ipcRenderer.on('insertC', callback),
  insertMultimedia,
  insertM: (callback: any) => ipcRenderer.on('insertM', callback),
  insertProtocolo,
  insertPro: (callback: any) => ipcRenderer.on('insertPro', callback),
  selectRegistrosProtocolo,
  selectRP: (callback: any) => ipcRenderer.on('selectRP', callback),
  selectProtocoloDetalle,
  selectPD: (callback: any) => ipcRenderer.on('selectPD', callback),
  // selectConfiguracionDetalle,
  // selectCD: (callback: any) => ipcRenderer.on('selectCD', callback),
};

contextBridge.exposeInMainWorld('Bridge', indexBridge);
