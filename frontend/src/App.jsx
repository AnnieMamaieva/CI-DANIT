import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";
import HomePage from "./Pages/HomePage";
import NewsPage from "./Pages/NewsPage";
import CreateNewsPage from "./Pages/CreateNewsPage";
import EditNewsPage from "./Pages/EditNewsPage";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:8000");
    socket.on("newspost:created", (data) => {
      if (data.channel === "log") {
        console.log("NEW POST:", data);
      }
      if (data.channel === "alert") {
        alert(data.title);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);
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
