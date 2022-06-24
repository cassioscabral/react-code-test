/**
 * # Considerations about the challenge
 *
 * ## General information
 * In general I assumed a few things to make sure I had a scope defined such as:
 * - data is coming from a static JSON file with inconsistent data to mock an API response
 *
 * - to be flexible, the List component is showing a collection of a generic type T to ensure it can be reused
 *
 * - I used indexes as keys thinking that the List will not change(filter, adding or remmoving items), otherwise would look to use some other approach
 *
 * ## Components:
 *
 * - App -> main app that starts everything. I added dummy components below in this file just for the sake of the challenge. Ideally they would have their own folders and follow a similar approach to List and List/Item
 *
 * - List -> Renders a list of items with a render and controls which item is selected
 *
 * - Item -> a wrapper to for the checkbox used in List with a memoized version to avoid unecessary re-renders
 *
 */
import { useState } from 'react'
import List, { ItemRenderer, OnChangeHandler } from './components/List'
import { UserInterface, listUsers } from './api/Users'

export default function App() {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const users = listUsers()

  const onChangeHandler: OnChangeHandler = (selectedIndexes) => setSelectedIndexes(selectedIndexes)

  const userRenderer: ItemRenderer<UserInterface> = (item, index) => (
    <UserInfo index={index}
      item={item} />
  )

  return (
    <div className='App'>
      <Header selectedIndexes={selectedIndexes} />

      <div
        className='flex flex-col
           items-center justify-center
           w-full space-y-4
           max-w-sm mx-auto'>
        <List<UserInterface>
          itemClassName={(item) => {
            const defaultItemClassName = 'w-full'
            const activeClassName = item.isActive ? 'border border-green-500' : ''
            return [defaultItemClassName, activeClassName].join(' ')
          }}
          data={users}
          onChange={onChangeHandler}
          renderer={userRenderer}
        />
      </div>
    </div>
  )
}

// --- dummy components
function Header(props: { selectedIndexes: number[] }) {
  return (
    <header className='text-xl text-center my-8'>
      Selected items: {props.selectedIndexes.join(', ') || 'no items selected'}
    </header>
  )
}

function UserInfo(props: { index: number; item: UserInterface }) {
  return (
    <div
      className='flex ml-4 justify-between w-full'
      key={props.index}>
      <header className={props.item.name ? 'font-medium' : ''}>
        {props?.item?.name ? props.item.name : 'no name provided'}
      </header>
      <div className='flex space-x-2'>
        {props.item.email ? <EmailLink email={props.item.email} /> : <span>No email provided</span>}
        <UserInfoActiveIcon isActive={props.item.isActive} />
      </div>
    </div>
  )
}

function EmailLink(props: { email: string }) {
  return (
    <div className='flex justify-end'>
      <a
        target="_blank"
        className='underline underline-offset-1'
        href={`mailto:${props.email}`}
        rel="noreferrer">
        Email me
      </a>
    </div>
  )
}

function UserInfoActiveIcon(props: { isActive?: boolean }) {
  return props.isActive ?
    <div
      title='User is active'
      className='bg-green-400 rounded-full w-2 h-2 hover:motion-safe:animate-pulse'
    />
   :
    <div
      title='User not active'
      className='bg-gray-500 rounded-full w-2 h-2'
    />
}
