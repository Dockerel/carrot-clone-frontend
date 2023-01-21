import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import GithubConfirm from "./routes/GithubConfirm";
import Home from "./routes/Home";
import KakaoConfirm from "./routes/KakaoConfirm";
import NaverConfirm from "./routes/NaverConfirm";
import NotFound from "./routes/NotFound";
import ProductDetail from "./routes/ProductDetail";
import PublicUserDetail from "./routes/PublicUserDetail";
import UserModify from "./routes/UserModify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "products/:productPk",
        element: <ProductDetail />,
      },
      {
        path: "user-modify",
        element: <UserModify />,
      },
      {
        path: "user/:username",
        element: <PublicUserDetail />,
      },
      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GithubConfirm />,
          },
          {
            path: "kakao",
            element: <KakaoConfirm />,
          },
          {
            path: "naver",
            element: <NaverConfirm />,
          },
        ],
      },
    ],
  },
]);

export default router;
