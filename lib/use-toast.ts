import { useState, useEffect } from 'react'

// Définissez les types nécessaires
type ToastType = {
  id: string;
  title: string;
  description: string;
  // Ajoutez d'autres propriétés si nécessaire
}

type State = {
  toasts: ToastType[];
}

// Initialisez l'état mémoire
const memoryState: State = { toasts: [] };

// Définissez les listeners
const listeners: ((state: State) => void)[] = [];

// Fonction pour générer un ID unique
const generateId = () => Math.random().toString(36).substr(2, 9);

// Définissez la fonction toast
const toast = ({ title, description }: Omit<ToastType, 'id'>) => {
  const id = generateId();
  const newToast: ToastType = { id, title, description };
  memoryState.toasts.push(newToast);
  listeners.forEach(listener => listener(memoryState));
  return id;
};

// Fonction pour supprimer un toast
const dismiss = (toastId: string) => {
  const index = memoryState.toasts.findIndex(t => t.id === toastId);
  if (index > -1) {
    memoryState.toasts.splice(index, 1);
    listeners.forEach(listener => listener(memoryState));
  }
};

export function useToast() {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss,
  };
}

export { toast };