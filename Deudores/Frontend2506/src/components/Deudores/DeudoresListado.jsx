import React from "react";
import moment from "moment";


export default function DeudoresListado({
  Items,
  RegistrosTotal,
  Imprimir,
}) {
  return (
    <div className="table-responsive">
      <h2>Listado de Deudores</h2>
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Id Deudor</th>
            <th className="text-center">Apellido Y Nombre</th>
            <th className="text-center">Fecha Deuda</th>
            <th className="text-center">Importe Adeudado</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdDeudor}>
                <td>{Item.IdDeudor}</td>
                <td>{Item.ApellidoYNombre}</td>
                <td className="text-end">
                  {moment(Item.FechaDeuda).format("DD/MM/YYYY")}
                </td>
                <td className="text-end">{Item.ImporteAdeudado}</td>
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
