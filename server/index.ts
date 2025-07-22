const express = require("express");
const cors = require("cors"); // 引入cors中间件
const app = express();

// 配置跨域：允许所有来源、所有方法、所有请求头
app.use(cors({
  origin: "*", // 允许所有来源访问（生产环境建议指定具体域名）
  methods: "*", // 允许所有HTTP方法（GET/POST/PUT/DELETE等）
  allowedHeaders: "*" // 允许所有请求头
}));

// 你的路由
app.get("/table", (req, res) => {
  res.send([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ]);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});