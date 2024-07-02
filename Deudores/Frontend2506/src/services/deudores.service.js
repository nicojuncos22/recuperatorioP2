
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config";
 const urlResource = config.urlResourceDeudores;


async function Buscar() {
  const resp = await httpService.get(urlResource);
  return resp.data;
}


async function Grabar(item) {
  await httpService.post(urlResource, item);
}


export const deudoresService = {
  Buscar, Grabar
};
