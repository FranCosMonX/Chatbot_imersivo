import { ChatSession } from "@google/generative-ai";
import { Box, Button, Card, CircularProgress, Grid, List, ListItem, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import aprimorando_sintaxe from "../../utils/sintaxe/texto";

interface Mensagem {
  id: number;
  msg: string;
}

interface Init {
  conexao: ChatSession;
  saudacaoTxt: string;
}

function chatbot({ conexao, saudacaoTxt }: Init) {
  const [historico, setHistorico] = useState<Mensagem[]>();
  const [message, setMessage] = useState("");
  const [saudacao, setSaudacao] = useState(false)
  const [emProcessamento, setEmProcessamento] = useState(false)

  useEffect(() => {
    const resultado = async () => {
      if (!saudacao) {
        setSaudacao(true);
        if (historico == null || historico == undefined) {
          setHistorico([{ id: 0, msg: saudacaoTxt }])
        } else {
          const msg: Mensagem = { id: historico.length, msg: saudacaoTxt }
          setHistorico([...historico, msg])
        }
        console.log(saudacaoTxt)
      }
    }

    resultado();
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setEmProcessamento(true);

    await conexao.sendMessage(message).then((result) => {
      console.log(result.response.text())
      if (historico == null || historico == undefined) {
        setHistorico([{ id: 0, msg: result.response.text() }])
      } else {
        const msg: Mensagem = { id: historico.length, msg: result.response.text() }
        setHistorico([...historico, msg])
      }
      console.log(result)
    }).catch((error) => {
      console.log(error)
    })
    setEmProcessamento(false)
  }

  return (
    <Card sx={{ width: "100%" }}>
      <Typography textAlign={"center"} variant="h4">Chat</Typography>
      <Grid container display={"flex"} flexDirection={"column"} >
        {
          historico != null &&
          historico.length > 0 &&
          <Grid item sm={12} sx={{ border: "1px solid white", padding: "3px" }}>
            <List
              sx={{ overflow: "auto", maxHeight: '200px' }}
            >
              {historico?.map((historico) => {
                return (
                  <ListItem key={historico.id}>
                    <Box>
                      {aprimorando_sintaxe({ text: historico.msg })}
                    </Box>
                  </ListItem>
                )
              })}
            </List>
          </Grid>
        }
        <Grid item sm={12} xs={12} sx={{ marginTop: "10px" }}>
          <form className="enviar-msg" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Começe ou continue o diálogo"
              placeholder="Escreva uma mensagem aqui"
              multiline
              variant="filled"
              type="text"
              maxRows={4}
              value={message}
              onChange={(e: ChangeEvent<HTMLInputElement>) => { setMessage(e.target.value) }}
              sx={{ width: '100%', color: "white" }}
            />
            {
              emProcessamento && <CircularProgress color="primary" sx={{ margin: "auto" }} /> ||
              !emProcessamento && <Button type="submit" sx={{ width: "200px" }}>Enviar</Button>
            }
          </form>
        </Grid>
      </Grid>
    </Card>
  )

}

export default chatbot
