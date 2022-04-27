const fs = require("fs");
const path = require("path");

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

  for (let i = 0; i < lines.length; i++) {
    const thisLine = lines[i];
    output[i] = {
      index: i,
      id: `entry_${i}`,
      original: thisLine,
      slug: `entry_${i}`,
    };
    if (thisLine.indexOf(" - ") > -1) {
      const parts = thisLine.split(" - ");
      output[i].headWord = parts[0];
      output[i].slug = slugify(parts[0]);
      output[i].rest = parts[1];
    }
  }
  storeData(output, __dirname + "/src/data/names.json");
  console.log("File written!");
});