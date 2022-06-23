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
  const [selected, setSelected] = useState<Set<number>>(new Set([]))
  const handleSelectedOnChange = ({ index } : ListOnChangeItem<ListItem>): void => {
    return setSelected((prevItems: Set<number>) => {
      const newSet = new Set(prevItems)
      if (newSet.has(index)) {
        newSet.delete(index)
        return newSet
      }
      return newSet.add(index)
    })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='selected-items'>{Array.from(selected).join(', ')}</div>
      </header>
      <div className='flex'>
        <div className='flex-col items-center'>
          <List<ListItem>
            data={messyData}
            renderer={(item: ListItem, index: number) => (
              <input
                type='checkbox'
                onChange={(e) => handleSelectedOnChange({ index, selected: e.target.checked })}
                name={item.name ?? `no-name-${index}`}
                key={index}
                checked={selected.has(index)}
              />
            )}
          />
        </div>
        <div className='flex-col items-center'>
          <List<ListItem>
            data={messyData}
            onChangeItem={handleSelectedOnChange}
            renderer={(item: ListItem, index: number) => (
              <div
                className='list-item'
                key={index}
              >
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
