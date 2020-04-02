import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowDownLeft } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

import "./styles.css";

export default function NewIncident() {
  const [title, setTile] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    try {
      const data = {
        title,
        description,
        value
      };

      await api.post("/incident", data, {
        headers: {
          Authorization: ongId
        }
      });
      history.push("/profile");
    } catch (error) {
      alert("erro ao cadastrar incidente");
    }
  }

  return (
    <div className="new-incident">
      <div className="content">
        <section>
          <img src={logoImg} alt="be the hero" />
          <h1>Cadastrar novo caso</h1>
          <p>descreva o caso detalhadamente</p>
          <Link className="back-link" to="/profile">
            <FiArrowDownLeft size={16} color="E02041" /> Voltar
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="titulo do caso"
            value={title}
            onChange={e => setTile(e.target.value)}
          />

          <textarea
            placeholder="descricao"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
