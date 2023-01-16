import Wrapper from "../../components/Wrapper"
import { useIsAuth } from "../../hooks/useIsAuth";

const Home = () => {
  useIsAuth()

  return (
    <Wrapper>
    </Wrapper>
  )
}

export default Home;