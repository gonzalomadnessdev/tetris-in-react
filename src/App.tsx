import { useEffect, useState } from 'react'
import './App.css'
import ListGroup from './components/ListGroup'
import Alert from './components/Alert'
import Button from './components/Button'
import TicTacToe from './tic-tac-toe/TicTacToe'
import Tetris from './tetris/Tetris'

function App() {
  const [count, setCount] = useState(0)
  const [currentItem, setCurrentItem] = useState("")
  const [list, setList] = useState<string[]>([])

  // useEffect(() => {
  //   console.log('componentDidMount');
  //   getData();
  // }, [])

  // useEffect(() => {
  //   console.log('componentDidUpdate');
  // });

  // useEffect(() => {
  //   return () => {
  //     console.log('componentWillUnmount');
  //   };
  // }, []);

  const handleSelectItem = (item: string) => { setCurrentItem(item) }

  const getData = async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let data = await response.json();
    setList(data.map((i: any) => i.email))
    console.log()
  };



  return (
    <main >
      <Tetris></Tetris>
      {/* <TicTacToe></TicTacToe> */}
      {/* <button className="btn btn-primary mb-2" onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      {currentItem ? <h1>{currentItem}</h1> : false}
      <ListGroup items={list} onSelectItem={handleSelectItem} />
      <Alert>
        A simple primary <span>alert—check</span> it out!
      </Alert>
      <Button type="secondary" onClick={() => console.log("my custom button")}>My button</Button> */}
    </main>
  )
}

export default App
