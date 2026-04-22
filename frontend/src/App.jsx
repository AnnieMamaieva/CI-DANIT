import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NewsPage from "./Pages/NewsPage";
import CreateNewsPage from "./Pages/CreateNewsPage";
import EditNewsPage from "./Pages/EditNewsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/newsposts/:id" element={<NewsPage />} />
      <Route path="/create-news" element={<CreateNewsPage />} />
      <Route path="/edit-news/:id" element={<EditNewsPage />} />
    </Routes>
  );
}

export default App;
