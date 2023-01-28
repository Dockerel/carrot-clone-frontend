import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import GithubConfirm from "./routes/GithubConfirm";
import Home from "./routes/Home";
import KakaoConfirm from "./routes/KakaoConfirm";
import NaverConfirm from "./routes/NaverConfirm";
import NotFound from "./routes/NotFound";
import ProductBuyer from "./routes/ProductBuyer";
import ProductDetail from "./routes/ProductDetail";
import ProductModify from "./routes/ProductModify";
import ProductPhotoUpload from "./routes/ProductPhotoUpload";
import ProductReviewUpload from "./routes/ProductReviewUpload";
import ProductUpload from "./routes/ProductUpload";
import PublicUserDetail from "./routes/PublicUserDetail";
import PurchaseHistory from "./routes/PurchaseHistory";
import UserModify from "./routes/UserModify";
import UserReviews from "./routes/UserReviews";

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
        path: "product/upload",
        element: <ProductUpload />,
      },
      {
        path: "products/:productPk",
        element: <ProductDetail />,
      },
      {
        path: "products/:productPk/photo-upload",
        element: <ProductPhotoUpload />,
      },
      {
        path: "products/:productPk/modify",
        element: <ProductModify />,
      },
      {
        path: "products/:productPk/buyer",
        element: <ProductBuyer />,
      },
      {
        path: "products/:productPk/review-upload",
        element: <ProductReviewUpload />,
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
        path: "user/:username/purchase-history",
        element: <PurchaseHistory />,
      },
      {
        path: "user/:username/reviews",
        element: <UserReviews />,
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
