import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import BookNoSelect from "./BookNoSelect"
import BookSelect from "./BookSelect"

function IndexCom() {

    const bookselect = useSelector((state) => state.books.bookSelection);

    //bookSelection
    return (
        <div className="pt-16 h-full">
            {(bookselect == -1) ? <BookNoSelect /> : <BookSelect />}
        </div>
    )
}

export default IndexCom
