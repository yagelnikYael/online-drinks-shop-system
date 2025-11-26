const fs = require('fs');

function get(req, res) {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            // שגיאת קריאת קובץ - שגיאת שרת פנימית
            return res.status(500).json({ message: "שגיאה בקריאת קובץ המשתמשים." });
        } else {
            res.status(200).json(JSON.parse(data)); // החזרת 200 OK והנתונים
        }
    });
}

exports.getById = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            // שגיאת קריאת קובץ - שגיאת שרת פנימית
            return res.status(500).json({ message: "שגיאה בקריאת קובץ המשתמשים." });
        } else {
            let id = req.params.id;
            data = JSON.parse(data);
            let user = data.find(st => st.id == id);

            if (user === undefined) { // שימוש ב-=== לבדיקה מדויקת, ושליחת 404
                res.status(404).json({ message: "משתמש לא נמצא עם המזהה " + id });
            } else {
                res.status(200).json(user); // החזרת 200 OK והמשתמש
            }
        }
    });
};

exports.login = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            // שגיאת קריאת קובץ - שגיאת שרת פנימית
            return res.status(500).json({ message: "שגיאה בקריאת קובץ המשתמשים." });
        } else {
            const { username, password } = req.body; // קבלת שם משתמש וסיסמה מהבקשה
            const users = JSON.parse(data);

            // בדיקת קיום שדות חובה בבקשה
            if (!username || !password) {
                return res.status(400).json({ message: "שם משתמש וסיסמה הם שדות חובה." });
            }

            // חיפוש משתמש לפי שם משתמש וסיסמה יחד
            // חשוב: אם היית משתמש בגיבוב סיסמאות (bcrypt), היית צריך להשוות את הסיסמה המגובבת כאן.
            // כרגע זה משווה טקסט רגיל.
            const currentUser = users.find(u => u.username === username && u.password === password);

            if (!currentUser) { // אם לא נמצא משתמש או שהסיסמה לא תואמת
                // 401 Unauthorized - פרטי התחברות שגויים
                return res.status(401).json({ message: "שם משתמש או סיסמה שגויים." });
            } else {
                // אם נמצא משתמש, החזר את פרטי המשתמש (ללא סיסמה אם אפשר)
                const { password, ...userWithoutPassword } = currentUser; // מסיר את שדה הסיסמה מהאובייקט לפני שליחתו
                res.status(200).json(userWithoutPassword); // 200 OK - התחברות מוצלחת
            }
        }
    });
};

exports.post = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            // שגיאת קריאת קובץ - שגיאת שרת פנימית
            return res.status(500).json({ message: "שגיאה בקריאת קובץ המשתמשים." });
        }
        
        let users = JSON.parse(data);
        console.log("register request:", req.body);

        // בדיקת קיום שדות חובה בבקשה
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: "שם משתמש וסיסמה הם שדות חובה." });
        }

        // בדיקה אם המשתמש כבר קיים (ללא רווחים, לא תלוי אותיות גדולות/קטנות)
        const newUsername = (req.body.username || "").trim().toLowerCase();
        const exists = users.find(u => (u.username || "").trim().toLowerCase() === newUsername);
        if (exists) {
            // 409 Conflict - משתמש כבר קיים
            return res.status(409).json({ message: "שם משתמש זה כבר קיים. אנא בחר שם אחר." });
        }

        // יצירת ID חדש למשתמש
        req.body.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        users.push(req.body);

        fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if (err) {
                // שגיאת כתיבת קובץ - שגיאת שרת פנימית
                return res.status(500).json({ message: "שגיאה בשמירת פרטי המשתמש." });
            } else {
                // 201 Created - משתמש נרשם בהצלחה
                res.status(201).json({ message: "נרשמת בהצלחה! כעת תוכל/י להתחבר." });
            }
        });
    });
};

exports.get = get;