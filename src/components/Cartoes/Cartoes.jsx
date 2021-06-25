import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import EmailIcon from "@material-ui/icons/Email";
import CardActions from "@material-ui/core/CardActions";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Cartoes.css";
// import { Container } from './styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    marginBottom: 10,
    width: 200,
    borderRadius: 30,
  },
  media: {
    height: 140,
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    borderRadius: 80,
  },
});

const useStylesExpand = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function Cartoes({ cartoes, deletar, loading }) {
  const classes = useStyles();
  const classesExpand = useStylesExpand();
  const [idExpand, setId] = useState(0);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (id) => {
    setId(id);
    setExpanded(!expanded);
  };

  const cards = cartoes.map((e, index) => (
    <Card className={classes.root} key={index}>
      <DeleteIcon
        className="delete-icon"
        onClick={() => {
          deletar(e.id);
        }}
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={e.foto}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {e.nome}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {e.cargo}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classesExpand.expand, {
            [classesExpand.expandOpen]: expanded,
          })}
          onClick={() => handleExpandClick(e.id)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      {expanded && e.id === idExpand && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Contatos:</Typography>
            <div className="contacts">
              <a href={e.linkedin} rel="noreferrer" target="_blank">
                {" "}
                <LinkedInIcon color="action" fontSize="large" alt="teste" />
              </a>
              <a href={"tel:+" + e.whatsapp} rel="noreferrer">
                {" "}
                <WhatsAppIcon color="action" fontSize="large" alt="teste" />
              </a>
              <a href={"mailto:" + e.email}>
                {" "}
                <EmailIcon color="action" fontSize="large" alt="teste" />
              </a>
            </div>
          </CardContent>
        </Collapse>
      )}
    </Card>
  ));

  return (
    <>
      <section className="loader">
        {loading && <CircularProgress color="primary" />}
      </section>
      <section className="card-div">{!loading && cards}</section>
    </>
  );
}

export default Cartoes;
