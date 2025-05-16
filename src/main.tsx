import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './index.css'
import Home from './pages/Home.tsx'
import Header from "./components/Header.tsx";
import ShoppingList from "./pages/ShoppingList.tsx";



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Home />} />
            <Route path="/games" element={<Home />} />
            <Route path="/shoppingList" element={<ShoppingList />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
