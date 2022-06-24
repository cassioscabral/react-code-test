export type OnSelectHandler = (id: number, selected: boolean) => void
export interface ItemProps {
  id: number
  selected: boolean
  children: JSX.Element
  onSelect: OnSelectHandler
  className?: string
}
