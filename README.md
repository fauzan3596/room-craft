# ![RoomCraft](https://github.com/fauzan3596/room-craft/blob/main/public/screenshot/home.png)
# RoomCraft
<table>
<tr>
<td>
  RoomCraft is an innovative platform that simplifies room planning and interior design in a 3D environment. With interactive features like furniture selection, position adjustments, and real-time design visualization, users can effortlessly create their dream spaces without needing professional design skills. Built as a web-based application using React, Tailwind CSS, Redux, and React Three Fiber, RoomCraft delivers a responsive and intuitive design experience. Integrated with Firebase for authentication and data storage, this platform is designed to be easily accessible to all users.
</td>
</tr>
</table>


## Demo
Here is a working live demo :  https://room-craft-three.vercel.app/


## Site

### Login/Register Page
![](https://github.com/fauzan3596/room-craft/blob/main/public/screenshot/login.png)
![](https://github.com/fauzan3596/room-craft/blob/main/public/screenshot/register.png)

### Landing Page
![](https://github.com/fauzan3596/room-craft/blob/main/public/screenshot/home.png)
![](https://github.com/fauzan3596/room-craft/blob/main/public/screenshot/home2.png)
![](https://github.com/fauzan3596/room-craft/blob/main/public/screenshot/home3.png)

### Furniture Page
![](https://github.com/fauzan3596/room-craft/blob/main/public/screenshot/furniture.png)

### Detail Furniture Page
![](https://github.com/fauzan3596/room-craft/blob/main/public/screenshot/detail.png)

### Favorite Furniture Page
![](https://github.com/fauzan3596/room-craft/blob/main/public/screenshot/favorite-furniture.png)

### Rooms Page
![](https://github.com/fauzan3596/room-craft/blob/main/public/screenshot/room.png)

### Add Room Page
![](https://github.com/fauzan3596/room-craft/blob/main/public/screenshot/add-room.png)


### Detail Room Page
![](https://github.com/fauzan3596/room-craft/blob/main/public/screenshot/add-furniture.png)
![](https://github.com/fauzan3596/room-craft/blob/main/public/screenshot/room-design.png)




## [Features](https://room-craft-three.vercel.app/) 

A few of the things you can do with RoomCraft:

### 3D Furniture & Showcase Management
- **View 3D Furniture Showcase:** Browse a collection of 3D-modeled furniture with interactive previews.
- **3D Furniture Details:** View complete details of each 3D furniture item, including dimensions, materials, price, and 360-degree rotation.

### 3D Room Management
- **View & Use 3D Room Templates:** Select and apply pre-designed 3D room templates.
- **Add New 3D Room:** Create a fully customizable 3D room from scratch or based on a template.
- **View 3D Room List:** Access and manage all user-created 3D rooms.
- **Edit 3D Room:** Modify the 3D room’s name, theme, dimensions, and layout.

### 3D Furniture & Room Customization
- **Add 3D Furniture to Room:** Place 3D-modeled furniture into a room dynamically.
- **Adjust 3D Furniture Position & Rotation:** Move, rotate, and scale furniture in a 3D environment.
- **Delete 3D Furniture from Room:** Remove unnecessary 3D furniture from a room.
- **Save 3D Room Updates:** Save all changes and customizations made to a room.

### User Interaction
- **Add 3D Furniture to Favorites:** Save favorite 3D furniture items for quick access and future use.
- **Export 3D Room as PNG:** Capture and export a high-quality image of the designed 3D room for sharing or presentation.


## Tech Stack

### Front End
- **Framework:** Vite + React 18 (for fast and optimized development)
- **Styling:** Tailwind CSS & daisyUI (for fast and responsive UI design)
- **3D Rendering:** Tailwind CSS + DaisyUI (for responsive and customizable UI components)

### 3D Rendering & Graphics
- **Three.js** (core library for 3D rendering)
- **React Three Fiber** (React wrapper for Three.js)
- **@react-three/drei** (helpers and utilities for Three.js)

### Back End
- **Cloud Firestore** (for real-time database and cloud storage)
- **Firebase Authentication** (for user authentication and security)

### State Management
- **Redux Toolkit** (for managing global state efficiently)

### Data Fetching & Caching
- **TanStack React Query** (for optimized server-state management and caching)

### Media & Image Handling
- **Cloudinary** (for storing and optimizing images and 3D assets)

### Routing & Navigation
- **React Router Dom** (for client-side navigation and routing)

### Utilities & Other Libraries
- **uuid** (for generating unique identifiers)
- **dotenv** (for environment variable management)
- **SweetAlert2** (for beautiful alert pop-ups)
- **Lucide React** (for modern icons)
- **FontAwesome** (for additional icons)
- **React Paginate** (for pagination functionality)


## Installation Proccess

1. **Clone the repository**:

   ```bash
   git clone https://github.com/fauzan3596/room-craft.git
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **SDK setup and configuration**:

   - Create a new Firebase project
   - Connect your Firebase project to your web app to get the Firebase SDK
   - Create a .env file in your root directory project
   - Copy your Firebase SDK to your .evn file with format just like in the .env.example file:
   - Add your .evn to .gitignore to avoid committing sensitive keys
   <br>
   
   ```bash
   VITE_FIREBASE_APIKEY="your_api_key"
   VITE_FIREBASE_AUTHDOMAIN="your_authdomain"
   VITE_FIREBASE_PROJECTID="your_projectid"
   VITE_FIREBASE_STORAGEBUCKET="your_storagebucket"
   VITE_FIREBASE_MESSAGINGSENDERID="your_messagingsenderid"
   VITE_FIREBASE_APPID="your_appid"
   ```

4. **Add sign-in method**:

   - In your Firebase dashboard, navigate to Build > Authentication
   - In sign-in method tab, add new provider by enabling the email/password and google sign-in providers

5. **Create your own database**:

   - In your Firebase dashboard, navigate to Build > Firestore Database
   - Click create database then choose the location based on your nearest location
   - Choose the appropriate security rules (e.g., Test mode for development)

6. **Run the application**:
   ```bash
   npm run dev
   # View your application in your localhost http://localhost:YOUR_PORT_NUMBER
   ```


## Team

[![Muhammad Fauzan Ramadhan](https://github.com/fauzan3596/room-craft/blob/main/public/screenshot/photo.png)](https://github.com/fauzan3596)  | [![Adnan Yazid Ardiansyah](https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg)](https://github.com/adnanyazidar) | [![Kivlan Izzudin Subagyo](https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg)](https://github.com/Kivlanizzu)
---|---
[Muhammad Fauzan Ramadhan](https://github.com/fauzan3596@gmail.com) |[Adnan Yazid Ardiansyah](https://github.com/adnanyazidar) |[Kivlan Izzudin Subagyo](https://github.com/Kivlanizzu)

## [License](https://github.com/iharsh234/WebApp/blob/master/LICENSE.md)

MIT © [Muhammad Fauzan Ramadhan ](https://github.com/fauzan3596)

