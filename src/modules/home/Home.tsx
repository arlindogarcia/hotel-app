import { Wrapper } from "../../components/Layout"
import { useIsAuth } from "../../hooks/useIsAuth";

const Home = () => {
  useIsAuth()

  return (
    <Wrapper>
    </Wrapper>
  )
}

export default Home;