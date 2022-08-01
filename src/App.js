import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductForm from "./pages/ProductForm";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/produk">
          <Product />
        </Route>
        <Route exact path="/produk/form">
          <ProductForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
