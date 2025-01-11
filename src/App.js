import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Signin from "./routes/sign-in/sign-in.component";


function App (){  
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path="shop" element={"SHOP page"}/>
        <Route path="sign-in" element={<Signin/>}/>
      </Route>
    </Routes>
  )
}

export default App;
