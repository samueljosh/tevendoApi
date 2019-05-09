const client = algoliasearch('d6a5e54fc1d1541b6c15a2a2fe1a32ee','')
const index = client.initIndex('your_index_name');


const index = client.initIndex('contacts');
const contactsJSON = require('./contacts.json');

index.addObjects(contactsJSON, (err, content) => {
  if (err) {
    console.error(err);
  }
});


//Search-Only API Key
//  d6a5e54fc1d1541b6c15a2a2fe1a32ee

 //Monitoring API Key

 // Search for a first name
index.search('jimmie', (err, { hits } = {}) => {
    console.log(hits);
  });
  
  // Search for a first name with typo
  index.search('jimie', (err, { hits } = {}) => {
    console.log(hits);
  });
  
  // Search for a company
  index.search('california paint', (err, { hits } = {}) => {
    console.log(hits);
  });
  
  // Search for a first name and a company
  index.search('jimmie paint', (err, { hits } = {}) => {
    console.log(hits);
  });