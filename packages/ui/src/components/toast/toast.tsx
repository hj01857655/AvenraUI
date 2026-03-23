import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react';

export type ToastVariant = 'success' | 'error' | 'info';

export type ToastInput = {
  title: string;
  description?: string;
  duration?: number;
  variant?: ToastVariant;
};

type ToastRecord = ToastInput & {
  id: string;
};

type ToastContextValue = {
  dismiss: (id?: string) => void;
  push: (toast: ToastInput) => string;
  toasts: ToastRecord[];
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 4000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const timeoutsRef = useRef(new Map<string, number>());
  const idPrefix = useId();
  const counterRef = useRef(0);

  const dismiss = useCallback((id?: string) => {
    setToasts((current) => {
      if (current.length === 0) {
        return current;
      }

      const targetId = id ?? current[current.length - 1]?.id;
      if (!targetId) {
        return current;
      }

      const timeoutId = timeoutsRef.current.get(targetId);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutsRef.current.delete(targetId);
      }

      return current.filter((toast) => toast.id !== targetId);
    });
  }, []);

  const push = useCallback((toast: ToastInput) => {
    counterRef.current += 1;
    const id = `${idPrefix}-${counterRef.current}`;
    const duration = toast.duration ?? DEFAULT_DURATION;

    setToasts((current) => [
      ...current,
      {
        ...toast,
        id,
        variant: toast.variant ?? 'info'
      }
    ]);

    const timeoutId = window.setTimeout(() => {
      dismiss(id);
    }, duration);

    timeoutsRef.current.set(id, timeoutId);
    return id;
  }, [dismiss, idPrefix]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      timeoutsRef.current.clear();
    };
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ dismiss, push, toasts }), [dismiss, push, toasts]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider.');
  }

  return context;
}

function ToastViewport({ onDismiss, toasts }: { onDismiss: (id: string) => void; toasts: ToastRecord[] }) {
  return (
    <div className="avenra-toast-viewport" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <section
          key={toast.id}
          className={`avenra-toast avenra-toast--${toast.variant}`}
          role="status"
          aria-label={toast.title}
        >
          <div className="avenra-toast__content">
            <strong className="avenra-toast__title">{toast.title}</strong>
            {toast.description ? <p className="avenra-toast__description">{toast.description}</p> : null}
          </div>
          <button
            type="button"
            className="avenra-toast__close"
            onClick={() => onDismiss(toast.id)}
            aria-label={`Dismiss ${toast.title}`}
          >
            ×
          </button>
        </section>
      ))}
    </div>
  );
}

