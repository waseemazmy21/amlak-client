import axios from "axios";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function handleError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return navigator.onLine ? "Server is down Please try again later" :
        'Network error: Please check your internet connection.'
    }

    const status = error.response.status
    const data = error.response.data
    console.log(status, data)
    if (status === 500) {
      return 'Server is down, Please try again later.'
    } else if (status === 404) {
      return 'Not Found Error.'
    }
    else if (data && typeof data === 'object' && 'message' in data) {
      console.log(data)
      return data.message;
    }

    return 'An unexpected error occurred.'
  } else if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong.'
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "for-sale":
      return "bg-green-500/10 text-green-600 border-green-500/20"
    case "for-rent":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20"
    case "sold":
      return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    case "rented":
      return "bg-purple-500/10 text-purple-600 border-purple-500/20"
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-500/20"
  }
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}