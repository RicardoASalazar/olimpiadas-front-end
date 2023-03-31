import React, { Children, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Sidebar from "./Sidebar";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
import search from "../assets/images/icon_logalum.gif";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { set, useForm } from "react-hook-form";

const GestionComplejos = () => {
  const { register, handleSubmit } = useForm();

  const [resultado, setResultado] = useState({});
  const [cve, setCve] = useState({});
  const [comData, setComData] = useState({});

  const [area, setArea] = useState(0);
  const [desc, setDesc] = useState("");
  const [jefe, setJefe] = useState("");
  const [loca, setLoca] = useState("");
  const [newFound, setNewFound] = useState(false);

  const [sedes, setSedes] = useState([]);
  const [sede, setSede] = useState(0);

  useEffect(() => {
    if (resultado.no_control) {
      alert("Usuario creado exitosamente");
      setResultado({});
    }

    axios
      .get("http://localhost:8000/api/v1/sede")
      .then((res) => setSedes(res.data));
  }, [resultado]);

  const filterType = (e) => {
    if (e.target.value) {
      setSede(e.target.value);
    } else {
      setSede(0);
      console.log("nada aun");
    }
  };

  const findCom = () => {
    axios
      .get(`http://localhost:8000/api/v1/complejo/cve/${cve}`)
      .then((res) => {
        setArea(res.data.com_area);
        setDesc(res.data.com_descripcion);
        setJefe(res.data.com_jefe);
        setLoca(res.data.com_localizacion);
        setSede(res.data.sed_cve_sede);
        setComData(res.data);
      });
    console.log(cve);
  };

  const registrar = () => {
    let valid = true;
    let message = "";
    const newData = {
      com_area: parseFloat(area),
      com_descripcion: desc,
      com_jefe: jefe,
      com_localizacion: loca,
      sed_cve_sede: parseInt(sede),
    };

    for (const value in newData) {
      if (!newData[value]) {
        // return alert('Por favor llena todos los campos correctamente')
        message = "Por favor llena todos los campos correctamente";
        valid = false;
      }
    }

    console.log(newData);

    if (valid) {
      axios
        .post("http://localhost:8000/api/v1/complejo/register", newData)
        .then((res) => {
          if (res.data.com_cve_complejo) {
            message = "usuario agregado exitosamente";
          }
        });
    }
    console.log(message);
  };

  const modificar = (data) => {
    const newData = {
      cve: comData.com_cve_complejo,
      com_area: area,
      com_descripcion: desc,
      com_jefe: jefe,
      com_localizacion: loca,
      sed_cve_sede: sede,
    };
    let valid = true;
    let iguales = true;
    for (const o in newData) {
      if (iguales === true) {
        if (newData[o] !== comData[o]) {
          iguales = false;
        }
      }
    }
    for (const value in newData) {
      if (!newData[value]) {
        // return alert('Por favor llena todos los campos correctamente')
        // message = "Por favor llena todos los campos correctamente";
        valid = false;
      }
    }

    if (!iguales) {
      if (valid) {
        axios
          .put("http://localhost:8000/api/v1/complejo/modify", newData)
          .then((res)=>{
            if (res.data[0]) {
              alert('complejo modificado exitosamente')
            }else{
              alert('Algo salio mal')
            }
          })
      }
    } else {
      console.log(comData);
    }
  };


  const eliminar = () => {
    axios.delete(`http://localhost:8000/api/v1/complejo/${cve}`)
    .then((res)=>{
      if(res.data){
        alert('Complejo eliminado exitosamente')
      }else{
        alert(`No se encontro un complejo con la clave: ${cve}`)
      }
    })
  };

  return (
    <div className="main-page-container">
      <NavbarComponent />
      <div className="x">
        <Sidebar />
        <div className="form-d3-container">
          <Form className="user-from">
            {/* <Form.Group className="mb-3" controlId="numControlNewUser">
              <Form.Label>Clave:</Form.Label>
              <input
                className="create-user-input"
                type="number"
                autoComplete="off"
                placeholder="clave"
                {...register("com_cve_complejo")}
              />
            </Form.Group> 
            
            const[area, setArea] = useState('');
            const[desc, setDesc] = useState('');
            const[jefe, setJefe] = useState('');
            const[loca, setLoca] = useState('');
            const[cveSde, setCveSde] = useState(0);
            */}
            <div className="cve-com-container">
              <label htmlFor="cve-com">Clave:</label>
              <div>
                <input
                  type="number"
                  id="cve-com"
                  value={cve}
                  onChange={(e) => setCve(e.target.value)}
                  placeholder="Escribe la clave del complejo que deseas buscar"
                />
                <button className="search-button" onClick={findCom}>
                  <img src={search} alt="" />
                </button>
              </div>
            </div>

            <Form.Group className="mb-3" controlId="grupoId">
              <Form.Label>Descripción:</Form.Label>
              <input
                className="create-user-input"
                type="text"
                placeholder="descripcioon"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="careerId">
              <Form.Label>Jefe Organizacional:</Form.Label>
              <input
                className="create-user-input"
                type="bossName"
                placeholder="jefe organizacional"
                value={jefe}
                onChange={(e) => setJefe(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="stateId">
              <Form.Label>Localización:</Form.Label>
              <input
                className="create-user-input"
                type="location"
                placeholder="localizacion"
                value={loca}
                onChange={(e) => setLoca(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="stateId">
              <Form.Label>Area Total (mts.):</Form.Label>
              <input
                className="create-user-input"
                type="number"
                placeholder="Area total"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </Form.Group>

            <div className="mb-3">
              <label htmlFor="sedes">Sede:</label>
              <select
                className="primer-intento"
                id="sedes"
                onChange={filterType}
                value={sede}
                // onChange={}
              >
                <option value="">Seleccione una sede</option>
                {sedes.map((sede) => (
                  <option key={sede.sed_cve_sede} value={sede.sed_cve_sede}>
                    {sede.sed_nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="buttons-container">
              <Button
                variant="primary"
                type="submit"
                className="btn-submit-admin"
                onClick={handleSubmit(registrar)}
              >
                Registrar
              </Button>
              <Button
                variant="primary"
                type="button"
                className="btn-submit-admin"
                onClick={handleSubmit(modificar)}
              >
                Modificar
              </Button>
              <Button
                variant="primary"
                type="button"
                className="btn-submit-admin"
                onClick={handleSubmit(eliminar)}
              >
                Eliminar
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};
export default GestionComplejos;
