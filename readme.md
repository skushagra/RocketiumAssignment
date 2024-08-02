# Data Filtering and Sorting API using node.js and express.js

This is a simple API that filters and sorts data from a JSON file. The API is built using node.js and express.js.

## Installation
Run the following commands to run this project locally
```bash
git clone https://github.com/skushagra/RocketiumAssignment.git
cd RocketiumAssignment
cp .env.example .env
npm install
npm run dev
```

`Note: The data source url should be set in the .env file`

## API Endpoints
The API has the following endpoint:

### GET `/api/v0/fetch`
The fetches data from the data source url and stores it in the database. The data source url can be changed from the enviornment file.

### GET `/api/v0/data`
Returns the data from the data source url, from the last fetchjob. The data is filtered and sorted based on the query parameters.


## API Examples

1. `http://localhost:3000/api/v0/data`
```
{
  "message": "Data retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Adeel Solangi",
      "language": "Sindhi",
      "DataId": "V59OF92YF627HFY0",
      "bio": "Donec lobortis eleifend condimentum. Cras dictum dolor lacinia lectus vehicula rutrum. Maecenas quis nisi nunc. Nam tristique feugiat est vitae mollis. Maecenas quis nisi nunc.",
      "version": 6.1,
      "createdAt": "2024-08-02T13:34:48.146Z",
      "updatedAt": "2024-08-02T13:34:48.146Z"
    },
    {
      "id": 2,
      "name": "Afzal Ghaffar",
      "language": "Sindhi",
      "DataId": "ENTOCR13RSCLZ6KU",
      "bio": "Aliquam sollicitudin ante ligula, eget malesuada nibh efficitur et. Pellentesque massa sem, scelerisque sit amet odio id, cursus tempor urna. Etiam congue dignissim volutpat. Vestibulum pharetra libero et velit gravida euismod.",
      "version": 1.88,
      "createdAt": "2024-08-02T13:34:48.157Z",
      "updatedAt": "2024-08-02T13:34:48.157Z"
    },
    . . . all other entries
  ]
}

```

2. Filter by name : `http://localhost:3000/api/v0/data?name=Abla%20Dilmurat`

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 1016
ETag: W/"3f8-vbyZ7H1huyod5cUOCwPaOSdh9Ss"
Date: Fri, 02 Aug 2024 13:43:45 GMT
Connection: close

{
  "message": "Data retrieved successfully",
  "data": [
    {
      "id": 4,
      "name": "Abla Dilmurat",
      "language": "Uyghur",
      "DataId": "5ZVOEPMJUI4MB4EN",
      "bio": "Donec lobortis eleifend condimentum. Morbi ac tellus erat.",
      "version": 2.53,
      "createdAt": "2024-08-02T13:34:48.171Z",
      "updatedAt": "2024-08-02T13:34:48.171Z"
    },
    {
      "id": 201,
      "name": "Abla Dilmurat",
      "language": "Uyghur",
      "DataId": "5ZVOEPMJUI4MB4EN",
      "bio": "Donec lobortis eleifend condimentum. Morbi ac tellus erat.",
      "version": 2.53,
      "createdAt": "2024-08-02T13:34:49.872Z",
      "updatedAt": "2024-08-02T13:34:49.872Z"
    },
    {
      "id": 398,
      "name": "Abla Dilmurat",
      "language": "Uyghur",
      "DataId": "5ZVOEPMJUI4MB4EN",
      "bio": "Donec lobortis eleifend condimentum. Morbi ac tellus erat.",
      "version": 2.53,
      "createdAt": "2024-08-02T13:34:51.440Z",
      "updatedAt": "2024-08-02T13:34:51.440Z"
    },
    {
      "id": 595,
      "name": "Abla Dilmurat",
      "language": "Uyghur",
      "DataId": "5ZVOEPMJUI4MB4EN",
      "bio": "Donec lobortis eleifend condimentum. Morbi ac tellus erat.",
      "version": 2.53,
      "createdAt": "2024-08-02T13:34:52.917Z",
      "updatedAt": "2024-08-02T13:34:52.917Z"
    }
  ]
}
```

3. Filter by multiple names : `http://localhost:3000/api/v0/data?name=Adeel%20Solangi,Afzal%20Ghaffar`


4. Combined use of multiple options : `http://localhost:3000/api/v0/data?sort=name:desc&limit=11&offset=1`