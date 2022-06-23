import React, { useState } from 'react'
import './App.css'
import List from './components/List'
import { ListOnChangeItem } from './components/List/types'
import messyData from './data/json-generated-no-id-mess-data.json'

type ListItem = {
  name?: string
  email?: string
  isActive?: boolean
  phone?: string
}

function App() {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])

  const handleSelectedOnChange = ({ selectedIndexes }: ListOnChangeItem<ListItem>): void => {
    selectedIndexes && setSelectedIndexes(selectedIndexes)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='selected-items'>{selectedIndexes.join(', ')}</div>
      </header>
      <div className='flex'>
        <div className='flex-col items-center'>
          <List<ListItem>
            data={messyData}
            onChangeItem={handleSelectedOnChange}
            renderer={(item: ListItem, index: number) => (
              <div className='list-item'
                key={index}>
                {item.name}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default App
