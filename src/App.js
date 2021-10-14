import Cart from "components/cart";
import Products from "components/products";
import ProductDetail from "components/products/productDetails";
import { Switch, Route } from "react-router";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact render={(props) => <h1> STORE </h1>} />
        <Route path="/cart" component={Cart} />
        <Route path="/category/:name" component={Products} />
        <Route path="/product/:id" component={ProductDetail} />
      </Switch>
    </div>
  );
}

export default App;
