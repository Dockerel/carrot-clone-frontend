import { useNavigate } from "react-router-dom";
import NotOwnerPage from "../components/NotOwnerPage";

export default function ProductBuyer() {
  const navigate = useNavigate();
  if (1) {
    console.log("navigate");
    navigate("/");
  }
  return (
    <NotOwnerPage>
      <h1>ProductBuyer</h1>
    </NotOwnerPage>
  );
}
