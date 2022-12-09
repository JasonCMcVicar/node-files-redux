const fsP = require('fs/promises');
const axios = require("axios");
const argv = process.argv;

async function cat(path, writeTruth){

  try{
    let contents = await fsP.readFile(path, "utf8");
    if (writeTruth) {
      return contents;
    } else {
      console.log("Our file contents are: ", contents);
    }
  } catch (err) {
    console.log(`Error reading ${path}: `);
    console.error(err.message);
    process.exit(1);
  }

}

async function webCat(url, writeTruth) {

  try {
        let resp = await axios.get(`${url}`);
        if (writeTruth) {
          return resp.data;
        } else {
        console.log(resp.data);
        }
    } catch (err) {
      console.log('inside webCat');
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

// store argv[2]
// slice first 4 chars

// if string equals 'http'
    // call w/ webCat
// call cat
// let firstFourChars = argv[2].slice(0, 4);

// if (firstFourChars === 'http') {
//   webCat(argv[2]);
// } else {
//   cat();
// }

// solution example with ternary
// let path = process.argv[2];

// let resultPromise = path.startsWith("http")
//   ? webCat(path)
//   : cat();

// create logic so that if argv[2] === "--out" ...
// then argv[3] is the write file
// use argv[4] as the read file

async function catWriter(writeTo, content){
  console.log("writeTo = ", writeTo);
  console.log("content = ", content);
  try {
    await fsP.writeFile(writeTo, content, "utf8");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("Successfully wrote to file!");
}

async function director() {
  if (argv[2] === "--out") {
    let returnPromise;
    let writeTruth = true;
    let path = argv[4];
    let writeTo = argv[3];
    returnPromise = path.startsWith("http")
      ? webCat(path, writeTruth)
      : cat(path, writeTruth);
    let promiseResult = await Promise.all([returnPromise]);
    catWriter(writeTo, promiseResult);
  } else {
    let path = argv[2];
    path.startsWith("http")
      ? webCat(path)
      : cat(path)
  }
}

director();
