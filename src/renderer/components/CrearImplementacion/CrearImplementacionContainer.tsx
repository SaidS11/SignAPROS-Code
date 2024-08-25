/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */
import React from 'react';
import { TableOptions, Column } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { useCustomDispatch } from '../../../redux/hooks';
import { setErrorDetails, setFailUpload, setFallosAlCargar, setIsLoading, setIsUploaded } from '../../../redux/slices/StatusSlice';
import CrearImplementacion from './CrearImplementacion';
import { apiEndpoint } from '../Utilities/Constants';

const CrearImplementacionContainer = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();

  async function insertData(modelo: string, descripcion: string, algoritmo: string, params: any) {
    const implementacionObj = {
      nombre: modelo,
      descripcion,
      algoritmo_ia: algoritmo,
      parametros: params
    }
    const insertImplementacion = await fetch(`${apiEndpoint}/insertarImplementacion`, {
      method: 'POST',
      body: JSON.stringify(implementacionObj),
      headers: {'Content-Type': 'application/json'}
    });
    if (insertImplementacion.status === 500){
      // alert("Error al copiar los archivos: " + response.statusText);
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails(`Problems while adding the configuration: ${  insertImplementacion.statusText}`));
      return;
    } 
    appDispatch(setIsUploaded(true));
    // window.Bridge.insertModelo(modelo, descripcion, algoritmo, params);
  }
  // window.Bridge.insertMod((event: any, resp: any) => {
  //   console.log('Esta es mi resp', resp)
  //   if (resp[0] === 0) {
  //     console.log('Despacho error', resp[1]);
  //     appDispatch(setFailUpload(true));
  //     appDispatch(setIsLoading(false));
  //     appDispatch(setErrorDetails(resp[1]))
  //   } else {
  //     console.log('No despacho error');
  //     appDispatch(setIsLoading(false));
  //     appDispatch(setIsUploaded(true));
  //   }
  // });
  const onClickNav = async (e: React.FormEvent<HTMLFormElement>) => {
    appDispatch(setIsLoading(true));
    e.preventDefault();
    const form = document.querySelector('form') as HTMLFormElement | undefined;
    const dataF = Object.fromEntries(new FormData(form).entries());
    console.log('la data', dataF);
    if (dataF.algoritmo === 'Arbol de Decisión') {
      const params = {
        profundidad: dataF.profundidad,
        estado: dataF.estado
      }
      console.log(params);
      await insertData(dataF.nombreModelo as string, dataF.descripcion as string, dataF.algoritmo as string, params)
    }
    if (dataF.algoritmo === 'K-Nearest Neighbor') {
      const params = {
        vecinos: dataF.vecinos,
      }
      console.log(params);
      await insertData(dataF.nombreModelo as string, dataF.descripcion as string, dataF.algoritmo as string, params)
    }
    if (dataF.algoritmo === 'Maquina de Soporte Vectorial') {
      const params = {
        kernel: dataF.kernel,
      }
      console.log(params);
      await insertData(dataF.nombreModelo as string, dataF.descripcion as string, dataF.algoritmo as string, params)
    }
    if (dataF.algoritmo === 'Red Neuronal') {
      const arregloNeuronas: any[] = [];

      for (const clave in dataF) {
        if (clave.includes("neurona")) {
          arregloNeuronas.push(dataF[clave]);
        }
      }
      const params = {
        capas: dataF.capas,
        neuronas: arregloNeuronas,
        funcion: dataF.funcion,
        tasa: dataF.tasa
      }
      console.log(params);
      await insertData(dataF.nombreModelo as string, dataF.descripcion as string, dataF.algoritmo as string, params)
    }
    appDispatch(setIsLoading(false));
    navigate('/verImplementaciones')


  };

  return <CrearImplementacion onClickNav={onClickNav}/>;
};

export default CrearImplementacionContainer;
