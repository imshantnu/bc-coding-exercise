import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import ProductListingService from "../category/ProductListingService";
import CartService from "./CartService";
import {
  Paper,
  Grid,
  CircularProgress,
  Typography,
  TextField,
  Button,
  IconButton
} from "@material-ui/core";

import { Close } from "@material-ui/icons";

const styles = theme => ({
  root: {
    marginTop: "90px",
    height: "100%"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: theme.palette.background.default
  },
  heading: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  },
  grid: {
    display: "flex",
    maxWidth: "70vw",
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
    borderRadius: "5px",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100vw",
      margin: 0
    }
  },
  cartHeader: {
    color: theme.palette.grey[500],
    textTransform: "uppercase",
    lineHeight: "1.25rem"
  },
  row: {
    borderTop: `1px solid ${theme.palette.grey[500]}`,
    margin: theme.spacing.unit * 1.5,
    marginTop: 0,
    marginBottom: 0,
    "&:first-child": {
      borderTop: "none"
    }
  },
  item: {
    display: "flex",
    alignItems: "flex-start"
  },
  image: {
    width: "100px"
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: theme.spacing.unit * 2
  },
  title: {
    fontWeight: "500",
    fontSize: "14px",
    paddingBottom: theme.spacing.unit * 2
  },
  brand: {
    fontSize: "0.75rem",
    paddingBottom: theme.spacing.unit / 2,
    color: theme.palette.grey[500]
  },
  price: {
    fontSize: "1.25rem",
    paddingBottom: theme.spacing.unit * 2,
    color: theme.palette.grey[600]
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 0,
    borderTop: `1px solid ${theme.palette.grey[500]}`
  },
  textField: {
    width: "100px",
    height: "36px",
    marginTop: 0
  },
  overview: {
    margin: theme.spacing.unit * 1.5,
    borderTop: `1px solid ${theme.palette.grey[500]}`,
    marginTop: 0,
    marginBottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    color: theme.palette.grey[500]
  },
  totalRow: {
    margin: theme.spacing.unit * 1.5,
    marginTop: 0,
    marginBottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    color: theme.palette.grey[500]
  },
  overviewLabel: {
    textTransform: "uppercase",
    color: theme.palette.grey[500],
    paddingRight: theme.spacing.unit * 4,
    fontWeight: "500"
  },
  totalPrice: {
    fontWeight: "600"
  }
});

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };

    ProductListingService.init().then(() => {
      this.setState({
        loading: false
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { loading } = this.state;

    return (
      <div className={classes.root}>
        <Paper elevation={1} className={classes.paper}>
          <Typography variant="h3" align="center" className={classes.heading}>
            Shopping Cart
          </Typography>

          {loading && (
            <Grid container spacing={24} className={classes.grid}>
              <CircularProgress color="secondary" size={24} />
            </Grid>
          )}

          {!loading && CartService.cart.total > 0 && (
            <Grid container spacing={24} className={classes.grid}>
              <Grid container spacing={24} className={classes.row}>
                <Grid item xs={6} className={classes.cartHeader}>
                  Product
                </Grid>
                <Grid item xs={2} className={classes.cartHeader}>
                  Quantity
                </Grid>
                <Grid item xs={2} className={classes.cartHeader}>
                  Total
                </Grid>
                <Grid item xs={2} className={classes.cartHeader}>
                  Action
                </Grid>
              </Grid>

              {Object.keys(CartService.cart.items).map(key => {
                const product = ProductListingService.getProduct(key);
                return (
                  <Grid
                    container
                    spacing={24}
                    className={classes.row}
                    key={key}
                  >
                    <Grid item xs={6} className={classes.item}>
                      <img
                        src={`/media/${product.image}`}
                        alt={product.title}
                        className={classes.image}
                      />
                      <div className={classes.detail}>
                        <Typography
                          align="left"
                          color="textSecondary"
                          className={classes.brand}
                        >
                          {product.brand}
                        </Typography>
                        <Typography
                          align="left"
                          variant="h6"
                          color="textPrimary"
                          className={classes.title}
                        >
                          {product.title}
                        </Typography>
                      </div>
                    </Grid>

                    <Grid item xs={2} className={classes.quantity}>
                      <TextField
                        value={CartService.cart.items[key].quantity}
                        onChange={event =>
                          CartService.updateQuantity(
                            product.id,
                            event.currentTarget.value
                          )
                        }
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                        inputProps={{ min: "1", step: "1" }}
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={2} className={classes.price}>
                      <Typography
                        align="left"
                        color="textPrimary"
                        className={classes.price}
                      >
                        {(
                          product.price * CartService.cart.items[key].quantity
                        ).toLocaleString("en-AU", {
                          style: "currency",
                          currency: "AUD"
                        })}
                      </Typography>
                    </Grid>

                    <Grid item xs={2} className={classes.remove}>
                      <IconButton
                        className={classes.remove}
                        disableRipple={true}
                        onClick={() => CartService.remove(key)}
                      >
                        <Close className={classes.removeIcon} />
                      </IconButton>
                    </Grid>
                  </Grid>
                );
              })}

              <Grid item xs={12} className={classes.overview}>
                <Typography
                  align="right"
                  color="textPrimary"
                  className={classes.overviewLabel}
                >
                  Subtotal
                </Typography>

                <Typography align="right" color="textPrimary">
                  {CartService.computeTotal().toLocaleString("en-AU", {
                    style: "currency",
                    currency: "AUD"
                  })}
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.totalRow}>
                <Typography
                  align="right"
                  color="textPrimary"
                  className={classes.overviewLabel}
                >
                  Total
                </Typography>

                <Typography
                  align="right"
                  color="textPrimary"
                  className={classes.totalPrice}
                >
                  {CartService.computeTotal().toLocaleString("en-AU", {
                    style: "currency",
                    currency: "AUD"
                  })}
                </Typography>
              </Grid>

              <Grid item xs={12} className={classes.buttons}>
                <Button component={Link} to="/">
                  Continue shopping
                </Button>

                <Button variant="contained" component={Link} to="/">
                  Checkout (
                  {CartService.computeTotal().toLocaleString("en-AU", {
                    style: "currency",
                    currency: "AUD"
                  })}
                  )
                </Button>
              </Grid>
            </Grid>
          )}

          {!loading && !CartService.cart.total && (
            <Typography
              align="center"
              color="textPrimary"
              className={classes.title}
            >
              Your shopping cart is empty!
            </Typography>
          )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Cart);
