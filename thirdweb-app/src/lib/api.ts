// Define the options for the GET request
type GetOptions = {
	url: string; // The URL to send the GET request to
	params?: Record<string, string>; // Optional query parameters
	headers?: Record<string, string>; // Optional headers
  };
  
  // Function to perform a GET request
  export async function get({ url, params, headers }: GetOptions) {
	// Construct the full URL with query parameters
	const fullUrl = url + "?" + new URLSearchParams(params);
  
	// Send the GET request
	const response = await fetch(fullUrl, {
	  method: "GET",
	  headers, // Optional headers
	  credentials: "include", // Include cookies with the request
	});
  
	// Check if the response was not successful
	if (!response.ok) {
	  // Throw an error with the status text
	  throw new Error(response.statusText);
	}
  
	// Return the response as JSON
	return await response.json();
  }
  
  // Define the options for the POST request
  type PostOptions = {
	url: string; // The URL to send the POST request to
	params?: Record<string, unknown>; // Optional body parameters
	headers?: Record<string, string>; // Optional headers
  };
  
  // Function to perform a POST request
  export async function post({ url, params, headers }: PostOptions) {
	// Send the POST request
	const response = await fetch(url, {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json", // Set the content type to JSON
		...headers, // Add any optional headers
	  },
	  body: JSON.stringify(params ?? {}), // Convert the body parameters to JSON
	  credentials: "include", // Include cookies with the request
	});
  
	// Check if the response was not successful
	if (!response.ok) {
	  // Throw an error with the status text
	  throw new Error(response.statusText);
	}
  
	// Return the response as JSON
	return await response.json();
  }
  