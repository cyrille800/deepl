import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { setcheckSentence } from "../features/SliceBook";
import { useSelector, useDispatch } from "react-redux";
import ItemEssayWriting from "../Compos/ItemEssayWriting";
import TopMenuEassayWriting from "../Compos/TopMenuEassayWriting";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function EssayWritingCom() {
  const classes = useStyles();
  const [bookselect, setBookselect] = useState(
    useSelector((state) => state.books.bookSelection)
  );

  const [bookss, setBookss] = useState(
    useSelector((state) => state.books.books)
  );
  
  const router = useRouter();

  useEffect(() => {
    if (bookselect == -1) {
      let chaine = "/MainCompo?page=0";
      router.push(chaine, undefined, { shallow: true });
    }
  }, []);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const reset = () => {
    ("use strict");
    var tabbok = Object.freeze(bookss);
    tabbok = [];
    for (var h = 0; h < bookss.data.length; h++) {
      if (h === bookselect) {
        ("use strict");
        var books = Object.freeze(bookss.data[bookselect]);

        ("use strict");
        var sentences = Object.freeze(books.sentences);
        sentences = [];

        for (var o = 0; o < books.sentences.length; o++) {
          ("use strict");
          var tabSentence = Object.freeze(books.sentences[o]);
          tabSentence = { ...tabSentence, check: false, lastValue : "" };
          sentences = [...sentences, tabSentence];
        }
        tabbok = [...tabbok, { ...books, sentences: sentences }];
      } else {
        tabbok = [...tabbok, bookss.data[h]];
      }
    }

    setBookss({ data: tabbok });
  };

  const save = (dataa = 0) => {
    dataa = dataa === 0 ? { data: bookss } : dataa;
    dispatch(setcheckSentence({ data: dataa }));
    setBookselect(bookselect);
  };

  const checkReponse = (e, r, id, ch) => {
    const input = e.target.value;

    r = r
      .replaceAll(";", "")
      .replaceAll("!", "")
      .replaceAll(",", "")
      .replaceAll("-", "")
      .replaceAll(" ", "")
      .toLowerCase();
    let reponse =
      input
        .replaceAll(";", "")
        .replaceAll("!", "")
        .replaceAll(",", "")
        .replaceAll("-", "")
        .replaceAll(" ", "")
        .toLowerCase() === r
        ? true
        : false;

    ("use strict");
    var tabbok = Object.freeze(bookss);
    tabbok = [];
    for (var h = 0; h < bookss.data.length; h++) {
      if (h === bookselect) {
        ("use strict");
        var books = Object.freeze(bookss.data[bookselect]);

        ("use strict");
        var sentence = Object.freeze(books.sentences[id]);
        sentence = { ...sentence, check: reponse, lastValue: input };

        ("use strict");
        var tabSentence = Object.freeze(books.sentences);
        tabSentence = [];
        for (var o = 0; o < books.sentences.length; o++) {
          tabSentence =
            o === id
              ? [...tabSentence, sentence]
              : [...tabSentence, books.sentences[o]];
        }
        tabbok = [...tabbok, { ...books, sentences: tabSentence }];
      } else {
        tabbok = [...tabbok, bookss.data[h]];
      }
    }

    setBookss({ data: tabbok });
  };

  return (
    <div
      className={[classes.root, "w-7/12 h-screen m-auto pt-24 pb-12"].join(" ")}
    >
      <TopMenuEassayWriting reset={reset} save={save} />

      {bookselect !== -1 &&
        bookss.data[bookselect].sentences.map((book, key) => (
          <ItemEssayWriting
            key={key}
            expanded={expanded}
            handleChange={handleChange}
            book={book}
            classess={classes}
            checkReponse={checkReponse}
          />
        ))}

      <div className="pt-8"></div>
    </div>
  );
}

export default EssayWritingCom;
