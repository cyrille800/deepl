import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/logo.svg";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import RightMenu from "./RightMenu";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function MainHeader() {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const [state, setState] = React.useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const changePage = (id) => {
    setValue(id);
    let chaine = "/MainCompo?page=" + String(id);
    router.push(chaine, undefined, { shallow: true });
  };

  return (
    <div className="bg-white w-full relative h-14  pl-28 shadow">
      <div className="absolute -bottom-6">
        <Image src={logo} alt="logo" width={60} className="" />
      </div>
      <div className="pl-20 flex flex-row h-full pt-3">
        <div
          className={[
            "h-full text-center w-44 border-b-2 cursor-pointer hover:border-third ",
            value === 0 ? "border-sixth" : " border-white ",
          ].join(" ")}
          onClick={() => changePage(0)}
        >
          <span className="text-2xl font-semibold font-Roboto text-primary">
            DeepL
          </span>
          <span
            className={[
              "text-xl font-thin antialiased ml-2",
              value === 0 ? " text-sixth" : " text-five ",
            ].join(" ")}
          >
            Traducteur
          </span>
        </div>

        <div
          className={[
            "h-full text-center w-44 border-b-2 cursor-pointer hover:border-third ",
            value === 1 ? "border-sixth" : " border-white ",
          ].join(" ")}
          onClick={() => changePage(1)}
        >
          <span
            className={[
              "text-xl font-thin antialiased",
              value === 1 ? " text-sixth" : " text-five ",
            ].join(" ")}
          >
            Essay Writing
          </span>
        </div>

        <div
          className={[
            "h-full text-center w-44 border-b-2 cursor-pointer hover:border-third ",
            value === 2 ? "border-sixth" : " border-white ",
          ].join(" ")}
          onClick={() => changePage(2)}
        >
          <span
            className={[
              "text-xl font-thin antialiased",
              value === 2 ? " text-sixth" : " text-five ",
            ].join(" ")}
          >
            Grammar
          </span>
        </div>

        <div
          className={[
            "h-full text-center w-44 border-b-2 cursor-pointer hover:border-third ",
            value === 3 ? "border-sixth" : " border-white ",
          ].join(" ")}
          onClick={() => changePage(3)}
        >
          <span
            className={[
              "text-xl font-thin antialiased align-text-bottom",
              value === 3 ? " text-sixth" : " text-five ",
            ].join(" ")}
          >
            Vocabulary
          </span>
        </div>
        <div>
          <div>
            <Button onClick={toggleDrawer("right", true)}>{"right"}</Button>
            <Drawer
              anchor={"right"}
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
            >
              <RightMenu toggleDrawer={toggleDrawer} />
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
