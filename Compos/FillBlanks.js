import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import $ from 'jquery';
import { Button } from "@material-ui/core";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { store } from "react-notifications-component";

const axios = require("axios");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function FillBlanks({ data }) {
  const [sentences, setSentences] = useState([]);
  const [idSelect, setIdSelect] = useState([]);

  const generateWord= () => {
    if (data) {
        var tabChaine = data.sentences;
        var tabId = idSelect
        var i = 2;
        var tabChaineSelect = [];
        var c = 0;
        if(tabChaine.length-tabId.length === 1){
            i = 1
        }
        if(tabChaine.length-tabId.length <= 0){
            store.addNotification({
                title: "answer!",
                message: "success",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 90000,
                  onScreen: false,
                },
              });
        }else{
            while (i > 0) {
                c = getRandomInt(tabChaine.length - 1);
                if (tabChaineSelect.indexOf(tabChaine[c]) === -1 && tabId.indexOf(c) === -1) {
                  i -= 1;
                  tabId = [...tabId, c]
                  tabChaineSelect = [...tabChaineSelect, tabChaine[c]];
                }else{
                    if (tabChaine.length-tabId.length === 2 || tabChaine.length-tabId.length === 1){
                        for(var t=0;t<tabChaine.length;t++){
                            if (tabId.indexOf(t)===-1){
                                i -= 1;
                                tabId = [...tabId, t]
                                tabChaineSelect = [...tabChaineSelect, tabChaine[t]];
                            }
                        }
                    }
                }
                console.log(tabId)
              }
        
              axios
              .get("http://127.0.0.1:5000/summary", {
                params: {
                  data: JSON.stringify({ data: tabChaineSelect }),
                },
              })
              .then((reponse) => {
                  setIdSelect(tabId)
                var res = reponse.data.data;
                for (var t = 0; t < res.length; t++) {
                  var sentenc = res[t].en.replaceAll("##", "");
                  for (var l = 0; l < res[t].resume.length; l++) {
                    var chg =
                      '<input type="text" value=" " reponse="' +
                      res[t].resume[l].replaceAll(" ", "") +
                      '" class="bg-gray-200 mb-2 p-1 rounded-md pl-5" />';
                    sentenc = sentenc.split(res[t].resume[l]).join(chg);
                  }
                  res[t].codage = sentenc;
                }
                setSentences(reponse.data.data);
              });
        }
        
      }
  }

  useEffect(() => {
    generateWord()
    $(document).on("change", "input[type='text']", function (e) {
        if(e.target.value.replaceAll(" ","")!==e.target.getAttribute("reponse")){
            $("input[reponse='"+e.target.getAttribute("reponse")+"']").removeClass("bg-gray-200")
            $("input[reponse='"+e.target.getAttribute("reponse")+"']").removeClass("bg-green-200") 
            $("input[reponse='"+e.target.getAttribute("reponse")+"']").addClass("bg-red-200")
            console.log(e.target);
        }else{
            $("input[reponse='"+e.target.getAttribute("reponse")+"']").removeClass("bg-gray-200")
            $("input[reponse='"+e.target.getAttribute("reponse")+"']").removeClass("bg-red-200")
            $("input[reponse='"+e.target.getAttribute("reponse")+"']").addClass("bg-green-200")           
        }
    });
  }, []);

  const changePage = () => {
      if($("input").hasClass("bg-gray-200")===false && $("input").hasClass("bg-red-200")===false){
        generateWord()
      }else{
        store.addNotification({
            title: "answer!",
            message: "fill all the blanks",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 90000,
              onScreen: false,
            },
          });
      }
  }


  return (
    <div className="w-full flex flex-row">
      <div className="w-3/12 ml-5">
        <Button variant="contained" className="mb-3" color="primary" onClick={() => changePage()}>
            <KeyboardArrowRightIcon /> Next page
        </Button>
        <Paper elevation={3} className="w-full p-3">
          {sentences.map((item, key) => (
            <span key={key}>
              {item.resume.map((e, k) => (
                <span key={k} className="bg-gray-200 ml-3 px-1 mt-5 cursor-pointer hover:bg-red-200 mt-1 drag">{e},</span>
              ))}
            </span>
          ))}
        </Paper>
      </div>

      <div className="w-8/12 ml-5">
        <Paper
          elevation={3}
          className="w-full m-auto p-5 text-xl text-gray-800"
        >
          {sentences.map((item, key) => (
            <div key={key} className="mt-7">
              {key + 1}.{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: item.codage,
                }}
              />
            </div>
          ))}
        </Paper>
      </div>
    </div>
  );
}

export default FillBlanks;
