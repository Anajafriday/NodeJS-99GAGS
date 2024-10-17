// Export a function that takes data and an HTML template as parameters
module.exports = (data, html) => {
  // Replace placeholders in the HTML template with actual data values
  let outPut = html.replace(/{~GAGDGETNAME~}/g, data.name); // Replace gadget name
  outPut = outPut.replace(/{~DESCRIPTION~}/g, data.description); // Replace gadget description
  outPut = outPut.replace(
    /{~FULLDESCRIPTION~}/g,
    `${data.description} <br/> <br/> ${data.more_description}` // Replace full description with description and more description
  );
  outPut = outPut.replace(/{~IMAGE~}/g, data.image); // Replace gadget image URL
  outPut = outPut.replace(/{~RATINGS~}/g, data.rating); // Replace gadget rating
  outPut = outPut.replace(/{~ID~}/g, data.id); // Replace gadget ID

  // Extract and format review data
  const date = new Date(data?.date); // Create a date object from the review date
  const formattedDate = date.toLocaleDateString(); // Format the date to a readable format

  // Replace review placeholders in the HTML
  outPut = outPut.replace(/{~AVATAR~}/g, data?.user?.avatar); // Replace reviewer's avatar
  outPut = outPut.replace(/{~REVIEWNAME~}/g, data?.user?.name); // Replace reviewer's name
  outPut = outPut.replace(/{~REVIEWCOMMENT~}/g, data?.comment); // Replace review comment
  outPut = outPut.replace(/{~REVIEWDATE~}/g, formattedDate); // Replace review date

  // Generate star rating representation
  const numStars = "★".repeat(data.rating); // Create a string of stars based on rating
  outPut = outPut.replace(/{~STARS~}/g, numStars); // Replace stars in the HTML

  // Return the modified HTML with all placeholders replaced
  return outPut;
};
