const express = require('express')
const app = express();
var httpClient = require('request-promise');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const IP = '0.0.0.0';
const PORT = '3000';


app.get('/', (req, res) => {
  res.render('pages/index.ejs')
  
});

app.get('/login', (req, res) => {
    res.render('pages/login.ejs')
});

app.post('/signup', async function(req, res) {
  // console.log(req.body);
  httpOptions = {
    method: 'POST',
    uri: 'http://'+IP+':'+PORT+'/api/v1/sign_up',
    json: true,
    resolveWithFullResponse: true,
    headers: {
       'content-type': 'application/Json'  // Is set automatically
    },
    body:{user:{email:req.body.email,password:req.body.password,
                password_confirmation:req.body.password_confirmation
                }
          } 

  }
  await httpClient(httpOptions)
  .then(function(response) {
    // console.log(response)
    res.render('pages/profile.ejs',{error:null, success:true, message:response.body.data.user});
  })
  .catch(function(error) {
    // console.log(error)
    res.render('pages/signup.ejs',{error:true, success:null, message:'Something went wrong'});
  });

});

app.get('/signup', (req, res) => {
    res.render('pages/signup.ejs',{error:null, success:null});
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
