import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Info from "./components/info/info";
import PostPreviews from "./components/postPreview/postPreview";
import CreatePost from "./components/createPost/createPost";
import PostPage from "./components/postPage/postPage";
import { UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostPreviews />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/info" element={<Info />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
