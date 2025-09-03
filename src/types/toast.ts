export interface ToastState {
  isVisible: boolean
  message: string
  type: "success" | "error" | "warning" | "info"
}

export interface ToastProps {
  isVisible: boolean
  message: string
  type: "success" | "error" | "warning" | "info"
  onClose: () => void
  duration?: number
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
}