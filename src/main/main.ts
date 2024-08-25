/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import * as fsPromises from 'fs/promises';
import { Worker } from 'worker_threads';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { Pool, Client } from 'pg';
import { PythonShell } from 'python-shell';
import { Readable } from 'stream';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import * as bodyParser from 'body-parser';
import { spawnSync, spawn, ChildProcess } from 'child_process';
import { DateTime } from 'luxon';
import * as fs from 'fs';
import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import * as http from 'http';
// import { Server } from 'socket.io';
import nodemailer from 'nodemailer';
import terminate from 'terminate';

const { MongoClient } = require('mongodb');
// const mongoose = require('mongoose');
// --------------Conexion MongoAtlas--------------
// const uri = 'mongodb://0.0.0.0:27017/';
const uri =
  '';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// --------------ConexionMongoLocal--------------

// To run MongoDB in local mode have to be installed mongo server from: https://www.mongodb.com/try/download/community
// After installation need to be created the folder in path: C:\data and  C:\data\db
// Final step is run the server located in: C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe

/* const uri = 'mongodb://0.0.0.0:27017/';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); */

// --------------------Conexion PostgreAWS--------------
// const credenciales = {
//   user: '',
//   host: '',
//   database: '',
//   password: '',
// };

// --------------Conexion PostgreLocal--------------
// The file of backup is already extract it
let credenciales = {
  user: 'postgres',
  host: 'localhost',
  database: '',
  password: '',
  port: 5432,
}; 

let pool = new Pool(credenciales);



// /////////////////////////////////////////////////////// Cagadero Pona/////////////////////////////////////////
// /////////////////POSTGRESQL///////////////////////
// /////////////////INSERT///////////////////////

const direc = __dirname;
const regex = /\//i;
const direcParsed = direc.replace(regex, '/');
const direcFinalDev = direcParsed.slice(0, -4);
// Uncomment following line for dev mode
// const direcFinal = direcParsed.slice(0, -4);

//Comment next 2 lines for DEV MODE
let strippedPath = direcFinalDev.substring(0, direcFinalDev.length - 14);
const direcFinal = strippedPath + "src";

const direcFinalExpress = direcFinal + "/main";





const app2: Express = express();
const server = http.createServer(app2)

app2.use(express.json({ limit: '999999999999999999999999999999999999999999999999999999999999999999999999mb' }));
app2.use(express.urlencoded({ limit: '999999999999999999999999999999999999999999999999999999999999999999999999mb', extended: true, parameterLimit: 100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 }));
app2.use(bodyParser.json({ limit: '1000000mb' }));
app2.use(bodyParser.text({ limit: '1000000mb' }));
app2.use(bodyParser.raw({ limit: '10000000mb' }));
// const io =  new Server(server)

app2.listen(8000, () => {
  console.log('El servidor está escuchando en el puerto 8000');
});

app2.use(express.json());
app2.use(cors());

// Configurar el middleware para servir archivos estáticos
//DEV
// app2.use(express.static(path.join(__dirname, 'public')));

// PROD
app2.use(express.static(path.join(direcFinalExpress, 'public')));

server.listen(4000)
console.log('Server on port', 4000)

/// ////////////////


async function conectToDB() {
  const contenido = fs.readFileSync(`${direcFinal}/main/database/database.txt`, 'utf-8');
  const lineas = contenido.split("\n").map(linea => linea.trim());
  console.log("This was retrieved", lineas);

  const user1 = lineas[0]
  const host1 = lineas[1]
  const database1 = lineas[2]
  const password1 = lineas[3]
  const port = parseInt(lineas[4])
  credenciales = {
    user: user1,
    host: host1,
    database: database1,
    password: password1,
    port: port,
  }
  pool = new Pool(credenciales);

  try {
    await pool.connect();
    return true;
  } catch (error) {
    return false;
  } finally {
    await client.close();
  }
}

