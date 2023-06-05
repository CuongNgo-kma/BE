require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParse = require("cookie-parser");
const { json } = require("express");
const auth = require("./middleware/auth");
const authAdmin = require("./middleware/authAdmin");
const uploadRouter = require('./routes/upload');
require("dotenv").config();

const app = express();
// app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParse());
// app.use(cors());
app.use(cors({
  origin: 'https://fe-olive-theta.vercel.app'
}));
app.use('/api/upload', uploadRouter);
// app.post('/api/upload', (req, res) => {
//   // Set tiêu đề 'Access-Control-Allow-Origin' cho phép truy cập từ nguồn gốc khác
//   res.header('Access-Control-Allow-Origin', 'https://fe-olive-theta.vercel.app');
  
//   res.json({ message: 'Resource response' });
// });
// app.post('/api/destroy', (req, res) => {
//   // Set tiêu đề 'Access-Control-Allow-Origin' cho phép truy cập từ nguồn gốc khác
//   res.header('Access-Control-Allow-Origin', 'https://fe-olive-theta.vercel.app');
//   // Xử lý và trả về phản hồi
//   res.json({ message: 'Resource response' });
// });
// app.use(
//   cors({
//     origin: 'https://fe-olive-theta.vercel.app',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Routes
app.use("/user", require("./routes/userRouter")); 
app.use("/api", require("./routes/categoryRouter")); //
app.use("/api", require("./routes/upload")); //
app.use("/api", require("./routes/productRouter")); //
app.use("/api", require("./routes/paymentRouter")); //

// app.get("/success", (req, res) => {
//     res.render("success")
// })
// app.get("/cancel", (req, res) => {
//     res.render("cancel")
// })
app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome bé iu!"
    })
})

//connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MONGODB");
  }
);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to you" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server in running on http://localhost:${PORT}/`, PORT);
});
