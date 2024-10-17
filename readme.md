# Node.js 99GAGS

A simple Node.js project that showcases a variety of gadgets using HTTP routing without any dependencies. This application serves as a demonstration of fundamental Node.js features and serves gadget data from a local JSON file.

## Features

- **Gadget Overview**: Displays a list of gadgets with images, descriptions, and ratings.
- **Gadget Details**: Provides detailed information about each gadget, including reviews and ratings.
- **Static Page Rendering**: Uses HTML templates for rendering the gadget overview and detail pages.
- **API Endpoint**: Serves gadget data in JSON format for external use.

## Technologies and node concept Used

- Node.js
- HTTP Module
- File System Module
- URL Module
- Template Rendering

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Anajafriday/NodeJS-99GAGS.git
   cd nodejs-99GAGS
   ```

2. Ensure you have Node.js installed.

3. Run the server:

   ```bash
   node server.js
   ```

4. Open your browser and navigate to `http://127.0.0.1:3000` to view the gadget overview.

## Structure

- **/final**: Contains the final code for this project
- **/template**: Contains HTML templates for gadget overview and detail pages.
- **/de-data**: Contains the `data.json` file with gadget information.
- **server.js**: Main file that sets up the HTTP server and routing.
