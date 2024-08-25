import sys
import pandas as pd
import numpy as np
# import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
import scikitplot as skplt
from pandas.plotting import parallel_coordinates
from sklearn.neural_network import MLPClassifier
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn import metrics
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import cross_validate
from sklearn.model_selection import cross_val_score
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis, QuadraticDiscriminantAnalysis
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
import json
from joblib import dump, load
import os


def limpiarDatosFaltantes(arreglo):
    valorAUsar = 0
    # Usamos numpy para manejar los valores NaN
    arreglo_limpio = np.array(arreglo)

    # Reemplazamos NaN con el valor especificado
    arreglo_limpio[np.isnan(arreglo_limpio)] = valorAUsar

    # Reemplazamos None con el valor especificado
    arreglo_limpio[arreglo_limpio == None] = valorAUsar

    return arreglo_limpio.tolist()

def classificationTree(nombre, headers, ruta_actual, nombreArchivoResultante):
    # or load through local csv
    ruta_actual = os.path.dirname(__file__)
    nombre_archivo = "test8Nombres.csv"
    data = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    # number of instances in each class
    data.groupby('etiqueta').size()
    # train, test = train_test_split(data, test_size = 0, stratify = data['etiqueta'], random_state = 42)

    # Model development
    X_test = data[headers]
    script_dir = os.path.dirname(__file__)
    clf = load(f'{script_dir}/Modelos/{nombre}.joblib') 
    prediction=clf.predict(X_test)
    
    fn = headers
    cn = ['Bueno', 'Malo']
    # set figure size
    plt.figure(figsize = (10,8))
    plot_tree(clf, feature_names = fn, class_names = cn, filled = True)
    # print(script_dir)
    #plt.savefig(my_path + "Tree.png")
    plt.savefig(os.path.join(script_dir, "Tree.png"))
    
    # print(my_path)
    datos_nuevos = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    X_nuevos = datos_nuevos[headers]
    y_pred = clf.predict(X_nuevos)

    skplt.metrics.plot_confusion_matrix(y_pred, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))

    datos_nuevos['etiqueta'] = y_pred
    resulJson = datos_nuevos.to_json(compression="str")

    with open(os.path.join(ruta_actual, nombreArchivoResultante), 'w') as f:
            f.write(str("Tree"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction, y_pred))+
    "|"+ "{:.3f}".format(metrics.f1_score(y_pred, prediction, average='micro')) + 
    "|"+ "{:.3f}".format(metrics.recall_score(y_pred, prediction, average='macro')) + 
    "|" + "0.99" +
    "|" "0.99" +
    "|" + resulJson +
    "|" + "true"))

def classKNN(nombre, headers, ruta_actual, nombreArchivoResultante):
    # or load through local csv
    ruta_actual = os.path.dirname(__file__)
    nombre_archivo = "test8Nombres.csv"
    data = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    # number of instances in each class
    data.groupby('etiqueta').size()
    # train, test = train_test_split(data, test_size = 0.4, stratify = data['species'], random_state = 42)

    # Model development
    X_test = data[headers]
    script_dir = os.path.dirname(__file__)
    clf = load(f'{script_dir}/Modelos/{nombre}.joblib') 
    prediction=clf.predict(X_test)
    


    datos_nuevos = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    X_nuevos = datos_nuevos[headers]
    y_pred = clf.predict(X_nuevos)

    skplt.metrics.plot_confusion_matrix(y_pred, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))

    datos_nuevos['etiqueta'] = y_pred
    resulJson = datos_nuevos.to_json(compression="str")
    # print(my_path)
    with open(os.path.join(ruta_actual, nombreArchivoResultante), 'w') as f:
            f.write(str("KNN"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,y_pred))+
    "|"+ "{:.3f}".format(metrics.f1_score(y_pred, prediction, average='micro')) + 
    "|"+ "{:.3f}".format(metrics.recall_score(y_pred, prediction, average='macro')) + 
    "|" + "0.99" +
    "|" "0.99" +
    "|" + resulJson +
    "|" + "true"))

