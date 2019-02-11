import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ProductListingService from "../category/ProductListingService";
import {
  Paper,
  Grid,
  CircularProgress,
  Typography,
  TextField,
  Button
} from "@material-ui/core";

const styles = theme => ({
  root: {
    marginTop: "90px",
    height: "100%"
  },
  paper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  grid: {
    display: "flex",
    maxWidth: "80vw",
    margin: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
    borderRadius: "5px",
    minHeight: "500px"
  },
  image: {
    width: "100%"
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: "500",
    paddingBottom: theme.spacing.unit * 2
  },
  brand: {
    fontSize: "1rem",
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2,
    color: theme.palette.grey[600]
  },
  price: {
    fontSize: "1.25rem",
    paddingBottom: theme.spacing.unit * 2,
    color: theme.palette.grey[600]
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: theme.spacing.unit * 4
  },
  textField: {
    width: "100px",
    height: "36px"
  }
});

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      product: undefined,
      loading: true,
      quantity: 1
    };

    ProductListingService.init().then(() => {
      this.setState({
        product: ProductListingService.getProduct(this.state.id),
        loading: false
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { product, loading, quantity } = this.state;

    return (
      <div className={classes.root}>
        <Paper elevation={1} className={classes.paper}>
          {!loading && (
            <Grid container spacing={24} className={classes.grid}>
              <Grid item xs={12} sm={7}>
                <img
                  className={classes.image}
                  src={`/media/${product.image}`}
                  alt={product.title}
                />
              </Grid>
              <Grid item xs={12} sm={5} className={classes.details}>
                <Typography
                  align="center"
                  color="textSecondary"
                  className={classes.brand}
                >
                  {product.brand}
                </Typography>
                <Typography
                  align="center"
                  variant="h3"
                  color="textPrimary"
                  className={classes.title}
                >
                  {product.title}
                </Typography>
                <Typography
                  align="center"
                  variant="h6"
                  color="textPrimary"
                  className={classes.price}
                >
                  {product.price.toLocaleString("en-AU", {
                    style: "currency",
                    currency: "AUD"
                  })}
                </Typography>
                <Typography
                  align="center"
                  variant="body1"
                  color="textPrimary"
                  className={classes.description}
                >
                  {product.description}
                </Typography>

                <div className={classes.buttons}>
                  <TextField
                    id="outlined-number"
                    label="Quantity"
                    value={quantity}
                    onChange={event =>
                      this.setState({ quantity: event.currentTarget.value })
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
                  <Button
                    variant="contained"
                    onClick={() =>
                      ProductListingService.addToCart(product.id, quantity)
                    }
                  >
                    Add to cart
                  </Button>
                </div>
              </Grid>
            </Grid>
          )}
          {loading && (
            <Grid container spacing={24} className={classes.grid}>
              <CircularProgress color="secondary" size={24} />
            </Grid>
          )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Product);
