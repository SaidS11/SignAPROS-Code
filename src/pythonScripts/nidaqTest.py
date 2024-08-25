import csv
import threading
import time
import os
import nidaqmx
import numpy as np
import sys
from datetime import datetime, timedelta
from nidaqmx.stream_readers import AnalogMultiChannelReader
from nidaqmx.constants import AcquisitionType
# import zlib

# ser = serial.Serial('COM5', 9600, timeout=1)
# ser.readline()

returnedList = list()
returnedDict = dict({
    "emg1": [],
    "emg2": [],
    "emg3": [],
    "emg4": [], 
})
duracion = int(sys.argv[1])
cantidadEmgs = int(sys.argv[2])
directorioActual = sys.argv[3]

variable_frecuencia = 2500

tiempo_de_adquisicion = duracion  # Tiempo de adquisición en segundos
frecuencia_de_muestreo = variable_frecuencia  # Frecuencia de muestreo en Hz
frecuencia_maxima = variable_frecuencia

num_muestras = tiempo_de_adquisicion * frecuencia_de_muestreo
datos_por_canal = {f"Canal {i}": [] for i in range(4)}

tiempo_inicial = 0
tiempo_final = 0
rateOfAdq = 2500
sizeOfArray = rateOfAdq * duracion


with nidaqmx.Task() as task:

    task.ai_channels.add_ai_voltage_chan("Dev1/ai0", min_val=-10, max_val=10)  # Asegúrate de ajustar los valores máximos y mínimos según tu configuración
    task.ai_channels.add_ai_voltage_chan("Dev1/ai1")  # Asegúrate de ajustar los valores máximos y mínimos según tu configuración
    task.ai_channels.add_ai_voltage_chan("Dev1/ai2")  # Asegúrate de ajustar los valores máximos y mínimos según tu configuración
    task.ai_channels.add_ai_voltage_chan("Dev1/ai3")  # Asegúrate de ajustar los valores máximos y mínimos según tu configuración

    # Configura el temporizador de muestreo y el modo de adquisición
    task.timing.cfg_samp_clk_timing(rate=rateOfAdq, sample_mode=AcquisitionType.CONTINUOUS)

    #data = task.read(number_of_samples_per_channel=1000)
    tiempo_inicial = datetime.now()

    reader = AnalogMultiChannelReader(task.in_stream)

    data = np.zeros((4, sizeOfArray))
    reader.read_many_sample(data, sizeOfArray, timeout= duracion + 0.5)

    tiempo_final = datetime.now()

    #data = task.read(number_of_samples_per_channel=1000, timeout=tiempo_de_adquisicion + 1)


filas = []

#Itera sobre las filas de la matriz y agrega cada fila a la lista
for i in range(4):
    filas.append(list(data[i]))

#Separar los datos en diferentes diccionarios
lista_resultados = []

for i in range(len(filas)):
    # Crea un diccionario para almacenar los resultados de la sublista actual
    
    for j in range(len(filas[i])):
        # Crea una clave para el diccionario actual basada en el índice de la sublista actual
        clave_actual = 'emg' + str(i+1)
        #print("posicion actual",filas[i][j])
        lista_resultados.append({clave_actual: filas[i][j]})



# Calculando la diferencia de tiempo total en segundos
diferencia_tiempo = tiempo_final - tiempo_inicial
total_segundos = diferencia_tiempo.total_seconds()

# Calculando la cantidad de intervalos de tiempo entre el tiempo inicial y final
intervalos = int(total_segundos * variable_frecuencia)


muestras_con_tiempo = []
for i in range(intervalos):
    tiempo = tiempo_inicial + timedelta(seconds=i / variable_frecuencia)
    muestras_con_tiempo.append({"tiempoEmg": tiempo.strftime("%H:%M:%S")})


# Igualar el tamanio de los arreglos

listaAux = filas[0]

muestras_con_tiempo = muestras_con_tiempo[:len(listaAux)]

# Insertar los objetos con marcas de tiempo en la lista de señales
lista_resultados.extend(muestras_con_tiempo)


result = {}

#Recorrer la lista y agrupar los valores por clave
for item in lista_resultados:
    for key, value in item.items():
        if key in result:
            result[key].append(value)
        else:
            result[key] = [value]


keys = list(result.keys())


csv_file = directorioActual + "/main/archivosCsv/resultadoEmgs.csv"


with open(csv_file, mode="w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(keys)  # Escribir las claves como encabezados de las columnas
    max_values = max(len(values) for values in result.values())  # Obtener la longitud máxima de las listas de valores
    for i in range(max_values):
        row = [result[key][i] if i < len(result[key]) else "" for key in keys]
        writer.writerow(row)