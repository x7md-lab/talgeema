import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "@/components/layout";
import Home from "@/pages/home";
import { ToastProvider } from "@/components/ui/toast";
import './App.css'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App
