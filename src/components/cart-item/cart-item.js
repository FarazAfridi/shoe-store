import React from 'react';
import { Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cartItem: {
        width: '100%',
        display: 'flex',
        height: '80px',
        marginBottom: '15px',
      },
      cartImg: {
        margin: 'auto 0',
      },
      itemDetails: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        color: 'black',
      },
      name: {
        fontSize: '11px'
      },
      price: {
          fontSize: '11px'
      }
  }));

const CartItem = ({item: {name, price, quantity, imageUrl}}) => {
    const classes = useStyles();

    return ( 
        <div className={classes.cartItem}>
        <Avatar className={classes.cartImg}  src={imageUrl} alt={name} />
            <div className={classes.itemDetails}>
                <Typography className={classes.name}>{name}</Typography>
                <Typography className={classes.price}>
                {quantity} x ${price}</Typography>
            </div>
        </div>
     );
}
 
export default CartItem;