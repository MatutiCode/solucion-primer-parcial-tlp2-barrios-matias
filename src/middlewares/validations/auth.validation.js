// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import { UserModel, ProfileModel } from "../../models/index.js";

export const registerValidation = [
  // TODO: 1. Validar username: obligatorio, entre 3 y 20 caracteres y único (UserModel).
  body("username").notEmpty().withMessage("el nombre de usuario debe ser obligatorio").isLength({ min: 3, max: 20}).withMessage("el nombre debe tener 3 y 20 caracteres"),
  // TODO: 2. Validar email: obligatorio, con formato válido y único.
  body("email").notEmpty().withMessage("el email debe ser obligatorio").isEmail().withMessage("el email debe ser valido"),
  // TODO: 3. Validar password: obligatoria, con mínimo de 8 caracteres.
  body("password").notEmpty().withMessage("la contraseña es obligatoria").isLength({ min: 8}).withMessage("la contraseña debe tener al menos 8 caracteres"),
  // TODO: 4. Validar role: opcional y limitado a los roles permitidos.
  // TODO: 5. Validar profile.employee_number: obligatorio y único (ProfileModel).
  // TODO: 6. Validar profile.first_name y profile.last_name como obligatorios, y profile.phone como opcional.
  // ? Las unicidades requieren una validación personalizada asíncrona.
];

export const loginValidation = [
  // TODO: 7. Validar email: obligatorio y con formato válido.
  body("email").notEmpty().withMessage("el email es obligatorio").isEmail().withMessage("debe ingresar un email valido"),
  // TODO: 8. Validar password: obligatoria.
  body("password").notEmpty().withMessage("la contraseña es obligatoria")
];
