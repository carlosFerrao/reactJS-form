import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InputMask from "react-input-mask";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import EmailIcon from "@material-ui/icons/Email";
import PhotoIcon from "@material-ui/icons/Photo";
import "./FormularioCadastro.css";

function FormularioCadastro({ aoEnviar, validarForm }) {
  const [foto, setFoto] = useState("");
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [whatsapp, setWhats] = useState("");
  const [linkedin, setLinked] = useState(true);
  const [email, setEmail] = useState(true);
  const [erros, setErros] = useState({
    foto: {
      invalido: false,
      preenchido: false,
      textoApoio: "",
    },
    nome: {
      invalido: false,
      preenchido: false,
      textoApoio: "",
    },
    cargo: {
      invalido: false,
      preenchido: false,
      textoApoio: "",
    },
    whatsapp: {
      invalido: false,
      preenchido: false,
      textoApoio: "",
    },
    linkedin: {
      invalido: false,
      preenchido: false,
      textoApoio: "",
    },
    email: {
      invalido: false,
      preenchido: false,
      textoApoio: "",
    },
  });
  const [habilitaForm, setHabilita] = useState(false);

  const permitirEnvio = () => {
    let arrErros = Object.values(erros);
    let booArr = [];
    arrErros.forEach((elem) => {
      booArr.push(elem.preenchido);
    });
    if (booArr.includes(false)) {
      setHabilita(false);
    } else {
      setHabilita(true);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        aoEnviar({ foto, nome, cargo, whatsapp, linkedin, email });
      }}
    >
      <TextField
        id="input-with-icon-textfield"
        label="Foto"
        size="small"
        variant="outlined"
        onBlur={(event) => {
          setFoto(event.target.value);
          let errorObj = erros;
          errorObj.foto = validarForm(event.target.value, "foto");
          setErros(errorObj);
          permitirEnvio();
        }}
        fullWidth
        error={erros.foto.invalido}
        helperText={erros.foto.textoApoio}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhotoIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        onBlur={(event) => {
          setNome(event.target.value);
          let errorObj = erros;
          errorObj.nome = validarForm(event.target.value, "nome");
          setErros(errorObj);
          permitirEnvio();
        }}
        id="nome"
        label="Nome"
        error={erros.nome.invalido}
        helperText={erros.nome.textoApoio}
        size="small"
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <TextField
        id="cargo"
        label="Cargo"
        size="small"
        variant="outlined"
        fullWidth
        error={erros.cargo.invalido}
        helperText={erros.cargo.textoApoio}
        margin="normal"
        onBlur={(event) => {
          setCargo(event.target.value);
          let errorObj = erros;
          errorObj.cargo = validarForm(event.target.value, "cargo");
          setErros(errorObj);
          permitirEnvio();
        }}
      />

      <InputMask
        mask="(99)99999-9999"
        onBlur={(event) => {
          setWhats(event.target.value);
          let errorObj = erros;
          errorObj.whatsapp = validarForm(
            event.target.value.replace(/[^\d]+/g, ""),
            "whatsapp"
          );
          setErros(errorObj);
          permitirEnvio();
        }}
      >
        {() => (
          <TextField
            id="input-with-icon-textfield"
            label="WhatsApp"
            size="small"
            variant="outlined"
            fullWidth
            error={erros.whatsapp.invalido}
            helperText={erros.whatsapp.textoApoio}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WhatsAppIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      </InputMask>

      <TextField
        id="input-with-icon-textfield"
        label="LinkedIn"
        size="small"
        variant="outlined"
        fullWidth
        margin="normal"
        error={erros.linkedin.invalido}
        helperText={erros.linkedin.textoApoio}
        onBlur={(event) => {
          setLinked(event.target.value);
          let errorObj = erros;
          errorObj.linkedin = validarForm(event.target.value, "linkedin");
          setErros(errorObj);
          permitirEnvio();
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkedInIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        id="input-with-icon-textfield"
        label="Email"
        size="small"
        variant="outlined"
        fullWidth
        margin="normal"
        error={erros.email.invalido}
        helperText={erros.email.textoApoio}
        onBlur={(event) => {
          setEmail(event.target.value);
          let errorObj = erros;
          errorObj.email = validarForm(event.target.value, "email");
          setErros(errorObj);
          permitirEnvio();
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!habilitaForm}
      >
        {" "}
        Cadastrar
      </Button>
    </form>
  );
}

export default FormularioCadastro;
