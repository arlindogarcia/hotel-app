import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { loginActions } from "../reducer";

const Logout = () => {
  useIsAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginActions.logout())
  }, [dispatch])

  return (
    <div></div>
  )
}

export default Logout;