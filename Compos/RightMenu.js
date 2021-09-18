import React, { useState } from "react";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import NewBook from "./NewBook";

import { incrementBook, setBookSelection } from "../features/SliceBook";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import BookitemSelect from "./BookitemSelect";




async function getData(){
  var res = await fetch("http://localhost:3000/api/data");
  var resData = await res.json();
  return resData.data
}


const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function RightMenu({ toggleDrawer }) {
  const [state, setState] = React.useState({ right: false });
  const [number, setNumber] = React.useState(-1);
  const [msg, setMsg] = React.useState("start");
  const [books, setBook] = useState(
    useSelector((state) => state.books.books.data)
  );
  const dispatch = useDispatch();

  const toggleDrawerSecond = (anchor, open, data) => async (event) => {
    setNumber(0);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (data !== undefined) {
      dispatch(incrementBook(data));
      await setTimeout(async () => {
        var res = await fetch("http://localhost:3000/api/datauploading");
        var resData = await res.json();
        do {
          res = await fetch("http://localhost:3000/api/datauploading");
          resData = await res.json();
          setNumber(resData.data.pourcent);
          setMsg(resData.data.message);
          console.log(resData.data.pourcent)
          if (resData.data.pourcent >= 100) {
            setNumber(100);
            var data = await getData()
            // await dispatch(setBookSelection(lastId))
            await setBook(data)
          }
          await sleep(500);
        } while(resData.data.pourcent < 100);
      }, 1000);
      data = undefined;
    }

    setState({ ...state, [anchor]: open });
  };

  const getValue = (sentences) => {
    const taille = sentences.length;
    let already = 0;
    for (let i = 0; i < taille; i++) {
      if (sentences[i].check === true) {
        already += 1;
      }
    }
    return already === 0 ? 0 : (already / taille) * 100;
  };
  return (
    <div
      className="w-96 flex flex-col bg-seventh h-full"
      role="presentation"
      //   onClick={toggleDrawer("right", false)}
      //   onKeyDown={toggleDrawer("right", false)}
    >
      <div style={{ height: "10%" }}>header</div>
      <div
        style={{ height: "80%" }}
        className="overflow-scroll overflow-x-hidden  bg-seventh "
      >
        <LinearProgressWithLabel
          value={number}
          text={msg}
          className={["w-11/12 m-auto "].join(" ")}
        />
         <LinearProgress className={["w-full", (number===0) ? "" : "hidden"].join(" ")}/>

        {books.map((item, key) => (
          <BookitemSelect key={key} toggleDrawer={toggleDrawer} id = {item.id} src = {item.src} author={item.author} getValue = {getValue} title = {item.author} sentences= {item.sentences} />
        ))}

      </div>
      <div style={{ height: "10%" }} className=" bg-seventh w-full pl-24">
        Add new Book
        <IconButton
          aria-label="delete"
          onClick={toggleDrawerSecond("right", true)}
        >
          <PlaylistAddIcon
            style={{ fontSize: "150%" }}
            className="text-primary"
          />
        </IconButton>
      </div>

      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawerSecond("right", false)}
      >
        <NewBook toggleDrawerSecond={toggleDrawerSecond} />
      </Drawer>
    </div>
  );
}

export default RightMenu;