def classSVM(nombre, headers, ruta_actual, nombreArchivoResultante):
    ruta_actual = os.path.dirname(__file__)
    nombre_archivo = "test8Nombres.csv"
    data = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    # number of instances in each class
    data.groupby('etiqueta').size()
    # Model development
    X_test = data[headers]
    script_dir = os.path.dirname(__file__)
    clf = load(f'{script_dir}/Modelos/{nombre}.joblib') 
    prediction=clf.predict(X_test)
    datos_nuevos = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    X_nuevos = datos_nuevos[headers]
    y_pred = clf.predict(X_nuevos)

    skplt.metrics.plot_confusion_matrix(y_pred, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))

    datos_nuevos['etiqueta'] = y_pred
    resulJson = datos_nuevos.to_json(compression="str")
    # print(my_path)
    with open(os.path.join(ruta_actual, nombreArchivoResultante), 'w') as f:
            f.write(str("SVM"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,                                                                      y_pred))+
    "|"+ "{:.3f}".format(metrics.f1_score(y_pred, prediction, average='micro')) + 
    "|"+ "{:.3f}".format(metrics.recall_score(y_pred, prediction, average='macro')) + 
    "|" + "0.99" +
    "|" "0.99" +
    "|" + resulJson +
    "|" + "true"))
            
def classRed(nombre, headers, ruta_actual, nombreArchivoResultante):

    ruta_actual = os.path.dirname(__file__)
    nombre_archivo = "test8Nombres.csv"
    data = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    # number of instances in each class
    data.groupby('etiqueta').size()

    # Model development
    X_test = data[headers]
    script_dir = os.path.dirname(__file__)
    clf = load(f'{script_dir}/Modelos/{nombre}.joblib') 
    prediction=clf.predict(X_test)
    datos_nuevos = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    X_nuevos = datos_nuevos[headers]
    y_pred = clf.predict(X_nuevos)

    skplt.metrics.plot_confusion_matrix(y_pred, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))

    datos_nuevos['etiqueta'] = y_pred
    resulJson = datos_nuevos.to_json(compression="str")
    # print(my_path)
    with open(os.path.join(ruta_actual, nombreArchivoResultante), 'w') as f:
            f.write(str("Red"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,                                                 y_pred))+
    "|"+ "{:.3f}".format(metrics.f1_score(y_pred, prediction, average='micro')) + 
    "|"+ "{:.3f}".format(metrics.recall_score(y_pred, prediction, average='macro')) + 
    "|" + "0.99" +
    "|" "0.99" +
    "|" + resulJson +
    "|" + "true"))


def trainTree(modelArgs, nombre, iteraciones, reducedPercentage, headers, ruta_actual, nombreArchivoResultante, archivoExistente):
    maxDepth =  modelArgs["profundidad"]
    randomState = modelArgs["estado"]
    # or load through local csv
    ruta_actual = os.path.dirname(__file__)
    nombre_archivo = "test8Nombres.csv"
    data = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    # number of instances in each class
    data.groupby('etiqueta').size()
    train, test = train_test_split(data, test_size = reducedPercentage, stratify = data['etiqueta'], random_state = 42)

    # Model development
    X_train = train[headers]
    y_train = train.etiqueta
    X_test = test[headers]
    y_test = test.etiqueta


    # first try decision tree
    existente = False
    script_dir = os.path.dirname(__file__)
    # if os.path.exists(f'{script_dir}/Modelos/{nombre}.joblib'):
    #     mod_dt = load(f'{script_dir}/Modelos/{nombre}.joblib') 
    #     existente = True
    # else:
    #     mod_dt = DecisionTreeClassifier(max_depth = int(maxDepth), random_state = int(randomState))
    if (archivoExistente == "true"):
        mod_dt = load(f'{script_dir}/Modelos/{nombre}.joblib') 
    else:
        mod_dt = DecisionTreeClassifier(max_depth = int(maxDepth), random_state = int(randomState))
    cv_results = cross_validate(mod_dt, X_train, y_train, cv=iteraciones, return_estimator=True)
    promedio = list()
    for i in range(len(cv_results['estimator'])):
        promedio.append(cv_results['test_score'][i])
    avg = sum(promedio) / len(promedio)
    closest = min(promedio, key=lambda x:abs(x-avg))
    for i in range(len(cv_results['estimator'])):
        if cv_results['test_score'][i] == closest:
            avgModel = cv_results['estimator'][i]
    scores = cross_val_score(avgModel, X_train, y_train, cv=iteraciones)
    prediction=avgModel.predict(X_test)
    fn = headers
    cn = ['Bueno', 'Malo']
    # set figure size
    plt.figure(figsize = (10,8))
    plot_tree(avgModel, feature_names = fn, class_names = cn, filled = True)
    script_dir = os.path.dirname(__file__)
    dump(avgModel, f'{script_dir}/Modelos/{nombre}.joblib')
    # print(script_dir)
    #plt.savefig(my_path + "Tree.png")
    plt.savefig(os.path.join(script_dir, "Tree.png"))
    skplt.metrics.plot_confusion_matrix(y_test, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))
    # print(my_path)
    datos_nuevos = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    X_nuevos = datos_nuevos[headers]
    y_pred = avgModel.predict(X_nuevos)

    datos_nuevos['etiqueta'] = y_pred
    resulJson = datos_nuevos.to_json(compression="str")

    with open(os.path.join(ruta_actual, nombreArchivoResultante), 'w') as f:
                f.write(str("Tree"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,y_test))+
    "|"+ "{:.3f}".format(metrics.f1_score(y_test, prediction, average='micro')) + 
    "|"+ "{:.3f}".format(metrics.recall_score(y_test, prediction, average='macro')) + 
    "|" + "{:.2f}".format(scores.mean()) +
    "|" "{:.2f}".format(scores.std()) +
    "|" + resulJson +
    "|" + archivoExistente))

    # "|" + f"{'true' if existente else 'false'}"))

