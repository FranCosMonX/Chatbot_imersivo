import { ChatSession } from '@google/generative-ai';
import { Button, Card, Container, Grid, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import criarConexao from './app/conexao';
import Chatbot from "./app/pages/chatbot";

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

function App() {
  const [chavePresente, setChavePresent] = useState(false);
  const [key, setKey] = useState("");
  const [conexao, setConexao] = useState<ChatSession>();
  const [inputError, setInputError] = useState<{ msg: string, visivel: boolean }>({
    msg: '', visivel: false
  });
  const [saudacao, setSaudacao] = useState("")

  const handleTesteConexao = async (e: ChatSession) => {
    await e.sendMessage(reestricao).then((result) => {
      setSaudacao(result.response.text)
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (key == "" || key == undefined) {
      if (!inputError.visivel) setInputError({ msg: "Campo obrigatório", visivel: true })
      else setInputError({ ...inputError, msg: "Campo obrigatório" })
      return;
    }

    await criarConexao({ chave: key, tipo_chat: "gemini-1.0-pro" }).then(async (conexao) => {
      console.log(conexao)
      await handleTesteConexao(conexao).then(() => {
        setConexao(conexao)
        setChavePresent(true)
      }).catch((error) => {
        console.log(error)
        if (!inputError.visivel) setInputError({ msg: "Houve algum erro nas credenciais", visivel: true })
        else setInputError({ ...inputError, msg: "Houve algum erro nas credenciais" })
      })
    }).catch((error) => {
      console.log(error)
      if (!inputError.visivel) setInputError({ msg: "Houve algum erro nas credenciais", visivel: true })
      else setInputError({ ...inputError, msg: "Houve algum erro nas credenciais" })
    })

  }

  return (
    <Container maxWidth={"md"}>
      {!chavePresente &&
        <Card sx={{ width: "100%" }}>
          <Typography variant='h4' textAlign={'center'} marginBottom={1}>Informações necessárias</Typography>
          <Grid container item sm={12} xs={12} >
            <form onSubmit={handleSubmit} className='form-privateKey'>
              <TextField
                fullWidth
                label='Informe a chave de acesso do Germini'
                name='chave'
                type='text'
                variant='filled'
                placeholder='escreva aqui'
                onChange={(e: ChangeEvent<HTMLInputElement>) => { setKey(e.target.value) }}
                value={key}
                helperText={inputError.msg}
                error={inputError.visivel}
              />
              <Button fullWidth type='submit'>Confirmar</Button>
            </form>
          </Grid>
        </Card>
      }
      {chavePresente && conexao != undefined &&
        <Chatbot conexao={conexao} saudacaoTxt={saudacao} />
      }
    </Container>
  )

}

export default App
