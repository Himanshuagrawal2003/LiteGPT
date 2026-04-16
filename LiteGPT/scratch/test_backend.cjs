const axios = require('axios');

async function test() {
  try {
    const response = await axios.post('http://localhost:3001/api/generate', {
      prompt: 'Hello'
    });
    console.log('Success:', response.data);
  } catch (error) {
    if (error.response) {
      console.log('Error Status:', error.response.status);
      console.log('Error Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error:', error.message);
    }
  }
}

test();
