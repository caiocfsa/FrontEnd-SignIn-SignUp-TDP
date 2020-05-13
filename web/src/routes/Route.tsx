import React from 'react';
import { RouteProps as ReactDOMRouteProps, Route as ReactDOMRoute, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

//Se Rota for privada (isPrivate) e usuario estiver autenticado TRUE/TRUE (OK)
//Se Rota for privada e ele nao estiver autenticado TRUE/FALSE ( RETORNAR PARA LOGIN)
//Rota não ser privada e usuario autenticado FALSE/TRUE ( REDIRECIONAR PARA DASHBOARD)
//Rota nao ser privada e usuario não estiver autenticado FALSE/FALSE (OK)

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {

  const { user } = useAuth();

  return (
    <ReactDOMRoute
     {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard', state: { from: location } }}/>
        )
      }}
   />
  );

};

export default Route;
