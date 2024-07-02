import React, { useState, useEffect } from "react";
import DeudoresListado from "./DeudoresListado";
import DeudoresRegistro from "./DeudoresRegistro";
import { deudoresService } from "../../services/deudores.service";
import modalDialogService from "../../services/modalDialog.service";



function Deudores() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Items, setItems] = useState(null);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarDeudores() {
      let data = await deudoresService.Buscar();
      setItems(data.Items);
      setRegistrosTotal(data.RegistrosTotal);
    }
    BuscarDeudores();
  }, []);
  
  
  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await deudoresService.Grabar(item);
    }
    catch (error)
    {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString())
      return;
    };
    Volver();
  
    //setTimeout(() => {
      modalDialogService.Alert(
        "Registro agregado correctamente."
      );
    //}, 0);
  }
  
  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
    window.print();
  }

  
  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Deudores <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <DeudoresListado
          {...{
            Items,
            RegistrosTotal,
            Imprimir,
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && (
        <DeudoresRegistro
          {...{ AccionABMC, Grabar, Volver }}
        />
      )}

      {/* Boton para volver al listado */}
      {AccionABMC === "L" && (
        <div className="row justify-content-center">
          <div className="col text-center botones">
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => setAccionABMC("A")}
            >
              <i className="fa fa-undo"></i> Registrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export { Deudores };
