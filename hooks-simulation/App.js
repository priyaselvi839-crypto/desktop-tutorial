let states = [];
let index = 0;

function useState(initialValue){
  const currentIndex = index;

  if(states[currentIndex] === undefined){
    states[currentIndex] = initialValue;
  }

  function setState(newValue){
    states[currentIndex] = newValue;
    render();
  }

  index++;
  return [states[currentIndex], setState];
}

function App(){
  const [count,setCount] = useState(0);
  console.log("Count:", count);

  if(count < 3){
    setCount(count+1);
  }
}

function render(){
  index = 0;
  App();
}

render();