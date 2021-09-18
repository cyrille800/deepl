import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import { store } from "react-notifications-component";

import React from "react";
import {
  AccordionActions,
  Button,
  ButtonGroup,
  TextField,
} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function ItemEssayWriting({
  key,
  expanded,
  handleChange,
  book,
  classess,
  checkReponse,
}) {


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

  const list = (fr, en, lastValue, id, check) => (
    <div
      className=""
      role="presentation"
    >
      <div className="p-8 ">
      <ButtonGroup size="small" className="bg-primary mr-3 my-8">
              <Button
                 onClick={toggleDrawer("bottom", true)}
              >
                <VisibilityIcon className=" text-white" />
              </Button>
            </ButtonGroup>
            <span className={["p-1 rounded-md text-tiny px-5",(check) ? "bg-green-500":"bg-red-500"].join(" ")}>{ (check) ? "Valid":"Invalid"}</span>
            <Drawer anchor={"bottom"} open={state["bottom"]} onClose={toggleDrawer("bottom", false)}>
            <div className="bg-blue-200 p-5 pb-10">
            <span className="text-2xl">
        {en}
        </span>
            </div>
          </Drawer>
<div>
<span className="text-2xl text-gray-500">
        {fr}
        </span>
        <TextField
          id="outlined-multiline-static"
          label="Write translate"
          multiline
          rows={4}
          defaultValue={
            check ? en.replaceAll("##", "") : lastValue
          }
          variant="outlined"
          className="w-full bg-gray-100 mt-5"
          inputProps={{style: {fontSize: 23,lineHeight : 1.5}}}
          onChange={(e) =>
            checkReponse(e, en.replaceAll("##", ""), id, check)
          }
          spellcheck="false"
        />
</div>
      </div>
    </div>
  );

  return (
    <Accordion
      expanded={expanded === book.id}
      onChange={handleChange(book.id)}
      className={book.check ? "bg-green-200" : ""}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classess.heading}>
          Paragraph #{book.id + 1}
        </Typography>
        <div
          className={[
            classess.secondaryHeading,
            "flex flex-row w-full",
            book.check ? "text-green-500" : "text-red-500",
          ].join(" ")}
        >
          {book.check ? (
            <div className="">
              <CheckCircleIcon /> correct
            </div>
          ) : (
            <div className="w-full w-4/12">
              <CancelIcon /> Incorrect{" "}
            </div>
          )}{" "}
          <div></div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-row">
          <div className="h-full">
            <ButtonGroup size="small" className="bg-primary mr-3 my-8">
              <Button
                onClick={() => {
                  store.addNotification({
                    title: "answer!",
                    message: book.en.replaceAll("##", ""),
                    type: "info",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 90000,
                      onScreen: false,
                    },
                  });
                }}
              >
                <VisibilityIcon className=" text-white" />
              </Button>
              <Button onClick={toggleDrawer("top", true)}>
                <ZoomOutMapIcon className=" text-white" />
              </Button>
            </ButtonGroup>

            <Drawer anchor={"top"} open={state["top"]} onClose={toggleDrawer("top", false)}>
            {list(book.fr
              .replaceAll("##", "")
              .replaceAll("volume_up\ncontent_copy\nshare", ""), book.en
              .replaceAll("##", "")
              .replaceAll("volume_up\ncontent_copy\nshare", ""), book.lastValue, book.id, book.check )}
          </Drawer>
          </div>
          <div>
            {book.fr
              .replaceAll("##", "")
              .replaceAll("volume_up\ncontent_copy\nshare", "")}
          </div>
        </div>
      </AccordionDetails>
      <AccordionActions>
        <TextField
          id="outlined-multiline-static"
          label="Write translate"
          multiline
          rows={4}
          defaultValue={
            book.check ? book.en.replaceAll("##", "") : book.lastValue
          }
          variant="outlined"
          className="w-full bg-gray-100"
          style={{ color: "red" }}
          onChange={(e) =>
            checkReponse(e, book.en.replaceAll("##", ""), book.id, book.check)
          }
          spellcheck="false"
        />
      </AccordionActions>
    </Accordion>
  );
}

export default ItemEssayWriting;
