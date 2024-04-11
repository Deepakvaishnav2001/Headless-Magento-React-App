import { useState } from "react";

export default function FavoriteColor() {
  const [color, setColor] = useState("red");

  return (
  <>
    <h1>My favorite color is {color}!</h1>
    <button onClick={() => {setColor("green")}}>Change</button>
  </>
  )
}