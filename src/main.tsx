import { ThemeProvider, createTheme } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const GlobalTheme = createTheme({
  palette: {
    primary: {
      main: "#1C4260"
    },
    background: {
      default: "#1C4260",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#0f153f",
          color: "#ffffff",
          padding: "10px"
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          padding: "2px",
          backgroundColor: "#0f153f",
          width: "100%"
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#1C4260",
          label: {
            color: "#ffffff",
          },
          ":focus-within": {
            color: "#ffffff",
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          ":hover": {
            backgroundColor: "#1C4260"
          },
          textWrap: "wrap"
        },
      },
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={GlobalTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
