import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import UserSearch from "./components/UserSearch";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/user_search" element={<UserSearch />}/>
      </Routes>
    </BrowserRouter>
    )
}
export default AppRoute;