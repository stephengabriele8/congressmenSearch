import express from "express";
import axios from "axios";
import dataSet from "./data/legislators-current.json";
import { americanFlag } from "./data/americanFlag";
import Promise from "bluebird";
const NodeCache = require("node-cache");
const webp = require("webp-converter");
var cors = require("cors");

// this will grant 755 permission to webp executables
webp.grant_permission();

const imgCache = new NodeCache({ stdTTL: 300, checkperiod: 320 });

const getCongressData = async () => {
  let result = [];

  for (let congressPerson of dataSet) {
    const currentTermData = congressPerson.terms.slice(-1)[0];

    const image = await getImage(congressPerson.id.bioguide);

    const data = {
      name: congressPerson.name.official_full,
      image: image,
      politicalAffiliation: currentTermData.party,
      title: currentTermData.type,
      state: currentTermData.state,
    };

    result.push(data);
  }
  return result;
};

const getImage = async (imageRef) => {
  let img = imgCache.get(imageRef);
  if (img == undefined) {
    try {
      img = await axios
        .get(
          `https://theunitedstates.io/images/congress/225x275/${imageRef}.jpg`,
          {
            responseType: "arraybuffer",
          }
        )
        .then((response) => {
          const base64 = Buffer.from(response.data, "binary").toString(
            "base64"
          );
          const base64webp = webp.str2webpstr(base64, "jpg", "-q 80");
          imgCache.set(imageRef, base64webp, 300);
          return base64webp;
        });
    } catch (err) {
      console.log("err:", err);
      img = americanFlag;
      imgCache.set(imageRef, americanFlag, 300);
    }
  }
  return img;
};

const app = express();

app.use(cors());

app.get("/getCongressData", async (req, res) => {
  res.send(await getCongressData());
});

app.listen(3001, () => console.log(`Example app listening on port 3001!`));
