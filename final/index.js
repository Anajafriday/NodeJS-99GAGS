// Import required modules
const fs = require("fs"); // File system module to read and write files
const http = require("http"); // HTTP module to create a web server
const urlParam = require("url"); // URL module to parse request URLs
const replaceHtmlTemplate = require("./modules"); // Custom module to replace placeholders in HTML templates

// Read HTML template files
const gadgetOverViewTemp = fs.readFileSync(
  `${__dirname}/template/gadget-overview.html`, // Path to the overview template
  "utf-8" // Encoding type
);

const gadgetCardTemp = fs.readFileSync(
  `${__dirname}/template/gadget-card.html`, // Path to the individual gadget card template
  "utf-8"
);

const gadgetDetailTemp = fs.readFileSync(
  `${__dirname}/template/gadget-detail.html`, // Path to the gadget detail template
  "utf-8"
);

const gadgetReviewTemp = fs.readFileSync(
  `${__dirname}/template/gadget-review.html`, // Path to the review section template
  "utf-8"
);
const pagenotfoundTemp = fs.readFileSync(
  `${__dirname}/template/404.html`, // Path to the review section template
  "utf-8"
);
const invalidIdTemp = fs.readFileSync(
  `${__dirname}/template/invalid-id.html`, // Path to the review section template
  "utf-8"
);

// Read and parse JSON data (API response data)
const data = fs.readFileSync(`${__dirname}/de-data/data.json`, "utf-8"); // Read the gadget data from a JSON file
const dataObj = JSON.parse(data); // Parse JSON data into a JavaScript object

// Create the server
const server = http.createServer((req, res) => {
  const { pathname, query } = urlParam.parse(req.url); // Parse the URL to get the pathname and query parameters

  // Route for the gadget overview page (Home Page)
  if (pathname === "/" || pathname === "/gadget-overview") {
    // Map over the data and pick specific fields to display on the overview page
    const neededData = dataObj.map((data) => {
      return {
        id: data.id,
        name: data.name,
        image: data.image,
        description: data.description,
        rating: data.rating,
      };
    });

    // Replace placeholders in the card template with actual gadget data
    const outPut = neededData
      .map((el) => replaceHtmlTemplate(el, gadgetCardTemp)) // Replace placeholders in the card template
      .join(""); // Join all the cards into one string

    // Insert all gadget cards into the overview page template
    const gadgetOverview = gadgetOverViewTemp.replace("{~GAGDGETS~}", outPut);

    // Send the response with the gadget overview page
    res.writeHead(200, {
      "content-type": "text/html", // Response is an HTML page
    });
    res.end(gadgetOverview); // End the response with the overview HTML

    // Route for gadget detail page
  } else if (pathname === "/gadget-detail" || query) {
    const id = query.split("=")[1] * 1; // Extract the gadget ID from the query string and convert it to a number
    const gadgetData = dataObj.find((el) => el.id === id); // Find the gadget with the matching ID in the data

    // Set the response header
    res.writeHead(200, {
      "content-type": "text/html", // Response is an HTML page
    });

    // If no gadget with the given ID is found, return an error message
    if (!gadgetData) return res.end(invalidIdTemp);

    // Generate the reviews section for the gadget
    const reviewOutput = gadgetData.reviews
      .map((el) => replaceHtmlTemplate(el, gadgetReviewTemp)) // Replace placeholders in the review template
      .join(""); // Join all reviews into one string

    // Replace placeholders in the gadget detail template with actual gadget data
    const outPut = replaceHtmlTemplate(gadgetData, gadgetDetailTemp);

    // Insert the reviews into the gadget detail page
    const finalOutPut = outPut.replace("{~REVIEWS~}", reviewOutput);

    // Send the response with the gadget detail page
    res.end(finalOutPut);

    // Route for the API
  } else if (pathname === "/api") {
    // Send the raw JSON data as an API response
    res.writeHead(200, {
      "content-type": "application/json", // Response is JSON
    });
    res.end(data); // Send the gadget data

    // Handle 404 (Page not found)
  } else {
    // Send a 404 response if the page is not found
    res.writeHead(404, {
      "content-type": "text/html", // Response is an HTML page
    });
    res.end(pagenotfoundTemp); // Send a simple 404 page
  }
});

// Start the server and listen on port 3000
server.listen("3000", "127.0.0.1", () => {
  console.log("server is running...."); // Log a message when the server starts
});
