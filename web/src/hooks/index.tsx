import React from 'react';

//componente para por em volta dos componentes que só serao exibidos
//apos estar autenticado
import { AuthProvider } from './auth';
//Componente hook para mostrar toast durante sucess, info e error
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      {children}
    </ToastProvider>
  </AuthProvider>
)

export default AppProvider;
