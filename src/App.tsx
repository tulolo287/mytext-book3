import { Routes, Route } from "react-router-dom";
import "./styles.css";
import MyHeader from "./modules/MyHeader";
import Router from "./components/Router";
import { Content } from "antd/es/layout/layout";
import Home from "./pages/home/Home";
import About from "./pages/About";
import Books from "./pages/Books";
import BookItem from "./pages/BookItem";
import Categories from "./pages/Categories";
import Checkout from "./pages/Checkout";
import LoginPage from "./pages/LoginPage";
import { MainLayout } from "./layouts/MainLayout";

export default function App() {
  return (
    <div className="App">
      <Content>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookItem />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/categories" element={<Categories />} />
          </Route>
        </Routes>
      </Content>
    </div>
  );
}
