/* eslint-disable no-useless-catch */
import { PUBLIC_BACK_URL } from '$env/static/public';
export async function api<T>(
    url: string,
    options?: RequestInit,
  ): Promise<T> {
    try {
      const endpoint = `${PUBLIC_BACK_URL || "http://localhost:3000/api/v1"}${url}`
    const res = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
  
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }
  
    return res.json() as Promise<T>;
    } catch (error) {
      console.error('Failed to load programs:', error);
      throw error;
    }
    
  }