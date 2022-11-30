import { Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home"
import { About } from "./routes/About";
import { Contact } from "./routes/Contact";
import { Posts } from "./routes/Posts";
import { Footer } from "./routes/Footer";
import { Notfound } from "./routes/Notfound";

function App () {
  return (
    <div className="App">
      <h1>React-router-V6</h1>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact message="Hello" /> } />
        <Route path="/posts" element={ <Posts /> } />
        <Route path="*" element={ <Notfound /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
