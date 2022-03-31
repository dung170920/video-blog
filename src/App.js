import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Browse,
  Create,
  Home,
  Login,
  NotFound,
  Profile,
  Settings,
  VideoDetails,
} from "./pages";
import { useAuth } from "./hooks/useAuth";
import MainLayout from "./components/layout/MainLayout";
import {
  Category,
  Followers,
  Following,
  UserVideos,
  VideoList,
} from "./components";

function App() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="video-details/:id" element={<VideoDetails />} />
        <Route path="create" element={<Create />} />
        <Route path="browse" element={<Browse />}>
          <Route path="" element={<VideoList />} />
          <Route path="category/:id" element={<Category />} />
        </Route>
        <Route path="profile/:id" element={<Profile />}>
          <Route path="" element={<UserVideos />} />
          <Route path="followers" element={<Followers />} />
          <Route path="following" element={<Following />} />
        </Route>
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
