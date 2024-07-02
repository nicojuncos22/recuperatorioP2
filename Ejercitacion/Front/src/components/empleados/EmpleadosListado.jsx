import React from "react";
import moment from "moment";

export default function EmpleadosListado({
    //Parametros de la funcion
  Items,
  Modificar,
  ActivarDesactivar,
  RegistrosTotal,
}) {

  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">ApellidoYNombre</th>
            <th className="text-center">Dni</th>
            <th className="text-center">FechaNacimiento</th>
            <th className="text-center">Suspendido</th>
            <th className="text-center text-nowrap">Acciones</th> {/*Columna acciones que tiene los botones para modificar y eliminar*/}
          </tr>
        </thead>
        <tbody>
            {/*Recorremos el array de Items*/}
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdEmpleado}>
                <td>{Item.ApellidoYNombre}</td>
                <td className="text-end">{Item.Dni}</td>
                <td className="text-end">
                  {moment(Item.FechaNacimiento).format("DD/MM/YYYY")}
                </td>
                <td>{Item.Suspendido ? "SI" : "NO"}</td>
                <td className="text-center text-nowrap"> 
                    {/*Boton Modificar*/}
                  <button  
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                    {/*Boton Borrar*/}
                    <button
                        className="btn btn-sm btn-outline-danger"
                        title="Borrar"
                        onClick={() => ActivarDesactivar(Item)}
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                    
                    {/*Boton Activar/Desactivar*/}
                    {/* <button
                    className={
                      "btn btn-sm " +
                      (Item.Suspendido
                        ? "btn-outline-danger"
                        : "btn-outline-success")
                    }
                    title={Item.Suspendido ? "Desactivar" : "Activar"}
                    onClick={() => ActivarDesactivar(Item)}
                  >
                    <i
                      className={"fa fa-" + (Item.Suspendido ? "times" : "check")}
                    ></i>
                  </button> */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Registros Totales*/}
      <div className="registrosTotales">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
