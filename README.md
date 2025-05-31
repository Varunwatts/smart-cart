# 🛒 Smart Cart Chrome Extension

Smart Cart is a Chrome extension that allows users to track shopping items from any website. It stores the item's URL and price in a cart. Once the total exceeds a user-defined threshold, it notifies the user visually and sends an email alert.

---

## 🚀 Features

- ➕ Add current webpage item to cart with price
- 💰 Set a spending threshold
- 🧮 Automatically calculates total cost
- 🔔 Displays "Limit Exceeded" warning when threshold is crossed
- 📤 Sends email alert using EmailJS
- 🧹 Clear cart button to reset items

---

## 🗂️ Folder Structure

smart-cart/
│
├── manifest.json
├── popup.html
├── popup.js
├── email.js
├── styles.css
└── README.md

---

## 🛠️ Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/smart-cart.git
   cd smart-cart

2. **Load the Extension in Chrome**

->Go to chrome://extensions/
->Enable Developer mode
->Click Load unpacked
->Select the smart-cart project folder

3. **Setup EmailJS**

->Go to https://www.emailjs.com
->Create a service (e.g., Gmail)
->Create an email template with variables like:
                    *item_list
                    *total_amount
->Get your:
            *User ID
            *Service ID
            *Template ID

->Add them to email.js:
                      emailjs.init("YOUR_USER_ID");
                      const serviceID = "YOUR_SERVICE_ID";
                      const templateID = "YOUR_TEMPLATE_ID";
                      
---


##  🧪 Example Email Template (EmailJS) ##
->Subject: 💸 Spending Limit Reached

->Body:
          Your Smart Cart has exceeded the set threshold.
                Cart Items:
                {{item_list}}
                Total: ₹{{total_amount}}

