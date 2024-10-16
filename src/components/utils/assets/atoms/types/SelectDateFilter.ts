import { ChangeEvent } from "react"

type SelectDateFilterProps = {
    filterValue?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
export default SelectDateFilterProps