const fsP = require('fs/promises');
const axios = require("axios");
const argv = process.argv;

async function cat(){

  try{
    let contents = await fsP.readFile(argv[2], "utf8");
    console.log("Our file contents are: ", contents);
  } catch (err) {
    console.log(`Error reading ${argv[2]}: `);
    console.error(err.message);
    process.exit(1);
  }

}

async function webCat(url) {
    try {
        let resp = await axios.get(`${url}`);
        console.log(resp.data);
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
let firstFourChars = argv[2].slice(0, 4);

if (firstFourChars === 'http') {
  webCat(argv[2]);
} else {
  cat();
}

// solution example with ternary
// let path = process.argv[2];

// let resultPromise = path.startsWith("http")
//   ? webCat(path)
//   : cat();