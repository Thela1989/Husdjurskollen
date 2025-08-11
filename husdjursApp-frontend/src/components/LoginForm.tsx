import{useState, usestate} from "react"
import{axios} from "axios"
import {useNavigate} from "react-router-dom"

funktion Loginform(){
    const navigate = useNavigate
    const [email, setEmail] = useState("")
    const [password, setPassword] = usestate("")
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent)=>{
        e.preventDefault();

        try{
            const res = await axios.post("http://localhost: 5000/api/auth/login", {
                email, password,});

                //Spara token i localstore
                localStorage.setItem("token", res.data.token);

                //navigera till konto-sidan
                navigate("/account");

        }catch (err)  {
            setError("Fel e-post eller lösenord");
            console.error(err);
        }
    }

    return(
        <div className="LoginForm">
            <h1 className="LoginFormHeader">Logga in</h1>
            {error && <p className="ErrorMessage">{error}</p>}

            <form></form>
        </div>
    )
}
