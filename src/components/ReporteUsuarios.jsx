import React, { useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import search from "../assets/images/icon_logalum.gif";
import Sidebar from "./Sidebar";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [usersO, setUsersO] = useState([]);
  const [filter, setFilter] = useState("");
  let usersFiltered = [];

  const usersPerPage = 2;
  const lastIndex = page * usersPerPage;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const firstIndex = lastIndex - usersPerPage;
  let usersPaginated = users.slice(firstIndex, lastIndex);
  // : usersFiltered.slice(firstIndex, lastIndex);
  const pages = [];

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/users")
      .then((res) => {
        setUsers(res.data)
        setUsersO(res.data)
      });
  }, []);

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  const buttonsPaginated = pages.slice(page - 1, page + 10);

  const fun = () => {
    for (let key of usersO) {
      for (const iterator in key) {
        if (
          typeof key[iterator] === "string" &&
          key[iterator].toUpperCase().includes(filter.toUpperCase())
        ) {
          if (!usersFiltered.includes(key)) {
            usersFiltered.push(key);
          }
        }
      }
    }
      setUsers(usersFiltered)
    usersFiltered=[]
  };

  function cadenaIncluidaEnObjeto(obj, cadena) {
    return false;
  }

  return (
    <div className="main-page-container">
    <NavbarComponent/>
     <div className="x">
      <Sidebar />
    <div className="firstPage-container">
      <h1>Reporte de Usuarios</h1>
      <div className="input-container">
        <label htmlFor="">Filtro</label><br />
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
            <th>nombre</th>
            <th>telefono</th>
            <th>email</th>
            <th>usuario</th>
            <th>rol</th>
          </tr>
        </thead>
        <tbody>
          {usersPaginated.map((user) => (
            <tr key={user.usu_cve_usuario}>
              <td>{user.usu_cve_usuario}</td>
              <td>{`${user.usu_nombre} ${user.usu_apellido_paterno} ${user.usu_apellido_materno}`}</td>
              <td>{user.usu_telefono}</td>
              <td>{user.usu_correo}</td>
              <td>{user.usu_usuario}</td>
              <td>{`${user.rol_cve_rol} ${user.rol_cve_rol_rol.rol_nombre}`}</td>
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

export default Dashboard;
