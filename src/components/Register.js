import { useState } from "react"
import { createUserCart } from "../api/apiProductIndex";
import { userRegister } from "../api/loginindex";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");

    const submitHandler = async (event) => {
        event.preventDefault();
        const result = await userRegister(email, password);
        setMessage(result.message);
        if (result.token) {
            setToken(result.token);
            localStorage.setItem("token", result.token);
            localStorage.setItem("email", email);
            await createUserCart(result.token);
        }
    }

    return (
        (token ?
            <div>
                <h2 className="r">You are registered</h2>
                <button className="btn4" onClick={() => {
                    localStorage.removeItem("token");
                    setToken("");
                }
                }
                >Log Out</button>
            </div>
            : <div>
                <form className="register" onSubmit={submitHandler}>
                    <h2 className="rgstr">Register</h2>
                    <fieldset>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input className="inpt" minLength={1} id="email" type="text" placeholder="email" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input className="inpt" minLength={1} id="password" type="text" placeholder="Password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                    </fieldset>
                    <fieldset>
                        <button className="btn3" type="submit">Register</button>
                        <p>{message}</p>
                    </fieldset>
                </form>
            </div>
        )
    )
}

export default Register