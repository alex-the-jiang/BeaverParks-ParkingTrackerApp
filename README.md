# BeaverParks

BeaverParks is a campus parking tracker built during BeaverHacks 2026. The app helps Oregon State University students, commuters, visitors, and event attendees find available parking near Reser Stadium without wasting time driving between lots.

Finding parking on campus can be frustrating, especially during busy class hours, events, and game days. BeaverParks gives users a clearer view of parking availability by showing lot information, availability counts, map-based parking areas, and interactive spot status updates.

## Features

- View parking lots around the Reser Stadium area
- Search for parking lots by name or region
- Filter lots by parking type, location, and capacity
- Sort parking lots by capacity or name
- View open and occupied spot counts for each lot
- See lot status badges such as Plenty, Limited, Almost Full, Full, or Unknown
- View a selected lot on an interactive Leaflet map
- Display parking sections and spot availability visually
- Toggle parking spots between available and taken for demo/testing purposes
- View a lot summary panel with available spots, taken spots, total spots, occupancy percentage, and last updated time
- Supabase integration for storing parking locations, sections, and spot data
- Responsive dashboard layout for easier viewing on different screen sizes

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Leaflet / React Leaflet
- Supabase
- OpenStreetMap tiles

## Project Structure

    src/
      assets/
      components/
        DemoInstructions.jsx
        FilterPanel.jsx
        Footer.jsx
        Header.jsx
        LotCard.jsx
        LotList.jsx
        LotSummaryPanel.jsx
        MapPlaceholder.jsx
        SpotCard.jsx
        SpotGrid.jsx
      App.jsx
      App.css
      database.js
      index.css
      main.jsx
      ParkingMap.jsx

## How It Works

BeaverParks uses Supabase to store parking-related data. The main database tables include parking locations, parking sections, and parking spots. The React frontend fetches this data and displays it in a dashboard.

Users can browse available parking lots, apply filters, and click into a specific lot. Once a lot is selected, the app shows a map view and a summary of the lot’s current availability. Parking spots are represented as available or taken, allowing the prototype to simulate real-time parking updates.

For the hackathon prototype, the app focuses mainly on the Reser Stadium area. Future versions could expand to more OSU parking lots and connect to real sensors, cameras, or official transportation data.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### Installation

Clone the repository:

    git clone https://github.com/alex-the-jiang/BeaverParks-ParkingTrackerApp.git

Go into the project folder:

    cd BeaverParks-ParkingTrackerApp

Install dependencies:

    npm install

Create a local environment file named:

    .env.local

Add your Supabase environment variables:

    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key

Start the development server:

    npm run dev

Open the app in your browser:

    http://localhost:5173/

## Supabase Setup

The project expects Supabase tables for parking locations, sections, and spots.

Expected data includes:

### locations

- `id`
- `name`
- `type`
- `region`
- `pos`

### sections

- `id`
- `location`
- `pos`

### spots

- `id`
- `section`
- `filled`
- `last_modified`
- `ada`
- `position`

The frontend uses this data to calculate lot size, availability, and occupancy.

## Demo Flow

A typical demo flow:

1. Open the BeaverParks dashboard.
2. Search or filter for a parking lot.
3. Click a lot card to open the detail view.
4. View the selected lot on the Leaflet map.
5. Check the summary panel for available, taken, and total spots.
6. Click or interact with spots to simulate availability changes.
7. Return to the dashboard to compare lots.

## Future Improvements

- Expand coverage to more OSU parking lots
- Add real-time data from physical sensors or cameras
- Add Gemini-powered parking recommendations
- Add directions from the user’s current location to the selected lot
- Add permit-specific recommendations
- Add event mode for game days and large campus events
- Add accessibility-focused parking filters
- Improve mobile layout and navigation

## Team

Built for BeaverHacks 2026 by the BeaverParks team.

Team members:

- Leonidas Sallos
- Benjamin Patterson
- Alexander Jiang
- Haddy Alnasser

## License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this project as long as the original license and copyright notice are included.

See the `LICENSE` file for more details.