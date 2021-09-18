import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Button } from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FillBlanks from "../Compos/FillBlanks";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function GrammarCom() {
  const [bookselect, setBookselect] = useState(
    useSelector((state) => state.books.bookSelection)
  );
  const [textMenu, setTextMenu] = useState("Fill the blanks")

  const [content, setContent] = useState("")
  const [bookss, setBookss] = useState(
    useSelector((state) => state.books.books.data[bookselect])
  );

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookselect == -1) {
      let chaine = "/MainCompo?page=0";
      router.push(chaine, undefined, { shallow: true });
    }

    switch(textMenu){
        case "Fill the blanks":
          setContent(<FillBlanks data={bookss} />)
        break;
    }
  }, []);

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div className="">
        text
    </div>
  );
  return (
      <div className="w-full">
          <Button style={{borderRadius:"0"}} className="w-full bg-gray-500 text-white" onClick={toggleDrawer("top", true)}>< ArrowDropDownIcon className="mr-5 text-3xl" /> {textMenu}</Button>
          <Drawer anchor={"top"} open={state["top"]} onClose={toggleDrawer("top", false)}>
            {list("top")}
          </Drawer>
          <div className="mt-3">
              {content}
          </div>
      </div>
  );
}

export default GrammarCom;
