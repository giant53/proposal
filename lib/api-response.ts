/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"

export type ApiResponse<T = any> = {
  success: boolean
  message: string
  data?: T
}

export function successResponse<T>(data: T, message = "Success"): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    message,
    data,
  })
}

export function errorResponse(message: string, status = 400): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  )
}