app2.get('/connectDB', async (req: Request, res: Response) => {
  try {
    // Obtener los datos enviados en la solicitud
    // eslint-disable-next-line @typescript-eslint/naming-convention
    /* const { nombre, doctor, configuracion, descripcion } = req.body;
      const result = await insertarDatosProtocoloAdquisicion(
        nombre,
        doctor,
        configuracion,
        descripcion
      ); */
    const result = await conectToDB();
    if (result) {
      res.status(200).json({ message: 'Connected' });
    } else {
      // res.status(500).json({ error: `Failed to connect: ${direcFinal}`});
      res.status(500).json({ error: `Failed to connect`});

      
    }

    // const contenido = fs.readFileSync(`${direcFinal}/main/database/database.txt`, 'utf-8');
    // const lineas = contenido.split("\n").map(linea => linea.trim());
    // console.log("This was retrieved", lineas);

  } catch (error) {
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});

async function writeDbCredentials (user: string, host: string, database: string, password: string, port: number): Promise<boolean> {

  const nombreFile = `database.txt`;
  const contenido = `${user}\n${host}\n${database}\n${password}\n${port}`
  let result: boolean = true;
  
  fs.writeFile(`${direcFinal}/main/database/${nombreFile}`, contenido, 'utf-8', (err) => {
    if (err) {
        console.error('Error al escribir en el archivo:', err);
        result = false;
    } else {
        console.log('Objeto guardado correctamente en el archivo:');
        result = true;
    }
  });

  return result;

} 

app2.post('/writeCredentials', async (req: Request, res: Response) => {
  try {
    // Obtener los datos enviados en la solicitud
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { user, host, database, password, port } =
      req.body;
    const result = await writeDbCredentials(
      user,
      host,
      database,
      password,
      port
    );
    if (result) {
      res.status(200).json({ message: 'Datos insertados correctamente' });
    } else {
      res.status(500).json({ error: 'Error al insertar datos' });
    }
  } catch (error) {
    console.error('Error al insertar datos', error);
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});

async function insertarDatosAnalisis(
  nombre: string,
  descripcion: string,
  resultado: string,
  protocolo_nombre: string,
  modelo: string
): Promise<boolean> {
  try {
    const client = new Client(credenciales);
    await client.connect();

    const query =
      'INSERT INTO analisis (nombre, descripcion, resultado, protocolo_nombre, modelo) VALUES ($1, $2, $3, $4, $5)';
    const values = [nombre, descripcion, resultado, protocolo_nombre, modelo];
    await client.query(query, values);

    await client.end();

    return true;
  } catch (error) {
    console.error('Error al insertar datos', error);
    return false;
  }
}

app2.post('/insertarAnalisis', async (req: Request, res: Response) => {
  try {
    // Obtener los datos enviados en la solicitud
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { nombre, descripcion, resultado, protocolo_nombre, modelo } =
      req.body;
    const result = await insertarDatosAnalisis(
      nombre,
      descripcion,
      resultado,
      protocolo_nombre,
      modelo
    );
    if (result) {
      res.status(200).json({ message: 'Datos insertados correctamente' });
    } else {
      res.status(500).json({ error: 'Error al insertar datos' });
    }
  } catch (error) {
    console.error('Error al insertar datos', error);
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});



app2.delete('/deleteModelo', async (req: Request, res: Response) => {
  try {
    // Obtener los datos enviados en la solicitud
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { nombre } = req.body;

    const archivoAEliminar = `${direcFinal}/pythonScripts/Modelos/${nombre}.joblib`;


    fs.unlink(archivoAEliminar, (error) => {
      if (error) {
        console.error(`Error al eliminar el archivo ${archivoAEliminar}: ${error.message}`);
        res.status(500).json({ error: 'Error al eliminar' });

      } else {
        console.log(`El archivo ${archivoAEliminar} ha sido eliminado correctamente.`);
        res.status(200).json({ message: 'Eliminado correctamente' });

      }
    });
  } catch (error) {
    console.error('Error al eliminar', error);
    res.status(500).json({ error: 'Error al eliminar' });
  }
});
/// //////////
async function insertarDatosDoctor(
  usuario:string,
  password:string,
  email:string,
  telefono:string,
  fecha_nacimiento:string,
  nombre:string,
  apellidoP:string,
  apellidoM:string,
): Promise<boolean> {
  try {
    const client = new Client(credenciales);
    await client.connect();

    const query =
      "INSERT INTO doctor (usuario, password, email, telefono, fecha_nacimiento, nombre, apellido_paterno, apellido_materno) VALUES ($1, crypt($2, gen_salt('bf')), $3, $4, $5, $6, $7, $8)";
    const values = [
      usuario,
      password,
      email,
      telefono,
      fecha_nacimiento,
      nombre,
      apellidoP,
      apellidoM,
    ];
    await client.query(query, values);
    await client.end();

    return true;
  } catch (error) {
    console.error('Error al insertar datos', error);
    return false;
  }
}

app2.post('/insertarDoctor', async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    // Obtener los datos enviados en la solicitud
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      usuario,
      password,
      email,
      telefono,
      fecha_nacimiento,
      nombre,
      apellidoP,
      apellidoM,
    } = req.body;
    const result = await insertarDatosDoctor(
      usuario,
      password,
      email,
      telefono,
      fecha_nacimiento,
      nombre,
      apellidoP,
      apellidoM,
    );
    if (result) {
      res.status(200).json({ message: 'Datos insertados correctamente' });
    } else {
      res.status(500).json({ error: 'Error al insertar datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});

/// //////////
async function insertarDatosPaciente(
  usuario: string,
  email: string,
  telefono: string,
  fechaNacimiento: string,
  nombre: string,
  apellidoP: string,
  apellidoM: string,
  sexo: string,
  peso: string,
  estatura: string
): Promise<boolean> {
  if (fechaNacimiento === '') {
    fechaNacimiento = '2000-01-01'
  }
  if (estatura === '') {
    estatura = '170'
  }
  if (peso === '') {
    peso = '50'
  }
  try {
    const client = new Client(credenciales);
    await client.connect();

    const query =
      'INSERT INTO paciente (usuario, email, telefono, fecha_nacimiento, nombre, apellido_paterno, apellido_materno, sexo, peso, estatura) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    const values = [
      usuario,
      email,
      telefono,
      fechaNacimiento,
      nombre,
      apellidoP,
      apellidoM,
      sexo,
      peso,
      estatura,
    ];
    await client.query(query, values);
    await client.end();

    return true;
  } catch (error) {
    console.error('Error al insertar datos', error);
    return false;
  }
}

app2.post('/insertarPaciente', async (req: Request, res: Response) => {
  try {
    // Obtener los datos enviados en la solicitud
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      usuario,
      email,
      telefono,
      fechaNacimiento,
      nombre,
      apellidoP,
      apellidoM,
      sexo,
      peso,
      estatura,
    } = req.body;
    const result = await insertarDatosPaciente(
      usuario,
      email,
      telefono,
      fechaNacimiento,
      nombre,
      apellidoP,
      apellidoM,
      sexo,
      peso,
      estatura
    );
    if (result) {
      res.status(200).json({ message: 'Datos insertados correctamente' });
    } else {
      res.status(500).json({ error: 'Error al insertar datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});
/// ////////////////
async function insertarDatosImplementacion(
  nombre: string,
  descripcion: string,
  algoritmo_ia: string,
  parametros: string
): Promise<boolean> {
  const client = new Client(credenciales);
  await client.connect();

  try {
    const query =
      'INSERT INTO implementacion (nombre, descripcion, algoritmo_ia, parametros ) VALUES ($1, $2, $3, $4)';
    const values = [nombre, descripcion, algoritmo_ia, parametros];
    await client.query(query, values);
    await client.end();

    return true;
  } catch (error) {
    console.error('Error al insertar datos', error);
    return false;
  }
}

app2.post('/insertarImplementacion', async (req: Request, res: Response) => {
  try {
    // Obtener los datos enviados en la solicitud
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      nombre,
      descripcion,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      algoritmo_ia,
      parametros,
    } = req.body;
    const result = await insertarDatosImplementacion(
      nombre,
      descripcion,
      algoritmo_ia,
      parametros
    );
    if (result) {
      res.status(200).json({ message: 'Datos insertados correctamente ' });
    } else {
      res.status(500).json({ error: 'Error al insertar datos' });
    }
  } catch (error) {
    console.error('Error al insertar datos', error);
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});
// //////////////////
async function insertarDatosModelo(
  nombre: string,
  algoritmo_ia: string,
  protocolo: string,
  entrenado: string,
  resultados: string
): Promise<boolean> {
  const client = new Client(credenciales);
  await client.connect();

  try {
    const query =
      'INSERT INTO modelo (nombre, algoritmo_ia, protocolo, entrenado, resultados) VALUES ($1, $2, $3, $4, $5)';
    const values = [nombre, algoritmo_ia, protocolo, entrenado, resultados];
    await client.query(query, values);
    await client.end();

    return true;
  } catch (error) {
    console.error('Error al insertar datos', error);
    return false;
  }
}

app2.post('/insertarModelo', async (req: Request, res: Response) => {
  try {
    // Obtener los datos enviados en la solicitud
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { nombre, algoritmo_ia, protocolo, entrenado, resultados } = req.body;
    const result = await insertarDatosModelo(
      nombre,
      algoritmo_ia,
      protocolo,
      entrenado,
      resultados
    );
    if (result) {
      res.status(200).json({ message: 'Datos insertados correctamente' });
    } else {
      res.status(500).json({ error: 'Error al insertar datos' });
    }
  } catch (error) {
    console.error('Error al insertar datos', error);
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});
// ////////////////
async function insertarDatosRegistro(
  datos_crudos: string,
  fecha: string,
  paciente: string,
  protocolo_adquisicion: string
): Promise<boolean> {
  const client = new Client(credenciales);
  await client.connect();

  try {
    const query =
      'INSERT INTO registro (datos_crudos, fecha, paciente, protocolo_adquisicion) VALUES ($1, $2, $3, $4)';
    const values = [datos_crudos, fecha, paciente, protocolo_adquisicion];
    await client.query(query, values);
    await client.end();

    return true;
  } catch (error) {
    console.error('Error al insertar datos', error);
    return false;
  }
}

app2.post('/insertarRegistro', async (req: Request, res: Response) => {
  try {
    // Obtener los datos enviados en la solicitud
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { datos_crudos, fecha, paciente, protocolo_adquisicion } = req.body;
    const result = await insertarDatosRegistro(
      datos_crudos,
      fecha,
      paciente,
      protocolo_adquisicion
    );
    if (result) {
      res.status(200).json({ message: 'Datos insertados correctamente' });
    } else {
      res.status(500).json({ error: 'Error al insertar datos' });
    }
  } catch (error) {
    console.error('Error al insertar datos', error);
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});
// //////////////////
async function insertarDatosConfiguracion(
  nombre: string,
  gsr: string,
  frecuencia_cardiaca: string,
  temperatura: string,
  emgs: string,
  acelerometro: string,
  subido: string,
  descripcion: string,
  arduinos: number
): Promise<boolean> {
  const client = new Client(credenciales);
  await client.connect();

  try {
    const query =
      'INSERT INTO configuracion (nombre, gsr, frecuencia_cardiaca, temperatura, emgs, acelerometro, subido, descripcion, arduinos) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const values = [
      nombre,
      gsr,
      frecuencia_cardiaca,
      temperatura,
      emgs,
      acelerometro,
      subido,
      descripcion,
      arduinos,
    ];
    await client.query(query, values);
    await client.end();

    return true;
  } catch (error) {
    console.error('Error al insertar datos', error);
    return false;
  }
}

app2.post('/insertarConfiguracion', async (req: Request, res: Response) => {
  try {
    // Obtener los datos enviados en la solicitud
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      nombre,
      gsr,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      frecuencia_cardiaca,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      temperatura,
      emgs,
      acelerometro,
      subido,
      descripcion,
      arduinos,
    } = req.body;
    const result = await insertarDatosConfiguracion(
      nombre,
      gsr,
      frecuencia_cardiaca,
      temperatura,
      emgs,
      acelerometro,
      subido,
      descripcion,
      arduinos
    );
    if (result) {
      res.status(200).json({ message: 'Datos insertados correctamente' });
    } else {
      res.status(500).json({ error: 'Error al insertar datos' });
    }
  } catch (error) {
    console.error('Error al insertar datos', error);
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});
// //////////////////////
async function insertarDatosMultimedia(
  nombre: string,
  link_video: string,
  link_imagen: string,
  subido: string,
  configuracion: string
): Promise<boolean> {
  const client = new Client(credenciales);
  await client.connect();

  try {
    const query =
      'INSERT INTO multimedia (nombre, link_video, link_imagen, subido, configuracion) VALUES ($1, $2, $3, $4, $5)';
    const values = [nombre, link_video, link_imagen, subido, configuracion];
    await client.query(query, values);
    await client.end();

    return true;
  } catch (error) {
    console.error('Error al insertar datos', error);
    return false;
  }
}

app2.post('/insertarMultimedia', async (req: Request, res: Response) => {
  try {
    // Obtener los datos enviados en la solicitud
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { nombre, link_video, link_imagen, subido, configuracion } = req.body;
    console.log('Recibido', link_imagen);
    const result = await insertarDatosMultimedia(
      nombre,
      link_video,
      link_imagen,
      subido,
      configuracion
    );
    if (result) {
      res.status(200).json({ message: 'Datos insertados correctamente ' });
    } else {
      res.status(500).json({ error: 'Error al insertar datos' });
    }
  } catch (error) {
    console.error('Error al insertar datos', error);
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});
// /////////////////////////////
async function insertarDatosProtocoloAdquisicion(
  nombre: string,
  doctor: string,
  configuracion: string,
  descripcion: string
): Promise<boolean> {
  const client = new Client(credenciales);
  await client.connect();

  try {
    const query =
      'INSERT INTO protocolo_adquisicion (nombre, doctor, configuracion, descripcion) VALUES ($1, $2, $3, $4)';
    const values = [nombre, doctor, configuracion, descripcion];
    await client.query(query, values);
    await client.end();

    return true;
  } catch (error) {
    console.error('Error al insertar datos', error);
    return false;
  }
}

app2.post(
  '/insertarProtocoloAdquisicion',
  async (req: Request, res: Response) => {
    try {
      // Obtener los datos enviados en la solicitud
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { nombre, doctor, configuracion, descripcion } = req.body;
      const result = await insertarDatosProtocoloAdquisicion(
        nombre,
        doctor,
        configuracion,
        descripcion
      );
      if (result) {
        res.status(200).json({ message: 'Datos insertados correctamente' });
      } else {
        res.status(500).json({ error: 'Error al insertar datos' });
      }
    } catch (error) {
      console.error('Error al insertar datos', error);
      res.status(500).json({ error: 'Error al insertar datos' });
    }
  }
);
// ///////////////// UPDATES ///////////////////////
// //////////////////
async function actualizarImplementacion(
  precision: string,
  desviacion: string,
  entrenado: string,
  nombre: string
): Promise<boolean> {
  const client = new Client(credenciales);
  await client.connect();

  try {
    console.log(precision, desviacion, entrenado, nombre);
    const query =
      'UPDATE implementacion SET precision = $1, desviacion_estandar = $2, entrenado = $3 WHERE nombre = $4';
    const values = [precision, desviacion, entrenado, nombre];
    await client.query(query, values);
    await client.end();

    return true;
  } catch (error) {
    console.error('Error al insertar datos', error);
    return false;
  }
}

app2.patch('/actualizarImplementacion', async (req: Request, res: Response) => {
  try {
    // Obtener los datos enviados en la solicitud
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { precision, desviacion, entrenado, nombre } = req.body;
    const result = await actualizarImplementacion(
      precision,
      desviacion,
      entrenado,
      nombre
    );
    if (result) {
      res.status(200).json({ message: 'Datos insertados correctamente' });
    } else {
      res.status(500).json({ error: 'Error al insertar datos' });
    }
  } catch (error) {
    console.error('Error al insertar datos', error);
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});
// /////////////////////
async function actualizarModelo(
  resultados: string,
  entrenado: string,
  nombre: string
): Promise<boolean> {
  const client = new Client(credenciales);
  await client.connect();

  try {
    const query =
      ' UPDATE modelo SET resultados = $1, entrenado = $2 WHERE nombre = $3';
    const values = [resultados, entrenado, nombre];
    await client.query(query, values);
    await client.end();

    return true;
  } catch (error) {
    console.error('Error al insertar datos', error);
    return false;
  }
}

app2.patch('/actualizarModelo', async (req: Request, res: Response) => {
  try {
    // Obtener los datos enviados en la solicitud
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { resultados, entrenado, nombre } = req.body;
    const result = await actualizarModelo(resultados, entrenado, nombre);
    if (result) {
      res.status(200).json({ message: 'Datos insertados correctamente' });
    } else {
      res.status(500).json({ error: 'Error al insertar datos' });
    }
  } catch (error) {
    console.error('Error al insertar datos', error);
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});
// /////////////////MONGO///////////////////////

async function conexionPrincipalMongo() {
  try {
    await client.connect();
    return true;
  } catch (error) {
    return false;
  } finally {
    await client.close();
  }
}

app2.get('/conexionMongo', async (req: Request, res: Response) => {
  try {
    // Obtener los datos enviados en la solicitud
    // eslint-disable-next-line @typescript-eslint/naming-convention
    /* const { nombre, doctor, configuracion, descripcion } = req.body;
      const result = await insertarDatosProtocoloAdquisicion(
        nombre,
        doctor,
        configuracion,
        descripcion
      ); */
    const result = await conexionPrincipalMongo();
    if (result) {
      res.status(200).json({ message: 'Conexion Aceptada' });
    } else {
      res.status(500).json({ error: 'Conexion Rechazada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});
// ////////////////////////////////////////
async function insertarElementoMongo2(query: string) {
  try {
    const queryJSON = JSON.parse(query);
    await client.connect();
    const result = await client
      .db('Modular')
      .collection('Señales')
      .insertOne(queryJSON);
    console.log(
      `${result.insertedCount} documents inserted with _id: ${result.insertedId}`
    );
    return result;
    return 0;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}
app2.post('/insertarElementoMongo', async (req: Request, res: Response) => {
  try {
    const json = req.body;
    const jsonstring = JSON.stringify(json);
    console.log("RECIBI", jsonstring);
    // const result = await insertarElementoMongo2(jsonstring);
    // if (result) {
    //   res.status(200).json({ message: 'Datos insertados' });
    // } else {
    //   res.status(500).json({ error: 'Error Insertando datos' });
    // }
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});


let mongoObject = {};

let signalsObject = {};


async function insertarElementoMongo(query: string) {
  try {

    const queryJSON = JSON.parse(query);

    console.log("FIRST NAME AND PROTOCOL", queryJSON.name, queryJSON.protocol);
    // signalsObject = {...signalsObject, ...queryJSON}

    // const wrapperSignals = {
    //   signals: signalsObject
    // }

    // mongoObject = {...mongoObject, ...wrapperSignals}

    // console.log("Recibi");

    // console.log("Final", mongoObject);

    // await client.connect();
    // const result = await client
    //   .db('Modular')
    //   .collection('Signals')
    //   .insertOne(mongoObject);
    // console.log(
    //   `${result.insertedCount} documents inserted with _id: ${result.insertedId}`
    // );
    // return result;


   


    //   fs.writeFile(`${direcFinal}/main/archivosCsv/signals.txt`, jsonString, 'utf-8', (err) => {
    //     if (err) {
    //         console.error('Error al escribir en el archivo:', err);
    //     } else {
    //         console.log('Objeto guardado correctamente en el archivo:');
    //     }
    // });



    await client.connect();
    const result = await client
      .db('Modular')
      .collection('Señales')
      .insertOne(queryJSON);
    console.log(
      `${result.insertedCount} documents inserted with _id: ${result.insertedId}`
    );
    return result;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
    const queryJSON = JSON.parse(query);
    console.log("Second NAME AND PROTOCOL", queryJSON.name, queryJSON.protocol);
    const jsonString = JSON.stringify(queryJSON, null, 2);
    const currentTimestamp = DateTime.now();
    const formattedTimestamp = currentTimestamp.toFormat('dd MM yyyy HH mm');
    
    if(queryJSON.etiqueta !== "") {
      const nombreFile = `${queryJSON.name}, ${queryJSON.protocol}, ${queryJSON.etiqueta}, ${formattedTimestamp}`
      fs.writeFile(`${direcFinal}/main/archivosTxt/${nombreFile}.json`, jsonString, 'utf-8', (err) => {
        if (err) {
            console.error('Error al escribir en el archivo:', err);
        } else {
            console.log('Objeto guardado correctamente en el archivo:');
        }
    });
    } else {
      const nombreFile = `${queryJSON.name}, ${queryJSON.protocol}, ${queryJSON.etiqueta}, ${formattedTimestamp}, etiqueta`
      fs.writeFile(`${direcFinal}/main/archivosTxt/${nombreFile}.json`, jsonString, 'utf-8', (err) => {
        if (err) {
            console.error('Error al escribir en el archivo:', err);
        } else {
            console.log('Objeto guardado correctamente en el archivo:');
        }
    });
    }
  
  } finally {
    await client.close();
    mongoObject = {};
    signalsObject = {};
    return "Finally";


  }
}

ipcMain.on('insertarElementoMongo', async (event, archivo: string) => {
  const resp = await insertarElementoMongo(archivo);
  console.log(resp);
  mainWindow?.webContents.send('insertarElementoM', resp);
});


async function insertarElementoMongoParte1(query: string) {
  try {

    const queryJSON = JSON.parse(query);

    console.log("Recibi1");
    mongoObject = {...queryJSON}
    console.log("Actual", mongoObject);

    // await client.connect();
    // const result = await client
    //   .db('Modular')
    //   .collection('Signals')
    //   .insertOne(queryJSON);
    // console.log(
    //   `${result.insertedCount} documents inserted with _id: ${result.insertedId}`
    // );
    // return result;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

ipcMain.on('insertarElementoMongoParte1', async (event, archivo: string) => {
  const resp = await insertarElementoMongoParte1(archivo);
  console.log(resp);
  mainWindow?.webContents.send('insertarElementoMParte1', resp);
});


async function insertarElementoMongoParte2(query: string) {
  try {

    const queryJSON = JSON.parse(query);

    console.log("Recibi2");
    signalsObject = {...queryJSON}

    // await client.connect();
    // const result = await client
    //   .db('Modular')
    //   .collection('Signals')
    //   .insertOne(queryJSON);
    // console.log(
    //   `${result.insertedCount} documents inserted with _id: ${result.insertedId}`
    // );
    // return result;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

ipcMain.on('insertarElementoMongoParte2', async (event, archivo: string) => {
  const resp = await insertarElementoMongoParte2(archivo);
  console.log(resp);
  mainWindow?.webContents.send('insertarElementoMParte2', resp);
});


// ///////////////////////
// async function buscarElementoMongo2(query: string) {
//   try {
//     const queryJSON = JSON.parse(query);
//     await client.connect();
//     const collection = client.db('Modular').collection('Signals');
//     const result = await collection.find(queryJSON).toArray();
//     return result;
//   } catch (error) {
//     console.log('Ha ocurrido un error', error);
//   } finally {
//     await client.close();
//   }
// }
// app2.get('/buscarElementoMongo', async (req: Request, res: Response) => {
//   try {
//     console.log("Fetching");
//     const json = req.body;
//     const jsonstring = JSON.stringify(json);
//     console.log(jsonstring);
//     const result = await buscarElementoMongo2(jsonstring);
//     if (result) {
//       res.send(result);
//     } else {
//       res.status(500).json({ error: 'Error al recuperar los datos' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error al recuperar los datos' });
//   }
// });

async function buscarElementoMongo(query: string) {
  console.log('Buscandop');

  try {
    const queryJSON = JSON.parse(query);
    console.log("Received JSON", queryJSON);
    await client.connect();
    const collection = client.db('Modular').collection('Señales');
    const result = await collection.find(queryJSON).toArray();
    console.log("Has been found: ", result.length);

    const readingDirec = `${direcFinal}/main/archivosTxt`
    const nombresArchivos = fs.readdirSync(readingDirec);
    const hasKey = Object.keys(queryJSON).some(x => x === "protocol");
    const hasKeyNombre = Object.keys(queryJSON).some(x => x === "name");

    console.log("This has key", hasKeyNombre);

    if(hasKey) {
      console.log('Nombres de archivo en el directorio protocolo:');
      if(queryJSON.protocol !== "") {
        if (hasKeyNombre && result.length > 0) {
          console.log("Saltando");
        } else {
          console.log("Buscando signals");
          nombresArchivos.forEach( (nombre) => {
            if(queryJSON.etiqueta !== "") {
              if(nombre.includes(queryJSON.protocol) && !nombre.includes("etiqueta")) {
                console.log(nombre, "Si tiene");
                const contenido = fs.readFileSync(`${direcFinal}/main/archivosTxt/${nombre}`, 'utf-8');
                // Si el contenido es JSON, conviértelo en un objeto
                const miObjeto = JSON.parse(contenido);
                console.log("MI OBJ");
                result.push(miObjeto)
              }
            } else {
              if(nombre.includes(queryJSON.protocol) && nombre.includes("etiqueta")) {
                console.log(nombre, "No tiene");
                const contenido = fs.readFileSync(`${direcFinal}/main/archivosTxt/${nombre}`, 'utf-8');
                // Si el contenido es JSON, conviértelo en un objeto
                const miObjeto = JSON.parse(contenido);
                result.push(miObjeto)
              }
            }  
          });
        }
      }

    } else if(hasKeyNombre) {
      // Imprime los nombres de archivo
      console.log('Nombres de archivo en el directorio:');
      nombresArchivos.forEach( (nombre) => {
        if(nombre.includes(queryJSON.name)) {
          console.log(nombre);
          const contenido = fs.readFileSync(`${direcFinal}/main/archivosTxt/${nombre}`, 'utf-8');
          // Si el contenido es JSON, conviértelo en un objeto
          const miObjeto = JSON.parse(contenido);
          result.push(miObjeto)
        }
      });
    }

    // const test = path.join(direcFinalExpress, 'public')
    // result.push({
    //   "name": test,
    //   "etiqueta": test,
    //   "protocol": test,
    //   "signals": {},
    // })

    console.log("Apunto de retornar");

    return result;
  } catch (error) {
    console.log('Ha ocurrido un error ', error);
  } finally {
    await client.close();
  }
}

ipcMain.handle('buscarElementoMongo', async (event, archivo: string) =>
  buscarElementoMongo(archivo)
);

// ///////////////////
async function buscarTodoMongo2() {
  try {
    await client.connect();
    const collection = client.db('Modular').collection('Señales');
    const result = await collection.find({}).toArray();
    return result;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}
app2.get('/buscarTodoMongo', async (req: Request, res: Response) => {
  try {
    const result = await buscarTodoMongo2();
    if (result) {
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datos' });
  }
});
// ///////////////////////

async function borrarElementoMongo2(query: string) {
  try {
    const queryJSON = JSON.parse(query);
    await client.connect();
    const collection = client.db('Modular').collection('Señales');
    const result = await collection.deleteOne(queryJSON);
    return result;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.delete('/borrarElementoMongo', async (req: Request, res: Response) => {
  try {
    const json = req.body;
    const jsonstring = JSON.stringify(json);
    console.log(jsonstring);
    const result = await borrarElementoMongo2(jsonstring);
    if (result) {
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Insertando datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});
// /////////////////////PARTE DE ARCHIVOS///////////////////////
app2.post('/moverArchivos', async (req: Request, res: Response) => {
  try {
    const { ruta, fileName } = req.body;
    const rutaAcomodada = ruta.replace(regex, '/');
    const destino = `${direcFinal}/main/public/${fileName}`;
    await fs.copyFile(rutaAcomodada, destino, (err) => {
      if (err) {
        res.status(500).json({ error: `Error al copiar el archivo ${err}` });
      } else {
        res.send('Archivo copiado exitosamente.');
      }
    });
  } catch (error) {
    res.status(500).json({ error: `Error al insertar datos ${error}` });
  }
});
// /////////////////////////////////// Fin Cagadero Pona///////////////////////////////////

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: true,
      webSecurity: false,
      devTools: true,
    },
  });
  mainWindow.loadURL(resolveHtmlPath('index.html'));
  // mainWindow.menuBarVisible = false;
  // mainWindow.loadURL(path.join(__dirname,'../dist/index.html'));


  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
    installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  })
  .catch(console.log);


async function copiarArchivo(file: string, destino: string) {
  await fs.copyFile(file, destino, (err) => {
    if (err) {
      console.error('Error al copiar el archivo:', err);
    } else {
      console.log('Archivo copiado exitosamente.');
    }
  });
}

ipcMain.on('copiarArchivo', async (event, file: string, destino: string) => {
  const resp = await copiarArchivo(file, destino);
  console.log(resp);
  mainWindow?.webContents.send('copiarAr', resp);
});

async function iniciarSesion(user: string, pass: string) {
  const query = await pool.query(
    ' SELECT usuario FROM doctor WHERE usuario = $1 AND password = crypt($2, password) ',
    [user, pass]
  );
  console.log(query.rows);
  return query.rows;
}

// //////////////////////NUEVO EXPRESS /////////////////////
async function iniciarSesion2(user: any, pass: any) {
  try {
    const result = await pool.query(
      ' SELECT usuario FROM doctor WHERE usuario = $1 AND password = crypt($2, password) ',
      [user, pass]
    );
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get('/iniciarSesion', async (req: Request, res: Response) => {
  const user = req.query.user;
  const pass = req.query.pass;
  try {
    const result = await iniciarSesion2(user, pass);
    if (result) {
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datoseee' });
  }
});
// /////////////////
async function selectPaciente2(
  nombre: any,
  apellidoP: any,
  apellidoM: any,
  email: any
) {
  try {
    const result = await pool.query(
      ' select * from paciente where nombre = $1 and apellido_paterno = $2 and apellido_materno = $3 and email = $4 ',
      [nombre, apellidoP, apellidoM, email]
    );
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get('/selectPaciente', async (req: Request, res: Response) => {
  const nombre = req.query.nombre;
  const apellidoP = req.query.apellidoP;
  const apellidoM = req.query.apellidoM;
  const email = req.query.email;
  try {
    const result = await selectPaciente2(nombre, apellidoP, apellidoM, email);
    if (result) {
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datoseee' });
  }
});
// //////////////
async function selectPacientes2() {
  try {
    const result = await pool.query(' select * from paciente');
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get('/selectPacientes', async (req: Request, res: Response) => {
  try {
    const result = await selectPacientes2();
    if (result) {
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datoseee' });
  }
});
// //////////////////
async function selectPacientesImplementacionNombreIA2(nombre: any) {
  try {
    const result = await pool.query(
      ' SELECT * FROM implementacion where algoritmo_ia = $1',
      [nombre]
    );
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get(
  '/selectPacientesImplementacionNombreIA',
  async (req: Request, res: Response) => {
    const nombre = req.query.nombre;
    try {
      const result = await selectPacientesImplementacionNombreIA2(nombre);
      if (result) {
        res.send(result);
      } else {
        res.status(500).json({ error: 'Error Buscando Datos' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error buscando datoseee' });
    }
  }
);

// ///////////////////////
async function selectPacientesImplementacionPorNombre2(nombre: any) {
  try {
    const result = await pool.query(
      ' SELECT * FROM implementacion where nombre = $1',
      [nombre]
    );
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get(
  '/selectPacientesImplementacionPorNombre',
  async (req: Request, res: Response) => {
    const nombre = req.query.nombre;
    try {
      const result = await selectPacientesImplementacionPorNombre2(nombre);
      if (result) {
        res.send(result);
      } else {
        res.status(500).json({ error: 'Error Buscando Datos' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error buscando datoseee' });
    }
  }
);
// //////////////////
async function selectModelosNombre2() {
  try {
    const result = await pool.query(
      ' select nombre, algoritmo_ia from implementacion '
    );
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get('/selectModelosNombre', async (req: Request, res: Response) => {
  try {
    const result = await selectModelosNombre2();
    if (result) {
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datoseee' });
  }
});
// /////////////////
async function selectAlgoritmos2() {
  try {
    const result = await pool.query(' select * from implementacion ');
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get('/selectAlgoritmos', async (req: Request, res: Response) => {
  try {
    console.log('fetch algoritmosIA');
    const result = await selectAlgoritmos2();
    if (result) {
      console.log(result);
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datoseee' });
  }
});
// /////////////////
async function selectProtocolos2() {
  try {
    const result = await pool.query(
      ' select nombre from protocolo_adquisicion'
    );
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get('/selectProtocolos', async (req: Request, res: Response) => {
  try {
    const result = await selectProtocolos2();
    if (result) {
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datoseee' });
  }
});
// ///////////////
async function selectModelosIA2() {
  try {
    const result = await pool.query(' select * from modelo ');
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get('/selectModelosIA', async (req: Request, res: Response) => {
  try {
    const result = await selectModelosIA2();
    if (result) {
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datoseee' });
  }
});
// ////////////////
async function selectModelosIAPorAlgoritmo2(algoritmo: any) {
  try {
    const result = await pool.query(
      ' select * from modelo where algoritmo_ia = $1 ',
      [algoritmo]
    );
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get(
  '/selectModelosIAPorAlgoritmo',
  async (req: Request, res: Response) => {
    const algoritmo = req.query.algoritmo;
    try {
      const result = await selectModelosIAPorAlgoritmo2(algoritmo);
      if (result) {
        res.send(result);
      } else {
        res.status(500).json({ error: 'Error Buscando Datos' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error buscando datoseee' });
    }
  }
);
// ////////////////
async function selectModelosIAPorAlgoritmoEntrenado2(algoritmo: any) {
  try {
    const result = await pool.query(
      'select * from modelo where algoritmo_ia = $1 and entrenado = true',
      [algoritmo]
    );
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get(
  '/selectModelosIAPorAlgoritmoEntrenado',
  async (req: Request, res: Response) => {
    const algoritmo = req.query.algoritmo;
    try {
      const result = await selectModelosIAPorAlgoritmoEntrenado2(algoritmo);
      if (result) {
        res.send(result);
      } else {
        res.status(500).json({ error: 'Error Buscando Datos' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error buscando datoseee' });
    }
  }
);
// ////////////////
async function selectConfiguracionNombre2(nombre: any) {
  try {
    const result = await pool.query(
      ' select configuracion from protocolo_adquisicion where nombre = $1 ',
      [nombre]
    );
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get('/selectConfiguracionNombre', async (req: Request, res: Response) => {
  const nombre = req.query.nombre;
  try {
    const result = await selectConfiguracionNombre2(nombre);
    if (result) {
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datoseee' });
  }
});

// ////////////////
async function selectMultimediaConfig2(nombre: any) {
  try {
    const result = await pool.query(
      ' select * from multimedia where configuracion = $1 ',
      [nombre]
    );
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get('/selectMultimediaConfig', async (req: Request, res: Response) => {
  const nombre = req.query.nombre;
  try {
    const result = await selectMultimediaConfig2(nombre);
    if (result) {
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datoseee' });
  }
});

// ////////////////
async function selectConfiguracion2() {
  try {
    const result = await pool.query(' select nombre from configuracion ');
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get('/selectConfiguracion', async (req: Request, res: Response) => {
  try {
    const result = await selectConfiguracion2();
    if (result) {
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datoseee' });
  }
});

// ////////////////
async function selectAlgoritmosIA2() {
  try {
    const result = await pool.query(' SELECT * FROM algoritmos_ia');
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get('/selectAlgoritmosIA', async (req: Request, res: Response) => {
  try {
    const result = await selectAlgoritmosIA2();
    if (result) {
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datoseee' });
  }
});

// ////////////////
async function selectRegistrosProtocolo2(nombre: any) {
  try {
    const result = await pool.query(
      ' select paciente from registro where protocolo_adquisicion = $1 ',
      [nombre]
    );
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get('/selectRegistrosProtocolo', async (req: Request, res: Response) => {
  const nombre = req.query.nombre;
  try {
    const result = await selectRegistrosProtocolo2(nombre);
    if (result) {
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datoseee' });
  }
});

// ////////////////
async function selectProtocoloDetalle2(nombre: any) {
  try {
    const result = await pool.query(
      ' select * from protocolo_adquisicion where nombre = $1 ',
      [nombre]
    );
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get('/selectProtocoloDetalle', async (req: Request, res: Response) => {
  const nombre = req.query.nombre;
  try {
    const result = await selectProtocoloDetalle2(nombre);
    if (result) {
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datoseee' });
  }
});

// ////////////////
async function selectCorreo(correo: any) {
  try {
    const result = await pool.query(
      ' select * from doctor where email = $1 ',
      [correo]
    );
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get('/selectCorreo', async (req: Request, res: Response) => {
  const correo = req.query.correo;
  try {
    const result = await selectCorreo(correo);
    console.log("Result", result);
    if (result?.length != 0) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datos' });
  }
});

/////////////////////

const sendMail = async(mail: any, codigo: any) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'modularmodular89@gmail.com',
      pass: 'esbumoileykzhtzc' //Esta madre es un código para usar con la app
      // la password normal es: modular123#
    }
  });

  var mailOptions = {
    from: 'modularmodular89@gmail.com',
    to: mail,
    subject: 'Código de verificacion',
    html: `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      <center><h1>¡Hola! Alguien ha pedido un restablecimiento de contraseña registrada a este correo.</h1><center/>
      <center><h1>Este es tu código de verificación </h1><center/>
      <center><h1><b style="font-size: 40px; color: red;">${codigo}</b></h1><center/>
      <center><h1>Si no fuiste tú, ignora este mensaje</h1><center/>
  </body>
  </html>`
  };

  const respuesta = transporter.sendMail(mailOptions, (error: any, info: any) =>{
    if (error) {
      console.log(error);
      return true
    } else {
      console.log('Email sent: ' + info.response);
      return false
    }
  });
  const respuestaFlag: boolean = respuesta as unknown as boolean;
  if (respuestaFlag){
    return true
  }else{
    return false
  }
  }
  ///
app2.get('/mandarCodigo', async (req: Request, res: Response) => {
  const correo = req.query.correo;
  const random = Math.random();
  const scaledRandom1 = random * (9 - 0) + 0;
  const random2 = Math.random();
  const scaledRandom2 = random2 * (9 - 0) + 0;
  const random3 = Math.random();
  const scaledRandom3 = random3 * (9 - 0) + 0;
  const scaledRandom = Math.ceil(scaledRandom1).toString() + Math.ceil(scaledRandom2).toString() + Math.ceil(scaledRandom3).toString()
  const respuesta = await sendMail(correo, scaledRandom);
  console.log(respuesta);
  if(respuesta === false){
    res.send(scaledRandom);
  }else{
    res.send(0);
  }
  //res.send(respuesta);

});
/////////

async function actualizarContrasena(
  password: string,
  email: string,
): Promise<boolean> {
  const client = new Client(credenciales);
  await client.connect();

  try {
    const query =
      "UPDATE doctor set password = crypt($1, gen_salt('bf')) where email=$2";
    const values = [password, email];
    await client.query(query, values);
    await client.end();

    return true;
  } catch (error) {
    console.error('Error al insertar datos', error);
    return false;
  }
}

app2.put('/actualizarContrasena', async (req: Request, res: Response) => {
  try{
    console.log(req.body)
    const {password, email} = req.body;
    const result = await actualizarContrasena(password, email);
    if (result) {
      res.status(200).json({ message: 'Datos insertados correctamente ' });
    } else {
      res.status(500).json({ error: 'Error al insertar datos' });
    }
  }catch(error){
    console.error('Error al insertar datos', error);
    res.status(500).json({ error: 'Error al insertar datos' });
  }


})



// ////////////////
async function selectConfiguracionDetalle2(nombre: any) {
  try {
    const result = await pool.query(
      ' select * from configuracion where nombre = $1 ',
      [nombre]
    );
    return result.rows;
  } catch (error) {
    console.log('Ha ocurrido un error', error);
  } finally {
    await client.close();
  }
}

app2.get('/selectConfiguracionDetalle', async (req: Request, res: Response) => {
  const nombre = req.query.nombre;
  try {
    const result = await selectConfiguracionDetalle2(nombre);
    if (result) {
      res.send(result);
    } else {
      res.status(500).json({ error: 'Error Buscando Datos' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error buscando datoseee' });
  }
});

// ipcMain.on('loggearDoctor', async () => {
//   await conexionPrincipalMongo();
// });

ipcMain.on('loggearDoctor', async (event, user: string, pass: string) => {
  await conexionPrincipalMongo();
  const resp = await iniciarSesion(user, pass);
  console.log(resp);
  mainWindow?.webContents.send('loggearD', resp);
});

async function selectPacienteF(
  nombre: string,
  apellidoP: string,
  apellidoM: string,
  email: string
) {
  const query = await pool.query(
    ' select * from paciente where nombre = $1 and apellido_paterno = $2 and apellido_materno = $3 and email = $4 ',
    [nombre, apellidoP, apellidoM, email]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on(
  'selectPaciente',
  async (
    event,
    nombre: string,
    apellidoP: string,
    apellidoM: string,
    email: string
  ) => {
    const resp = await selectPacienteF(nombre, apellidoP, apellidoM, email);
    console.log(resp);
    mainWindow?.webContents.send('selectP', resp);
  }
);

async function selectPacientes() {
  const query = await pool.query(' select * from paciente  ');
  console.log(query.rows);
  return query.rows;
}

ipcMain.handle('selectPacientes', selectPacientes);

async function insertPaciente(
  usario: string,
  email: string,
  telefono: string,
  fechaNacimiento: any,
  nombre: string,
  apellidoP: string,
  apellidoM: string
) {
  try {
    const query = await pool.query(
      ' insert into paciente (usuario, email, telefono, fecha_nacimiento, nombre, apellido_paterno, apellido_materno) values ($1, $2, $3, $4, $5, $6, $7)  ',
      [usario, email, telefono, fechaNacimiento, nombre, apellidoP, apellidoM]
    );
    console.log(query.rows);
    return query.rows;
  } catch (e: any) {
    console.log('errorr', e);
    return [0, e.detail];
  }
}

ipcMain.on(
  'insertPaciente',
  async (
    event,
    usario: string,
    email: string,
    telefono: string,
    fechaNacimiento: any,
    nombre: string,
    apellidoP: string,
    apellidoM: string
  ) => {
    const resp = await insertPaciente(
      usario,
      email,
      telefono,
      fechaNacimiento,
      nombre,
      apellidoP,
      apellidoM
    );
    console.log(resp);
    mainWindow?.webContents.send('insertP', resp);
  }
);

async function insertModelo(
  modelo: string,
  prueba: string,
  algoritmo_ia: string,
  parametros: any
) {
  try {
    const query = await pool.query(
      ' INSERT INTO implementacion(nombre, prueba, algoritmo_ia, parametros) values ($1,$2,$3,$4)  ',
      [modelo, prueba, algoritmo_ia, parametros]
    );
    console.log(query.rows);
    return query.rows;
  } catch (e: any) {
    console.log('errorr', e);
    return [0, e.detail];
  }
}

ipcMain.on(
  'insertModelo',
  async (
    event,
    modelo: string,
    prueba: string,
    algoritmo_ia: string,
    parametros: any
  ) => {
    const resp = await insertModelo(modelo, prueba, algoritmo_ia, parametros);
    console.log(resp);
    mainWindow?.webContents.send('insertMod', resp);
  }
);

async function selectImplementacionNombreIA(nombre: string) {
  const query = await pool.query(
    ' SELECT * FROM implementacion where algoritmo_ia = $1',
    [nombre]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on('selectImplementacionNombreIA', async (event, nombre) => {
  const resp = await selectImplementacionNombreIA(nombre);
  console.log(resp);
  mainWindow?.webContents.send('selectImplemenIA', resp);
});

async function selectImplementacionPorNombre(nombre: string) {
  const query = await pool.query(
    ' SELECT * FROM implementacion where nombre = $1',
    [nombre]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on('selectImplementacionPorNombre', async (event, nombre) => {
  const resp = await selectImplementacionPorNombre(nombre);
  console.log(resp);
  mainWindow?.webContents.send('selectImplementacionPorN', resp);
});

async function selectModelosNombre() {
  const query = await pool.query(
    ' select nombre, algoritmo_ia from implementacion '
  );
  console.log('Estas son las rows', query.rows);
  return query.rows;
}
ipcMain.handle('selectModelosNombre', selectModelosNombre);

async function selectAlgoritmos() {
  const query = await pool.query(' select * from implementacion ');
  console.log('Estas son las rows', query.rows);
  return query.rows;
}
ipcMain.handle('selectAlgoritmos', selectAlgoritmos);

async function selectProtocolos() {
  const query = await pool.query(' select nombre from protocolo_adquisicion  ');
  console.log(query.rows);
  return query.rows;
}
ipcMain.handle('selectProtocolos', selectProtocolos);

async function insertModeloIA(
  nombre: string,
  algoritmo_ia: string,
  entrenado: boolean,
  protocolo: string,
  resultados: string
) {
  console.log(
    'Recibido',
    nombre,
    algoritmo_ia,
    entrenado,
    protocolo,
    resultados
  );
  const resulsJSON = JSON.parse(resultados);
  try {
    const query = await pool.query(
      ' INSERT INTO modelo(nombre, algoritmo_ia, entrenado, protocolo, resultados) values ($1,$2,$3,$4,$5)  ',
      [nombre, algoritmo_ia, entrenado, protocolo, resulsJSON]
    );
    console.log(query.rows);
    return query.rows;
  } catch (e: any) {
    console.log('ERRORRRRRR', e);
    return [0, e.detail];
  }
}

// ipcMain.handle(
//   'insertModeloIA',
//   async (
//     event,
//     nombre: string,
//     algoritmo_ia: string,
//     entrenado: boolean,
//     protocolo: string
//   ) => await insertModeloIA(nombre, algoritmo_ia, entrenado, protocolo)
// );

ipcMain.on(
  'insertModeloIA',
  async (
    event,
    nombre: string,
    algoritmo_ia: string,
    entrenado: boolean,
    protocolo: string,
    resultados: string
  ) => {
    const resp = await insertModeloIA(
      nombre,
      algoritmo_ia,
      entrenado,
      protocolo,
      resultados
    );
    console.log(resp);
    mainWindow?.webContents.send('insertModIA', resp);
  }
);

async function selectModelosIA() {
  const query = await pool.query(' select * from modelo ');
  console.log('Estas son las rows', query.rows);
  return query.rows;
}
ipcMain.handle('selectModelosIA', selectModelosIA);

async function selectModelosIAPorAlgoritmo(algoritmo: string) {
  const query = await pool.query(
    ' select * from modelo where algoritmo_ia = $1 ',
    [algoritmo]
  );
  console.log('Estas son las rows', query.rows);
  return query.rows;
}
ipcMain.handle('selectModelosIAPorAlgoritmo', (event, algoritmo: string) =>
  selectModelosIAPorAlgoritmo(algoritmo)
);

async function selectModelosIAPorAlgoritmoEntrenado(algoritmo: string) {
  const query = await pool.query(
    ' select * from modelo where algoritmo_ia = $1 and entrenado = true',
    [algoritmo]
  );
  console.log('Estas son las rows', query.rows);
  return query.rows;
}
ipcMain.handle(
  'selectModelosIAPorAlgoritmoEntrenado',
  (event, algoritmo: string) => selectModelosIAPorAlgoritmoEntrenado(algoritmo)
);

async function selectConfiguracionNombre(nombre: string) {
  const query = await pool.query(
    ' select configuracion from protocolo_adquisicion where nombre = $1 ',
    [nombre]
  );
  console.log(query.rows);
  return query.rows;
}

// ipcMain.on('selectConfiguracionNombre', async (event, nombre: string) => {
//   const resp = await selectConfiguracionNombre(nombre);
//   console.log(resp);
//   mainWindow?.webContents.send('selectCN', resp);
// });

ipcMain.handle('selectConfiguracionNombre', (event, nombre: string) =>
  selectConfiguracionNombre(nombre)
);

async function selectMultimediaConfig(nombre: string) {
  const query = await pool.query(
    ' select * from multimedia where configuracion = $1 ',
    [nombre]
  );
  console.log(query.rows);
  return query.rows;
}
ipcMain.handle('selectMultimediaConfig', (event, nombre: string) =>
  selectMultimediaConfig(nombre)
);

// ipcMain.handle('selectMultimediaConfig', async (event, nombre: string) =>);
// ipcMain.handle('selectMultimediaConfig', async (event, nombre: string) => {
//   const resp = await selectMultimediaConfig(nombre);
//   console.log(resp);
//   mainWindow?.webContents.send('selectMC', resp);
// });

async function insertRegistro(
  datosCrudos: any,
  fecha: any,
  pacienteNombre: string,
  protocoloNombre: string
) {
  const query = await pool.query(
    ' insert into registro (datos_crudos, fecha, paciente, protocolo_adquisicion) values($1, $2, $3, $4)  ',
    [datosCrudos, fecha, pacienteNombre, protocoloNombre]
  );
  console.log(query.rows);
  return query.rows;
}
// prueba2();

ipcMain.on(
  'insertRegistro',
  async (
    event,
    datosCrudos: any,
    fecha: any,
    pacienteNombre: string,
    protocoloNombre: string
  ) => {
    const resp = await insertRegistro(
      datosCrudos,
      fecha,
      pacienteNombre,
      protocoloNombre
    );
    console.log(resp);
    mainWindow?.webContents.send('insertR', resp);
  }
);

async function selectConfiguracion() {
  const query = await pool.query(' select nombre from configuracion ');
  console.log('Estas son las rows', query.rows);
  return query.rows;
}
ipcMain.handle('selectConfiguracion', selectConfiguracion);

async function selectAlgoritmosIA() {
  const query = await pool.query(' SELECT * FROM algoritmos_ia ');
  console.log(query.rows);
  return query.rows;
}
ipcMain.handle('selectAlgoritmosIA', selectAlgoritmosIA);
/* ipcMain.on('selectConfiguracion', async (event) => {
  const resp = await selectConfiguracion();
  console.log('Esta es la resp', resp);
  mainWindow?.webContents.send('selectC', resp);
}); */

async function insertConfiguracion(
  configuracionNombre: string,
  configuracionGsr: any,
  configuracionFrecuenciaCardiaca: any,
  configuracionRitmoCardiaco: any,
  configuracionEmgs: any,
  configuracionAcelerometro: any,
  configuracionSubido: any,
  configuracionDescripcion: string
) {
  const query = await pool.query(
    ' insert into configuracion values($1, $2, $3, $4, $5, $6, $7, $8)  ',
    [
      configuracionNombre,
      configuracionGsr,
      configuracionFrecuenciaCardiaca,
      configuracionRitmoCardiaco,
      configuracionEmgs,
      configuracionAcelerometro,
      configuracionSubido,
      configuracionDescripcion,
    ]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on(
  'insertConfiguracion',
  async (
    event,
    configuracionNombre: string,
    configuracionGsr: any,
    configuracionFrecuenciaCardiaca: any,
    configuracionRitmoCardiaco: any,
    configuracionEmgs: any,
    configuracionAcelerometro: any,
    configuracionSubido: any,
    configuracionDescripcion: string
  ) => {
    const resp = await insertConfiguracion(
      configuracionNombre,
      configuracionGsr,
      configuracionFrecuenciaCardiaca,
      configuracionRitmoCardiaco,
      configuracionEmgs,
      configuracionAcelerometro,
      configuracionSubido,
      configuracionDescripcion
    );
    console.log(resp);
    mainWindow?.webContents.send('insertC', resp);
  }
);

async function insertMultimedia(
  multimediaNombre: string,
  link_video: any,
  link_imagen: any,
  subido: any,
  configuracion: string
) {
  const query = await pool.query(
    ' insert into multimedia values($1, $2, $3, $4, $5)  ',
    [multimediaNombre, link_video, link_imagen, subido, configuracion]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on(
  'insertMultimedia',
  async (
    event,
    multimediaNombre: string,
    link_video: any,
    link_imagen: any,
    subido: any,
    configuracion: string
  ) => {
    const resp = await insertMultimedia(
      multimediaNombre,
      link_video,
      link_imagen,
      subido,
      configuracion
    );
    console.log(resp);
    mainWindow?.webContents.send('insertM', resp);
  }
);

async function insertProtocolo(
  protocoloAdquisicionNombre: string,
  protocoloAdquisicionDoctor: string,
  protocoloAdquisicionConfiguracion: string,
  protocoloAdquisicionDescripcion: string
) {
  try {
    const query = await pool.query(
      ' insert into protocolo_adquisicion values($1, $2, $3, $4)  ',
      [
        protocoloAdquisicionNombre,
        protocoloAdquisicionDoctor,
        protocoloAdquisicionConfiguracion,
        protocoloAdquisicionDescripcion,
      ]
    );
    console.log(query.rows);
    return query.rows;
  } catch (e: any) {
    console.log('errorr', e);
    return [0, e.detail];
  }
}
// prueba2();

ipcMain.on(
  'insertProtocolo',
  async (
    event,
    protocoloAdquisicionNombre: string,
    protocoloAdquisicionDoctor: string,
    protocoloAdquisicionConfiguracion: string,
    protocoloAdquisicionDescripcion: string
  ) => {
    const resp = await insertProtocolo(
      protocoloAdquisicionNombre,
      protocoloAdquisicionDoctor,
      protocoloAdquisicionConfiguracion,
      protocoloAdquisicionDescripcion
    );
    console.log(resp);
    mainWindow?.webContents.send('insertPro', resp);
  }
);

async function selectRegistrosProtocolo(nombre: string) {
  const query = await pool.query(
    ' select paciente from registro where protocolo_adquisicion = $1 ',
    [nombre]
  );
  console.log('query', query.rows);
  return query.rows;
}

ipcMain.on('selectRegistrosProtocolo', async (event, nombre: string) => {
  const resp = await selectRegistrosProtocolo(nombre);
  console.log('resp', resp);
  mainWindow?.webContents.send('selectRP', resp);
});

async function selectProtocoloDetalle(nombre: string) {
  const query = await pool.query(
    ' select * from protocolo_adquisicion where nombre = $1 ',
    [nombre]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on('selectProtocoloDetalle', async (event, nombre: string) => {
  const resp = await selectProtocoloDetalle(nombre);
  console.log(resp);
  mainWindow?.webContents.send('selectPD', resp);
});

async function selectConfiguracionDetalle(nombre: string) {
  const query = await pool.query(
    ' select * from configuracion where nombre = $1 ',
    [nombre]
  );
  console.log('consulta', query.rows);
  return query.rows;
}
ipcMain.handle('selectConfiguracionDetalle', (event, nombre: string) =>
  selectConfiguracionDetalle(nombre)
);

async function updateImplementacion(
  precision: string,
  desviacion: string,
  entrenado: string,
  modelo: string
) {
  const query = await pool.query(
    ' UPDATE implementacion SET precision = $1, desviacion_estandar = $2, entrenado = $3 WHERE nombre = $4',
    [precision, desviacion, entrenado, modelo]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on(
  'updateImplementacion',
  async (
    event,
    precision: string,
    desviacion: string,
    entrenado: string,
    modelo: string
  ) => {
    const resp = await updateImplementacion(
      precision,
      desviacion,
      entrenado,
      modelo
    );
    console.log(resp);
    mainWindow?.webContents.send('updateIm', resp);
  }
);

async function updateModelo(
  resultados: string,
  entrenado: string,
  modelo: string
) {
  const resulsJSON = JSON.parse(resultados);
  const query = await pool.query(
    ' UPDATE modelo SET resultados = $1, entrenado = $2 WHERE nombre = $3',
    [resulsJSON, entrenado, modelo]
  );
  console.log(query.rows);
  return query.rows;
}

ipcMain.on(
  'updateModelo',
  async (event, resultados: string, entrenado: string, modelo: string) => {
    const resp = await updateModelo(resultados, entrenado, modelo);
    console.log(resp);
    mainWindow?.webContents.send('updateMod', resp);
  }
);

// Arduino
let serialPort = new SerialPort({
  path: 'COM15',
  baudRate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: 'none',
  autoOpen: true,
});

let parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' })); // Normalizar la impresion

let serialPortArduino1 = new SerialPort({
  path: 'COM18',
  baudRate: 115200,
  dataBits: 8,
  stopBits: 1,
  parity: 'none',
  autoOpen: true,
});

let serialPortArduino2 = new SerialPort({
  path: 'COM18',
  baudRate: 4800,
  dataBits: 8,
  stopBits: 1,
  parity: 'none',
  autoOpen: true,
});

let arduinoPorts: SerialPort[] = [serialPortArduino1, serialPortArduino2];
let arduinoParser = serialPortArduino1.pipe(
  new ReadlineParser({ delimiter: '\r\n' })
);
let arduinoParser2 = serialPortArduino2.pipe(
  new ReadlineParser({ delimiter: '\r\n' })
);

ipcMain.on('loadPort', async (event, opcion, baud) => {
  try {
    if (serialPort.isOpen) {
      serialPort.close();
      serialPort.destroy();
    }
    serialPort = new SerialPort({
      // path: `\\\\.\\` + opcion,
      path: opcion,
      baudRate: baud,
      dataBits: 8,
      stopBits: 1,
      parity: 'none',
      autoOpen: true,
    });
    console.log('PUERTO', serialPort.path);
    console.log('BAUD', serialPort.baudRate);
    parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' })); // Normalizar la impresion
  } catch (error) {
    console.log('ERROR  ', error);
  }
});

ipcMain.on('loadMultiplePorts', async (event, opcion, baud, opcion2, baud2) => {
  try {
    console.log("Start loading process")
    if (serialPortArduino1.isOpen) {
      console.log("Was open 1");
      serialPortArduino1.close();
      serialPortArduino1.destroy();
    } else if (serialPortArduino1){
      console.log("Destroying 1");
      serialPortArduino1.destroy();

    }
    if (serialPortArduino2.isOpen) {
      console.log("Was open 2");
      serialPortArduino2.close();
      serialPortArduino2.destroy();
    } else if (serialPortArduino2){
      console.log("Destroying 2");
      serialPortArduino2.destroy();

    }
    serialPortArduino1 = new SerialPort({
      // path: `\\\\.\\` + opcion,
      // path: "COM40",
      path: opcion,
      baudRate: baud,
      dataBits: 8,
      stopBits: 1,
      parity: 'none',
      autoOpen: true,
    });

    serialPortArduino2 = new SerialPort({
      // path: `\\\\.\\` + opcion,
      path: opcion2,
      baudRate: baud2,
      dataBits: 8,
      stopBits: 1,
      parity: 'none',
      autoOpen: true,
    });
    arduinoParser = serialPortArduino1.pipe(
      new ReadlineParser({ delimiter: '\r\n' })
    );
    arduinoParser2 = serialPortArduino2.pipe(
      new ReadlineParser({ delimiter: '\r\n' })
    );
    arduinoPorts = [serialPortArduino1, serialPortArduino2];
    console.log("Loading process completed")

  } catch (error) {
    console.log('ERROR  WHILE OPEN', error);
  }
});



app2.post('/loadMultiplePorts', async (req: Request, res: Response) => {

  const { opcion, baud, opcion2, baud2 } = req.body;


  try {
    console.log("Current 1", serialPortArduino1)
    if (serialPortArduino1.isOpen) {
      console.log("Was open 1");

      serialPortArduino1.close();
      serialPortArduino1.destroy();
    } else if (serialPortArduino1){
      console.log("Destroying 1");
      serialPortArduino1.destroy();

    }
    if (serialPortArduino2.isOpen) {
      console.log("Was open 2");

      serialPortArduino2.close();
      serialPortArduino2.destroy();
    } else if (serialPortArduino2){
      console.log("Destroying 2");
      serialPortArduino2.destroy();

    }

    serialPortArduino1 = new SerialPort({
      // path: `\\\\.\\` + opcion,
      // path: 'COM40',
      path: opcion,
      baudRate: baud,
      dataBits: 8,
      stopBits: 1,
      parity: 'none',
      autoOpen: true,
    }, (error: any) => {
      if (error) {
        console.error(`El puerto 1 no esta disponible. ${error}`);
        res.status(500).json({ error: `Error al abrir el puerto: ${opcion}` });
      } else {
        console.log(`El puerto 1 esta disponible.`);
      }
    });

    console.log("Current status", serialPortArduino1.isOpen);

    serialPortArduino2 = new SerialPort({
      // path: `\\\\.\\` + opcion,
      path: opcion2,
      baudRate: baud2,
      dataBits: 8,
      stopBits: 1,
      parity: 'none',
      autoOpen: true,
    }, (error: any) => {
      if (error) {
        console.error(`El puerto 2 no esta disponible.`);
        res.status(500).json({ error: `Error al abrir el puerto: ${opcion2}` });
      } else {
        console.log(`El puerto 2 esta disponible.`);
      }
    });



    


    arduinoParser = serialPortArduino1.pipe(
      new ReadlineParser({ delimiter: '\r\n' })
    );
    arduinoParser2 = serialPortArduino2.pipe(
      new ReadlineParser({ delimiter: '\r\n' })
    );
    arduinoPorts = [serialPortArduino1, serialPortArduino2];

    res.send(JSON.stringify({ status: 200, message: "OK" }));

  } catch (error) {
    console.log('ERROR  WHILE OPEN', error);
    res.send(JSON.stringify({ status: 500, message: "Error al abrir el puerto" }));

  }

});


let startFlag = false;
// parser.on('data', (chunk) => {
//   console.log("Starting Test");
//   if (startFlag === true){
//     console.log("parser")
//     mainWindow?.webContents.send('sensoNewTest', chunk);
//   }
// });
// parser.pause()

ipcMain.on('sensoresNewTest', async (event) => {
  // parser._readableState.buffer.clear()
  // parser._readableState.length = 0
  console.log('Starting inside ');
  if (!serialPort.isOpen) {
    serialPort.open();
  }
  startFlag = true;
  parser.resume();
});

async function sensoresStopNewTest() {
  // parser.off('data', console.log);
  if (serialPort.isOpen === true) {
    console.log('Stopping inside');
    serialPort.close();
    startFlag = false;
    parser.pause();
    // parser2.pause()
    // parser._readableState.buffer.clear()
    // parser._readableState.length = 0
    // parser2._readableState.buffer.clear()
    // parser2._readableState.length = 0
    // parser.removeListener('data', )
    // serialPort.reset()
  }
  // parser.write('\x03')
}

ipcMain.on('sensoresStopNewTest', async (event) => {
  const resp = await sensoresStopNewTest();
  mainWindow?.webContents.send('sensoStopNewTest', resp);
});

// eslint-disable-next-line promise/param-names
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
// async function sensores() {
//   // serialPort.isOpen;
//   serialPort.open();
//   let buffer = '';
//   let sum = 0;
//   let gsrAverage = 0;
//   let hr = 0;
//   console.log('ANTES DEE');
//   parser.on('data', async (chunk: any) => {
//     console.log('SIGOOO');
//     for (let i = 0; i < 10; i++) {
//       buffer = '';
//       buffer += chunk;
//       console.log(buffer);
//       sum += parseInt(buffer);
//     }
//     gsrAverage = sum / 10;
//     console.log('Gsr Average', gsrAverage);
//     hr = ((1024 + 2 * gsrAverage) * 1000) / (512 - gsrAverage);
//     console.log('GSR', hr);
//     // const resp = await sleep(10000);
//     // console.log("Resp", resp);
//   });
//   return hr;
// }

async function sensores() {
  console.log('FUNCTION');
  if (!serialPort.isOpen) {
    console.log('IF');
    serialPort.open();
    parser.resume();
  }
  console.log('Inner sensor entered');
  parser.on('data', (chunk: any) => {
    console.log('READING', chunk);
    // try {
    //   event.reply('senso', chunk);
    // } catch (err) {
    //   console.log(err);
    // }
    mainWindow?.webContents.send('senso', chunk);
  });
}
ipcMain.on('sensores', async (event) => {
  // const resp = await sensores();
  // console.log(resp);
  console.log('FUNCTION');

  if (!serialPort.isOpen) {
    console.log('IF');

    serialPort.open();
    parser.resume();
  }
  console.log('Inner sensor entered');

  parser.on('data', (chunk: any) => {
    console.log('READING', chunk);

    // try {
    //   event.reply('senso', chunk);
    // } catch (err) {
    //   console.log(err);
    // }
    mainWindow?.webContents.send('senso', chunk);
  });
});

// app2.post('/recibirDatos', async (req: Request, res: Response) => {
//   try {
//     // Obtener los datos enviados en la solicitud
//     if (!serialPort.isOpen) {
//       serialPort.open();
//       parser.resume();
//     }
//   } catch (error) {
//     console.error('Error al insertar datos', error);
//     res.status(500).json({ error: 'Error al leer' });
//   }
// });

async function sensoresStop() {
  // parser.off('data', console.log);
  console.log('Closing');
  if (serialPort.isOpen) {
    serialPort.close();
    parser.pause();
    // parser.end();
    // parser._readableState.length = 0
  }
  // parser.write('\x03')
  return 'Closed';
}
ipcMain.handle('sensoresStop', sensoresStop);

// const arduinoPorts: SerialPort[] = [serialPortArduino2];
// const arduinoParser2 = arduinoPorts[0].pipe(new ReadlineParser({ delimiter: '\r\n' }));

let arreglo1: Array<String> = [];
let arreglo2: Array<String> = [];

let arreglo1TimeStamp: Array<string> = [];
let arreglo2TimeStamp: Array<string> = [];

// let arduinoParser2 = serialPortArduino2.pipe(new ReadlineParser({ delimiter: '\r\n' }));
ipcMain.on('multiplesSensores', async (event) => {
  // const resp = await sensores();
  // console.log(resp);

  // for (let i = 0; i < arduinoPorts.length; i+=1) {
  //   console.log("Try on port ", arduinoPorts[i].path)
  //   if (!arduinoPorts[i].isOpen) {
  //     console.log("Port Open", arduinoPorts[i].path)
  //     arduinoPorts[i].open();
  //   }
  // }
  // arduinoPorts[0].open();
  // arduinoPorts[1].open();

  console.log('Port1 is open?', arduinoPorts[0].isOpen);
  console.log('Port2 is open?', arduinoPorts[1].isOpen);

  // console.log("Port2 is open?", arduinoPorts[0].isOpen);

  // arduinoParser.resume();
  // arduinoParser2.resume();

  console.log('Inner sensor Multiple ');

  arduinoParser2.on('data', async (chunk: any) => {
    console.log(chunk + ' sensor2');
    // arreglo2.push(chunk);
    mainWindow?.webContents.send('multiplesSenso', chunk + ' sensor2');
  });

  arduinoParser.on('data', async (chunk: any) => {
    console.log(chunk + ' sensor1');
    // arreglo1.push(chunk);
    mainWindow?.webContents.send('multiplesSenso', chunk + ' sensor1');
  });
});



const arr: any = []
const arr2: any = []

// io.on('connection', socket =>{
//     console.log('User connected')

//     // var x = 0
//     // socket.on('message', (data) =>{
//     //     console.log(data)
//     //     x = x + 3
//     //     arr.push(x)
//     //     socket.emit('message', x)
//     // })

//     // var y = 0
//     // socket.on('message2', (data) =>{
//     //     console.log(data)
//     //     y = y + 10
//     //     arr2.push(y)
//     //     socket.emit('message2', y)
//     // })

//     // socket.on('end',  ()=>{
//     //     console.log('User disconected')
//     //     socket.emit('last', arr)
//     //     arr.length = 0
//     //     socket.disconnect(true);
//     // });

//     // socket.on('end2',  ()=>{
//     //     console.log('User disconected')
//     //     socket.emit('last2', arr2)
//     //     arr2.length = 0
//     //     socket.disconnect(true);
//     // });
//     console.log('Port1 is open?', arduinoPorts[0].isOpen);
//     console.log('Port2 is open?', arduinoPorts[1].isOpen);

//     console.log('Inner sensor Multiple ');

//     arduinoParser.resume();
//     arduinoParser2.resume();





//     socket.on('message', (data) =>{
//         arduinoParser.on('data', async (chunk: any) => {
//           console.log(chunk + ' sensor1');
//           arreglo1.push(chunk);
//           // const objTime2 = {
//           //   valor: chunk,
          
//           //   time: new Date()
//           // }
//           arreglo2TimeStamp.push(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
//           socket.emit('message', chunk)
//         });

//         arduinoParser2.on('data', async (chunk: any) => {
//           console.log(chunk + ' sensor2');
//           arreglo2.push(chunk);
//           // const objTime = {
//           //   valor: chunk,
//           //   time: new Date()
//           // }
//           arreglo1TimeStamp.push(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
//           socket.emit('message2', chunk)
//         });
//     })
//     socket.on('message2', (data) =>{
//       // arduinoParser2.on('data', async (chunk: any) => {
//       //   console.log(chunk + ' sensor2');
//       //   arreglo2.push(chunk);
//       //   // const objTime = {
//       //   //   valor: chunk,
//       //   //   time: new Date()
//       //   // }
//       //   arreglo1TimeStamp.push(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
//       //   socket.emit('message2', chunk)
//       // });
//     })
        
//     const data = {
//       arreglo1: arreglo1,
//       arreglo2: arreglo2,
//       arreglo1TimeStamp: arreglo1TimeStamp,
//       arreglo2TimeStamp: arreglo2TimeStamp
//     }
//     socket.on('end',  ()=>{
//         console.log('User disconected')
//         arduinoPorts[0].close();
//         arduinoParser.pause();
        

//         // socket.emit('last', [arreglo1, arreglo2, arreglo1TimeStamp, arreglo2TimeStamp])
//         socket.emit('last', "Final")

//         socket.disconnect(true);

        
//     });

//     socket.on('end2',  ()=>{
//         console.log('User disconected 2')
//         arduinoPorts[1].close();
//         arduinoParser2.pause();

        
//         socket.emit('last2', "Final")
//         socket.disconnect(true);
//         // arreglo1.length = 0;
//         // arreglo1TimeStamp.length = 0;
//         // arreglo2.length = 0;
//         // arreglo2TimeStamp.length = 0;
//     });
// })

app2.get('/multiplesArduinos', (req: Request, res: Response) => {
  console.log('Port1 is open?', arduinoPorts[0].isOpen);
  console.log('Port2 is open?', arduinoPorts[1].isOpen);

  console.log('Inner sensor Multiple ');

  arduinoParser.resume();
  arduinoParser2.resume();

  arduinoParser2.on('data', async (chunk: any) => {
    console.log(chunk + ' sensor2');
    arreglo2.push(chunk);
    // const objTime = {
    //   valor: chunk,
    //   time: new Date()
    // }
    arreglo1TimeStamp.push(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
  });

  arduinoParser.on('data', async (chunk: any) => {
    console.log(chunk + ' sensor1');
    arreglo1.push(chunk);
    // const objTime2 = {
    //   valor: chunk,

    //   time: new Date()
    // }
    arreglo2TimeStamp.push(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
  });

  arduinoParser2.on('close', ()=>{
      console.log("CERRADO")
      res.send(JSON.stringify({ status: 500, message: "Cerrado" }));

  })
  arduinoParser2.on('disconnect', ()=>{
      console.log("DESC")
      res.send(JSON.stringify({ status: 500, message: "Desconectado" }));
  })

  arduinoParser.on('close', ()=>{
    console.log("CERRADO")
    res.send(JSON.stringify({ status: 500, message: "Cerrado" }));

})
  arduinoParser.on('disconnect', ()=>{
      console.log("DESC")
      res.send(JSON.stringify({ status: 500, message: "Desconectado" }));
  })

});

async function sensoresStopMultiple() {
  // parser.off('data', console.log);
  console.log('Closing');
  for (let i = 0; i < arduinoPorts.length; i += 1) {
    if (arduinoPorts[i].isOpen) {
      arduinoPorts[i].close();
      arduinoParser.pause();
      arduinoParser2.pause();
    }
  }
  // mainWindow?.webContents.send('multiplesSenso', arreglo1 + "||||" + arreglo2);

  // parser.write('\x03')
  // return arreglo1 + "||||" + arreglo2;
}
ipcMain.handle('sensoresStopMulti', sensoresStopMultiple);

app2.get('/stopArduinos', async (req: Request, res: Response) => {
  console.log('Closing');
  // for (let i = 0; i < arduinoPorts.length; i += 1) {
  //   if (arduinoPorts[i].isOpen) {
  //     arduinoPorts[i].close();
  //     arduinoParser.pause();
  //     arduinoParser2.pause();
  //   }
  // }

  res.send(JSON.stringify({ status: 200, message: [["INCLX: 213, INCLY: 23, INCLZ: 239"],[`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`],["HRLM: 23, TC: 899, GSR: 2111"],[`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`]] }));

  // arreglo1.length = 0;
  // arreglo2.length = 0;
  // arreglo1TimeStamp.length = 0;
  // arreglo2TimeStamp.length = 0;

  // arreglo1 = [];
  // arreglo2 = [];
  // arreglo1TimeStamp = [];
  // arreglo2TimeStamp = [];
});


app2.get('/stopArduinos2', async (req: Request, res: Response) => {
  console.log('Closing');


  res.send(JSON.stringify({ status: 200, message: [arreglo1, arreglo2, arreglo1TimeStamp, arreglo2TimeStamp] }));

  arreglo1.length = 0;
  arreglo2.length = 0;
  arreglo1TimeStamp.length = 0;
  arreglo2TimeStamp.length = 0;
});

// ipcMain.handle('sensoresStop', async (event) => {
//   const resp = await sensoresStop();
//   console.log(resp);
//   mainWindow?.webContents.send('sensoStop', resp);
// });

// async function puerto(){
//   const puertos = await SerialPort.list()
//   console.log("PUERTOS", puertos)
// }
// puerto()

ipcMain.on('cargarPuertos', async (event) => {
  const puertos = await SerialPort.list();
  console.log('PUERTOS', puertos);
  mainWindow?.webContents.send('cargarP', puertos);
});

// const myWorker = new Worker("worker.ts");
// const myWorker = new Worker("./src/main/worker.ts");

async function testSensores() {
  // if (window.Worker) {
  //   console.log("WEB WORKERS AVAILABLE");
  //   (function() {
  //     myWorker.postMessage([12, 14]);
  //     console.log('Message posted to worker');
  //   })();
  //   // myWorker.on("message") = function(e) {
  //   //   console.log('Message received from worker', e.data);
  //   // }
  // } else {
  //   console.log("WEB WORKERS NOT AVAILABLE");
  // }
}

ipcMain.on('testSensores', async (event) => {
  const resp = await testSensores();
  console.log(resp);
  mainWindow?.webContents.send('testSensores', resp);
});

async function testSensoresStop() {
  // if (window.Worker) {
  //   console.log("WEB WORKER STOP");
  //   myWorker.terminate();
  // } else {
  //   console.log("WEB WORKERS NOT RUNNING");
  // }
}

ipcMain.on('testSensoresStop', async (event) => {
  const resp = await testSensoresStop();
  console.log(resp);
  mainWindow?.webContents.send('testSensoresStop', resp);
});

// Arduino
/* const options = {}
const shellTest = new PythonShell('testing.py', options)

shellTest.on('message', function (message: any) {
  console.log(message);
  return message;
 }); */

/* const funPython = async () => {
  console.log("Llamada");
  let res;
  await PythonShell.run("D:/DocumentosLap/Modular/App de Escritorio/Electron Modular/electron-app/src/pythonScripts/testing.py", options, function(err, results) {
      if(err){
        console.log("err", err)
        return "Error"
      }
      else {
        console.log(results![0]);
        res = results![0]
        console.log("Finished")
        return results;
      }
    }
  )
  console.log("Esta es la res", res);
  return res;
}; */
/* const funPython = PythonShell.run("D:/DocumentosLap/Modular/App de Escritorio/Electron Modular/electron-app/src/pythonScripts/testing.py", options, function(err, results) {
      if(err){
        console.log("err", err)
        return "Error"
      }
      else {
        console.log(results![0]);
        // res = results![0]
        console.log("Finished")
        return results;
      }
    }
  ) */
ipcMain.handle(
  'analisisPython',
  async (
    event,
    tipo: string,
    tipoIA: string,
    params: string,
    nombre: string,
    iteraciones: string,
    reducedPercentage: string,
    datos: string
  ) => {
    const options = {
      // scriptPath: "../pythonScripts/",
      args: [
        tipo,
        tipoIA,
        params,
        nombre,
        iteraciones,
        reducedPercentage,
        datos,
      ],
    };
    console.log('Llamado 2');
    try {
      PythonShell.run(
        `${direcFinal}/pythonScripts/analisis.py`,
        options,
        function (err: any, results: any) {
          if (err) {
            console.log('err', err);
            // return "Error"
          } else {
            console.log(results);
            // res = results![0]
            console.log('Finisheddd');
            mainWindow?.webContents.send('analisisP', results![0]);
          }
        }
      );
    } catch (e: any) {
      console.log('ERROR EN LA EJECUCION', e);
    }
  }
);

ipcMain.handle('preAnalisisPython', async (event, datos: string) => {
  const options = {
    args: [datos],
  };
  console.log('Llamado 3');
  try {
    PythonShell.run(
      `${direcFinal}/pythonScripts/preAnalisis.py`,
      options,
      function (err: any, results: any) {
        if (err) {
          console.log('err', err);
        } else {
          console.log(results);
          mainWindow?.webContents.send('preAnalisisP', results![0]);
        }
      }
    );
  } catch (e: any) {
    console.log('Error', e);
  }
});

async function checkFileExists(filePath: string): Promise<string> {
  try {
    await fsPromises.access(filePath, fsPromises.constants.F_OK); // Esperamos a que se complete la comprobación
    console.log('El archivo existe.');
    return "true";
  } catch (err) {
    console.error('El archivo no existe.');
    return "false";
  }
}

app2.post('/analisisPython', async (req: Request, res: Response, next: any) => {
  const {
    tipo,
    tipoIA,
    params,
    nombre,
    iteraciones,
    reducedPercentage,
    datos } = req.body;
  // const datos = '[[{"colMediaABSEMG1":"5.20","colMedianaEMG1":"5.2","colRMSEMG1":"5.22","colMediaABSEMG2":"8.24","colMedianaEMG2":"8.24","colRMSEMG2":"8.25","colMediaABSEMG3":"7.51","colMedianaEMG3":"7.513999999999999","colRMSEMG3":"7.53","colMediaABSEMG4":"3.78","colMedianaEMG4":"3.7779999999999996","colRMSEMG4":"3.79","colMediaABSGsr":"13.43","colMedianaGsr":"13.428571428571429","colRMSGsr":"13.43","colMediaABSAcelerometroX":"6.70","colMedianaAcelerometroX":"6.696428571428571","colRMSAcelerometroX":"6.70","colMediaABSAcelerometroY":"6.70","colMedianaAcelerometroY":"6.696428571428571","colRMSAcelerometroY":"6.70","colMediaABSAcelerometroZ":"6.70","colMedianaAcelerometroZ":"6.696428571428571","colRMSAcelerometroZ":"6.70","colMediaABSFrecuencia":"13.56","colMedianaFrecuencia":"13.555822328931573","colRMSFrecuencia":"13.56","colMediaABSTemperatura":"13.56","colMedianaTemperatura":"13.555822328931573","colRMSTemperatura":"13.56","etiqueta":"Bueno","nombre":"Natanael Hern├índez V├ízquez"},{"colMediaABSEMG1":"13.49","colMedianaEMG1":"13.498000000000001","colRMSEMG1":"13.50","colMediaABSEMG2":"19.98","colMedianaEMG2":"19.978","colRMSEMG2":"19.99","colMediaABSEMG3":"18.89","colMedianaEMG3":"18.884","colRMSEMG3":"18.90","colMediaABSEMG4":"13.41","colMedianaEMG4":"13.412","colRMSEMG4":"13.42","colMediaABSGsr":"14.86","colMedianaGsr":"14.857142857142858","colRMSGsr":"14.86","colMediaABSAcelerometroX":"7.39","colMedianaAcelerometroX":"7.392857142857142","colRMSAcelerometroX":"7.40","colMediaABSAcelerometroY":"7.39","colMedianaAcelerometroY":"7.392857142857142","colRMSAcelerometroY":"7.40","colMediaABSAcelerometroZ":"7.39","colMedianaAcelerometroZ":"7.392857142857142","colRMSAcelerometroZ":"7.40","colMediaABSFrecuencia":"15.00","colMedianaFrecuencia":"14.996398559423769","colRMSFrecuencia":"15.00","colMediaABSTemperatura":"15.00","colMedianaTemperatura":"14.996398559423769","colRMSTemperatura":"15.00","etiqueta":"Bueno","nombre":"Natanael Hern├índez V├ízquez"}],[{"colMediaABSEMG1":"17.81","colMedianaEMG1":"17.810000000000002","colRMSEMG1":"17.81","colMediaABSEMG2":"2.52","colMedianaEMG2":"2.518","colRMSEMG2":"2.55","colMediaABSEMG3":"6.07","colMedianaEMG3":"6.072","colRMSEMG3":"6.08","colMediaABSEMG4":"3.90","colMedianaEMG4":"3.896","colRMSEMG4":"3.90","colMediaABSGsr":"14.93","colMedianaGsr":"14.926829268292684","colRMSGsr":"14.93","colMediaABSAcelerometroX":"7.60","colMedianaAcelerometroX":"7.601809954751131","colRMSAcelerometroX":"7.60","colMediaABSAcelerometroY":"7.60","colMedianaAcelerometroY":"7.601809954751131","colRMSAcelerometroY":"7.60","colMediaABSAcelerometroZ":"7.60","colMedianaAcelerometroZ":"7.601809954751131","colRMSAcelerometroZ":"7.60","colMediaABSFrecuencia":"15.07","colMedianaFrecuencia":"15.073529411764707","colRMSFrecuencia":"15.08","colMediaABSTemperatura":"15.07","colMedianaTemperatura":"15.073529411764707","colRMSTemperatura":"15.08","etiqueta":"Malo","nombre":"Ivan Castillo Covarrubias"},{"colMediaABSEMG1":"21.91","colMedianaEMG1":"21.912","colRMSEMG1":"21.92","colMediaABSEMG2":"8.19","colMedianaEMG2":"8.192","colRMSEMG2":"8.20","colMediaABSEMG3":"16.28","colMedianaEMG3":"16.252","colRMSEMG3":"16.29","colMediaABSEMG4":"7.39","colMedianaEMG4":"7.392","colRMSEMG4":"7.40","colMediaABSGsr":"14.93","colMedianaGsr":"14.926829268292684","colRMSGsr":"14.93","colMediaABSAcelerometroX":"7.60","colMedianaAcelerometroX":"7.601809954751131","colRMSAcelerometroX":"7.60","colMediaABSAcelerometroY":"7.60","colMedianaAcelerometroY":"7.601809954751131","colRMSAcelerometroY":"7.60","colMediaABSAcelerometroZ":"7.60","colMedianaAcelerometroZ":"7.601809954751131","colRMSAcelerometroZ":"7.60","colMediaABSFrecuencia":"15.07","colMedianaFrecuencia":"15.073529411764707","colRMSFrecuencia":"15.08","colMediaABSTemperatura":"15.07","colMedianaTemperatura":"15.073529411764707","colRMSTemperatura":"15.08","etiqueta":"Malo","nombre":"Ivan Castillo Covarrubias"}],[{"colMediaABSEMG1":"3.57","colMedianaEMG1":"3.572","colRMSEMG1":"3.58","colMediaABSEMG2":"2.03","colMedianaEMG2":"2.032","colRMSEMG2":"2.09","colMediaABSEMG3":"6.38","colMedianaEMG3":"6.38","colRMSEMG3":"6.39","colMediaABSEMG4":"18.49","colMedianaEMG4":"18.490000000000002","colRMSEMG4":"18.49","colMediaABSGsr":"0","colMedianaGsr":"0","colRMSGsr":"0","colMediaABSAcelerometroX":"14.45","colMedianaAcelerometroX":"14.447761194029852","colRMSAcelerometroX":"14.45","colMediaABSAcelerometroY":"14.45","colMedianaAcelerometroY":"14.447761194029852","colRMSAcelerometroY":"14.45","colMediaABSAcelerometroZ":"14.45","colMedianaAcelerometroZ":"14.447761194029852","colRMSAcelerometroZ":"14.45","colMediaABSFrecuencia":"0","colMedianaFrecuencia":"0","colRMSFrecuencia":"0","colMediaABSTemperatura":"0","colMedianaTemperatura":"0","colRMSTemperatura":"0","etiqueta":"Bueno","nombre":"Martin Castro Villa"},{"colMediaABSEMG1":"12.47","colMedianaEMG1":"12.472","colRMSEMG1":"12.47","colMediaABSEMG2":"11.64","colMedianaEMG2":"11.642","colRMSEMG2":"11.65","colMediaABSEMG3":"17.31","colMedianaEMG3":"17.314","colRMSEMG3":"17.32","colMediaABSEMG4":"21.98","colMedianaEMG4":"21.984","colRMSEMG4":"21.99","colMediaABSGsr":"0","colMedianaGsr":"0","colRMSGsr":"0","colMediaABSAcelerometroX":"14.87","colMedianaAcelerometroX":"14.865671641791044","colRMSAcelerometroX":"14.87","colMediaABSAcelerometroY":"14.87","colMedianaAcelerometroY":"14.865671641791044","colRMSAcelerometroY":"14.87","colMediaABSAcelerometroZ":"14.87","colMedianaAcelerometroZ":"14.865671641791044","colRMSAcelerometroZ":"14.87","colMediaABSFrecuencia":"0","colMedianaFrecuencia":"0","colRMSFrecuencia":"0","colMediaABSTemperatura":"0","colMedianaTemperatura":"0","colRMSTemperatura":"0","etiqueta":"Bueno","nombre":"Martin Castro Villa"}],[{"colMediaABSEMG1":"4.56","colMedianaEMG1":"4.556","colRMSEMG1":"4.59","colMediaABSEMG2":"6.21","colMedianaEMG2":"6.21","colRMSEMG2":"6.21","colMediaABSEMG3":"7.73","colMedianaEMG3":"7.728","colRMSEMG3":"7.73","colMediaABSEMG4":"6.28","colMedianaEMG4":"6.28","colRMSEMG4":"6.30","colMediaABSGsr":"0","colMedianaGsr":"0","colRMSGsr":"0","colMediaABSAcelerometroX":"17.40","colMedianaAcelerometroX":"17.398981324278438","colRMSAcelerometroX":"17.40","colMediaABSAcelerometroY":"17.40","colMedianaAcelerometroY":"17.398981324278438","colRMSAcelerometroY":"17.40","colMediaABSAcelerometroZ":"17.40","colMedianaAcelerometroZ":"17.398981324278438","colRMSAcelerometroZ":"17.40","colMediaABSFrecuencia":"0","colMedianaFrecuencia":"0","colRMSFrecuencia":"0","colMediaABSTemperatura":"0","colMedianaTemperatura":"0","colRMSTemperatura":"0","etiqueta":"Malo","nombre":"Franco Gutierrez Sanchez"},{"colMediaABSEMG1":"13.47","colMedianaEMG1":"13.458","colRMSEMG1":"13.47","colMediaABSEMG2":"11.52","colMedianaEMG2":"11.524","colRMSEMG2":"11.53","colMediaABSEMG3":"17.31","colMedianaEMG3":"17.314","colRMSEMG3":"17.32","colMediaABSEMG4":"18.37","colMedianaEMG4":"18.372","colRMSEMG4":"18.38","colMediaABSGsr":"0","colMedianaGsr":"0","colRMSGsr":"0","colMediaABSAcelerometroX":"17.66","colMedianaAcelerometroX":"17.66383701188455","colRMSAcelerometroX":"17.66","colMediaABSAcelerometroY":"17.66","colMedianaAcelerometroY":"17.66383701188455","colRMSAcelerometroY":"17.66","colMediaABSAcelerometroZ":"17.66","colMedianaAcelerometroZ":"17.66383701188455","colRMSAcelerometroZ":"17.66","colMediaABSFrecuencia":"0","colMedianaFrecuencia":"0","colRMSFrecuencia":"0","colMediaABSTemperatura":"0","colMedianaTemperatura":"0","colRMSTemperatura":"0","etiqueta":"Malo","nombre":"Franco Gutierrez Sanchez"}],[{"colMediaABSEMG1":"10.28","colMedianaEMG1":"10.277999999999999","colRMSEMG1":"10.28","colMediaABSEMG2":"7.87","colMedianaEMG2":"7.866","colRMSEMG2":"7.88","colMediaABSEMG3":"14.37","colMedianaEMG3":"14.368","colRMSEMG3":"14.37","colMediaABSEMG4":"5.34","colMedianaEMG4":"5.336","colRMSEMG4":"5.35","colMediaABSGsr":"0","colMedianaGsr":"0","colRMSGsr":"0","colMediaABSAcelerometroX":"19.21","colMedianaAcelerometroX":"19.212355212355213","colRMSAcelerometroX":"19.21","colMediaABSAcelerometroY":"19.21","colMedianaAcelerometroY":"19.212355212355213","colRMSAcelerometroY":"19.21","colMediaABSAcelerometroZ":"19.21","colMedianaAcelerometroZ":"19.212355212355213","colRMSAcelerometroZ":"19.21","colMediaABSFrecuencia":"0","colMedianaFrecuencia":"0","colRMSFrecuencia":"0","colMediaABSTemperatura":"0","colMedianaTemperatura":"0","colRMSTemperatura":"0","etiqueta":"Bueno","nombre":"Rocio Castillo Vargas"},{"colMediaABSEMG1":"16.94","colMedianaEMG1":"16.936","colRMSEMG1":"16.94","colMediaABSEMG2":"17.80","colMedianaEMG2":"17.8","colRMSEMG2":"17.80","colMediaABSEMG3":"20.89","colMedianaEMG3":"20.884","colRMSEMG3":"20.90","colMediaABSEMG4":"16.22","colMedianaEMG4":"16.222","colRMSEMG4":"16.23","colMediaABSGsr":"0","colMedianaGsr":"0","colRMSGsr":"0","colMediaABSAcelerometroX":"19.31","colMedianaAcelerometroX":"19.305019305019304","colRMSAcelerometroX":"19.31","colMediaABSAcelerometroY":"19.31","colMedianaAcelerometroY":"19.305019305019304","colRMSAcelerometroY":"19.31","colMediaABSAcelerometroZ":"19.31","colMedianaAcelerometroZ":"19.305019305019304","colRMSAcelerometroZ":"19.31","colMediaABSFrecuencia":"0","colMedianaFrecuencia":"0","colRMSFrecuencia":"0","colMediaABSTemperatura":"0","colMedianaTemperatura":"0","colRMSTemperatura":"0","etiqueta":"Bueno","nombre":"Rocio Castillo Vargas"}],[{"colMediaABSEMG1":"15.64","colMedianaEMG1":"15.636","colRMSEMG1":"15.65","colMediaABSEMG2":"3.88","colMedianaEMG2":"3.884","colRMSEMG2":"3.89","colMediaABSEMG3":"4.63","colMedianaEMG3":"4.628","colRMSEMG3":"4.64","colMediaABSEMG4":"5.46","colMedianaEMG4":"5.454000000000001","colRMSEMG4":"5.46","colMediaABSGsr":"0","colMedianaGsr":"0","colRMSGsr":"0","colMediaABSAcelerometroX":"20.25","colMedianaAcelerometroX":"20.24763903462749","colRMSAcelerometroX":"20.25","colMediaABSAcelerometroY":"20.25","colMedianaAcelerometroY":"20.24763903462749","colRMSAcelerometroY":"20.25","colMediaABSAcelerometroZ":"20.25","colMedianaAcelerometroZ":"20.24763903462749","colRMSAcelerometroZ":"20.25","colMediaABSFrecuencia":"0","colMedianaFrecuencia":"0","colRMSFrecuencia":"0","colMediaABSTemperatura":"0","colMedianaTemperatura":"0","colRMSTemperatura":"0","etiqueta":"Malo","nombre":"Isaac Rayas Chacon"},{"colMediaABSEMG1":"20.41","colMedianaEMG1":"20.408","colRMSEMG1":"20.41","colMediaABSEMG2":"20.57","colMedianaEMG2":"20.57","colRMSEMG2":"20.57","colMediaABSEMG3":"15.73","colMedianaEMG3":"15.736","colRMSEMG3":"15.74","colMediaABSEMG4":"22.08","colMedianaEMG4":"22.078","colRMSEMG4":"22.08","colMediaABSGsr":"0","colMedianaGsr":"0","colRMSGsr":"0","colMediaABSAcelerometroX":"20.32","colMedianaAcelerometroX":"20.323189926547744","colRMSAcelerometroX":"20.32","colMediaABSAcelerometroY":"20.32","colMedianaAcelerometroY":"20.323189926547744","colRMSAcelerometroY":"20.32","colMediaABSAcelerometroZ":"20.32","colMedianaAcelerometroZ":"20.323189926547744","colRMSAcelerometroZ":"20.32","colMediaABSFrecuencia":"0","colMedianaFrecuencia":"0","colRMSFrecuencia":"0","colMediaABSTemperatura":"0","colMedianaTemperatura":"0","colRMSTemperatura":"0","etiqueta":"Malo","nombre":"Isaac Rayas Chacon"}]]'
  console.log('PARAMS', tipo,
  tipoIA,
  params,
  nombre,
  iteraciones,
  reducedPercentage,
  datos);

  const options = {
    args: [
      tipo,
      tipoIA,
      params,
      nombre,
      iteraciones,
      reducedPercentage,
      datos,
    ],
  };

  // res.send(JSON.stringify({ status: 200, message: 'asdddddddddddddddddd' }));
  // try {
  //   PythonShell.run(
  //     `${direcFinal}/pythonScripts/analisis.py`,
  //     options,
  //     function (err, results) {
  //       if (err) {
  //         console.log('err', err);
  //         // return "Error"
  //       } else {
  //         console.log(results);
  //         // res = results![0]
  //         console.log('Finisheddd');
  //         mainWindow?.webContents.send('analisisP', results![0]);
  //       }
  //     }
  //   );
  // } catch (e: any) {
  //   console.log('ERROR EN LA EJECUCION', e);
  // }

  const filePath = `${direcFinal}/pythonScripts/Modelos/${nombre}.joblib`;
  let existente = await checkFileExists(filePath);
  // fs.access(filePath, fs.constants.F_OK, (err) => {
  //   if (err) {
  //     console.log('El archivo no existe.');
  //   } else {
  //     console.log('El archivo existe.');
  //     existente = "true";
  //   }
  // });
  console.log("ESTE ES EL VALOR DE EXISTENTE", existente);
  const pythonProcess = await spawnSync('python', [
    `${direcFinal}/pythonScripts/analisis.py`,
      tipo,
      tipoIA,
      params,
      nombre,
      iteraciones,
      reducedPercentage,
      datos,
      existente,
  ]);

  const result = pythonProcess.stdout?.toString()?.trim();
  const error = pythonProcess.stderr?.toString()?.trim();

  let retrieved;
  fs.readFile(`${direcFinal}/pythonScripts/resultados.txt`, 'utf8', function(err, data){

    console.log("DATOS", data);
    console.log("Err", err);
    console.log("RESULT", result);

    const arregloDeValores = data.split("|");

    const posiblesesultados: string[] = ["Tree", "KNN", "SVM", "Red"];
    // Display the file content
    retrieved = data;
    if (posiblesesultados.includes(arregloDeValores[0])) {
      console.log("OK", retrieved);
      res.send({ status: 200, message: retrieved })
    } else {
      console.log("ERROR", error);
      console.log("ERROR RETR", retrieved);

      res.send(JSON.stringify({ status: 500, message: retrieved }))
    }
  });


});


ipcMain.handle(
  'arduinoTest',
  async (event, duration: string, cantidadEmgs: string) => {
    const options = {
      args: [duration, cantidadEmgs],
    };
    console.log('Llamado Arduino Test');
    try {
      PythonShell.run(
        `${direcFinal}/pythonScripts/nidaqTest.py`,
        options,
        function (err: any, results: any) {
          if (err) {
            console.log('err', err);
          } else {
            console.log(results);
            mainWindow?.webContents.send('arduinoT', results![0]);
          }
        }
      );
    } catch (e: any) {
      console.log('Error', e);
    }
  }
);

let isKilled = false;

app2.get('/killStatus', async (req: Request, res: Response, next: any) => {
  console.log("Checking process", isKilled);

  if(isKilled) {
    console.log("Response true");
    res.send(
      JSON.stringify({
        status: 200,
        message:
          'Killed'
      })
    );
  } else {
    console.log("Response false");
    res.send(
      JSON.stringify({
        status: 200,
        message:
          'Not Killed'
      })
    );
  }


});

let pythonProcess: ChildProcess;


app2.get('/switchKilled', async (req: Request, res: Response, next: any) => {
  console.log("Switch value process");
  pythonProcess.stdin!.end();


  pythonProcess.kill('SIGKILL');
  isKilled = false;

  arreglo1 = [];
  arreglo2 = [];
  arreglo1TimeStamp = [];
  arreglo2TimeStamp = [];

  for (let i = 0; i < arduinoPorts.length; i += 1) {
    if (arduinoPorts[i].isOpen) {
      arduinoPorts[i].close();
      arduinoParser.pause();
      arduinoParser2.pause();
    }
  }


  res.send(
    JSON.stringify({
      status: 200,
      message:
        'Status changed'
    })
  );

});

app2.get('/stopNidaq', async (req: Request, res: Response, next: any) => {
  console.log("Killing process");
  isKilled = true;
  pythonProcess.stdin!.end();


  pythonProcess.kill('SIGKILL');

  if (pythonProcess && typeof pythonProcess.pid === 'number') {
    terminate(pythonProcess.pid, (err: any) => {
      if (err) {
        console.error("Error", err);
      } else {
        console.log("Proceso terminado exitosamente.");
      }
    });
  } 


  // const terminate = require('terminate')
  // terminate(pythonProcess.pid, (err: any) => console.log("Error", err))

  res.send(
    JSON.stringify({
      status: 200,
      message:
        'child process exited with killed'
    })
  );

});

app2.get('/nidaq', async (req: Request, res: Response, next: any) => {
  const duracion = req.query.duracion as string;
  const cantidadEmgs = req.query.cantidadEmgs as string;

  console.log('PARAMS', duracion, cantidadEmgs);
  console.log('Port1 is open outsideM Module?', arduinoPorts[0].isOpen);
  pythonProcess = spawn('python', [
    `${direcFinal}/pythonScripts/nidaqTest.py`,
    duracion,
    cantidadEmgs,
    direcFinal,
  ]);

  pythonProcess.on('close', function (code: any, signal: any) {
    const result = pythonProcess.stdout?.toString()?.trim();
    const error = pythonProcess.stderr?.toString()?.trim();
    const strResult = result;
    console.log(
      'child process exited with ' + `code ${code} and signal ${signal}`
    );
    res.send(
      JSON.stringify({
        status: 200,
        message:
          'child process exited with ' + `code ${code} and signal ${signal}`,
      })
    );
  });

  // pythonProcess.kill();f

  // console.log("PY", pythonProcess);
  // console.log("RES", result);
  // Comprobacion basada en el print cambiar de acuerdo a lo que se retornara
  // const status = result === 'OK';
  // if (status) {
  //   res.send(strResult)
  // } else {
  //   console.log(error)
  //   res.send(JSON.stringify({ status: 200, message: strResult }))
  //   // res.send(JSON.stringify({ status: 500, message: 'Server error' }))
  // }
});




app2.get('/nidaqMul', async (req: Request, res: Response, next: any) => {
  const duracion = req.query.duracion as string;
  const cantidadEmgs = req.query.cantidadEmgs as string;
  const cantidadArduinos = req.query.arduinos as string;



  console.log('PARAMS', duracion, cantidadEmgs, cantidadArduinos);


  if(cantidadArduinos !== "0") {
    console.log('Port1 is open?', arduinoPorts[0].isOpen);
    console.log('Port2 is open?', arduinoPorts[1].isOpen);
  
    console.log('Inner sensor Multiple ');
  
    arduinoParser.resume();
    arduinoParser2.resume();
  
    arduinoParser2.on('data', async (chunk: any) => {
      console.log(chunk + ' sensor2');
      arreglo2.push(chunk);
      // const objTime = {
      //   valor: chunk,
      //   time: new Date()
      // }
      arreglo1TimeStamp.push(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
    });
  
    arduinoParser.on('data', async (chunk: any) => {
      console.log(chunk + ' sensor1');
      arreglo1.push(chunk);
      // const objTime2 = {
      //   valor: chunk,
  
      //   time: new Date()
      // }
      arreglo2TimeStamp.push(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
    });
  }




  pythonProcess = spawn('python', [
    `${direcFinal}/pythonScripts/nidaqTest.py`,
    duracion,
    cantidadEmgs,
    direcFinal,
  ]);

  pythonProcess.on('exit', function (code: any, signal: any) {
    const result = pythonProcess.stdout?.toString()?.trim();
    const error = pythonProcess.stderr?.toString()?.trim();
    const strResult = result;
    console.log(
      'child process exited with ' + `code ${code} and signal ${signal}`
    );
    console.log('Closing');
    for (let i = 0; i < arduinoPorts.length; i += 1) {
      if (arduinoPorts[i].isOpen) {
        arduinoPorts[i].close();
        arduinoParser.pause();
        arduinoParser2.pause();
      }
    }
    // res.send(
    //   JSON.stringify({
    //     status: 200,
    //     message:
    //       'child process exited with ' + `code ${code} and signal ${signal}`,
    //   })
    // );
    // pythonProcess.disconnect();
    pythonProcess.stdin!.end();


    if (signal !== null && signal.includes("SIGKILL")) {
      res.send(JSON.stringify({ status: 500, message: "SIGKILL" }));

    } else {
      res.send(JSON.stringify({ status: 200, message: [arreglo1, arreglo2, arreglo1TimeStamp, arreglo2TimeStamp] }));
    }


  });

});


const convertObjToCsv = (signals: any) => {
  const claves = Object.keys(signals);
  let csv = claves.join(',') + '\n';

  const longitudMaxima = Math.max(
    ...claves.map((clave) => signals[clave].length)
  );

  for (let i = 0; i < longitudMaxima; i += 1) {
    const fila = claves.map((clave) => signals[clave][i] || '').join(',');
    csv += fila + '\n';
  }

  return csv;
};






app2.post('/generarCsv', async (req: Request, res: Response) => {
  try {
    // Obtener los datos enviados en la solicitud
    const nombre = req.query.nombre as string;
    console.log('Body', req.body);
    const csvObj = convertObjToCsv(req.body);
    console.log('CSV', csvObj);
    const nombreArchivo = nombre || 'arduinoData';

    fs.writeFile(`${direcFinal}/main/archivosCsv/${nombreArchivo}`, csvObj, function(err) {
    // fs.writeFile(
    //   `D:/KAREN/Modular/electron-app/${nombreArchivo}`,
    //   csvObj,
    //   function (err) {
        // fs.writeFile(`${direcFinal}/main/archivosCsv/${nombreArchivo}`, csvObj, function(err) {
        if (err) {
          console.error('Error al guardar el archivo:', err);
          throw err;
        } else {
          console.log('El archivo se ha guardado exitosamente:', nombreArchivo);
          res.send(JSON.stringify({ status: 200, message: 'OK' }));
        }
      }
    );
  } catch (error) {
    console.error('Error al insertar datos', error);
    res.status(500).json({ error: 'Error al insertar datos' });
  }
});

app2.get('/obtenerObjDeCsv', async (req: Request, res: Response, next: any) => {

  try {

    const contenido = fs.readFileSync(`${direcFinal}/main/archivosCsv/resultadoEmgs.csv`, 'utf-8');

    // const contenido = fs.readFileSync(
    //   `D:/KAREN/Modular/electron-app/resultadoEmgs.csv`,
    //   'utf-8'
    // );
    const filas = contenido.split('\n');
    const cabeceras = filas[0].split(',');
    const objetos = [];

    for (let i = 1; i < filas.length; i++) {
      const valores = filas[i].split(',');
      const objeto: any = {};

      for (let j = 0; j < cabeceras.length; j++) {
        let clave = cabeceras[j];
        let valor = valores[j];

        if (clave !== undefined) {
          clave = clave.trim();
        }

        if (valor !== undefined) {
          valor = valor.trim();
        }
        if (clave !== "tiempoEmg") {
          let num = parseFloat(valor);
          if(isNaN(num)) {
            num = 0;
          }
          const resultadoVerdadero = num / 1500;
          objeto[clave] = resultadoVerdadero;
        }
        else {
          objeto[clave] = valor;
        }
      }

      objetos.push(objeto);
    }
    res.send(JSON.stringify({ status: 200, message: objetos }));
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    res.status(500).json({ error: 'Error al leer el archivo ' + error });
  }
});



app2.get('/obtenerTxt', async (req: Request, res: Response, next: any) => {

  try {
    // const contenido = fs.readFileSync(`${direcFinal}/main/archivosCsv/resultadoEmgs.csv`, 'utf-8');
    const contenido = fs.readFileSync(`${direcFinal}/main/archivosCsv/signals2.txt`, 'utf-8');

      // Si el contenido es JSON, conviértelo en un objeto
      const miObjeto = JSON.parse(contenido);

      const sendObj = JSON.stringify(miObjeto);

    res.send(JSON.stringify({ status: 200, message: sendObj }));
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    res.status(500).json({ error: 'Error al leer el archivo ' + error });
  }
});

