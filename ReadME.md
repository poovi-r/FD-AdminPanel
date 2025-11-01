# 🍔 Food Delivery Admin Panel

A **MERN Stack Admin Panel** built for managing users, categories, products, and orders for a food delivery platform.  
This project includes **JWT authentication**, **MongoDB data handling**, and a **modern React dashboard UI** inspired by Figma design.

---

## 🚀 Features

### 🔐 Authentication
- Admin login using JWT tokens  
- Protected routes with role-based access  

### 👥 User Management
- View all users with pagination  
- Update and delete users  

### 🗂️ Category Management
- Create, update, and delete categories  
- View category list in a data table  

### 🍕 Product Management
- Add, edit, and delete products  
- Manage product details, price, and category relations  

### 📦 Orders Management
- Display all orders with user and product references  
- Track status updates (`Pending`, `Confirmed`, `Delivered`, `Cancelled`)

### 📊 Dashboard
- Display summary cards: total users, products, orders, and revenue  
- Visualize key statistics with charts (coming soon)

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- Tailwind CSS / Custom CSS
- React Icons

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing
- dotenv for environment variables
- CORS

---

## ⚙️ Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/poovi-r/FD-AdminPanel.git
cd FD-AdminPanel
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
Create a .env file in the backend folder:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_CODE=youradmincode
Run the backend:

bash
Copy code
npm start
Backend will run at http://localhost:5000

3️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
Frontend will run at http://localhost:5173

🧩 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login and get JWT token
GET	/api/users	Get all users
POST	/api/categories	Add category
GET	/api/categories	Get categories
POST	/api/products	Add new product
GET	/api/products	Get all products
GET	/api/orders	Get all orders

🧠 Future Enhancements
📈 Dashboard charts (Revenue, Orders, Top Products)

🖼️ Image upload with Cloudinary

🔔 Real-time order updates with Socket.io

🌐 Deployment (Render)

👨‍💻 Author
Poovarasan R
📧 poovarasan.mern@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/poovi-r
 • GitHub: https://github.com/poovi-r

“Built with ❤️ using the MERN Stack”
