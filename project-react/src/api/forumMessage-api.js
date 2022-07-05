import config from 'react-global-configuration';



export const createForumMessage = async (accessToken, forumThreadID, title, text) => {
    console.log(forumThreadID)
    const API_URL = config.get('API_URL') + 'forumMessages'
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': accessToken,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            forumThreadID: forumThreadID,
            title: title,
            text: text
        })
    })

    return response;
}

export const deleteForumMessage = async (accessToken, forumMessageID) => {
    const API_URL = config.get('API_URL') + 'forumMessages/' + forumMessageID
    const response = await fetch(API_URL, {
        method: 'DELETE',
        withCredentials: true,
        headers: {
            'Authorization': accessToken,
        }
    })

    return response;
}

export const updateForumMessage = async (accessToken, forumMessageID, title, text) => {
    const API_URL = config.get('API_URL') + 'forumMessages/' + forumMessageID
    const response = await fetch(API_URL, {
        method: 'PUT',
        withCredentials: true,
        headers: {
            'Authorization': accessToken,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            text: text
        })
    })

    return response;
}