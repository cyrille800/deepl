import { LinearProgress } from "@material-ui/core";
import React from "react";

function BookitemSelect({id, toggleDrawer, src, author, title, sentences, getValue, type, research}) {
    return (
    <>
      <div
        className={["w-full p-3 cursor-pointer rounded-lg hover:bg-white ",(author.toUpperCase().replaceAll(" ","").indexOf(research.toUpperCase().replaceAll(" ",""))!==-1 || title.toUpperCase().replaceAll(" ","").indexOf(research.toUpperCase().replaceAll(" ",""))!==-1 || type.toUpperCase().replaceAll(" ","").indexOf(research.toUpperCase().replaceAll(" ",""))!==-1) ? "" : "hidden" ].join(" ")}
        onClick={toggleDrawer("right", false, id)}
      >
        <div className="flex flex-row w-full">
          <div style={{ width: "30%", height: "120px" }}>
            <img src={src} alt="logo" className="rounded-lg" />
          </div>
          <div className="flex flex-col ml-5 pt-4" style={{ width: "55%" }}>
            <div className="text-gray-400 text-tiny">{author}</div>
            <div className="text-gray-800 text-lg font-semibold">
              {title}
            </div>
            <div>
              <LinearProgress
                variant="determinate"
                value={getValue(sentences)}
                className="rounded-lg mt-5"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookitemSelect;
