import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "@/components/layout";
import Home from "@/pages/home";
import './App.css'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes> 
    </BrowserRouter>
  );
}

export default App