def trainKNN(modelArgs, nombre, iteraciones, reducedPercentage, headers, ruta_actual, nombreArchivoResultante, archivoExistente):
    vecinos = modelArgs["vecinos"]
    # or load through local csv
    ruta_actual = os.path.dirname(__file__)
    nombre_archivo = "test8Nombres.csv"
    data = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    # number of instances in each class
    # number of instances in each class
    data.groupby('etiqueta').size()
    train, test = train_test_split(data, test_size = reducedPercentage, stratify = data['etiqueta'], random_state = 42)

    # Model development
    X_train = train[headers]
    y_train = train.etiqueta
    X_test = test[headers]
    y_test = test.etiqueta
    # KNN, first try 5
    existente = False
    script_dir = os.path.dirname(__file__)
    # if os.path.exists(f'{script_dir}/Modelos/{nombre}.joblib'):
    #     mod_5nn = load(f'{script_dir}/Modelos/{nombre}.joblib') 
    #     existente = True
    # else:
    #     mod_5nn=KNeighborsClassifier(n_neighbors=int(vecinos)) 
    if (archivoExistente == "true"):
        mod_5nn = load(f'{script_dir}/Modelos/{nombre}.joblib') 
    else:
        mod_5nn=KNeighborsClassifier(n_neighbors=int(vecinos)) 
    cv_results = cross_validate(mod_5nn, X_train, y_train, cv=iteraciones, return_estimator=True)
    promedio = list()
    for i in range(len(cv_results['estimator'])):
        promedio.append(cv_results['test_score'][i])
    avg = sum(promedio) / len(promedio)
    closest = min(promedio, key=lambda x:abs(x-avg))
    for i in range(len(cv_results['estimator'])):
        if cv_results['test_score'][i] == closest:
            avgModel = cv_results['estimator'][i]
    scores = cross_val_score(avgModel, X_train, y_train, cv=iteraciones)
    prediction=avgModel.predict(X_test)
    script_dir = os.path.dirname(__file__)
    dump(avgModel, f'{script_dir}/Modelos/{nombre}.joblib')
    skplt.metrics.plot_confusion_matrix(y_test, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))
    datos_nuevos = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    X_nuevos = datos_nuevos[headers]
    y_pred = avgModel.predict(X_nuevos)

    datos_nuevos['etiqueta'] = y_pred
    resulJson = datos_nuevos.to_json(compression="str")
    with open(os.path.join(ruta_actual, nombreArchivoResultante), 'w') as f:
            f.write(str("KNN"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,y_test))+
    "|"+ "{:.3f}".format(metrics.f1_score(y_test, prediction, average='micro')) + 
    "|"+ "{:.3f}".format(metrics.recall_score(y_test, prediction, average='macro')) + 
    "|" + "{:.2f}".format(scores.mean()) +
    "|" "{:.2f}".format(scores.std()) +
    "|" + resulJson +
    "|" + archivoExistente))

    # "|" + f"{'true' if existente else 'false'}"))

