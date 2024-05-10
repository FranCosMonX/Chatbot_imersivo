import { ChatSession } from '@google/generative-ai';
import { Button, Card, Container, Grid, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import criarConexao from './app/conexao';
import Chatbot from "./app/pages/chatbot";

function App() {
  const [chavePresente, setChavePresent] = useState(false);
  const [key, setKey] = useState("");
  const [conexao, setConexao] = useState<ChatSession>();
  const [inputError, setInputError] = useState<{ msg: string, visivel: boolean }>({
    msg: '', visivel: false
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (key == "" || key == undefined) {
      if (!inputError.visivel) setInputError({ msg: "Campo obrigatório", visivel: true })
      else setInputError({ ...inputError, msg: "Campo obrigatório" })
      return;
    }

    try {
      const conectado = await criarConexao({ chave: key, tipo_chat: "gemini-1.0-pro" })
      setChavePresent(true)
      setConexao(conectado)
      console.log(conectado)

    } catch (error) {
      if (!inputError.visivel) setInputError({ msg: "Houve algum erro nas credenciais", visivel: true })
      else setInputError({ ...inputError, msg: "Houve algum erro nas credenciais" })
    }

  }

  return (
    <>
      <Container maxWidth={"sm"} style={{ width: '100%' }}>
        {!chavePresente &&
          <Card >
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
          <Chatbot conexao={conexao} />
        }
      </Container>
    </>
  )

}

export default App
