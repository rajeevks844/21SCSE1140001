const axios = require('axios');

const register = async () => {
  try {
    const response = await axios.post('http://20.244.56.144/test/register', {
      companyName: 'Rajeev Kumar',
      ownerName: 'Rajeev kumar',
      rollNo: '21131012509',
      ownerEmail: 'rajeev.21scse1140001@galgotiasuniversity.edu.in',
      accessCode: 'TMaXNS'
    });
    console.log('Registration successful:', response.data);
  } catch (error) {
    console.error('Error registering:', error.response.data);
  }
};

register();
