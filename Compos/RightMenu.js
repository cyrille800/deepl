import React from "react";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

import { useSelector, useDispatch } from "react-redux";
import { Drawer, IconButton, LinearProgress } from "@material-ui/core";
import NewBook from "./NewBook";

import { incrementBook } from '../features/SliceBook'

function RightMenu({ toggleDrawer }) {

  const [state, setState] = React.useState({ right: false });
  const dispatch = useDispatch()

  const toggleDrawerSecond = (anchor, open, data) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (data !== undefined){
      dispatch(incrementBook(data))
      data = undefined
    }

    setState({ ...state, [anchor]: open });
  };

  const books = useSelector((state) => state.books.books);

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
        {books.map((item, key) => (
          <div
            key={item.id}
            className="w-full p-3 cursor-pointer rounded-lg hover:bg-white"
          >
            <div className="flex flex-row w-full">
              <div style={{ width: "30%", height: "120px" }}>
                <img src={item.src} alt="logo" className="rounded-lg" />
              </div>
              <div className="flex flex-col ml-5 pt-4" style={{ width: "55%" }}>
                <div className="text-gray-400 text-tiny">{item.author}</div>
                <div className="text-gray-800 text-lg font-semibold">
                  {item.title}
                </div>
                <div>
                  <LinearProgress
                    variant="determinate"
                    value={getValue(item.sentences)}
                    className="rounded-lg mt-5"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: "10%" }} className=" bg-seventh w-full pl-24">
        Add new Book<IconButton aria-label="delete"  onClick={toggleDrawerSecond("right", true)}>
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
