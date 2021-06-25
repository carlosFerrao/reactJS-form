import React, { useEffect, useState } from "react";
import FormularioCadastro from "./components/FormularioCadastro/FormularioCadastro";
import Cartoes from "./components/Cartoes/Cartoes";
import { Container, Typography } from "@material-ui/core";
import "fontsource-roboto";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [atualizou, setAtt] = useState(false);
  const [loadStatus, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetch("http://localhost:3001/cards")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setLoader(false);
      });
  }, [atualizou]);

  const validateForms = (value, type) => {
    if (type === "foto") {
      if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(value)) {
        return {
          invalido: false,
          textoApoio: "",
          preenchido: true,
        };
      } else {
        return {
          invalido: true,
          textoApoio: "A url deve conter as extensões: jpg, jpeg ou png",
          preenchido: false,
        };
      }
    } else if (type === "nome" || type === "cargo") {
      if (value.length <= 5) {
        return {
          invalido: true,
          textoApoio: "Nome deve conter no mínimo 5 caracteres",
          preenchido: false,
        };
      } else {
        return {
          invalido: false,
          textoApoio: "",
          preenchido: true,
        };
      }
    } else if (type === "whatsapp") {
      if (value.length <= 10) {
        return {
          invalido: true,
          textoApoio: "O cel deve ter DDD + Número com 9 digitos",
          preenchido: false,
        };
      } else {
        return {
          invalido: false,
          textoApoio: "",
          preenchido: true,
        };
      }
    } else if (type === "linkedin") {
      if (value.includes("linkedin.com")) {
        return {
          invalido: false,
          textoApoio: "",
          preenchido: true,
        };
      } else {
        return {
          invalido: true,
          textoApoio: "A url deve conter o dominio: 'linkedin,com' ",
          preenchido: false,
        };
      }
    } else if (type === "email") {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          value
        )
      ) {
        return {
          invalido: false,
          textoApoio: "",
          preenchido: true,
        };
      } else {
        return {
          invalido: true,
          textoApoio: "Digite um email válido",
          preenchido: false,
        };
      }
    }
  };

  const atualiza = (param) => {
    setLoader(true);
    fetch("http://localhost:3001/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(() => {
      setLoader(true);
      setAtt(!atualizou);
    });
  };

  const deletarCard = (id) => {
    setLoader(true);
    fetch(`http://localhost:3001/cards/${id}`, { method: "DELETE" }).then(
      () => {
        setLoader(false);
        setAtt(!atualizou);
      }
    );
  };

  return (
    <Container maxWidth="md" component="article" className="container">
      <section className="form-div">
        <Typography
          variant="h5"
          component="h1"
          align="center"
          onClick={atualiza}
        >
          {" "}
          Formulário de Cadastro{" "}
        </Typography>
        <FormularioCadastro aoEnviar={atualiza} validarForm={validateForms} />
      </section>

      <section className={!loadStatus ? "card-div" : "load-div"}>
        <Cartoes cartoes={cards} deletar={deletarCard} loading={loadStatus} />
      </section>
    </Container>
  );
}

export default App;
