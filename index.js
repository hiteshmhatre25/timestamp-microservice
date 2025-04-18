// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Home route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Hello API
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Timestamp API
app.get("/api/:date?", (req, res) => {
  const dateString = req.params.date;
  let date;

  if (!dateString) {
    // No date passed, use current date
    date = new Date();
  } else if (!isNaN(dateString)) {
    // If it's a number, treat as Unix timestamp (in milliseconds)
    date = new Date(parseInt(dateString));
  } else {
    // Otherwise, try to parse as a date string
    date = new Date(dateString);
  }

  // Handle invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
