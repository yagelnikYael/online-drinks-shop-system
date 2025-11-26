const fs = require('fs');

function get(req, res) {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("שגיאה בקריאת קובץ המוצרים")
        } else {
            res.send(JSON.parse(data));
        }
    })
}
const path = require("path");

const filePath = path.join(__dirname, "../products.json");
function readProducts() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// פונקציה לשמור את המוצרים בקובץ
function saveProducts(products) {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
}
exports.getById = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("שגיאה בקריאת קובץ המוצרים")
        } else {
            let id = req.params.id;
            data = JSON.parse(data);
            let product = data.find(st => st.id == id)

            if (product == undefined) {
                res.status(404).send("מוצר לא נמצא עם מזהה: " + id);
            } else {
                res.send(product);
            }
        }
    })
}

exports.getByCategory = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("שגיאה בקריאת קובץ המוצרים")
        } else {
            let category = req.params.category;
            data = JSON.parse(data);
            let products = data.filter(product => product.name === category);

            if (products.length === 0) {
                res.status(404).send("לא נמצאו מוצרים בקטגוריה: " + category);
            } else {
                res.send(products);
            }
        }
    })
}

exports.post = (req, res) => {
  console.log("Received body:", req.body);

  fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading products.json:", err);
      return res.status(500).send("שגיאה בקריאת קובץ המוצרים");
    }

    try {
      let products = JSON.parse(data);
      const newProduct = req.body;

      if (!newProduct.name || !newProduct.description || !newProduct.imgUrl || !newProduct.price) {
        console.log("Missing fields in newProduct:", newProduct);
        return res.status(400).send("יש למלא את כל השדות: name, description, imgUrl, price");
      }

      const newId = products.length === 0 ? 1 : Math.max(...products.map(p => p.id)) + 1;
      newProduct.id = newId;

      products.push(newProduct);

      fs.writeFile("products.json", JSON.stringify(products, null, 2), (err) => {
        if (err) {
          console.error("Error writing products.json:", err);
          return res.status(500).send("שגיאה בכתיבה לקובץ");
        }
        res.status(201).json({ message: "המוצר נוסף בהצלחה", product: newProduct });
      });
    } catch (e) {
      console.error("Exception processing products.json:", e);
      res.status(500).send("שגיאה בעיבוד קובץ המוצרים");
    }
  });
};


exports.delete = (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile(filePath, (err, data) => {
        if (err) return res.status(500).send("שגיאה בקריאת הקובץ");

        let products = JSON.parse(data);
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return res.status(404).send("המוצר לא נמצא");

        products.splice(index, 1);

        fs.writeFile(filePath, JSON.stringify(products, null, 2), err => {
            if (err) return res.status(500).send("שגיאה בכתיבת הקובץ");
            res.send("המוצר נמחק בהצלחה");
        });
    });
};
exports.update = (req, res) => {    
    const productId = parseInt(req.params.id);
    const { description, price } = req.body;

    try {
        const products = readProducts();

        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // לא מעדכנים את השם, רק תיאור ומחיר
        products[productIndex].description = description ?? products[productIndex].description;
        products[productIndex].price = price ?? products[productIndex].price;

        saveProducts(products);

        res.json(products[productIndex]);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.get = get;
