import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Grid, CircularProgress } from "@material-ui/core";
import Banner from "./Banner";
import ProductListingService from "./ProductListingService";
import ProductTile from "../product/ProductTile";

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
    backgroundColor: theme.palette.background.default
  },
  grid: {
    display: "flex",
    maxWidth: "70vw",
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing.unit * 2,
    borderRadius: "5px"
  }
});

class Category extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };

    ProductListingService.init().then(() => {
      this.setState({ loading: false });
    });
  }

  render(props) {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Banner />

        <Paper elevation={1} className={classes.paper}>
          <Grid container spacing={24} className={classes.grid}>
            {this.state.loading && (
              <CircularProgress color="secondary" size={24} />
            )}

            {!this.state.loading &&
              ProductListingService.products.map((product, i) => (
                <Grid item xs={6} sm={4} key={i}>
                  <ProductTile
                    product={product}
                    addToCart={() => {
                      ProductListingService.addToCart(i, 1);
                    }}
                  />
                </Grid>
              ))}
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Category);
