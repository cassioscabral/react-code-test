export interface ListOnChangeItem<T> {
  index: number
  item?: T
  selected?: boolean
  arr?: T[]
}
export interface ListProps<T> {
  data: T[]
  onChangeItem?: (args: ListOnChangeItem<T>) => void
  renderer: (item: T, index: number, arr: T[]) => JSX.Element
}
