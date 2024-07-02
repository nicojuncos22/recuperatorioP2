import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EmpleadosRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) { 
  const { // Hook de validacion de formulario 
    register, //funcion de react-hook-form para registrar los campos del formulario
    handleSubmit, //funcion de react-hook-form para manejar el evento submit del formulario
    formState: { errors, touchedFields, isValid, isSubmitted }, //propiedades de react-hook-form para manejar los errores de validación
  } = useForm({ values: Item }); //Inicializa el hook de validación y obtiene los valores iniciales del formulario

  const onSubmit = (data) => { //Función que se ejecuta al hacer submit del formulario
    Grabar(data); //Llama a la función Grabar del componente padre y le pasa los datos del formulario
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}> {/* Formulario */} 
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>  {/* Deshabilita los campos del formulario si la acción es C (Consultar) */}

          {/* campo ApellidoYNombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="ApellidoYNombre">
                ApellidoYNombre<span className="text-danger">*</span>: {/*Campo requerido*/}
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
                {/*Campo de texto para ingresar el Apellido y Nombre del empleado*/}
              <input
                type="text"
                {...register("ApellidoYNombre", { //Reglas de validación del campo
                  required: { value: true, message: "ApellidoYNombre es requerido" },
                  minLength: {
                    value: 5, //Mínimo de caracteres permitidos (debe coincidir con el modelo de datos (sequelize-init.js) )
                    message: "ApellidoYNombre debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 60, //Máximo de caracteres permitidos (debe coincidir con el modelo de datos (sequelize-init.js))
                    message: "ApellidoYNombre debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.ApellidoYNombre ? "is-invalid" : "") //Si hay errores de validación, se agrega la clase is-invalid para que se muestre en rojo
                }
              />
              {errors?.ApellidoYNombre && touchedFields.ApellidoYNombre && ( // Si se toca el campo y hay errores de validación, se muestra el mensaje de error
                <div className="invalid-feedback">
                  {errors?.ApellidoYNombre?.message} {/*Mensaje de error*/}
                </div>
              )}
            </div>
          </div>


          {/* campo Dni */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Dni">
                Dni<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("Dni", {
                  required: { value: true, message: "Dni es requerido" },
                  min: {
                    value: 100000,
                    message: "Dni debe ser mayor a 100000",
                  },
                  max: {
                    value: 99999999,
                    message: "Dni debe ser menor o igual a 99999999",
                  },
                })}
                className={
                  "form-control " + (errors?.Dni ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Dni?.message}</div>
            </div>
          </div>


          {/* campo FechaNacimiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaNacimiento">
                Fecha de Nacimiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaNacimiento", {
                  required: { value: true, message: "Fecha de Nacimiento es requerido" }
                })}
                className={
                  "form-control " + (errors?.FechaNacimiento ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaNacimiento?.message}
              </div>
            </div>
          </div>

          {/* campo Suspendido */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Suspendido">
                Suspendido<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                name="Suspendido"
                {...register("Suspendido", {
                  required: { value: true, message: "Suspendido es requerido" },
                })} >

                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
              <div className="invalid-feedback">{errors?.Suspendido?.message}</div>
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && ( //Si la acción no es Consultar, muestra el botón Grabar
              <button type="submit" className="btn btn-primary"> {/*Botón de tipo submit para enviar el formulario y que se agregue el nuevo registro*/}
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()} //Llama a la función Volver del componente padre 
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"} {/*Si la acción es Consultar, muestra "Volver", si no, muestra "Cancelar"*/}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && ( //Si el formulario no es válido y se ha hecho submit, muestra el mensaje de error
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}

