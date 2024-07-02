import React, { useState } from "react";
import moment from "moment";
import EmpleadosListado from "./EmpleadosListado"; // Importamos EmpleadosListado para mostrar la tabla de resultados de la busqueda
import EmpleadosRegistro from "./EmpleadosRegistro"; // Importamos EmpleadosRegistro para mostrar el formulario de alta/modificacion/consulta
//}import { empleadosService } from "../../services/empleados.service"; // Importamos empleadosService para hacer uso de las funciones del backend
import modalDialogService from "../../services/modalDialog.service"; // Importamos modalDialog para mostrar mensajes de alerta y confirmación 
import { empleadosService } from "../../services/empleados.service";

function Empleados() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  // Usamos el Hook useState para inicializar el estado de las variables que vamos a utilizar 
  const [AccionABMC, setAccionABMC] = useState("L"); // estado para saber si estamos en Alta, Baja, Modificacion o Consulta (Listado es el valor por defecto)

  const [ApellidoYNombre, setApellidoYNombre] = useState(""); // estado para guardar el valor del campo ApellidoYNombre

  const [Items, setItems] = useState(null); // estado para guardar los registros de la busqueda
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0); // estado para guardar la cantidad total de registros


  async function Buscar() {

    modalDialogService.BloquearPantalla(true);
    const data = await empleadosService.Buscar(ApellidoYNombre);
    modalDialogService.BloquearPantalla(false);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

  }

  async function BuscarPorId(item, accionABMC) {
    const data = await empleadosService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  

//  function Consultar(item) {
//    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
//  }
 function Modificar(item) {
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }


  async function Agregar() {
    setAccionABMC("A");
    setItem({
        IdEmpleado: 0,
        ApellidoYNombre: '',
        Dni: '',
        FechaNacimiento: moment(new Date()).format("YYYY-MM-DD"),
        Suspendido: true,
      });
    //modalDialogService.Alert("preparando el Alta...");
  }





  async function ActivarDesactivar(item) {
    modalDialogService.Confirm(
      "Esta seguro que quiere borrar el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await empleadosService.ActivarDesactivar(item);
        await Buscar();
      }
    );

  }
  
  

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await empleadosService.Grabar(item);
    }
    catch (error)
    {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();
  
    //setTimeout(() => {
      modalDialogService.Alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    //}, 0);
  }
  

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Empleados <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && ( //Si la acción es Listado (seteada como default), muestra el formulario de busqueda
        //<EmpleadosBuscar
        //  ApellidoYNombre={ApellidoYNombre}
        //  setApellidoYNombre={setApellidoYNombre}
        //  Suspendido={Suspendido}
        //  Buscar={Buscar}
        //  Agregar={Agregar}
        ///>
              <form>
                  <div className="container-fluid">
                      <div className="row">
                          <div className="col-sm-4 col-md-2">
                              <label className="col-form-label">ApellidoYNombre:</label>
                          </div>
                          <div className="col-sm-8 col-md-4">
                              <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setApellidoYNombre(e.target.value)} //Guardamos el valor del campo ApellidoYNombre en el estado ApellidoYNombre
                                  value={ApellidoYNombre} //Mostramos el valor del campo ApellidoYNombre
                                  minLength="5"
                                  maxLength="60"
                                  autoFocus //El campo ApellidoYNombre se selecciona automaticamente al cargar la pagina
                              />
                          </div>
                      </div>

                      <hr />

                      {/* Botones */}
                      <div className="row">
                          <div className="col text-center botones">
                              <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => Buscar(1)} 
                              >
                                  <i className="fa fa-search"> </i> Buscar
                              </button>
                              <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => Agregar()}
                              >
                                  <i className="fa fa-plus"> </i> Agregar
                              </button>
                          </div>
                      </div>
                  </div>
                </form>
      )}

      {/* Tabla de resutados de busqueda */}
      {AccionABMC === "L" && Items?.length > 0 && ( //Si la acción es Listado y la cantidad de Items es mayor a 0, muestra la tabla de resultados   
        <EmpleadosListado
          {...{
            Items,
            Modificar,
            ActivarDesactivar,
            RegistrosTotal
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && ( //Si la acción es Listado y la cantidad de Items es 0, muestra un mensaje de alerta
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && ( //Si la acción no es Listado, muestra el formulario de alta/modificacion/consulta
        <EmpleadosRegistro
          {...{ AccionABMC, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}
export { Empleados };
