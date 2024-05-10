import { ChatSession } from "@google/generative-ai";
import { Button, Card, Grid, List, ListItem, TextField, TextareaAutosize, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Mensagem {
  id: number;
  msg: string;
}

interface Init {
  conexao: ChatSession;
}

const reestricao = `
Neste chat, só responda perguntas ou assuntos vinculados a oceanos, rios e natureza.
- Caso alguém lhe peça para fazer códigos de programação (de qualquer linguagem), apenas detalhe o passo a passo de como fazer, mas não escreva nenhuma linha de código;
exemplo:
    - pergunta: me forneça um código em python para imprimir um texto falando de oceano.
    - resposta: tenha certeza de ter uma IDE instalada, em seguida insira o codigo basico que imprime objetos
- Você só pode gerar conteúdo textual com entrada de texto apenas, pois as demais funcionalidades não foram implementadas;
- O nome dessa aplicação é Chat imersivo;
- Tenha uma conversa continua.
- quando for dar uma resposta, primeiro analise ela novamente e veja se adequa aos requisitos informados.

Agora escreva uma saudação;
`

function chatbot({ conexao }: Init) {
  const [historico, setHistorico] = useState<Mensagem[]>();
  const [message, setMessage] = useState("");
  const [saudacao, setSaudacao] = useState(false)

  useEffect(() => {
    const resultado = async () => {
      if (!saudacao) {
        setSaudacao(true);
        const resultado = await conexao.sendMessage(reestricao)
        if (historico == null || historico == undefined) {
          setHistorico([{ id: 0, msg: resultado.response.text() }])
        } else {
          const msg: Mensagem = { id: historico.length, msg: resultado.response.text() }
          setHistorico([...historico, msg])
        }
        console.log(resultado.response.text())
      }
    }

    resultado();
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const resultado = await conexao.sendMessage(message)
    console.log(resultado.response.text())
    if (historico == null || historico == undefined) {
      setHistorico([{ id: 0, msg: resultado.response.text() }])
    } else {
      const msg: Mensagem = { id: historico.length, msg: resultado.response.text() }
      setHistorico([...historico, msg])
    }
    console.log(resultado)
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
                    <TextareaAutosize value={historico.msg + "\n asdsad"} />
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => { setMessage(e.target.value) }}
              sx={{ width: '100%' }}
            />
            <Button type="submit" sx={{ width: "200px" }}>Enviar</Button>
          </form>
        </Grid>
      </Grid>
    </Card>
  )

}

export default chatbot
