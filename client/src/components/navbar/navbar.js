import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import CartIcon from "../cartIcon/cartIcon";
import CartDropDown from "../cart-dropdown/cart.dropdown";
import { CartContext } from "../../context/cart-context/cart-context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    marginRight: 20,
    textDecoration: "none",
    color: "#fff",
  },
}));

export default function Navbar() {
  const { hidden, logout, user, role } = useContext(CartContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link className={classes.link} to="/">
              Shop
            </Link>
          </Typography>

          <Typography variant="h6">
            <Link className={classes.link} to="/checkout">
              Checkout
            </Link>
          </Typography>
        {role && <Typography variant="h6">
            <Link className={classes.link} to={"/admin"}>
              Admin
            </Link>
          </Typography>}
          <Typography variant="h6">
            <Link
              className={classes.link}
              to={"/signup"}
              onClick={() => {
                user && logout();
                }}
            >
              {user ? "Logout" : "Sign up"}
            </Link>
          </Typography>

          <CartIcon />
          <div>{hidden ? null : <CartDropDown />}</div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
