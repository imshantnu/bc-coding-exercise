import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Link, IconButton, Badge, Popover } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CartPopover from "./cart/CartPopover";
import { ShoppingBasketOutlined } from "@material-ui/icons";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  header: {
    padding: theme.spacing.unit,
    flexDirection: "row",
    alignItems: "center",
    boxShadow: "none",
    borderBottom: "1px solid"
  }
});

const Header = props => {
  const [showCart, setShowCart] = useState(false);
  const [anchorCart, setAnchorCart] = useState(null);
  const { classes, cart } = props;

  const handleCartPopover = event => {
    setAnchorCart(event.currentTarget);
    setShowCart(!showCart);
  };

  return (
    <div className={classes.grow}>
      <AppBar className={classes.header}>
        <Link
          className={classes.grow}
          align="left"
          component={RouterLink}
          to="/"
        >
          <img src="/media/logo.png" alt="Home" />
        </Link>

        <IconButton
          aria-haspopup="true"
          onClick={handleCartPopover}
          color="inherit"
        >
          <Badge badgeContent={cart.total} color="secondary">
            <ShoppingBasketOutlined />
          </Badge>
        </IconButton>
      </AppBar>
      <Popover
        open={showCart}
        anchorEl={anchorCart}
        onClose={() => setShowCart(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <CartPopover cart={cart} />
      </Popover>
    </div>
  );
};

export default withStyles(styles)(Header);
