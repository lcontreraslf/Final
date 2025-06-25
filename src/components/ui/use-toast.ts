import { useState, useEffect } from "react";

const TOAST_LIMIT = 1;

let count = 0;
function generateId(): string {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  duration?: number;
  action?: React.ReactNode;
  dismiss: () => void;
  update?: (props: Partial<ToastData>) => void;
  [key: string]: any;
}

interface ToastState {
  toasts: ToastData[];
}

type ToastListener = (state: ToastState) => void;

const toastStore = {
  state: {
    toasts: [] as ToastData[],
  },
  listeners: [] as ToastListener[],

  getState: (): ToastState => toastStore.state,

  setState: (nextState: ToastState | ((state: ToastState) => ToastState)) => {
    if (typeof nextState === 'function') {
      toastStore.state = nextState(toastStore.state);
    } else {
      toastStore.state = { ...toastStore.state, ...nextState };
    }
    toastStore.listeners.forEach(listener => listener(toastStore.state));
  },

  subscribe: (listener: ToastListener) => {
    toastStore.listeners.push(listener);
    return () => {
      toastStore.listeners = toastStore.listeners.filter(l => l !== listener);
    };
  },
};

export const toast = ({ ...props }: Omit<ToastData, 'id' | 'dismiss' | 'update'>) => {
  const id = generateId();

  const update = (props: Partial<ToastData>) =>
    toastStore.setState((state) => ({
      ...state,
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, ...props } : t
      ),
    }));

  const dismiss = () => toastStore.setState((state) => ({
    ...state,
    toasts: state.toasts.filter((t) => t.id !== id),
  }));

  toastStore.setState((state) => ({
    ...state,
    toasts: [
      { ...props, id, dismiss, update },
      ...state.toasts,
    ].slice(0, TOAST_LIMIT),
  }));

  return {
    id,
    dismiss,
    update,
  };
};

export function useToast() {
  const [state, setState] = useState<ToastState>(toastStore.getState());

  useEffect(() => {
    const unsubscribe = toastStore.subscribe((state) => {
      setState(state);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    state.toasts.forEach((toast) => {
      if (toast.duration === Infinity) {
        return;
      }
      const timeout = setTimeout(() => {
        toast.dismiss();
      }, toast.duration || 5000);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [state.toasts]);

  return {
    toast,
    toasts: state.toasts,
  };
} 