import React, {useState} from "react";

function NewPlantForm({onAddPlant}) {
  const [addPlant, setAddPlant] = useState(
    {
    name : "",
    image : "",
    price : 0,
    }
  );
 

  function handleChange(event) {
    setAddPlant({...addPlant, [event.target.name] : event.target.value})

  }

 function handleSubmit(event) {
  event.preventDefault();

  
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({...addPlant, price: addPlant.price }),
    })
    .then((response)=> response.json())
    .then((savedPlant)=> {
      onAddPlant(savedPlant);
      setAddPlant({
    name : "",
    image : "",
    price : 0,
    });
    });
  
  } 





  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={addPlant.name} onChange={handleChange} name="name" placeholder="Plant name" />
        <input type="text" value={addPlant.image} onChange={handleChange} name="image" placeholder="Image URL" />
        <input type="number" value={addPlant.price} onChange={handleChange} name="price" step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
