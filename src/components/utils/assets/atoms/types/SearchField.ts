import { ChangeEvent } from "react";

type SearchFieldProps = {
    search?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default SearchFieldProps;