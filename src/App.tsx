import TypingTest from "@components/typing-test.tsx";
import Footer from "@components/footer.tsx";
import Header from "@components/header.tsx";
import MainContainer from "@components/main-container.tsx";

function App() {
  return (
    <MainContainer>
      <Header />
      <TypingTest />
      <Footer />
    </MainContainer>
  );
}

export default App;
