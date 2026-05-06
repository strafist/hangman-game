import { letters } from './helpers/letters';
import './App.css';
import { HangImage } from './components/HangImage';
import { useState } from 'react';
import { getRandomWord } from './helpers/getRandomWord';

function App() {
  const [word, setWord] = useState(getRandomWord);
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  const [attempts, setAttempts] = useState(0);

  const lose = attempts >= 9;
  const won = hiddenWord.split(' ').join('') === word;

  const checkLetter = (letter: string) => {
    if (lose) return;
    if (won) return;

    if (!word.includes(letter)) {
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');

    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }

    setHiddenWord(hiddenWordArray.join(' '));
  };

  const newGame = () => {
    const newWord = getRandomWord();

    setWord(newWord);
    setHiddenWord('_ '.repeat(newWord.length));
    setAttempts(0);
  };

  return (
    <div className="App">
      <HangImage imageNumber={attempts} />

      <h3>{hiddenWord}</h3>

      <h3>Intentos: {attempts}</h3>

      {lose ? <h2>Perdió {word}</h2> : ''}

      {won ? <h2>Felicidades, usted ganó {word}</h2> : ''}

      {letters.map((letter) => (
        <button
          onClick={() => checkLetter(letter)}
          key={letter}
        >
          {letter}
        </button>
      ))}

      <br />
      <br />

      <button onClick={newGame}>¿Nuevo juego?</button>
    </div>
  );
}

export default App;

/*
import { letters } from './helpers/letters';
import './App.css';
import { HangImage } from './components/HangImage';
import { useEffect, useState } from 'react';
import { getRandomWord } from './helpers/getRandomWord';

function App() {
  
  const [word, setWord] = useState(getRandomWord);
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  const [ attempts, setAttempts ] = useState(0);
  const [lose, setLose] = useState( false );
  const [won, setWon] = useState( false );

  // Determinar si la persona perdió
  useEffect( () => {
    if( attempts >= 9){
      setLose( true );
    }
  }, [ attempts]) // hooks


  // Determinar si la persona ganó
  useEffect(()=>{
    // console.log(currentHiddenWord);
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if(currentHiddenWord === word){
      setWon(true);
    }
  }, [hiddenWord])

  const checkLetter = (letter: string) => {
    if (lose) return;
    if (won) return;

    if (!word.includes(letter)){
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');
    // console.log(hiddenWordArray);
    
    for(let i = 0; i < word.length; i++){
      if (word[i] === letter){
        hiddenWordArray[i] = letter
      }
    }

    setHiddenWord(hiddenWordArray.join(' '));
  }

  const newGame = () => {
    const newWord = getRandomWord();
    setWord(newWord);
    setHiddenWord('_ '.repeat(newWord.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }

  return (
  <div className="App">

    
    <HangImage imageNumber={attempts}/>

   
    <h3>{hiddenWord}</h3>

   
    <h3>Intentos: {attempts}</h3>


    {
      (lose)
       ? <h2>Perdió {word}</h2>
       : ''
    }

     
    {
      (won)
       ? <h2>Felicidades, usted ganó {word}</h2>
       : ''
    }

    
    {
      letters.map((letter) => (
        <button 
        onClick={ () => checkLetter(letter)}
        key={letter}>
          {letter}
        </button>
      ))
    }

    <br /><br />
    <button onClick={newGame}>¿Nuevo juego?</button>
  </div>
  )
};

export default App;
*/