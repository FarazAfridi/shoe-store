import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../../context/cart-context/cart-context";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginAndSignup({ isLogin }) {
  const classes = useStyles();
  const {setUser, setRole} = useContext(CartContext);
  let navigate = useNavigate()
    const [userCredentials, setUserCredentials] = useState({
      name: "",
      email: "",
      password: "",
    });

     const signInHandler = async (e) => {
          e.preventDefault();
          if (!isLogin) {
            const resp = await fetch("http://localhost:4000/auth/signup", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: userCredentials.name,
                email: userCredentials.email,
                password: userCredentials.password,
              }),
            });
            if(resp.status === 201){
                console.log(resp)
              navigate('/login')
            } 
          }
           else if (isLogin){
              const resp = await fetch("http://localhost:4000/auth/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: userCredentials.email,
                    password: userCredentials.password,
                  }),
                });
                if(resp.status === 200){
                  const {token, userRole} = await resp.json();
                  localStorage.setItem('token', token);
                  localStorage.setItem('role', userRole)
                  setUser(token)
                  setRole(userRole)
                  navigate('/')
                } 
           }
        };
      
        function handleChange(event) {
          const { name, value } = event.target;
      
          setUserCredentials((prevValue) => {
            return {
              ...prevValue,
              [name]: value,
            };
          });
        }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        { isLogin ? 'Login' : 'Sign up'}
        </Typography>
        <form className={classes.form} noValidate>
       { !isLogin && <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Name"
            name="name"
            autoFocus
            value={userCredentials.name}
          onChange={handleChange}
          />}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={userCredentials.email}
          onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userCredentials.password}
          onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signInHandler}
          >
            {isLogin ? 'Login' : 'Signup'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={isLogin ? '/signup' : '/login'} variant="body2">
                {`Don't have an account? ${isLogin ? 'Signup' : 'Login'}`}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LoginAndSignup;

