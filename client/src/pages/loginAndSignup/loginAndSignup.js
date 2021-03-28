import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../../context/cart-context/cart-context";

const LoginAndSignup = ({ isLogin }) => {
  const {setUser} = useContext(CartContext)
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
            const {token} = await resp.json();
            localStorage.setItem('token', token);
            setUser({token})
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
    <div>
      <form>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={userCredentials.name}
            onChange={handleChange}
          />
        )}
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={userCredentials.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userCredentials.password}
          onChange={handleChange}
        />
        <button onClick={signInHandler}>SignIn</button>
      </form>
    </div>
  );
};

export default LoginAndSignup;
