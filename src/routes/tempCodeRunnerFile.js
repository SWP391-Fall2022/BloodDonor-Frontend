//Loading the crypto module in node.js
var crypto = require('crypto');
//creating hash object 
var hash = crypto.createHash('sha1');
//passing the data to be hashed
data = hash.update('eager=w_400,h_300,c_pad|w_260,h_200,c_crop&public_id=sample_image&timestamp=1315060510abcd', 'utf-8');
//Creating the hash in the required format
gen_hash = data.digest('hex');
//Printing the output on the console
console.log("hash : " + gen_hash);