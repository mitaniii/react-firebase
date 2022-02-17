import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from '../firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    console.log(email.value, password.value);

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value);
  };
  
return (
  <div>
    <h1>ユーザ登録</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>メールアドレス</label>
        <input name="email" type="email" placeholder="email"
         onChange={(event) => handleChangeEmail(event)} />
      </div>
      <div>
        <label>パスワード</label>
        <input name="password" type="password" />
      </div>
      <div>
        <button>登録</button>
      </div>
    </form>
  </div>
  );
};
  
  export default SignUp;
  