import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:8000/api/v1/auth/login", data)
      .then((res) => {
        navigate("/");
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token); //setToken
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          alert("Credenciales incorrectas");
        } else {
          alert(error.response?.status);
        }
      });
  };
  return (
    <div className="login-container">
      <Form onSubmit={handleSubmit(submit)} className="login-form">
        <p className="welcome-form">
          Bienvenido! por favor ingresa tu correo electronico y contraseña para
          iniciar sesion
        </p>
        <div className="inputs-btn-login">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control
              type="email"
              placeholder="correo electronico"
              {...register("email")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="contraseña"
              {...register("password")}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn-submit">
            Iniciar sesion
          </Button>
        </div>
      </Form>
      <p>
        ¿No tienes una cuenta? registrate dando clic <span> </span>
        <Link to={"/"}>aqui</Link>
      </p>
    </div>
  );
};

export default Login;
