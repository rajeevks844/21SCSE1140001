import express from 'express';
import axios from 'axios';
import fs from 'fs/promises';

const app = express();
const port = 9876;
const windowSize = 10;
const windowState = [];

const calculateAverage = (numbers) => {
  const sum = numbers.reduce((a, b) => a + b, 0);
  return (sum / numbers.length).toFixed(2);
};

const getToken = async () => {
  const config = await fs.readFile('./config.json', 'utf-8');
  return JSON.parse(config).accessToken;
};

app.get('/numbers/:type', async (req, res) => {
  const type = req.params.type;
  const validTypes = ['p', 'f', 'e', 'r'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid type' });
  }

  let url;
  switch (type) {
    case 'p':
      url = 'http://20.244.56.144/test/primes';
      break;
    case 'f':
      url = 'http://20.244.56.144/test/fibo';
      break;
    case 'e':
      url = 'http://20.244.56.144/test/even';
      break;
    case 'r':
      url = 'http://20.244.56.144/test/rand';
      break;
  }

  try {
    const token = await getToken();
    const startTime = Date.now();
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 500
    });
    const responseTime = Date.now() - startTime;

    if (responseTime > 500) {
      return res.status(504).json({ error: 'Server response time exceeded 500 ms' });
    }

    const numbers = response.data.numbers;
    const windowPrevState = [...windowState];

    numbers.forEach((num) => {
      if (!windowState.includes(num)) {
        windowState.push(num);
      }
    });

    if (windowState.length > windowSize) {
      windowState.splice(0, windowState.length - windowSize);
    }

    const avg = calculateAverage(windowState);

    res.json({
      numbers,
      windowPrevState,
      windowCurrState: windowState,
      avg
    });
  } catch (error) {
    console.error('Error fetching numbers:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error fetching numbers' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
