import React from "react";
import { Link } from "react-router-dom";

import img1 from "../assets/images/carrito2.jpg";
import img2 from "../assets/images/promo2.jpg";

const NavbarComponent = () => {
  return (
    <div>
      <ul className="nav-top">
        <li>
          <img src={img1} alt="" className="img-nav" />
        </li>
        <li>
          <div>
            <h1>eCommerce-ITP</h1>
            <p>Derechos reservados del autor</p>
          </div>
        </li>
        <li>
          <img src={img2} alt="" className="img-nav" />
        </li>
      </ul>
      <div className="nav-botom">
        <Link className="sidebar-element" to={"/"}>
          Reporte de complejos
        </Link>
        <Link className="sidebar-element" to={"/usuarios"}>
          Reporte de Usuarios
        </Link>
        <Link className="sidebar-element" to={'/gestion'}>
          Default 3
        </Link>
      </div>
    </div>
  );
};

export default NavbarComponent;
