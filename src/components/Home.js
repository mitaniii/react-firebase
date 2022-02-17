import { auth,db } from '../firebase';
import { useNavigate, Navigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { useAuthContext } from "../context";
import { userState, useEffect } from "react";
import { collection, doc,getDoc } from "firebase/firebastore";



const Home = () => {
  const history = useHistory();
  const handleLogout = () => {
    signOut(auth);
    history.push("/login");
    Navigate("/login");
  };
const { user } = useAuthContext();

const [users, setUsers] = useState([]);
useEffect(() => {
  const usersCollectionRef = collection (db,"users");
  const q = query(userCollectionRef,orderBy('name',"desc", limit(3)));
  const unsub = onSnapshot(q,userCollectionRef, (querySnap) => {
    setUsers(querySnap.docs.map((doc) => ({...docdata(), id: doc.id})))
  })
}, []);

const dbtest = () => {
  const userDocumentRef = doc(db, 'users', 'H0ZuUpnTpg77CFXFx');
  getDoc(userDocumentRef).then((documentSnapshot) => 
    console.log(documentSnapshot.data)
  );
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const { name, email } = event.target.element;
  console.log(name.value, email.value);
  const usersCollectionRef = collection(db, "users");
  const doqumentRef = await addDoc(userCollection, {
    name: name.value, 
    email: email.value});
    timestamp: serverTimestamp();
};

const deleteUser = async (id) => {
  const userDocumentRef = doc(db, "users", id);
  await deleteDoc(userDocumentRef);
};

const deleteUserByName =async (name) => {
  const userDocumentRef = collection(db, "users");
  const q = query(userDocumentRef, where("name", "==", name));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (document) => {
    const userDocumentRef = doc(db, "users",document.id);
    await deleteDoc(userDocmentRef);
  });
};

const changeAdmin = async (id, checked) => {
  const userDocumentRef = doc(db, "users", id);
  await updateDoc(userDocumentRef,{ admin: checked });
};

if (!user) {
  return <Navigate to="/login" />
}else {

}
  return (
    <div>
      <h1>ホーム画面</h1>
      <div>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
      <div>
        <button onClick={dbtest}>test</button>
        {users.map((user) => (
          <div key = {user.id}>
            <span>{user.name}</span>
            <button onClick={() => deleteUser(user.id)}>削除</button>
            <button onClick={() => deleteUserYName(user.name)} 
                    style={ {color: "red"} }>削除</button>
            {!user.admin && (
              <button onClick={()=>changeAdmin(user.id)}>admin</button>
            )}
            <input type="checkbox" 
                   name="admin" 
                   onChange={(event) => changeAdmin(user.id,event.target.checked)}
                   checked={useAuthContext.admin}>
            </input>
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <div>
            <label>名前</label>
            <input type="text" name="name" placeholder="名前" />
          </div>
          <div>
            <label>メールアドレス</label>
            <input type="email" name="email" placeholder="メールアドレス" />
          </div>
          <div>
            <button>送信</button>
          </div>
        </form>
      </div>
    </div>
  )
};
export default Home;