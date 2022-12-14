import React, { useState } from "react";
import { createProduct } from "../api/apiProductIndex";

export default function CreateProduct(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [price_type, setPrice_type] = useState("");
  const [category, setCategory] = useState("");
  const [inventory, setInventory] = useState("");
  const [img_url, setImg_url] = useState("");
  const [refresh, setRefresh] = [props.refresh, props.setRefresh];
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") ? localStorage.getItem("isAdmin"):false)

  const authToken = localStorage.getItem("token") ? true : false;

  async function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    alert("New Product Created");
    const response = await createProduct({
      token: token,
      name: name,
      description: description,
      price: price,
      price_type: price_type,
      category: category,
      inventory: inventory,
      img_url: img_url
  });
  setCategory("");
  setDescription("");
  setInventory("");
  setPrice_type("");
  setPrice("");
  setName("");
  setImg_url("");
    setRefresh(!refresh);
    return response;
  }

  return (
    <section>
      <div>
        <div>
          <div>
            <div>
              {authToken && isAdmin  ? (
                <>
                  <h1>Create a New Product</h1>
                  <form className ="login" onSubmit={handleSubmit}>
                    <div>
                      <input className ="inpt"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="name"
                      ></input>
                      <input className ="inpt"
                        type="text"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="description"
                      ></input>
                      <input className ="inpt"
                        type="text"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        placeholder="price"
                      ></input>
                      <input className ="inpt"
                        type="text"
                        value={price_type}
                        onChange={(event) => setPrice_type(event.target.value)}
                        placeholder="price_type"
                      ></input>
                      <input className ="inpt"
                        type="text"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        placeholder="category"
                      ></input>
                      <input className ="inpt"
                        type="text"
                        value={inventory}
                        onChange={(event) => setInventory(event.target.value)}
                        placeholder="inventory"
                      ></input>
                      <input className ="inpt"
                        type="text"
                        value={img_url}
                        onChange={(event) => setImg_url(event.target.value)}
                        placeholder="Picture url"
                      ></input>
                      <button className="btn">Submit New Product</button>
                    </div>
                  </form>
                </>
              ) : (
                null
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
