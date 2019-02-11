import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Link, Typography, Button } from "@material-ui/core";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    "&:hover img": {
      opacity: "0.3"
    }
  },
  imageContainer: {
    backgroundColor: theme.palette.background.default,
    maxWidth: "200px"
  },
  image: {
    objectFit: "cover",
    maxWidth: "100%",
    height: "200px",
    [theme.breakpoints.down("sm")]: {
      objectFit: "contain"
    }
  },
  title: {
    fontSize: theme.typography.fontSize,
    paddingBottom: theme.spacing.unit
  },
  brand: {
    fontSize: "0.75rem",
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  price: {
    fontSize: "0.75rem",
    paddingBottom: theme.spacing.unit
  },
  buttons: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    bottom: 0
  },
  button: {
    margin: theme.spacing.unit,
    textDecoration: "none"
  }
});

const ProductTile = props => {
  const [hover, setHover] = useState(false);
  const { classes, product, addToCart } = props;
  return (
    <Paper
      elevation={0}
      className={classes.paper}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={classes.imageContainer}>
        <img
          src={`/media/${product.image}`}
          alt={product.title}
          className={classes.image}
        />
      </div>

      <Typography
        align="center"
        color="textSecondary"
        className={classes.brand}
      >
        {product.brand}
      </Typography>

      <Link
        align="center"
        component={RouterLink}
        to={`product/${product.id}`}
        color="textPrimary"
      >
        <Typography
          align="center"
          variant="h6"
          color="textPrimary"
          className={classes.title}
        >
          {product.title}
        </Typography>
      </Link>

      <Typography align="center" color="textPrimary" className={classes.price}>
        {product.price.toLocaleString("en-AU", {
          style: "currency",
          currency: "AUD"
        })}
      </Typography>

      {hover && (
        <div className={classes.buttons}>
          <Button
            variant="outlined"
            className={classes.button}
            color="secondary"
            component={RouterLink}
            to={`product/${product.id}`}
          >
            View Details
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => addToCart()}
            color="primary"
          >
            Add to cart
          </Button>
        </div>
      )}
    </Paper>
  );
};

export default withStyles(styles)(ProductTile);
