import {usestate} from "react";
import axios from "axios";


function RegisterForm(){
    const [username, setUserName]= usestate("");
    const [email, setEmail]= usestate("");
    const [password, setPassword]= usestate("");
    const [message, setMessage]= usestate("");
    const navigate= useNavigate();

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();

        try{
            const res =await axios.post("http://localhost:5000/api/register", {
                username, email,password,

            });

            //Spara JWT token om den som skickar tillbaks
            const token = res.data.token;
            if (token) {
                localStorage.setItem("token", token);
                setMessage("Registrering lyckades! Du är nu inloggad");
                navigate("/account");
            }else{
                setMessage("Registreringen lyckades, men ingen token mottagen");
            }
        }catch(error:any){
            console.error(error);
            setMessage(error?.response?.data?.error  || "Kunde inte registrera användare.");
        }

    }

};
//FORTSÄTT HÄR
return{
    <form onsubmit={handleSubmit}>
}
