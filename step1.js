const fsP = require('fs/promises')

async function cat(){

  try{
    let contents = await fsP.readFile("one.txt", "utf8");
    console.log("Our file contents are: ", contents);
  } catch (err) {
    process.exit(1);
  }

}
