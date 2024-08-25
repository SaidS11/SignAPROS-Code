import json
import sys
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
import scikitplot as skplt
from pandas.plotting import parallel_coordinates
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn import metrics
from sklearn.naive_bayes import GaussianNB
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis, QuadraticDiscriminantAnalysis
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
import os

def generacionImg(): 
    script_dir = os.path.dirname(__file__)
    # or load through local csv
    data = pd.read_csv(os.path.join(script_dir,'data.csv'))
    # number of instances in each class
    data.groupby('species').size()
    train, test = train_test_split(data, test_size = 0.4, stratify = data['species'], random_state = 42)
    # Model development
    X_train = train[['sepal_length','sepal_width','petal_length','petal_width']]
    y_train = train.species
    X_test = test[['sepal_length','sepal_width','petal_length','petal_width']]
    y_test = test.species
    corrmat = train.corr(numeric_only=True)
    sns.heatmap(corrmat, annot = True, square = True)
    plt.savefig(os.path.join(script_dir, "Correlation.png"))
    # KNN, first try 5
    # histograms
    n_bins = 10
    fig, axs = plt.subplots(2, 2)
    axs[0,0].hist(train['sepal_length'], bins = n_bins)
    axs[0,0].set_title('Sepal Length')
    axs[0,1].hist(train['sepal_width'], bins = n_bins)
    axs[0,1].set_title('Sepal Width')
    axs[1,0].hist(train['petal_length'], bins = n_bins)
    axs[1,0].set_title('Petal Length')
    axs[1,1].hist(train['petal_width'], bins = n_bins)
    axs[1,1].set_title('Petal Width')

    # add some spacing between subplots
    fig.tight_layout(pad=1.0)
    plt.savefig(os.path.join(script_dir, "Boxplot.png"))
    plt.clf()
    sns.violinplot(x="etiqueta", y="colMedianaEMG1", data=train, size=5, order = cn, palette = 'colorblind')
    plt.savefig(os.path.join(script_dir, "Violin.png"))
    print("Preanalisis")
    sys.stdout.flush()

def generacionImg2(headers): 
    script_dir = os.path.dirname(__file__)
    # or load through local csv
    data = pd.read_csv(os.path.join(script_dir,'data.csv'))
    # number of instances in each class
    data.groupby('etiqueta').size()
    train, test = train_test_split(data, test_size = 0.4, stratify = data['etiqueta'], random_state = 42)
    # Model development
    X_train = train[headers]
    y_train = train.etiqueta
    X_test = test[headers]
    y_test = test.etiqueta
    corrmat = train.corr(numeric_only=True)
    sns.heatmap(corrmat, annot = True, square = True)
    plt.savefig(os.path.join(script_dir, "Correlation.png"))
    # KNN, first try 5
    # histograms
    n_bins = 10
    # fig, axs = plt.subplots(2, 2)
    # axs[0,0].hist(train['sepal_length'], bins = n_bins)
    # axs[0,0].set_title('Sepal Length')
    # axs[0,1].hist(train['sepal_width'], bins = n_bins)
    # axs[0,1].set_title('Sepal Width')
    # axs[1,0].hist(train['petal_length'], bins = n_bins)
    # axs[1,0].set_title('Petal Length')
    # axs[1,1].hist(train['petal_width'], bins = n_bins)
    # axs[1,1].set_title('Petal Width')

    # # add some spacing between subplots
    # fig.tight_layout(pad=1.0)
    # plt.savefig(os.path.join(script_dir, "Histogram.png"))

    # boxplots using seaborn
    fig, axs = plt.subplots(2, 2)
    fn = [headers]
    cn = ['diabetico', 'sano']
    sns.boxplot(x = 'etiqueta', y = 'colMedianaEMG1', data = train, order = cn, ax = axs[0,0])
    sns.boxplot(x = 'etiqueta', y = 'colMedianaEMG2', data = train, order = cn, ax = axs[0,1])
    sns.boxplot(x = 'etiqueta', y = 'colRMSEMG1', data = train, order = cn, ax = axs[1,0])
    sns.boxplot(x = 'etiqueta', y = 'colRMSEMG2', data = train,  order = cn, ax = axs[1,1])
    # add some spacing between subplots
    fig.tight_layout(pad=1.0)
    plt.savefig(os.path.join(script_dir, "Boxplot.png"))
    plt.clf()
    sns.violinplot(x="etiqueta", y="colMedianaEMG1", data=train, size=5, order = cn, palette = 'colorblind')
    plt.savefig(os.path.join(script_dir, "Violin.png"))
    print("Preanalisis")
    sys.stdout.flush()


if __name__ == '__main__':
    datosConNombre = sys.argv[1]
    parsed = json.loads(datosConNombre)
    newList = list()

    for i in range(len(parsed)):
        for c in range(len(parsed[i])):
            newList.append(parsed[i][c])

    df = pd.DataFrame.from_dict(newList) 
    df.to_csv(r'D:/DocumentosLap/Modular/App de Escritorio/Electron Modular/electron-app/src/pythonScripts/imagenes.csv', index=False, header=True)
    

    headers = list(parsed[0][0].keys())
    headers.remove('etiqueta')
    headers.remove('nombre')
    generacionImg()


