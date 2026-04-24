>💸Expense Splitter 

A full-stack web application that helps groups of people track shared expenses and calculate who owes whom. 

Live Demo: expense-splitter-pi-five.vercel.app

----------------------------------------------------------------------------
##📸Screenshots 

Login Page | Dashboard | Group Detail 

----------------------------------------------------------------------------

##Features User ✨

🔐Authentication — Secure register & login with JWT tokens 
👥Group Management — Create groups and add members 
💰Expense Tracking — Add expenses and split them equally 
📊Balance Calculator — See who owes who at a glance 
📱Responsive Design — Works on mobile and desktop 

----------------------------------------------------------------------------

##Tech Stack🛠️

###Frontend: 
-React.js + Vite 
-Tailwind CSS 
-React Router DOM Axios 


###Backend: 
-Node.js + Express.js
-MongoDB + Mongoose 
-JWT Authentication 
-Socket.io (real-time updates) 
-bcryptjs (password hashing) 


###Deployment: 
-Frontend → Vercel 
-Backend → Railway 
-Database → MongoDB (local/Atlas) 

----------------------------------------------------------------------------

##Getting Started 🚀

###Prerequisites 
-Node.js v20+ 
-MongoDB installed locally 


###Installation 

1. Clone the repository git clone https://github.com/aniket-pr7707/Expense-Splitter.git cd Expense-Splitter 
2. Setup Backend cd server npm install 
3. Create .env file in server/ MONGO_URI=mongodb://localhost:27017/expense-splitter JWT_SECRET=your_secret_key PORT=5000 
4. Start MongoDB servicenet start MongoDB 
5. Run Backend npm run dev 
6. Setup Frontend cd ../client npm install npm run dev 
7. Open your browser http://localhost:5173 

----------------------------------------------------------------------------

##Project Structure 📂

expense-splitter/ 
├── client/                 # React frontend 
│   ├── src/  
│   │   ├── api/            # Axios config 
│   │   ├── pages/          # Login, Register, Dashboard, GroupDetail 
│   │   └── components/     # Reusable components 
├── server/                 # Node.js backend 
│   ├── controllers/        # Business logic
│   ├── middleware/         # JWT auth middleware 
│   ├── models/             # MongoDB models 
│   └── routes/             # API routes 

----------------------------------------------------------------------------

##API Endpoints 🔌

Method        Endpoint                             Description 
POST          /api/auth/register                   Register new user 
POST          /api/auth/login                      Login user 
GET           /api/groups                          Get all groups 
POST          /api/groups                          Create new group 
POST          /api/groups/:id/members              Add member to group 
GET           /api/expenses/:groupId               Get group expenses 
POST          /api/expenses                        Add new expense 
GET           /api/expenses/:groupId/balances      Get balances 


----------------------------------------------------------------------------

##Author 👨‍💻
Aniket Pratap Singh 
GitHub: @aniket-pr7707 


License This project is open source and available under the MIT License.