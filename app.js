const express = require("express")
const axios = require("axios")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5000

const corsOptions = {
  origin: "*", // This allows all origins
  methods: ["GET", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(cors(corsOptions))
app.use(express.json())


function isPrime(num) {
  if (num <= 1) return false
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false
  }
  return true
}

function isPerfect(num) {
  let sum = 1
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      sum += i
      if (i !== num / i) sum += num / i
    }
  }
  return sum === num && num !== 1 || Math.sqrt(num) % 1 === 0
}

function isArmstrong(num) {
  if (num < 0) {
    return false;
  }

  const digits = num.toString().split("").map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);

  return sum === num;
}

function digitSum(num) {
  return Math.sign(num) * num.toString().replace("-", "").split("").reduce((acc, digit) => acc + Number.parseInt(digit), 0);
}

app.get("/api/classify-number", async (req, res) => {
  const numberParam = req.query.number

  if (!numberParam) {
    return res.status(400).json({number: null, error: true})
  }

  const number = Number.parseInt(numberParam)

  if (isNaN(number)) {
    return res.status(400).json({ number:numberParam, error: true })
  }

  const properties = []
  // if (isPrime(number)) properties.push("prime")
  // if (isPerfect(number)) properties.push("perfect")
  if (isArmstrong(number)) properties.push("armstrong")
  if (number % 2 === 0) properties.push("even")
  else properties.push("odd")

  try {
    const funFactResponse = await axios.get(`http://numbersapi.com/${number}/math`)
    const funFact = funFactResponse.data

    const response = {
      number,
      is_prime: isPrime(number),
      is_perfect: isPerfect(number),
      properties,
      digit_sum: digitSum(number),
      fun_fact: funFact,
    }

    res.json(response)
  } catch (error) {
    console.error("Error fetching fun fact:", error)
    res.status(500).json({ error: "Failed to fetch fun fact" })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

