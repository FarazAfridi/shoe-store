import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const ProductDetails = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({
      title: '',
      imageUrl: '',
      price: ''
  });

  useEffect(() => {
    fetch(`http://localhost:4000/api/product/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct({
          title: data.product.title,
          imageUrl: data.product.imageUrl,
          price: data.product.price
      }))
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.imageUrl} />
      <p>{product.price}</p>
    </div>
  );
};

export default ProductDetails;
