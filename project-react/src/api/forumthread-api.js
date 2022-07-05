import config from 'react-global-configuration';

export const getForumThreads = async () => {
    const API_URL = config.get('API_URL') + 'forumThreads'
    const response = await fetch(API_URL, {
        method: 'GET',
        withCredentials: true
    })
    // console.log('getForumThreads: ', response)

    return response;
}


export const getMyForumThreads = async (accessToken) => {
    const API_URL = config.get('API_URL') + 'forumThreads/myForumThreads'
    const response = await fetch(API_URL, {
        method: 'GET',
        withCredentials: true,
        headers: {
            'Authorization': accessToken,
        }
    })
    // console.log('getMyForumThreads: ', response)

    return response;
}


export const getForumThreadByID = async (accessToken, forumThreadID) => {
    const API_URL = config.get('API_URL') + 'forumThreads/' + forumThreadID
    const response = await fetch(API_URL, {
        method: 'GET',
        withCredentials: true,
        headers: {
            'Authorization': accessToken,
        }
    })
    // console.log('getForumThreadByID: ', response)

    return response;
}

export const createForumThread = async (accessToken, name, description) => {
    const API_URL = config.get('API_URL') + 'forumThreads'
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': accessToken,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            description: description,
        })
    })
    // console.log('createForumThread: ', response)

    return response;
}

export const updateForumThread = async (accessToken, forumThreadID, name, description) => {
    const API_URL = config.get('API_URL') + 'forumThreads/' + forumThreadID
    const response = await fetch(API_URL, {
        method: 'PUT',
        withCredentials: true,
        headers: {
            'Authorization': accessToken,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            description: description,
        })
    })
    // console.log('createForumThread: ', response)

    return response;
}

export const deleteForumThread = async (accessToken, forumThreadID) => {
    const API_URL = config.get('API_URL') + 'forumThreads/' + forumThreadID
    const response = await fetch(API_URL, {
        method: 'DELETE',
        withCredentials: true,
        headers: {
            'Authorization': accessToken,
        }
    })
    // console.log('deleteForumThread: ', response)

    return response;
}


export const getMessagesOfForumThread = async (accessToken, forumThreadID) => {
    const API_URL = config.get('API_URL') + 'forumThreads/' + forumThreadID + '/forumMessages'
    const response = await fetch(API_URL, {
        method: 'GET',
        withCredentials: true,
        headers: {
            'Authorization': accessToken,
        }
    })
    // console.log('createForumThread: ', response)

    return response;
}