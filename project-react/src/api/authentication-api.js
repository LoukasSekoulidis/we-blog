// TO DO: api calls auslagern

import config from 'react-global-configuration';
import { Buffer } from 'buffer'

const LOCAL_STORAGE_KEY = 'dummy.token'


const encodeLoginData = (userName, password) => {
  let data = `${userName}:${password}` // userName:password
  let encodedData = Buffer.from(data, 'ascii').toString('base64')
  return encodedData
}

const saveToken = async (response) => {
  const token = response.headers.get('Authorization');
  localStorage.setItem(LOCAL_STORAGE_KEY, token)
}

export const login = async (username, password) => {
  const encodedData = encodeLoginData(username, password)
  const authString = `Basic ${encodedData}`
  const API_URL = config.get('API_URL') + 'authenticate'

  const response = await fetch(API_URL,
    {
      method: 'GET',
      headers: {
        Authorization: authString
      }
    }
  )

  saveToken(response)
  return response;
}