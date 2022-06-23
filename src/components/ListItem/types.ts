export interface ListItemProps {
  id: number
  selected: boolean
  children?: JSX.Element
  onChangeItem: (e: React.ChangeEvent<HTMLInputElement>) => void
}
