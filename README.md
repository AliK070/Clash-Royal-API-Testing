# Clash Royale Stats App

## Overview
The Clash Royale Stats App is a React-based web application designed to provide detailed statistics and information about players in Clash Royale. 
Users can search for players by their unique tag, view their stats, favorite cards, primary deck, upcoming chests, and recent battles. 
The app also displays a grid of all cards available to the player.

## Features
- Player Search: Search for Clash Royale players using their unique tag.
- Player Details: View detailed stats such as trophies, wins, losses, battle count, clan information, favorite card, and primary deck.
- Card Grid: Display all cards available to the player in a modern, responsive layout.
- Upcoming Chests: View the next chests the player will unlock.
- Recent Battles: See the results of the player's recent battles.

## The Tech Stack 

- React and React Router (Frontend framework + handling navigation between pages).
- Axios (Making API requests to the backend).
- Boostrap and CSS for responsive and modren styling.
- Node.js backend.

## Installation and Setup

### Prerequisites
- Node.js: Ensure you have Node.js installed on your system. You can download it from Node.js Official Website.
- npm or yarn: Package manager for installing dependencies.

### Steps to Run the App:

1) Clone the Repository:
``` GIT
git clone https://github.com/AliK070/clash-royale-stats-app.git
cd clash-royale-stats-app
```
2) Install Dependencies:

```git
npm install
```

3) Run the following command to install all required dependencies:

4) Start the Backend Server: Ensure the backend server is running locally on http://localhost:3001. The backend should provide endpoints for player stats, battles, cards, and chests.

5) Start the Frontend: Run the following command to start the React development server:

```git
npm start
```

6) Access the App: Open your browser and navigate to:

```git
http://localhost:3000
```

7) Remember to run the backend with node

```git
node server.mjs
```

## Using the app: 

To use the app, you would click on the field that asks for the player tag. From there simply enter the player tag and click the Search button. You wll be led to where the users stats are and you can view details suchas their cards, to upcoming chests, to recent battles.

Also I hosted the frontend, you'll get to see it in its action and looks, but I have not hosted the backend yet. (Deployment is still broken will fix soon!)

Heres a demo once you got it running:
[video link](https://github.com/user-attachments/assets/d173f698-a0d3-4efa-978d-7c92da556a72)


