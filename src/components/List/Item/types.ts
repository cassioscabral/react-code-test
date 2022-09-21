import { ReactNode } from 'react'

export type OnSelectHandler = (id: number, selected: boolean) => void
export interface ItemProps {
  id: number
  selected: boolean
  children: ReactNode
  onSelect: OnSelectHandler
  className?: string
}
