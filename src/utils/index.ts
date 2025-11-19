import { TaskResult } from '@/interfaces/server';
import { useState } from 'react'
import jwt from 'jsonwebtoken'
import { NextApiRequest } from 'next';

export const getStatus = async (url: string): Promise<boolean> => {
  const response = await fetch(url);
  return response.status === 200;
};

export const swrFetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    const data = await response.json();
    console.log(data)
    throw new Error(JSON.stringify(data.message));
  }
  return response.json();
}

export const makeHTTPRequest = async (url: string, config: {
  method: string,
  body?: any
}): Promise<TaskResult<{ success: true, data: any }>> => {
  const applyConfig = {
    ...config,
    headers: {
      'Content-Type': 'application/json'
    },
  }

  if (config.body) {
    applyConfig.body = JSON.stringify(config.body)
  }

  try {
    const response = await fetch(url, applyConfig);
    const data = await response.json();
    if (data.message !== 'Success') return {
      success: false,
      message: data.message
    }
    return {
      success: true,
      data: data.data
    }
  } catch (e) {
    return {
      success: false,
      message: String(e)
    }
  }
}

export const useBoolean = () => {
  const [value, setValue] = useState(false);

  const toggle = () => {
    setValue(!value);
  };

  const setTrue = () => {
    setValue(true);
  };

  const setFalse = () => {
    setValue(false);
  };

  return {
    value,
    toggle,
    setTrue,
    setFalse,
  } as const;
}
export const tokenValidation = (req: NextApiRequest) => {
  try {
    if (!req.headers.authorization) return false
    const sessionToken = req.headers.authorization.split(' ')[1]
    // session token should be validated here
    if (!sessionToken) return false
    const decoded = jwt.decode(req.cookies.refreshToken as string)
    console.log('session token', sessionToken)
    console.log('refresh token decoded', decoded)
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}