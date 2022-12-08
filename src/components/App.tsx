import Logo from "./Logo";
import ColorCard from "./ColorCard";

function App() {
  return (
    <div className="md:container md:mx-auto px-4 antialiase">
      <header className="App-header text-3xl font-bold py-10">
        <Logo />
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <ColorCard color="#D66577" />
      </div>
    </div>
  );
}

export default App;
