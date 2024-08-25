import Plot from 'react-plotly.js';
import SensoresAdquisicionGraficar from './SensoresAdquisicionGraficar';
import { numOfPlotsToRender } from '../Utilities/Constants';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';
import { useState } from 'react';

interface SensoresGraficaContainerInterfcace {
    cantidadEmgs: number;
    emgData: any;
    arduinoData: any;
}

const SensoresAdquisicionGraficarContainer = (props: SensoresGraficaContainerInterfcace) => {
    const { cantidadEmgs, emgData, arduinoData } = props;
    console.log("Cantidad", cantidadEmgs)
    console.log("Data", emgData);
    console.log("ARD", arduinoData);

    const gsrIsChecked = useCustomSelector(
        (state) => state.señales.gsrIsChecked
    );

    const frecuenciaCardiacaIsChecked = useCustomSelector(
        (state) => state.señales.frecuenciaIsChecked
    );

    const acelerometroIsChecked = useCustomSelector(
        (state) => state.señales.acelerometroIsChecked
    );

    const temperaturaIsChecked = useCustomSelector(
        (state) => state.señales.temperaturaIsChecked
    );
    
    let cantidadDeGraficas = cantidadEmgs
    cantidadDeGraficas = cantidadDeGraficas + (gsrIsChecked ? 1 : 0);
    cantidadDeGraficas = cantidadDeGraficas + (temperaturaIsChecked ? 1 : 0);
    cantidadDeGraficas = cantidadDeGraficas + (frecuenciaCardiacaIsChecked ? 1 : 0);
    cantidadDeGraficas = cantidadDeGraficas + (acelerometroIsChecked ? 3 : 0);


    console.log("CANTIDAD", cantidadDeGraficas);
    const gridLayout = numOfPlotsToRender(cantidadDeGraficas);

    let dataYEmg1;
    let dataXEmg1;

    let dataY2Emg2;
    let dataX2Emg2;
    
    let dataY3Emg3;
    let dataX3Emg3;
    
    let dataY4Emg4;
    let dataX4Emg4;

    let dataGsrX;
    let dataGsrY;

    let dataFrecuenciaX;
    let dataFrecuenciaY;

    // Inclinacion de X se refiere a la medicion de INCLX y el eje se refiere a la grafica donde se desplegara...
    let dataAcelerometroInclinacionDeXEjeX;
    let dataAcelerometroInclinacionDeXEjeY;
    let dataAcelerometroInclinacionDeYEjeX;
    let dataAcelerometroInclinacionDeYEjeY;
    let dataAcelerometroInclinacionDeZEjeX;
    let dataAcelerometroInclinacionDeZEjeY;

    let dataTemperaturaX;
    let dataTemperaturaY;



    if(cantidadEmgs >= 1) {
        dataYEmg1 = emgData.emg1
        dataXEmg1 = Array.from({ length: dataYEmg1.length }, (_, i) => i);
    }

    if(cantidadEmgs >= 2) {
        dataY2Emg2 = emgData.emg2
        dataX2Emg2 = Array.from({ length: dataY2Emg2.length }, (_, i) => i);
    }

    if(cantidadEmgs >= 3) {
        dataY3Emg3 = emgData.emg3
        dataX3Emg3 = Array.from({ length: dataY3Emg3.length }, (_, i) => i);
    }

    if(cantidadEmgs >= 4) {
        dataY4Emg4 = emgData.emg4
        dataX4Emg4 = Array.from({ length: dataY4Emg4.length }, (_, i) => i);
    }

    if(gsrIsChecked) {
        dataGsrY = arduinoData.GSR
        dataGsrX = Array.from({ length: dataGsrY.length }, (_, i) => i);
    }

    if(frecuenciaCardiacaIsChecked) {
        dataFrecuenciaY = arduinoData.HRLM
        dataFrecuenciaX = Array.from({ length: dataFrecuenciaY.length }, (_, i) => i);
    }

    if(acelerometroIsChecked) {
        dataAcelerometroInclinacionDeXEjeY = arduinoData.INCLX
        dataAcelerometroInclinacionDeXEjeX = Array.from({ length: dataAcelerometroInclinacionDeXEjeY.length }, (_, i) => i);

        dataAcelerometroInclinacionDeYEjeY = arduinoData.INCLY
        dataAcelerometroInclinacionDeYEjeX = Array.from({ length: dataAcelerometroInclinacionDeYEjeY.length }, (_, i) => i);

        dataAcelerometroInclinacionDeZEjeY = arduinoData.INCLZ
        dataAcelerometroInclinacionDeZEjeX = Array.from({ length: dataAcelerometroInclinacionDeZEjeY.length }, (_, i) => i);
    }

    if(temperaturaIsChecked) {
        dataTemperaturaY = arduinoData.TC
        dataTemperaturaX = Array.from({ length: dataTemperaturaY.length }, (_, i) => i);
    }

    // Implememtar if para cuando los datos no tienen el mismo largo

    const trace1 = {
        x: dataXEmg1,
        y: dataYEmg1,
        xaxis: 'x1',
        yaxis: 'y1',
        type: 'scatter',
        line: { color: 'blue' },
        mode: 'markers+lines',
        name: 'EMG1',
    };

    const trace2 = {
        x: dataX2Emg2,
        y: dataY2Emg2,
        xaxis: 'x2',
        yaxis: 'y2',
        type: 'scatter',
        line: { color: 'skyblue' },
        mode: 'markers+lines',
        name: 'EMG2',
    };

    const trace3 = {
        x: dataX3Emg3,
        y: dataY3Emg3,
        xaxis: 'x3',
        yaxis: 'y3',
        type: 'scatter',
        line: { color: 'cyan' },
        mode: 'markers+lines',
        name: 'EMG3',
    };


    const trace4 = {
        x: dataX4Emg4,
        y: dataY4Emg4,
        xaxis: 'x4',
        yaxis: 'y4',
        type: 'scatter',
        line: { color: 'black' },
        mode: 'markers+lines',
        name: 'EMG4',
    };

    const trace5 = {
        x: dataGsrX,
        y: dataGsrY,
        xaxis: 'x5',
        yaxis: 'y5',
        type: 'scatter',
        line: { color: 'gray' },
        mode: 'markers+lines',
        name: 'GSR',
    };

    const trace6 = {
        x: dataTemperaturaX,
        y: dataTemperaturaY,
        xaxis: 'x6',
        yaxis: 'y6',
        type: 'scatter',
        line: { color: 'red' },
        mode: 'markers+lines',
        name: 'TC',
    };

    const trace7 = {
        x: dataFrecuenciaX,
        y: dataFrecuenciaY,
        xaxis: 'x7',
        yaxis: 'y7',
        type: 'scatter',
        line: { color: 'orange' },
        mode: 'markers+lines',
        name: 'HRLM',
    };

    const trace8 = {
        x: dataAcelerometroInclinacionDeXEjeX,
        y: dataAcelerometroInclinacionDeXEjeY,
        xaxis: 'x8',
        yaxis: 'y8',
        type: 'scatter',
        line: { color: 'yellow' },
        mode: 'markers+lines',
        name: 'INCLX',
    };

    const trace9 = {
        x: dataAcelerometroInclinacionDeYEjeX,
        y: dataAcelerometroInclinacionDeYEjeY,
        xaxis: 'x9',
        yaxis: 'y9',
        type: 'scatter',
        line: { color: 'green' },
        mode: 'markers+lines',
        name: 'INCLY',
    };

    const trace10 = {
        x: dataAcelerometroInclinacionDeZEjeX,
        y: dataAcelerometroInclinacionDeZEjeY,
        xaxis: 'x10',
        yaxis: 'y10',
        type: 'scatter',
        line: { color: 'brown' },
        mode: 'markers+lines',
        name: 'INCLZ',
    };


    const dataArr = [];

    if(cantidadEmgs >= 1) {
        dataArr.push(trace1)
    }

    if(cantidadEmgs >= 2) {
        dataArr.push(trace2)
    }

    if(cantidadEmgs >= 3) {
        dataArr.push(trace3)
    }

    if(cantidadEmgs >= 4) {
        dataArr.push(trace4)
    }

    if(gsrIsChecked) {
        dataArr.push(trace5)
    }

    if(temperaturaIsChecked) {
        dataArr.push(trace6)
    }

    if(frecuenciaCardiacaIsChecked) {
        dataArr.push(trace7)
    }

    if(acelerometroIsChecked) {
        dataArr.push(trace8)
        dataArr.push(trace9)
        dataArr.push(trace10)
    }

  return <SensoresAdquisicionGraficar gridLayout={gridLayout} dataArr={dataArr}/>;
};

export default SensoresAdquisicionGraficarContainer;
