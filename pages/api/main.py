# -*- coding: utf-8 -*-
"""
Created on Tue Sep 14 00:05:12 2021

@author: armand
"""
from flask import Flask, request, jsonify
from flask import jsonify
from flask_restful import Api, Resource
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.expected_conditions import _find_element
import json
import time
from selenium.webdriver.common.keys import Keys
from rake_nltk import Rake
rake_nltk_var = Rake()

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('headless')
chrome_options.add_argument('window-size=1920x1080')
chrome_options.add_argument("disable-gpu")
chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
class text_to_change(object):
    def __init__(self, locator, text):
        self.locator = locator
        self.text = text

    def __call__(self, driver):
        actual_text = _find_element(driver, self.locator).text
        return actual_text != self.text


app = Flask(__name__)
api = Api(app)


@app.route("/summary", methods=["GET"])
def summary():
    data = request.args.get('data')
    jsonData = json.loads(data)
    dataReturn = []
    for chaine in jsonData["data"]:
        n = int((len(chaine["en"].replace("##",""))*1)/50)
        rake_nltk_var.extract_keywords_from_text(chaine["en"].replace("##",""))
        extract = rake_nltk_var.get_ranked_phrases()
        if n > len(extract):
            n = 1
        dataReturn.append({
            "id" : chaine["id"],
            "fr" : chaine["fr"],
            "en" : chaine["en"],
            "resume" : extract[:n],
        })
    response = jsonify({'data': dataReturn})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/geto", methods=["GET"])
def starting_url():
    print("**********************")
    data = request.args.get('data')
    jsonData = json.loads(data)
    with open("data.json", "w") as outfile:
        outfile.write(json.dumps(jsonData, indent = 4))
    response = jsonify({'data': [{'name': "junior"}]})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/saveAs", methods=["GET"])
def saveAss():
    print("**********************")
    data = request.args.get('data')
    jsonData = json.loads(data)

    f = open('data.json')

    dataJson = json.load(f)

    f.close()

    data = {
        "id": len(dataJson["data"]),
        "sentences" : jsonData["data"]["sentences"],
        "link" : jsonData["data"]["link"],
        "title" : jsonData["data"]["title"],
        "author" : jsonData["data"]["author"],
        "src" : jsonData["data"]["src"],
        "type" : jsonData["data"]["type"],
    }
    
    driver = webdriver.Chrome('chromedriver', chrome_options=chrome_options)

    driver.get("https://www.deepl.com/translator?utm_source=lingueebanner1&il=fr#en/fr/")

    indice = 0
    for elem in data["sentences"] :

        textarea = driver.find_element_by_xpath("//textarea[@class='lmt__textarea lmt__source_textarea lmt__textarea_base_style']")
        
        for word in elem["en"].split(" "):
            textarea.send_keys(" "+word)
            timewait = 0.2
            time.sleep(timewait)

        time.sleep(3)

        elem["fr"] = driver.find_elements_by_xpath("//textarea[@class='lmt__textarea lmt__target_textarea lmt__textarea_base_style']")[0].get_attribute('value')
        elem["check"] = False
        elem["lastValue"] = ""
        elem["id"] = indice
        time.sleep(1)
        driver.find_element_by_xpath("//textarea[@class='lmt__textarea lmt__source_textarea lmt__textarea_base_style']").send_keys(Keys.CONTROL, 'a')
        driver.find_element_by_xpath("//textarea[@class='lmt__textarea lmt__source_textarea lmt__textarea_base_style']").send_keys(Keys.BACKSPACE)
        time.sleep(1)
        indice+=1

    dataJson["data"].insert(0,data)

    with open("data.json", "w") as outfile:
        outfile.write(json.dumps(dataJson, indent = 4))

    response = jsonify({'data': [{'name': "junior"}]})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

class TedSave(Resource):
    def get(self,idBook,idsentence,check):
        # print("ouii")
        # f = open('data.json')
        # dataJson = json.load(f)
        # f.close()
        # for el in dataJson["data"]:
        #     if el["id"] == idBook:
        #         for els in el["sentences"]:
        #             if els["id"] == idsentence:
        #                 els["check"] = True if check==1 else False 
        #                 with open("data.json", "w") as outfile:
        #                     outfile.write(json.dumps(dataJson, indent = 4))

        print("terminer")
        response = jsonify({'data': [{'name': "junior"}]})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
