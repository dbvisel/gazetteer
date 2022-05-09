const fs = require("fs");
const path = require("path");

const cleanLatLong = (raw) => {
  const degrees = parseInt(raw.split("DEG")[0], 10);
  const minutes = parseInt(raw.split("DEG")[1].split(`'`)[0], 10);
  const direction = raw.split("'")[1];
  const value =
    (degrees + minutes / 60) *
    (direction === "W" || direction === "S" ? -1 : 1);
  return value;
};

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

const slugify = (str) => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaeeeeiiiioooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
};

const output = [];

fs.readFile(__dirname + "/raw/cleaned.txt", (error, data) => {
  if (error) {
    throw error;
  }
  const myText = data.toString();
  const lines = myText.split("\n");
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    const thisLine = lines[i];
    output[i] = {
      index: i,
      id: `entry_${i}`,
      original: thisLine,
      slug: `entry_${i}`,
      primary: false,
    };
    if (thisLine.indexOf(" - ") > -1) {
      const parts = thisLine.split(" - ");
      output[i].headWord = parts[0];
      output[i].slug = slugify(parts[0]);
      output[i].rest = parts[1];
      if (parts[0] === parts[0].toUpperCase()) {
        output[i].primary = true;
        // TODO: this is a main word.
        const lat = parts[1].match(/\d+DEG\d+'[NS]/) || "";
        const long = parts[1].match(/\d+DEG\d+'[EW]/) || "";
        if (lat && long) {
          output[i].rawLat = lat[0];
          output[i].rawLong = long[0];
          output[i].lat = cleanLatLong(lat[0]);
          output[i].long = cleanLatLong(long[0]);
          //TODO: decimalize these. N is positive, E is positive
          // deg + min / 60
        }
        const otherIndex = parts[1].indexOf("Other: ");
        if (otherIndex > -1) {
          output[i].others = parts[1].substring(otherIndex + 7).trim();
          output[i].definition = parts[1]
            .substring(0, otherIndex)
            .replace(lat, "")
            .replace(long, "")
            .trim();
          // TODO: this fails sometimes: http://localhost:8000/word/visayan-islands
        }
      } else {
        // TODO: this is a reference
        if (parts[1].split("see ").length < 2) {
          console.log(thisLine);
        } else {
          if (parts[1].split("see ").length > 2) {
            console.log(thisLine);
          }
        }
        count++;
      }
    }
  }
  storeData(output, __dirname + "/src/data/names.json");
  console.log("File written!");
});
