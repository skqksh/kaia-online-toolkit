import { ReactElement } from 'react'
import { Outlet } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer, Slide } from 'react-toastify'
import { darkTheme, KaThemeProvider } from '@kaiachain/kaia-design-system'
import { ThemeProvider } from 'styled-components'
import { MetaMaskProvider } from '@metamask/sdk-react'

const queryClient = new QueryClient()

function App(): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <MetaMaskProvider
        sdkOptions={{
          dappMetadata: {
            name: 'Example React Dapp',
            url: window.location.href,
          },
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <KaThemeProvider theme="dark">
            <Outlet />
            <ToastContainer
              position="top-right"
              hideProgressBar
              autoClose={3000}
              transition={Slide}
              limit={3}
              theme="dark"
            />
          </KaThemeProvider>
        </ThemeProvider>
      </MetaMaskProvider>
    </QueryClientProvider>
  )
}

export default App
