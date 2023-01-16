import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../modules/app/mainReducer";

export function useIsAuth() {
  const navigate = useNavigate();
  const isLogged = useSelector((state: RootState) => state.login.isLogged);
  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
      return;
    }
  }, [isLogged, navigate]);
}
