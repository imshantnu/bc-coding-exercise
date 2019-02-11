import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const styles = {
  root: {
    backgroundImage: "url(/media/plates-header.jpg)",
    backgroundSize: "contain",
    width: "100%",
    height: "calc(100vw / 3.01)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  h2: {
    textDecoration: "underline"
  }
};

const Banner = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography
        className={classes.h2}
        align="center"
        variant="h2"
        color="textPrimary"
      >
        Plates
      </Typography>
      <Typography
        className={classes.p}
        align="center"
        variant="subtitle1"
        color="textPrimary"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac
        interdum turpis.
      </Typography>
    </div>
  );
};

export default withStyles(styles)(Banner);
