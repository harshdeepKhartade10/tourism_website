const Razorpay = require("razorpay");
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const instance = new Razorpay({
  key_id: 'Enter_your_razorpay_key',
  key_secret: 'Enter_your_razorpay_secret'
});

app.post("/api/payment/verify", (req, res) => {
  let body = req.body.response.razorpay_order_id + "/" + req.body.response.razorpay_payment_id;
  // console.log(body)

  
  console.log("sig received", req.body.response.razorpay_signature);
  console.log("sig generated", expectedSignature);

  var response = {"signatureIsValid": "false"};

  if (expectedSignature === req.body.response.razorpay_signature)
    response = {"signatureIsValid": "true"};

  res.send(response);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/layouts'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the formdemo.html file
app.get("/html", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "html", "formdemo2.html"));
});


const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "/src")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/create/orderId", (req, res) => {
  console.log("create orderId request", req.body);
  var options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: "order_receiptId_10"
  };
  instance.orders.create(options, function(err, order) {
    if (err) {
      console.error(err);
      res.status(500).send({ error: 'Internal Server Error' });
    } else {
      console.log(order);
      res.send({ orderId: order.id });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port : ${PORT}`);
});