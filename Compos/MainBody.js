import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EssayWritingCom from "../pages/EssayWritingCom";
import IndexCom from "../pages/IndexCom";
import GrammarCom from "../pages/GrammarCom";
import VocabularyCom from "../pages/VocabularyCom";

function MainBody() {
  const router = useRouter();
  const [page, setPage] = useState("");

  useEffect(() => {
    // Always do navigations after the first render
    router.replace("/MainCompo?page=0");
  }, router.query);

  useEffect(() => {
    switch (router.query.page) {
      case "0":
        setPage(<IndexCom />);
        break;
      case "1":
        setPage(<EssayWritingCom />);
        break;
      case "2":
        setPage(<GrammarCom />);
        break;
      case "3":
        setPage(<VocabularyCom />);
        break;
    }
  }, router.query.page);
  return <div>{page}</div>;
}

export default MainBody;
