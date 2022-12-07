const fsP = require('fs/promises');
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

cat();
