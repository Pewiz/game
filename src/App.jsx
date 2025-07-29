import Header from "./components/Header";
import Footer from "./components/Footer";
import GameComponent from "./components/GameComponent";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <GameComponent />
      </main>

      <Footer />
    </div>
  );
}

export default App;
