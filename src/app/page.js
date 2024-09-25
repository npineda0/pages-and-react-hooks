"use client";
import { useState } from 'react';

export default function Home() {
  //let score = 0;
  const [score, setScore] = useState(0);
  //use state returns an array 
  //console.log(setScore);

  //deconstructing array:
  //1. the variable names used for the item doesnt matter
  //2. the order does matter 
  
  function addToScore() {
    //score++;
    //you can set a new value by passing the new value to the setter function
    setScore(score + 1);
    //you can set a new value by passing a function to the set function
    /* setScore(function(value) {
    return value + 1;
    }) */
    //console.log(score);
  }

  return(
    <main>
      <h1>Home</h1>
      <div>
        <button onClick={addToScore}> Add 1 </button>
        <p>Score: {score}</p>
      </div>
    </main>
  );
}
