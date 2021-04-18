// use day.js for date formatting (basically a minified version of moments.js)
const dayjs = require('dayjs');


module.exports = () => {
    const dateObj = new Date()
    const newDate = dayjs(dateObj).format('MMMM D, YYYY h:mm A');

    return newDate;
  };
  




  

  