def trainSVM(modelArgs, nombre, iteraciones, reducedPercentage, headers, ruta_actual, nombreArchivoResultante, archivoExistente):
    kernelArg = modelArgs["kernel"]
    # or load through local csv
   # or load through local csv
    ruta_actual = os.path.dirname(__file__)
    nombre_archivo = "test8Nombres.csv"
    data = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    # number of instances in each class
    # number of instances in each class
    data.groupby('etiqueta').size()
    train, test = train_test_split(data, test_size = reducedPercentage, stratify = data['etiqueta'], random_state = 42)

    # Model development
    X_train = train[headers]
    y_train = train.etiqueta
    X_test = test[headers]
    y_test = test.etiqueta
    # SVC with linear kernel
    # for SVC, may be impractical beyond tens of thousands of samples
    #almacenar matriz de confusion y promediarla al final
    existente = False
    script_dir = os.path.dirname(__file__)
    # if os.path.exists(f'{script_dir}/Modelos/{nombre}.joblib'):
    #     linear_svc = load(f'{script_dir}/Modelos/{nombre}.joblib') 
    #     existente = True
    # else:
    #     linear_svc = SVC(kernel=kernelArg).fit(X_train, y_train)

    if (archivoExistente == "true"):
        linear_svc = load(f'{script_dir}/Modelos/{nombre}.joblib') 
    else:
        linear_svc= SVC(kernel=kernelArg).fit(X_train, y_train)
    cv_results = cross_validate(linear_svc, X_train, y_train, cv=iteraciones, return_estimator=True)
    promedio = list()
    for i in range(len(cv_results['estimator'])):
        promedio.append(cv_results['test_score'][i])
    avg = sum(promedio) / len(promedio)
    closest = min(promedio, key=lambda x:abs(x-avg))
    for i in range(len(cv_results['estimator'])):
        if cv_results['test_score'][i] == closest:
            avgModel = cv_results['estimator'][i]
    scores = cross_val_score(avgModel, X_train, y_train, cv=iteraciones)
    prediction=avgModel.predict(X_test)
    script_dir = os.path.dirname(__file__)
    dump(avgModel, f'{script_dir}/Modelos/{nombre}.joblib')
    skplt.metrics.plot_confusion_matrix(y_test, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))
    datos_nuevos = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    X_nuevos = datos_nuevos[headers]
    y_pred = avgModel.predict(X_nuevos)

    datos_nuevos['etiqueta'] = y_pred
    resulJson = datos_nuevos.to_json(compression="str")
    with open(os.path.join(ruta_actual, nombreArchivoResultante), 'w') as f:
            f.write(str("SVM"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,y_test))+
    "|"+ "{:.3f}".format(metrics.f1_score(y_test, prediction, average='micro')) + 
    "|"+ "{:.3f}".format(metrics.recall_score(y_test, prediction, average='macro')) + 
    "|" + "{:.2f}".format(scores.mean()) +
    "|" "{:.2f}".format(scores.std()) +
    "|" + resulJson +
    "|" + archivoExistente))
            

