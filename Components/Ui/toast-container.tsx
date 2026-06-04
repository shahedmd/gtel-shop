'use client'
import { useState, useCallback } from 'react'
import { Toast } from './toast'
import { createContext, useContext } from 'react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastItem {
  id: number
  message: string
  description?: string
  type: ToastType
  duration?: number
}

interface ToastContextType {
  toast: (message: string, options?: {
    description?: string
    type?: ToastType
    duration?: number
  }) => void
}

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = useCallback((
    message: string,
    options?: {
      description?: string
      type?: ToastType
      duration?: number
    }
  ) => {
    const id = Date.now()
    setToasts((p) => [...p, {
      id,
      message,
      description: options?.description,
      type: options?.type ?? 'info',
      duration: options?.duration ?? 4000,
    }])
  }, [])

  const remove = useCallback((id: number) => {
    setToasts((p) => p.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            description={t.description}
            type={t.type}
            duration={t.duration}
            onClose={() => remove(t.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}