import React from "react";
import "./App.css";
import FormularioCadastro from "./components/FormularioCadastro/FormularioCadastro";
import { Container, Typography } from "@material-ui/core";
import "fontsource-roboto";

function App() {
  return (
    <Container maxWidth="md" component="article">
      <Typography variant="h3" component="h1" align="center">
        {" "}
        Formulário de Cadastro{" "}
      </Typography>
      <FormularioCadastro />
    </Container>
  );
}

export default App;
