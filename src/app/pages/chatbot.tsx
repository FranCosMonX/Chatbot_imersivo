import { Button, Card, Grid, List, ListItem, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

interface Mensagem {
  id: number;
  msg: string;
}

function chatbot() {
  const [historico, setHistorico] = useState<Mensagem[]>()
  const [message, setMessage] = useState("")

  const handleteste = () => {
    const objet = [
      { id: 1, msg: "muito bom" },
      { id: 2, msg: "okay" },
      { id: 3, msg: "fala bem construida" },
      { id: 4, msg: "muito bom" },
      { id: 5, msg: "okay" },
      { id: 6, msg: "fala bem construida" },
      { id: 7, msg: "muito bom" },
      { id: 8, msg: "okay, abrobrinhas de mais já não pprestam muito. " },
      { id: 9, msg: "fala bem construida" },
      { id: 10, msg: "muito bom" },
      { id: 11, msg: "okay" },
      { id: 12, msg: "fala bem construida" },
      { id: 12, msg: "okay, abrobrinhas de mais " },
      { id: 12, msg: 'Nada de mais,\n\n\raswarning' }
    ]
    setHistorico(objet)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleteste()
  }

  return (
    <>
      <Card sx={{ width: "100%" }}>
        <Typography textAlign={"center"} variant="h4">Chat</Typography>
        <Grid container display={"flex"} flexDirection={"column"} >
          <Grid item sm={12} sx={{ border: "1px solid white", padding: "3px" }}>
            <List
              sx={{ overflow: "auto", maxHeight: '200px' }}
            >
              {historico?.map((historico) => {
                return (
                  <ListItem key={historico.id}>
                    <Typography width={"100%"} sx={{ borderBottom: "1px solid white" }}>{historico.msg}</Typography>
                  </ListItem>
                )
              })}
            </List>
          </Grid>
          <Grid item sx={{ marginTop: "10px" }}>
            <form className="enviar-msg" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                placeholder="Escreva uma mensagem aqui"
                sx={{ width: '100%' }}
              >
              </TextField>
              <Button type="submit">Enviar</Button>
            </form>
          </Grid>
        </Grid>
      </Card>
    </>
  )

}

export default chatbot
