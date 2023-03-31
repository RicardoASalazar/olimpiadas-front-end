import React, { useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import search from "../assets/images/icon_logalum.gif";
import Sidebar from "./Sidebar";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

const ReporteComplejos = () => {
  const [page, setPage] = useState(1);
  const [complejos, setComplejos] = useState([]);
  const [complejosO, setComplejosO] = useState([]);
  const [filter, setFilter] = useState("");
  const [update, setUpdate] = useState(false);
  let complejosFiltered = [];

  const complejosPerPage = 2;
  const lastIndex = page * complejosPerPage;
  const totalPages = Math.ceil(complejos.length / complejosPerPage);
  const firstIndex = lastIndex - complejosPerPage;
  let complejosPaginated = complejos.slice(firstIndex, lastIndex);
  // : complejosFiltered.slice(firstIndex, lastIndex);
  const pages = [];

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/complejo/`).then((res) => {
      setComplejos(res.data);
      setComplejosO(res.data);
    });
  }, []);

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  const buttonsPaginated = pages.slice(page - 1, page + 10);

  const fun = () => {
    for (let key of complejosO) {
      for (const iterator in key) {
        if (
          typeof key[iterator] === "string" &&
          key[iterator].toUpperCase().includes(filter.toUpperCase())
        ) {
          if (!complejosFiltered.includes(key)) {
            complejosFiltered.push(key);
          }
        }
      }
    }
    setComplejos(complejosFiltered);
    complejosFiltered = [];
  };

  return (
   <div className="main-page-container">
    <NavbarComponent/>
     <div className="x">
      <Sidebar />
      <div className="firstPage-container">
        <h1>Reporte de complejos</h1>
        <div className="input-container">
          <label htmlFor="">Filtro</label>
          <br />
          <input
            type="text"
            id="filter-user-name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Escribe la cadena a buscar"
          />
          <button className="search-button" onClick={fun}>
            <img src={search} alt="" />
          </button>
        </div>
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>clave</th>
              <th>descripcion</th>
              <th>Jefe_Organizacional</th>
              <th>Localizacion</th>
              <th>area</th>
              <th>sede</th>
            </tr>
          </thead>
          <tbody>
            {complejosPaginated.map((complejo) => (
              <tr key={complejo.com_cve_complejo}>
                <td>{complejo.com_cve_complejo}</td>
                <td>{complejo.com_descripcion}</td>
                <td>{complejo.com_jefe}</td>
                <td>{complejo.com_localizacion}</td>
                <td>{complejo.com_area}</td>
                <td>{`${complejo.sed_cve_sede} ${complejo.sed_cve_sede_sede.sed_nombre}`}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="buttons-page main">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="button-page"
          >
            prev
          </button>
          <div className="buttons-page">
            {buttonsPaginated.map((number) => (
              <button
                key={number}
                onClick={() => {
                  setPage(number);
                }}
                className="button-page"
              >
                {number}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={page === totalPages}
            className="button-page"
          >
            next
          </button>
        </div>
      </div>
    </div>
    <FooterComponent/>
   </div>
  );
};

export default ReporteComplejos;