def trainRed(modelArgs, nombre, iteraciones, reducedPercentage, headers, ruta_actual, nombreArchivoResultante, archivoExistente):
    neuronasStr = modelArgs["neuronas"]
    neuronas = ([int(x) for x in neuronasStr])
    activacion = modelArgs["funcion"]
    tasa = float(modelArgs["tasa"])


    # or load through local csv
   # or load through local csv
    ruta_actual = os.path.dirname(__file__)
    nombre_archivo = "test8Nombres.csv"
    data = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    # number of instances in each class
    # number of instances in each class
    data.groupby('etiqueta').size()
    train, test = train_test_split(data, test_size = reducedPercentage, stratify = data['etiqueta'], random_state = 42)

    # Model development
    X_train = train[headers]
    y_train = train.etiqueta
    X_test = test[headers]
    y_test = test.etiqueta
    # SVC with linear kernel
    # for SVC, may be impractical beyond tens of thousands of samples
    #almacenar matriz de confusion y promediarla al final
    existente = False
    script_dir = os.path.dirname(__file__)
    # if os.path.exists(f'{script_dir}/Modelos/{nombre}.joblib'):
    #     linear_svc = load(f'{script_dir}/Modelos/{nombre}.joblib') 
    #     existente = True
    # else:
    #     linear_svc = SVC(kernel=kernelArg).fit(X_train, y_train)

    if (archivoExistente == "true"):
        redNeuronal = load(f'{script_dir}/Modelos/{nombre}.joblib') 
    else:
        redNeuronal = MLPClassifier(hidden_layer_sizes=neuronas, activation=activacion, learning_rate_init=tasa).fit(X_train, y_train)
    cv_results = cross_validate(redNeuronal, X_train, y_train, cv=iteraciones, return_estimator=True)
    promedio = list()
    for i in range(len(cv_results['estimator'])):
        promedio.append(cv_results['test_score'][i])
    avg = sum(promedio) / len(promedio)
    closest = min(promedio, key=lambda x:abs(x-avg))
    for i in range(len(cv_results['estimator'])):
        if cv_results['test_score'][i] == closest:
            avgModel = cv_results['estimator'][i]
    scores = cross_val_score(avgModel, X_train, y_train, cv=iteraciones)
    prediction=avgModel.predict(X_test)
    script_dir = os.path.dirname(__file__)
    dump(avgModel, f'{script_dir}/Modelos/{nombre}.joblib')
    skplt.metrics.plot_confusion_matrix(y_test, prediction, normalize=True)
    plt.savefig(os.path.join(script_dir,"Confusion.png"))
    datos_nuevos = pd.read_csv(os.path.join(ruta_actual, nombre_archivo))
    X_nuevos = datos_nuevos[headers]
    y_pred = avgModel.predict(X_nuevos)

    datos_nuevos['etiqueta'] = y_pred
    resulJson = datos_nuevos.to_json(compression="str")
    with open(os.path.join(ruta_actual, nombreArchivoResultante), 'w') as f:
            f.write(str("Red"+"|"+"{:.3f}".format(metrics.accuracy_score(prediction,y_test))+
    "|"+ "{:.3f}".format(metrics.f1_score(y_test, prediction, average='micro')) + 
    "|"+ "{:.3f}".format(metrics.recall_score(y_test, prediction, average='macro')) + 
    "|" + "{:.2f}".format(scores.mean()) +
    "|" "{:.2f}".format(scores.std()) +
    "|" + resulJson +
    "|" + archivoExistente))

    # "|" + f"{'true' if existente else 'false'}"))