api.add_resource(TedSave, "/getso/<int:idBook>/<int:idsentence>/<int:check>/")


class Ted(Resource):
    def getDataLink(self, link, title, author, src, type ):
        with open("datauploading.json", "w") as outfile:
            outfile.write(json.dumps({"data": {"pourcent":0,"message":" start"}}, indent = 4))

        f = open('data.json')

        dataJson = json.load(f)

        f.close()

        data = {
            "id": len(dataJson["data"]),
            "sentences" : [],
            "link" : link,
            "title" : title,
            "author" : author,
            "src" : src,
            "type" : type,
        }

        driver = webdriver.Chrome('chromedriver', chrome_options=chrome_options)
        if  "ted" in type:
            driver.get(link)
            texts = driver.find_elements_by_class_name("Grid--with-gutter")
            i = 0
            pourcent = 0
            pas = (50/len(texts))
            for text in texts:
                try:
                    times = text.find_element_by_tag_name("button")
                    div = times.find_elements_by_tag_name("div")

                    en_list = []
                    p = text.find_element_by_tag_name("p")
                    ass = p.find_elements_by_tag_name("a")

                    for a in ass:
                        chaine = "##"+a.text
                        en_list.append(chaine)

                    pourcent+= pas 

                    with open("datauploading.json", "w") as outfile:
                        outfile.write(json.dumps({"data": {"pourcent":pourcent,"message":" 1/2 initial text"}}, indent = 4))

                    data["sentences"].append({
                        "id" : i,
                        "time" : div[1].text,
                        "en" : " ".join(en_list),
                        "check" : False,
                        "lastValue": "",
                        "fr": "",
                    })
                    i+=1

                except:
                    pass

            driver.get("https://www.deepl.com/translator?utm_source=lingueebanner1&il=fr#en/fr/")

            pas = (50/len(data["sentences"]))
            for elem in data["sentences"] :

                textarea = driver.find_element_by_xpath("//textarea[@class='lmt__textarea lmt__source_textarea lmt__textarea_base_style']")
                
                for word in elem["en"].split(" "):
                    textarea.send_keys(" "+word.replace("#","" ))
                    timewait = 0.2
                    time.sleep(timewait)

                time.sleep(3)

                elem["fr"] = driver.find_elements_by_xpath("//textarea[@class='lmt__textarea lmt__target_textarea lmt__textarea_base_style']")[0].get_attribute('value')
                time.sleep(1)
                driver.find_element_by_xpath("//textarea[@class='lmt__textarea lmt__source_textarea lmt__textarea_base_style']").send_keys(Keys.CONTROL, 'a')
                driver.find_element_by_xpath("//textarea[@class='lmt__textarea lmt__source_textarea lmt__textarea_base_style']").send_keys(Keys.BACKSPACE)
                time.sleep(1)

                pourcent+= pas 
                with open("datauploading.json", "w") as outfile:
                    outfile.write(json.dumps({"data": {"pourcent":pourcent,"message":" 2/2 translate text"}}, indent = 4))

            with open("datauploading.json", "w") as outfile:
                outfile.write(json.dumps({"data": {"pourcent":pourcent+3,"message":" finish"}}, indent = 4))

        if "udemy" in type:
            driver.get(link)

        dataJson["data"].insert(0,data)
        with open("data.json", "w") as outfile:
            outfile.write(json.dumps(dataJson, indent = 4))

        print("************fini")
        return {'data': data}


    def get(self, link, title, author, src, type ):
        link = link.replace("$","/").replace("**","?").replace("@*","#")
        src = src.replace("$","/").replace("**","?").replace("@*","#")
        title = title.replace("$","/").replace("**","?").replace("@*","#")
        response = jsonify(self.getDataLink(link, title, author, src, type ))
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
api.add_resource(Ted, "/getSubtitle/<string:link>/<string:title>/<string:author>/<string:src>/<string:type>")

if __name__ == "__main__" :
    app.run(debug = True)
    