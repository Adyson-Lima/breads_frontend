import { BrowserRouter, Routes, Route } from "react-router-dom";
import Breads from './pages/Breads';
import NewUpdate from './pages/NewUpdate';

export default function BreadsRouter(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Breads/>} />
        <Route path="/newupdate/:bread_id" element={<NewUpdate/>} />
      </Routes>
    </BrowserRouter>
  );
}