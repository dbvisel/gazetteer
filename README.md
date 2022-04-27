# gazetteer

## Sources

 - Original PDF source: https://deepblue.lib.umich.edu/handle/2027.42/58233
 - Tempo upload: https://archive.org/details/historical-gazetteer-of-southeast-asia

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