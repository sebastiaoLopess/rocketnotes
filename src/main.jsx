import React from 'react'
import ReactDOM from 'react-dom/client'
import {ThemeProvider} from 'styled-components'
import theme from './styles/theme'
import GlobalStyles from './styles/global'
import { Routes } from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}> 
          <GlobalStyles/>
          <Routes></Routes>
      </ThemeProvider>
  </React.StrictMode>
)

// arquivo ThemeProvider importado, como tambem o theme foi importado
// o ThemeProvider vai prover a estilização padrão da nossa paleta de cores
// chamo o componente ThemeProvider e como parâmetro theme insiro o arquivo theme que também foi carregado
// incluimos a GlobalStyles dentro da ThemeProvider para aplicar a estilização global em todos os arquivos
