const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;




function fibonacci(n) {
  let a = 0, b = 1;
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(a);
    [a, b] = [b, a + b];
  }
  return result;
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function hcf(arr) {
  return arr.reduce((a, b) => gcd(a, b));
}

function lcm(arr) {
  return arr.reduce((a, b) => (a * b) / gcd(a, b));
}


app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: "lavisha0809.be23@chitkara.edu.in"
  });
});


app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;
    let data;

    if ("fibonacci" in body) {
      data = fibonacci(body.fibonacci);
    }
    else if ("prime" in body) {
      data = body.prime.filter(isPrime);
    }
    else if ("lcm" in body) {
      data = lcm(body.lcm);
    }
    else if ("hcf" in body) {
      data = hcf(body.hcf);
    }
    else {
      throw "Invalid key";
    }

    res.status(200).json({
      is_success: true,
      official_email: "your_email@chitkara.edu.in",
      data: data
    });

  } catch (err) {
    res.status(400).json({
      is_success: false,
      error: err
    });
  }
});


app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
