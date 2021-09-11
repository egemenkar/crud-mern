import { useState, useEffect } from "react";
import Axios from "axios";
import './App.css';

function App() {


  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName, 
      days: days,
    }).then((response) => {
      setFoodList([...foodList, {_id: response.data._id, foodName: foodName, days: days}]);
    });
  };

  const updateFood = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: newFoodName,
    });
  };

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(
      () => {
        setFoodList(
          foodList.filter((val)=> {
            return val._id !== id;
          })
        );
      }
    );
  };

  useEffect(()=>{
    Axios.get("http://localhost:3001/read").then((response)=>{
      setFoodList(response.data);
    })
  }, []);

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>

      <label> Food Name:</label>
      <input 
        type="text"
        onChange={(event)=>{
          setFoodName(event.target.value);
        }}
      />
     <label>Days Since I Ate It:</label>
     <input 
        type="number"
        onChange={(event)=>{
          setDays(event.target.value);
        }}  
      />
     <button onClick={addToList}>Add To List</button>

     <h1>Food List</h1>

     {foodList.map((val, key)=>{
       return (
         <div key={key} className="food">
           <h1>{val.foodName}</h1>
           <h2>{val.daysSinceIAte}</h2>
           <input 
            type="text" 
            placeholder="Add new food name..."
            onChange={(event)=>{
              setNewFoodName(event.target.value);
            }}
          />
           <button onClick={() => updateFood(val._id)}>Update</button>
           <button onClick={() => deleteFood(val._id)}>Delete</button>
         </div>
       )
     })}
    </div>
  );
}

export default App;
