// TO DO: api calls auslagern

import config from 'react-global-configuration';

export const getUsers = async (accessToken) => {
    const API_URL = config.get('API_URL') + 'users'
    const response = await fetch(API_URL, {
        method: 'GET',
        withCredentials: true,
        headers: {
            'Authorization': accessToken,
        }
    })
    return response;
}

export const getUserByUserID = async (accessToken, userID) => {
    const API_URL = config.get('API_URL') + 'users/' + userID
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': accessToken,
        }
    })

    console.log(response)
    return response;
}

export const createUser = async (accessToken, userID, userName, password, isAdministrator) => {
    isAdministrator = isAdministrator === 'on' ? true : false
    console.log('isAdmin API: ' + isAdministrator)
    const API_URL = config.get('API_URL') + 'users'
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': accessToken,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            userID: userID,
            userName: userName,
            password: password,
            isAdministrator: isAdministrator
        })
    })

    console.log(response)
    return response;
}

export const updateUser = async (accessToken, userID, userName, password, isAdministrator) => {
    isAdministrator = isAdministrator === 'on' ? true : false
    const API_URL = config.get('API_URL') + 'users/' + userID
    const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
            'Authorization': accessToken,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            userName: userName,
            password: password,
            isAdministrator: isAdministrator
        })
    })

    console.log(response)
    return response;
}

export const deleteUser = async (accessToken, userID) => {
    console.log('Delete User')
    const API_URL = config.get('API_URL') + 'users/' + userID
    const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
            'Authorization': accessToken,
        }
    })

    console.log(response)
    return response;
}



