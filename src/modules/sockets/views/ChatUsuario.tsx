import { useNavigate, useParams } from "react-router-dom";
import { Wrapper } from "../../../components/Layout";
import { Chat } from "../components/Chat";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socketsActions } from "../reducer";
import { RootState } from "../../app/mainReducer";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { novoChat } from "../data/novoChat";

const ChatUsuario = () => {
  useIsAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chat = useSelector((state: RootState) => state.sockets?.chat);

  useEffect(() => {
    if (!id && chat?.id) {
      navigate(`/chat/${chat?.id}`);
      return;
    }
    if (id) {
      dispatch(socketsActions.requestChat({ id }));
      return;
    }
    if (chat?.finalizado || (!id && !chat?.id)) {
      dispatch(socketsActions.requestChatSuccess(novoChat()))
    }

  }, [id, dispatch, navigate, chat?.id, chat?.finalizado])

  return (
    <Wrapper>
      <Chat />
    </Wrapper>
  );
}

export default ChatUsuario;