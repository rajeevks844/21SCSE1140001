import axios from 'axios';

const getAuthToken = async () => {
  try {
    const response = await axios.post('http://20.244.56.144/test/auth', {
      companyName: 'Rajeev Kumar',
      clientID: 'ca6bd39a-5a8e-422e-b19d-39d6186a97e6',  
      clientSecret: 'shIEtZUtVoZaMRZW',  
      ownerName: 'Rajeev Kumar',
      ownerEmail: 'rajeev.21scse1140001@galgotiasuniversity.edu.in',
      rollNo: '21131140021'
    });
    console.log('Token:', response.data);
  } catch (error) {
    if (error.response) {
            console.error('Error getting token:', error.response.data);
    } else if (error.request) {
            console.error('No response received:', error.request);
    } else {
            console.error('Error in setting up the request:', error.message);
    }
  }
};

getAuthToken();
