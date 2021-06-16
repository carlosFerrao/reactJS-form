import React, { useState } from "react";
import { Switch, TextField, Button, FormControlLabel } from "@material-ui/core";
// import { Container } from './styles';

function FormularioCadastro() {
  const [nome, setNome] = useState("");
  // const [validaNome, validarNome] = useState(false);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(nome);
      }}
    >
      <TextField
        value={nome}
        onChange={(event) => {
          let tempNome = event.target.value;
          if (tempNome.length >= 3) {
            tempNome = tempNome.substring(0, 3);
          }

          setNome(tempNome);
        }}
        id="nome"
        label="Nome"
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <TextField
        id="sobrenome"
        label="Sobrenome"
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <TextField
        id="cpf"
        label="Cpf"
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <FormControlLabel
        label="Promoções"
        control={<Switch name="promocoes" defaultChecked color="primary" />}
      />

      <FormControlLabel
        label="Novidades"
        control={<Switch name="novidades" defaultChecked color="primary" />}
      />

      <Button type="submit" variant="contained" color="primary">
        {" "}
        Cadastrar
      </Button>
    </form>
  );
}

export default FormularioCadastro;
