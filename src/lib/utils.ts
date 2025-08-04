import axios, { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function handleError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Network error: Please check your internet connection.'
    }

    const status = error.response.status
    const data = error.response.data

    if (status === 404 || status === 500) {
      return 'Server is down, Please try again later.'
    } else if (data && typeof data === 'object' && 'message' in data) {
      return (data as any).message
    }

    return 'An unexpected error occurred.'
  } else if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong.'
}

