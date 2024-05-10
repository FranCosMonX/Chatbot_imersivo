import { ChatSession } from "@google/generative-ai";
import { Button, Card, Grid, List, ListItem, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

interface Mensagem {
  id: number;
  msg: string;
}

interface Init {
  conexao: ChatSession;
}

function chatbot({ conexao }: Init) {
  const [historico, setHistorico] = useState<Mensagem[]>()
  const [message, setMessage] = useState("")

  const handleteste = () => {

  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const resultado = await conexao.sendMessage("quanto é 2 + 5?")
    console.log(resultado.response.text())
  }

  return (
    <>
      <Card sx={{ minWidth: "100%" }}>
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
                multiline
                maxRows={4}
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
