import path from "path";
import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//import express modue from express modue
import express from "express"
//import body-parser modue from body-parser modue
import bodyParser from "body-Parser"

const app = express();
app.use(bodyParser.urlencoded({extended:true})); //parsing bodies from URL and use body properties

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html")  //abosolut file path needed
})

app.post("/", function(req, res) {     //app send post request

    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);     //convert to float Number, also have parseInt
    var content = bmiCalculator(weight, height);
    res.send(content)          //res.send() can't send number alone should change to string
})


app.listen(5000, function() {
  console.log("Sever is running now");
})

function bmiCalculator(w, h) {
  var result = w/Math.pow(h, 2);
  var bmiResult = Math.round((result + Number.EPSILON) *100) / 100;     //convert to 2 decimal
  if (bmiResult < 18.5) {
      return "Your BMI is " + bmiResult +", so you are underweight.";
  }
  else if (18.5 <= bmiResult && bmiResult <= 24.9) {
      return "Your BMI is " + bmiResult +", so you have a normal weight.";     //should use bimResult <=24.9 because the other part will be self-explained
  }
  else {
    return "Your BMI is " + bmiResult +", so you are overweight.";
  }
}
