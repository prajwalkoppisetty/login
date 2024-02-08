const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;


// MongoDB connection
mongoose.connect('mongodb+srv://prajwalkoppisettyhp:JPo0bvGk034AyFvq@voltagevortex.w6a93av.mongodb.net/voltage', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  newUser.save()
    .then(() => res.status(200).send('User registered successfully'))
    .catch(err => res.status(500).send('Error registering user'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email, password }) // No callback function here
      .then(user => {
        if (!user) {
          res.status(401).send('Invalid credentials');
        } else {
          res.status(200).send('Login successful');
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  });
  