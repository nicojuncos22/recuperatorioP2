import React, { useState, useEffect } from "react";
import EmpleadosListado from "./EmpleadosListado"; // listado
import EmpleadosRegistro from "./EmpleadosRegistro"; // Registro
import EmpleadoBuscar from "./EmpleadosBuscar"; // COMENTAR ESTO PARA ELIMINAR BUSCAR
import { empleadosService } from "../../services/empleados.service";
import modalDialogService from "../../services/modalDialog.service";
import moment from "moment";



function Empleados() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [Item, setItem] = useState(null);
  const [Items, setItems] = useState(null);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarEmpleados() {
      let data = await empleadosService.Buscar();
      setItems(data.Items);
      setRegistrosTotal(data.RegistrosTotal);
    }
    BuscarEmpleados();
  }, []);
  
  async function Agregar() {
    setAccionABMC("A");
    setItem({
        IdEmpleado: 0,
        ApellidoYNombre: '',
        Dni: '',
        FechaNacimiento: moment(new Date()).format("YYYY-MM-DD"),
        Suspendido: false,
      });
    //modalDialogService.Alert("preparando el Alta...");
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
  async function Buscar(_pagina) {
    // if (_pagina && _pagina !== Pagina) {
    //   setPagina(_pagina);
    // }
    // // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    // else {
    //   _pagina = Pagina;
    // }
    modalDialogService.BloquearPantalla(true);
    const data = await empleadosService.Buscar(Nombre);
    modalDialogService.BloquearPantalla(false);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    // generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    // setPaginas(arrPaginas);
  }
  return (
    <div>
      <div className="tituloPagina"> 
        Empleados <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>
      {/* vvv COMENTAR ESTO PARA ELIMINAR BUSCAR */}
      {AccionABMC === "L" && ( // Esto queda igual
        <EmpleadoBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}
      {/* ^^^^ COMENTAR ESTO PARA BUSCAR */}^

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && (
        <EmpleadosListado
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
        <EmpleadosRegistro
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
              <i className="fa fa"></i> Registrar Empleado
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export { Empleados };
