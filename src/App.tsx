
import { useState } from 'react'
import List, { ItemRenderer, OnChangeHandler } from './components/List'
import { UserInterface, listUsers } from './api/Users'
import './App.css'


export default function App() {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const users = listUsers()

  const onChangeHandler: OnChangeHandler = (selectedIndexes) =>
    setSelectedIndexes(selectedIndexes)

  const userRenderer: ItemRenderer<UserInterface> = (item, index) => (
    <UserInfo index={index}
      item={item} />
  )

  return (
    <div className='App'>
      <Header selectedIndexes={selectedIndexes} />

      <div className='flex-col items-center justify-center w-full'>
        <List<UserInterface> data={users}
          onChange={onChangeHandler}
          renderer={userRenderer} />
      </div>
    </div>
  )
}

// --- Dumb components
function Header(props: { selectedIndexes: number[] }) {
  return (
    <header className='App-header padding-8'>
      Selected items: {props.selectedIndexes.join(', ') || 'no items selected'}
    </header>
  )
}

function UserInfo(props: { index: number; item: UserInterface }) {
  return (
    <div className='user-info-item'
      key={props.index}>
      {props?.item?.name ? props.item.name : 'no name provided'}
    </div>
  )
}
