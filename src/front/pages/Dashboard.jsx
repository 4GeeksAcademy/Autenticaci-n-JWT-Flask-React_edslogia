// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect, useState } from "react"

export const Dashboard = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer();
  const token = store.login_data?.jwt_token;
  
  useEffect(() => {
    const dataPrivate = async () => {
      try {
        const reps = await fetch(`https://musical-broccoli-xj9xx66ggvq26x4v-3001.app.github.dev/api/private`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        }
        );

        if (reps.ok){
          console.log("Acceso a sitio privado")
          
        }
      } catch (error) {
        console.error("Error accediendo al sitio privado :", error)
      }
    }

    if (token) {
      dataPrivate();
    } 
  }, [token])

  if (!token) {
    return <h1 className="text-center">ACCESO DENEGADO. INICIA SESIÓN</h1>
  }

  return (
    <div className="container">

      <h1>ÁREA PRIVADA</h1>

      <Link to="/">
        <button className="btn btn-primary">Atrás</button>
      </Link>
    </div>
  );
};
