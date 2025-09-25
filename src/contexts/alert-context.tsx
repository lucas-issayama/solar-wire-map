import { ReactNode, createContext, useContext, useState } from "react";

interface INotification {
  type: string;
  message: string;
}

type TypeError = "alert" | "error" | "success";

interface NotificationContextType {
  showErrorNotification: (type: TypeError, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<INotification | null>(null);
  const showErrorNotification = (type: TypeError, message: string) => {
    setNotification({ type: type, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000); // Tempo em milissegundos para a notificação desaparecer
  };

  return (
    <NotificationContext.Provider value={{ showErrorNotification }}>
      {children}
      {notification && notification.type === "error" && (
        <div className=" animate-pulse bg-red-400 text-white p-4 mb-4 fixed top-4 right-2">
          {notification.message}
        </div>
      )}
      {notification && notification.type === "alert" && (
        <div className=" animate-pulse bg-yellow-400 text-white p-4 mb-4 fixed top-4 right-2">
          {notification.message}
        </div>
      )}
      {notification && notification.type === "success" && (
        <div className=" animate-pulse bg-green-400 text-white p-4 mb-4 fixed top-4 right-2">
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