if __name__ == '__main__':
    try:
        first = sys.argv[1]
        second = sys.argv[2]
        params = sys.argv[3]
        nombre = sys.argv[4]
        iteraciones = int(sys.argv[5])
        porcentaje = int(sys.argv[6])
        datosConNombre = sys.argv[7]
        archivoExistente = sys.argv[8]

        reducedPercentage = porcentaje / 100
        jsonParams = json.loads(params)

        # datosConNombre = '[[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGsr":"3.33","colMedianaGsr":"3","colRMSGsr":"3.56","colMediaABSTemp":"3.33","colMedianaTemp":"3","colRMSTemp":"3.56","etiqueta":"diabetico","nombre": "Karla"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGsr":"10.75","colMedianaGsr":"10.5","colRMSGsr":"10.85","colMediaABSTemp":"10.75","colMedianaTemp":"10.5","colRMSTemp":"10.85","etiqueta":"diabetico","nombre": "Karla"}],[{"colMediaABSEMG1":"3.33","colMedianaEMG1":"3","colRMSEMG1":"3.56","colMediaABSEMG2":"8.5","colMedianaEMG2":"8.5","colRMSEMG2":"8.57","colMediaABSGsr":"3.33","colMedianaGsr":"3","colRMSGsr":"3.56","colMediaABSTemp":"3.33","colMedianaTemp":"3","colRMSTemp":"3.56","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"},{"colMediaABSEMG1":"10.75","colMedianaEMG1":"10.5","colRMSEMG1":"10.85","colMediaABSEMG2":"16","colMedianaEMG2":"16","colRMSEMG2":"16.06","colMediaABSGsr":"10.75","colMedianaGsr":"10.5","colRMSGsr":"10.85","colMediaABSTemp":"10.75","colMedianaTemp":"10.5","colRMSTemp":"10.85","etiqueta":"diabetico","nombre": "Martha Garcia Lopez"}],[{"colMediaABSEMG1":"2.50","colMedianaEMG1":"2.5","colRMSEMG1":"2.55","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.81","colMediaABSGsr":"2.50","colMedianaGsr":"2.5","colRMSGsr":"2.55","colMediaABSTemp":"2.50","colMedianaTemp":"2.5","colRMSTemp":"2.55","etiqueta":"sano","nombre": "Sujeto Prueba 1"},{"colMediaABSEMG1":8,"colMedianaEMG1":"8","colRMSEMG1":"8.12","colMediaABSEMG2":"14.5","colMedianaEMG2":"14.5","colRMSEMG2":"14.60","colMediaABSGsr":8,"colMedianaGsr":"8","colRMSGsr":"8.12","colMediaABSTemp":8,"colMedianaTemp":"8","colRMSTemp":"8.12","etiqueta":"sano","nombre": "Sujeto Prueba 1"}], [{"colMediaABSEMG1":"2.50","colMedianaEMG1":"2.5","colRMSEMG1":"2.55","colMediaABSEMG2":"4.5","colMedianaEMG2":"4.5","colRMSEMG2":"4.81","colMediaABSGsr":"2.50","colMedianaGsr":"2.5","colRMSGsr":"2.55","colMediaABSTemp":"2.50","colMedianaTemp":"2.5","colRMSTemp":"2.55","etiqueta":"sano","nombre": "Sujeto Prueba 2"},{"colMediaABSEMG1":8,"colMedianaEMG1":"8","colRMSEMG1":"8.12","colMediaABSEMG2":"14.5","colMedianaEMG2":"14.5","colRMSEMG2":"14.60","colMediaABSGsr":8,"colMedianaGsr":"8","colRMSGsr":"8.12","colMediaABSTemp":8,"colMedianaTemp":"8","colRMSTemp":"8.12","etiqueta":"sano","nombre": "Sujeto Prueba 2"}]]'
        parsed = json.loads(datosConNombre)

        # parsed = limpiarDatosFaltantes(parsed)

        newList = list()

        for i in range(len(parsed)):
            for c in range(len(parsed[i])):
                newList.append(parsed[i][c])

        df = pd.DataFrame.from_dict(newList) 
        # df = df.replace({'NaN': '0', None: '0'})
        ruta_actual = os.path.dirname(__file__)
        nombre_archivo = "test8Nombres.csv"
        df.to_csv(os.path.join(ruta_actual, nombre_archivo), index=False, header=True)
        

        headers = list(parsed[0][0].keys())
        headers.remove('etiqueta')
        headers.remove('nombre')

        nombreArchivoResultante = "resultados.txt"
    
        if (first == "Train"):
            if (second == "Tree"):
                trainTree(jsonParams, nombre, iteraciones, reducedPercentage, headers, ruta_actual, nombreArchivoResultante, archivoExistente)
            if(second == "KNN"):
                trainKNN(jsonParams, nombre, iteraciones, reducedPercentage, headers, ruta_actual, nombreArchivoResultante, archivoExistente)
            if(second == "SVM"):
                trainSVM(jsonParams, nombre, iteraciones, reducedPercentage, headers, ruta_actual, nombreArchivoResultante, archivoExistente)
            if(second == "Red"):

                trainRed(jsonParams, nombre, iteraciones, reducedPercentage, headers, ruta_actual, nombreArchivoResultante, archivoExistente)
        if (first == "Class"):
            if (second == "Tree"):
                classificationTree(nombre, headers, ruta_actual, nombreArchivoResultante)
            if(second == "KNN"):
                classKNN(nombre, headers, ruta_actual, nombreArchivoResultante)
            if(second == "SVM"):
                classSVM(nombre, headers, ruta_actual, nombreArchivoResultante)
            if(second == "Red"):
                classRed(nombre, headers, ruta_actual, nombreArchivoResultante)
    except  Exception as e:
        with open(os.path.join(ruta_actual, nombreArchivoResultante), 'w') as f:
            f.write(str(e))