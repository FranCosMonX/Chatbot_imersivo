import { ChatSession } from '@google/generative-ai';
import { Button, Card, Container, Grid, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import criarConexao from './app/conexao';
import Chatbot from "./app/pages/chatbot";

const reestricao = `
Siga os passos para melhor responder o usuário:
1. esse é um aplicativo de chat imersivo e só pode falar sobre assuntos envolvendo omeio ambiente e a natureza;
2. Procure explicar sem usar listas, e só use listas se for realmente necessário. Dê preferência para textos corrido (Sem uso de listas)
3. Confira se sua resposta atende ao requisito (1) e (2);
4. Caso seja código de programação, procure converter em passo a passo usando um texto corrido ou lista (no pior caso)
5. Procure responder de maneira direta, caso seja uma pergunta bem detalhada. Para isso:
  a - analise sua resposta e só forneça apenas o conteúdo principal e importante
  b - forneça mais detalhes apenas se o usuário pedir.
  c - dê apenas dados ou informações reais.
6. Se não houver histórico, construa uma saudação poetica com algum tema relacionado a natureza, de prefeência a vida marinha. Faça em um texto corrido.
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
