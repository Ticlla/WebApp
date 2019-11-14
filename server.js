const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.render('index.ejs')
});
app.post('/login', (req, res) => {
    res.render('profile.ejs')
});
  
app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});