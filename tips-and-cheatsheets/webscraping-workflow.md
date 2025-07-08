# Webscraping workflow

## Data sources

Three main types of data sources:
1. Sources that provide a publicly accessible API
2. Sources that don't provide a publicly accessible API, but have a online dashboard that can be scraped
3. Sources that only publish data in PDFs (or other non-machine readable formats)

Different types of data sources involve different processing steps. For each source:
1. Locate the data source endpoint (API endpoint, download URL, etc.)
2. Understand the data (e.g. measurements/variables for the disaster, units, etc.)
3. Determine the type of data source (see above)
4. Extract the data using the corresponding method below
5. Clean and preprocess the data as needed (e.g. handle missing values, normalize data, etc.)

## Methods

1. For sources with a publicly accessible API
   1. Read the API documentation and understand the data structure
   2. Decide what variables to extract and the output format
   3. Get the API key (if required)
   4. Write a script to extract the data using the API
2. For sources with an online dashboard
   1. Study the webpage structure and identify the data elements 
   2. Decide what variables to extract and the output format
   3. Extract the data:
      - For static webpages: download the HTML, JSON, or other data available and parse it
      - For dynamic webpages: since the data is loaded dynamically (e.g. via user interaction), write a script using a headless browser to interact with the webpage and extract the data
3. For sources that only publish data in PDFs (or other non-machine readable formats)
   1. Download the files
   2. Decide on the tools to use (e.g. PDF scraper tools)
   3. Extract the data
   4. Convert the data into a machine-readable format (e.g. CSV, JSON)
   5. Validate the data (PDF scraping often introduces errors)
   6. Clean the data if necessary