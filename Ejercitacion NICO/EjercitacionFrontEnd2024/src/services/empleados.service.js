
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

 import {config} from "../config";
 const urlResource = config.urlResourceEmpleados; // defino a la url de empleados como el recurso a utilizar

// CORROBORAR QUE COINCIDA CON EL BACKEND (Estaba Nombre en vez de APellidoYNombre)
async function Buscar(ApellidoYNombre, Pagina) {
  console.log("ApellidoYNombre: " + ApellidoYNombre);
  const resp = await httpService.get(urlResource, {
    params: { ApellidoYNombre, Pagina },
  });
  console.log(resp.data); // Para saber si me devuelve bien los datos del api
  return resp.data;
}


// async function BuscarPorId(item) {
//   const resp = await httpService.get(urlResource + "/" + item.IdEmpleado); // ?????
//   return resp.data;
// }
// funcion sin uso



async function Grabar(item) {
  await httpService.post(urlResource, item)
}


export const empleadosService = {
  Buscar,
  // BuscarPorId,
  Grabar
};

