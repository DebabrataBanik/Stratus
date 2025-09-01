import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import { ThemeProvider } from "./context/theme-provider"
import Dashboard from "./pages/dashboard"
import CityPage from "./pages/city-page"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5*60*1000, 
      gcTime: 10*60*1000,
      retry: 1,
      retryDelay: 1000,
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="city/:city" element={<CityPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App