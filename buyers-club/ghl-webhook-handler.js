// Webhook handler for Buyers Club form submissions
// Receives form data and creates contact in GHL with buyers-club tag

const GHL_API_KEY = process.env.GHL_API_KEY;
const LOCATION_ID = 'a0xDUfSzadt256BbUcgz';

async function createContact(formData) {
  const { firstName, lastName, email, phone } = formData;
  
  const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GHL_API_KEY}`,
      'Version': '2021-07-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      locationId: LOCATION_ID,
      firstName,
      lastName,
      email,
      phone,
      tags: ['buyers-club'],
      source: 'Buyers Club Website'
    })
  });
  
  return response.json();
}

// For Netlify Functions or similar serverless
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  try {
    const formData = JSON.parse(event.body);
    const result = await createContact(formData);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, contactId: result.contact?.id })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
