//import fetch2 from "node-fetch"
import { useState } from 'react'

interface SuccessResponse {
  success: true }

interface FailResponse {
  success: false,
  message: string
}

type APIResponse = SuccessResponse | FailResponse


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
}): Promise<APIResponse> => {
  const applyConfig = {
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  }

  if (config.body) {
    applyConfig.body = JSON.stringify(config.body)
  }

  try {
    const response = await fetch(url, applyConfig);
    const data = await response.json();
    if(data.message!== 'Success') return {
      success: false,
      message: data.message
    }
    return {
      success: true
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