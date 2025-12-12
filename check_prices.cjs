const axios = require('axios');

async function checkMenu() {
  try {
    const response = await axios.get('https://tlgeema.com/api/menu');
    const data = response.data;
    
    // data seems to be { categories: [...] } based on the structure, or maybe an array of categories directly.
    // The previous output showed `{"categories":[{"id":1,"name":"...` so it's an object with categories.
    
    const categories = data.categories || [];
    let missingPriceCount = 0;
    
    categories.forEach(category => {
      category.items.forEach(item => {
        if (!('price' in item)) {
            console.log(`Missing price for item: ${item.name}`);
        } else if (item.price === null || item.price === "") {
             console.log(`Empty or null price for item: ${item.name}`);
        }
        
        if (!item.options) {
            // console.log(`Item has no options: ${item.name}`); // This is likely valid
        } else {
          item.options.forEach(option => {
            if (!option.values) {
               console.log(`Option has no values: ${option.name} in item: ${item.name}`);
            } else {
              option.values.forEach(value => {
                if (!('price' in value)) {
                  console.log(`Missing price key for option value: ${value.name} (ID: ${value.id}) in item: ${item.name}`);
                  missingPriceCount++;
                }
                
                // Check consistency of keys
                 const keys = Object.keys(value).sort().join(',');
                 if (!keys.includes('price')) {
                     console.log(`Keys for value ${value.name}: ${keys}`);
                 }
                 
                 if (value.price === null) {
                     console.log(`Price is null for ${value.name}`);
                 }
                 
                 if (typeof value.price !== 'number') {
                      console.log(`Price is not a number for ${value.name}: ${value.price} (Type: ${typeof value.price})`);
                  }
                  
                  if (value.price > 0) {
                       console.log(`Found non-zero price for option ${value.name}: ${value.price}`);
                   }
                });
            }
          });
        }
      });
    });

    if (missingPriceCount === 0) {
        console.log("No missing price fields found in option values.");
    }
    
    // Dump full JSON to file for inspection
    const fs = require('fs');
    fs.writeFileSync('menu_dump.json', JSON.stringify(data, null, 2));
    console.log("Dumped menu to menu_dump.json");

  } catch (error) {
    console.error('Error fetching menu:', error.message);
  }
}

checkMenu();
