import httpService from "./http.service";

// importo la url del recurso desde el archivo de configuración
 import {config} from "../config";
// const urlResource = config.urlResourceEmpleados;
const urlResource = config.urlResourceEmpleados;


 
async function Buscar(ApellidoYNombre) { //Función para buscar empleados por ApellidoYNombre (usando el backend)
  const resp = await httpService.get(urlResource, {
    params: { ApellidoYNombre},
  });
  return resp.data;
}


async function BuscarPorId(item) { //Función para buscar empleados por Id
  const resp = await httpService.get(urlResource + item.IdEmpleado);
  return resp.data;
}


async function ActivarDesactivar(item) { //Función para activar o desactivar empleados (borrado logico)
  await httpService.delete(urlResource + "/" + item.IdEmpleado);
}

async function BajaFisica(item) {
    await httpService.delete(urlResource + "/" + item.IdEmpleado);
}


async function Grabar(item) { //Función para agregar o modificar empleados
  if (item.IdEmpleado === 0) {
    await httpService.post(urlResource, item); //Si el IdEmpleado es 0, se agrega un nuevo empleado
  } else {
    await httpService.put(urlResource + "/" + item.IdEmpleado, item); //Si el IdEmpleado no es 0, se modifica un empleado existente
  }
}


export const empleadosService = {
  Buscar,BuscarPorId, ActivarDesactivar,Grabar, BajaFisica
};
