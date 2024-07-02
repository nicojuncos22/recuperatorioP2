import React from "react";
import moment from "moment";


export default function EmpleadosListado({
  Items,
  RegistrosTotal,
  Imprimir,
}) {
  return (
    <div className="table-responsive">
      <h2>Listado de Empleados</h2>
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Id Empleado</th>
            <th className="text-center">Apellido Y Nombre</th>
            <th className="text-center">DNI</th>
            <th className="text-center">Fecha Nacimiento</th>
            <th className="text-center">Suspendido</th>

          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdEmpleado}>
                <td>{Item.IdEmpleado}</td>
                <td>{Item.ApellidoYNombre}</td>
                <td>{Item.Dni}</td>
                <td className="text-end">
                  {moment(Item.FechaNacimiento).format("DD/MM/YYYY")}
                  {/* Es FECHA */}
                </td>
                <td>{Item.Suspendido ? "SI" : "NO"}</td> 
                {/* Es BOOLEANO */}
              </tr>
            ))}
        </tbody>
      </table>

      {/* Paginador*/}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
        </div>
      </div>

      {/* Imprimir */}
      <div className="paginador">
        <div className="col">
          <button className="btn btn-primary float-end" onClick={() => Imprimir()}>
            <i className="fa fa-print"></i>Imprimir
          </button>
        </div>
      </div>

      
    </div>
  );
}
