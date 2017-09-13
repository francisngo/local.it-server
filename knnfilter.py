import json
import pandas as pd
import numpy as np
import scipy as sp
from sklearn.model_selection import train_test_split
from sklearn import preprocessing
from sklearn.neighbors import KNeighborsClassifier
import copy
import sys

# yelp = sys.argv[1]
# usdata = sys.argv[2]

with open('Yelp.json') as yelpjson:
    yelp = json.load(yelpjson)
with open('User.json') as userjson:
    usdata = json.load(userjson)

def restructure(data, catlist, edit=False):
    for i in range(len(data)):
        newdata = []
        for j in range (len(data[i]['categories'])):
            #print(data[i]['categories'][j])
            x = data[i]['categories'][j]['alias']
            if not x in catlist:
                if edit == True:
                    catlist.append(x)
            newdata.append(x)
        #data[i]['categories'] = newdata
        for k in range (len(newdata)):
            if not newdata[k] in data[i]:
                data[i][newdata[k]] = 1
    for i in range(len(data)):
        for j in range(len(catlist)):
            if not catlist[j] in data[i]:
                data[i][catlist[j]] = 0
    for i in range(len(data)):
        data[i]['price'] = len(data[i]['price'])
    for i in range(len(data)):
        data[i]['transaction: pickup'] = 0
        data[i]['transaction: delivery'] = 0
        data[i]['transaction: restaurant_reservation'] = 0
        for j in range(len(data[i]['transactions'])):
            if data[i]['transactions'][j] == 'pickup':
                data[i]['transaction: pickup'] = 1
            if data[i]['transactions'][j] == 'delivery':
                data[i]['transaction: delivery'] = 1
            if data[i]['transactions'][j] == 'restaurant_reservation':
                data[i]['transaction: restaurant_reservation'] = 1
    return data

def makePrediciton(yelpData, user):
    catlist = []
    #yelpData = pd.read_json(yelpData)

    yelpData = restructure(yelpData['businesses'], catlist, True)
    variables = yelpData[0].keys()
    #user = pd.read_json(user)
    userAccept = []
    userReject = []

    for i in range(len(user['interestsByCity'])):
        for j in range(len(user['interestsByCity'][i]['interests'])):
            userAccept.append(user['interestsByCity'][i]['interests'][j])
        for j in range(len(user['interestsByCity'][i]['dislikedInterests'])):
            userReject.append(user['interestsByCity'][i]['dislikedInterests'][j])
    userAccept = restructure(userAccept, catlist)
    userReject = restructure(userReject, catlist)

    testData = []
    target = []
    filtered = []

    for i in range(len(userAccept)):
        target.append(1)
        testData.append(userAccept[i])

    for i in range(len(userReject)):
        target.append(0)
        testData.append(userReject[i])

    df = pd.DataFrame([[i[j] for j in variables] for i in testData], columns = variables)
    yelpdf = pd.DataFrame([[i[j] for j in variables] for i in yelpData], columns = variables)
    del df['transactions']
    del df['categories']
    del df['image_url']
    del df['is_closed']
    del df['phone']
    del df['name']
    del df['url']
    del df['id']
    del df['coordinates']
    del df['location']
    del df['display_phone']
    del yelpdf['transactions']
    del yelpdf['categories']
    del yelpdf['image_url']
    del yelpdf['is_closed']
    del yelpdf['phone']
    del yelpdf['name']
    del yelpdf['url']
    del yelpdf['id']
    del yelpdf['coordinates']
    del yelpdf['location']
    del yelpdf['display_phone']

    X_train, X_test, y_train, y_test = train_test_split(df, target, random_state=0)

    knn = KNeighborsClassifier(n_neighbors=1)
    knn.fit(X_train, y_train)

    #print(X_test)
    for i in range(len(yelpdf)):
        X_new = yelpdf
        #print('X_new: {}'.format(X_new))
        prediction = knn.predict(X_new)
        #print('prediction: {}'.format(prediction))

    return prediction

def returnPredicted(data, user):
    origindata = copy.deepcopy(data)
    filterData = []
    filtered = makePrediciton(data, user)
    for i in range(len(filtered)):
      if filtered[i] == 1:
        filterData.append(origindata['businesses'][i])
    filterData = json.dumps(filterData)
    print(filterData)
    return filterData

returnPredicted(yelp, usdata)
