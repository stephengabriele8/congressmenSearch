import express from "express";
import axios from "axios";
import dataSet from "./data/legislators-current.json";
import Promise from "bluebird";
const webp = require("webp-converter");
var cors = require("cors");

// this will grant 755 permission to webp executables
webp.grant_permission();

var CWebp = require("cwebp").CWebp;

const getCongressData = () => {
  const result = Promise.map(
    dataSet,
    async (congressPerson) => {
      const currentTermData = congressPerson.terms.slice(-1)[0];
      const image = await getImage(congressPerson.id.bioguide);
      const data = {
        name: congressPerson.name.official_full,
        image: image,
        politicalAffiliation: currentTermData.party,
        title: currentTermData.type,
        state: currentTermData.state,
      };

      return data;
    },
    { concurrency: 3 }
  );
  return result;
};

const getImage = async (imageRef) => {
  // https://theunitedstates.io/images/congress/225x275/C000127.jpg
  let img;
  try {
    img = await axios
      .get(
        `https://theunitedstates.io/images/congress/225x275/${imageRef}.jpg`,
        {
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        const base64 = Buffer.from(response.data, "binary").toString("base64");
        return webp.str2webpstr(base64, "jpg", "-q 80");
      });
  } catch (err) {
    console.log("err:", err);
    return null;
  }
  return img;
};

const app = express();

app.use(cors());

app.get("/getCongressData", async (req, res) => {
  res.send(await getCongressData());
});

app.listen(3001, () => console.log(`Example app listening on port 3001!`));
