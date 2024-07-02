import React from "react";
import { useForm } from "react-hook-form";

export default function EmpleadoRegistro({
    AccionABMC,
    Grabar,
    Volver,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm();

    const onSubmit = (data) => {
        Grabar(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">


                <fieldset >{/* Que hace esto?????? */}


                    {/* campo Apellido Y Nombre */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="ApellidoYNombre">
                                Apellido Y Nombre<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("ApellidoYNombre", {
                                    required: { value: true, message: "ApellidoYNombre es requerido" },
                                    minLength: {
                                        value: 5,
                                        message: "ApellidoYNombre debe tener al menos 5 caracteres",
                                    },
                                    maxLength: {
                                        value: 60,
                                        message: "ApellidoYNombre debe tener como máximo 60 caracteres",
                                    },
                                })}
                                autoFocus
                                className={
                                    "form-control " + (errors?.ApellidoYNombre ? "is-invalid" : "")
                                }
                            />
                            {errors?.ApellidoYNombre && touchedFields.ApellidoYNombre && (
                                <div className="invalid-feedback">
                                    {errors?.ApellidoYNombre?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* campo Dni */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="Dni">
                                DNI<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="number" step=".01"
                                {...register("Dni", {
                                    required: { value: true, message: "DNI es requerido" },
                                    min: {
                                        value: 1,
                                        message: "Dni debe ser mayor a 0",
                                    },
                                    max: {
                                        value: 9999999999,
                                        message: "Importe Adeudado debe ser menor o igual a 99999999",
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
                                Fecha Nacimiento<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="date"
                                {...register("FechaNacimiento", {
                                    required: { value: true, message: "Fecha Nacimiento es requerido" }
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
                        <div className="com-sm-8 col-md-6">
                            <select
                                {...register("Suspendido", {
                                    required: { value: true, message: "Suspendido es requerido" },
                                })}
                                className={
                                    "form-control " + (errors?.Suspendido ? "is-invalid" : "")
                                }
                            >
                                <option value="">Seleccione...</option>
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                            <div className="invalid-feedback"></div>
                            {errors?.Suspendido?.message}
                        </div>
                    </div>
                </fieldset>
            </div>

            {/* Botones Grabar, Cancelar/Volver' */}
            <hr />
            <div className="row justify-content-center">
                <div className="col text-center botones">
                    <button type="submit" className="btn btn-primary">
                        <i className="fa fa-check"></i> Registrar
                    </button>
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => Volver()}
                    >
                        <i className="fa fa-undo"></i>
                        Volver
                    </button>
                </div>
            </div>

            {/* texto: Revisar los datos ingresados... */}
            {
                !isValid && isSubmitted && (
                    <div className="row alert alert-danger mensajesAlert">
                        <i className="fa fa-exclamation-sign"></i>
                        Revisar los datos ingresados...
                    </div>
                )
            }
        </form>
    );
}

