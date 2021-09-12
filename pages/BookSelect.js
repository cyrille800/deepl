import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import {
  Button,
  ButtonGroup,
  IconButton,
  TextareaAutosize,
} from "@material-ui/core";
import SettingsInputCompositeIcon from "@material-ui/icons/SettingsInputComposite";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  incrementSentence,
  removeSentence,
  setSentenceText,
} from "../features/SliceBook";

function BookSelect() {
  const bookselect = useSelector((state) => state.books.bookSelection);
  const book = useSelector((state) => state.books.books[bookselect]);

  const [paragraphSelect, setParagraphSelect] = useState(
    book.sentences[book.sentences.length - 1].id
  );
  const dispatch = useDispatch();

  const [state, setState] = useState({
    fr: "",
    en: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const addText = () => {
    try {
      dispatch(
        setSentenceText({
          idSentence: paragraphSelect,
          idBook: bookselect,
          ...state,
        })
      );
    } catch (e) {
      dispatch(
        setSentenceText({
          idSentence: book.sentences[book.sentences.length - 1].id,
          idBook: bookselect,
          ...state,
        })
      );
      setParagraphSelect(book.sentences[book.sentences.length - 1].id);
    }

    setState({
        fr: "",
        en: "",
      })

  };

  const addParagraph = () => {
    dispatch(incrementSentence({ id: bookselect, ...state }));
    setParagraphSelect(book.sentences[book.sentences.length - 1].id + 1);

    setState({
        fr: "",
        en: "",
      });
  };

  const removeSentence_ = (id) => {
    dispatch(removeSentence({ idBook: bookselect, idSentence: id }));
  };
  return (
    <div className="w-full h-screen">
      <div className="flex flex-row h-full">
        <div style={{ width: "25%" }} className="h-full">
          dsd
        </div>
        <div style={{ width: "75%" }} className="flex flex-row h-full">
          <div className="flex flex-col w-5/12 h-full">
            <div className="field">
              <div className="control">
                <input type="text" name="en" value={state.en} placeholder="Write english version" onChange={handleChange} className="textarea is-medium" />
              </div>
            </div>
            <div className="field text-center">
              <SettingsInputCompositeIcon />
            </div>
            <div className="field">
              <div className="control">
              <input type="text" name="fr" value={state.fr} placeholder="Write french version" onChange={handleChange} className="textarea is-medium" />
              </div>
            </div>

            <div className="field text-center">
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="contained primary button group"
              >
                <Button onClick={addText}>Add text</Button>
                <Button> </Button>
                <Button onClick={addParagraph}>Add paragraph</Button>
              </ButtonGroup>
            </div>
          </div>
          <div
            className="bg-white shadow-md w-10/12 ml-5 mr-5 overflow-scroll p-3"
            style={{ height: "600px" }}
          >
            {book.sentences.map((book) => (
              <p
                key={book.id}
                onClick={() => setParagraphSelect(book.id)}
                className={[
                  "font-normal text-lg mb-6 cursor-pointer hover:bg-seventh",
                  book.id === paragraphSelect
                    ? "pb-2 bg-gray-100 border-primary border-b-2"
                    : "",
                ].join(" ")}
              >
                {book.en.replaceAll("<suite>", " ")}
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  onClick={() => removeSentence_(book.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookSelect;
