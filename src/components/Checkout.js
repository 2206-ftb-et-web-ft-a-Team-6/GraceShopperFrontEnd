import React  from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    // const[ first_name,setFirst_name] = useState('')
    // const[last_name,setLast_name] =useState('')
    // const[cardNumber,setCardNumber] = useState()
    // const[exp,setExp]=useState("")
    // const [cvc,setCvc] =useState()
    // const[country,setCountry]=useState("")
    // const[zip,setZip]=useState()
    

    async function handleSubmit(event) {
        event.preventDefault();
        alert("Confirmed");
      };

      let nav = useNavigate();

    return(
        <div>
        <h1>Card Info</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
            //   onChange={(event) => setFirst_name(event.target.value)}
              placeholder="Name"
            ></input>
            <input
              type="text"
            //   onChange={(event) => setLast_name(event.target.value)}
              placeholder="Last name"
            ></input>
            <input
              type="text"
            //   onChange={(event) => setCardNumber(event.target.value)}
              placeholder="Card number"
            ></input>
            <input
              type="text"
            //   onChange={(event) => setExp(event.target.value)}
              placeholder="Expiration"
            ></input>
            <input
              type="text"
            //   onChange={(event) => setCvc(event.target.value)}
              placeholder="CVC"
            ></input>
            <input
              type="text"
            //   onChange={(event) => setCountry(event.target.value)}
              placeholder="Country"
            ></input>
             <input
              type="text"
            //   onChange={(event) => setZip(event.target.value)}
              placeholder="zip code"
            ></input>
            <button type="submit"  onClick={(event) => {
              event.preventDefault();
              nav("/Products");
            }}>Confirm</button>
          </div>
        </form>
</div>
    )
}