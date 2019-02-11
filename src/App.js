import React, { Component } from "react";
import { Route } from "react-router-dom";
import Category from "./category/Category";
import Cart from "./cart/Cart";
import CartService from "./cart/CartService";
import Product from "./product/Product";
import Header from "./Header";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff"
    },
    secondary: {
      main: "#000000"
    },
    background: {
      default: "#ededed"
    }
  },
  typography: {
    useNextVariants: true
  }
});
class App extends Component {
  constructor() {
    super();
    this.state = {
      cart: {}
    };

    this.cartObserver = CartService.subscribe(cart => {
      this.setState({ cart: cart });
    });

    CartService.init();
  }

  componentWillUnmount() {
    this.cartObserver.unsubscribe();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header cart={this.state.cart} />

        <Route exact path="/" component={Category} />
        <Route path="/cart" component={Cart} />
        <Route path="/product/:id" component={Product} />
      </MuiThemeProvider>
    );
  }
}

export default App;
