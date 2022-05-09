# gazetteer

## Sources

 - Original PDF source: https://deepblue.lib.umich.edu/handle/2027.42/58233
 - Tempo upload: https://archive.org/details/historical-gazetteer-of-southeast-asia


## To do:

 - accents checked through end of M, p. 64
 - Move this to DSG:
   - https://v4.gatsbyjs.com/docs/how-to/rendering-options/using-deferred-static-generation/
   - https://www.netlify.com/blog/2021/09/16/run-gatsby-4-with-dsg-and-ssr-on-netlify-today/
 - Make a page of all names that have lat/longs
 - Make a map component
## Data model

word
|--id, unique ID (string)
|--index, index in original list (number)
|--original, the original entry (string)
|--headWord, the head word (string)
|--primary, if it's an entry or a reference (boolean, true if entry)
|--rawLat, raw latitude (string) if it exists
|--rawLong, raw longitude (string) if it exists
|--rest, currently all of the entry except for the head word (string)