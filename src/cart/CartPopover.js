import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import ProductListingService from "../category/ProductListingService";
import CartService from "./CartService";
import { Typography, Button, IconButton, Paper, Link } from "@material-ui/core";

import { Close } from "@material-ui/icons";

const styles = theme => ({
  empty: {
    padding: theme.spacing.unit * 4
  },
  root: {
    padding: theme.spacing.unit,
    margin: 0
  },
  item: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    margin: theme.spacing.unit
  },
  image: {
    width: "100px",
    objectFit: "contain",
    marginRight: theme.spacing.unit * 2
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
    alignItems: "flex-start",
    position: "relative"
  },
  title: {
    textTransform: "uppercase",
    fontSize: "0.75rem",
    lineHeight: "1rem"
  },
  quantity: {
    color: theme.palette.grey[900],
    fontSize: "0.60rem",
    lineHeight: "1rem"
  },
  brand: {
    color: theme.palette.grey[600],
    fontSize: "0.75rem",
    lineHeight: "1rem"
  },
  price: {
    fontSize: "0.75rem",
    lineHeight: "1rem"
  },
  remove: {
    position: "absolute",
    top: "-20px",
    right: "0",
    fontSize: "0.5rem",
    padding: 0
  },
  removeIcon: {
    fontSize: "14px"
  },
  total: {
    margin: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    borderTop: `1px solid ${theme.palette.grey[600]}`,
    display: "flex",
    justifyContent: "space-between"
  },
  totalText: {
    color: theme.palette.grey[600],
    fontSize: theme.typography.fontSize
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    margin: theme.spacing.unit,
    textDecoration: "none",
    flexGrow: 1
  }
});

const CarPopover = props => {
  const { classes, cart } = props;

  if (cart.total) {
    return (
      <Paper elevation={0}>
        <ul className={classes.root}>
          {Object.keys(cart.items).map(key => {
            const product = ProductListingService.getProduct(key);
            return (
              <li className={classes.item} key={key}>
                <img
                  src={`/media/${product.image}`}
                  alt={product.title}
                  className={classes.image}
                />
                <div className={classes.detail}>
                  <Typography
                    align="center"
                    color="textPrimary"
                    className={classes.title}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    align="center"
                    color="textPrimary"
                    className={classes.quantity}
                  >
                    {`X ${cart.items[key].quantity}`}
                  </Typography>
                  <Typography
                    align="center"
                    color="textSecondary"
                    className={classes.brand}
                  >
                    {product.brand}
                  </Typography>
                  <Typography
                    align="center"
                    color="textPrimary"
                    className={classes.price}
                  >
                    {product.price.toLocaleString("en-AU", {
                      style: "currency",
                      currency: "AUD"
                    })}
                  </Typography>
                  <IconButton
                    className={classes.remove}
                    disableRipple={true}
                    onClick={() => CartService.remove(key)}
                  >
                    <Close className={classes.removeIcon} />
                  </IconButton>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={classes.total}>
          <Typography align="right" className={classes.totalText}>
            Total
          </Typography>

          <Typography align="right" className={classes.totalText}>
            {CartService.computeTotal().toLocaleString("en-AU", {
              style: "currency",
              currency: "AUD"
            })}
          </Typography>
        </div>
        <div className={classes.buttons}>
          <Link
            align="center"
            className={classes.button}
            component={RouterLink}
            to={`/cart`}
            color="textPrimary"
          >
            <Button
              variant="contained"
              className={classes.button}
              color="secondary"
            >
              View Cart
            </Button>
          </Link>

          <Button
            variant="contained"
            className={classes.button}
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </Paper>
    );
  } else {
    return (
      <Paper className={classes.empty} elevation={0}>
        <Typography
          align="center"
          color="textPrimary"
          className={classes.title}
        >
          Your shopping cart is empty!
        </Typography>
      </Paper>
    );
  }
};

export default withStyles(styles)(CarPopover);
