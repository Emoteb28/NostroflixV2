# nostroflix

#Backend : ./server 
    - express js
    - morgan
    - body-parser
    - mongoose

    
#Frontend : ./client 






#--------------------#
- git repo : git@github.com:0mounach0/nostroflix.git

- install mongoDB localy

- exec this command to import node modules : $ npm install

- exec this command to run the API : $ npm start

- use postman to try the API :
//-----------------------------------------------------------------//
    GET    : 
                localhost:3000/categories
                localhost:3000/films
                localhost:3000/categories/:id
                localhost:3000/films/:id
//-----------------------------------------------------------------//
    POST   :
                localhost:3000/categories

                            example :
                        {
                            "name": "horror",
                            "description": "horror description"
                        }

            //-------------------------------//
                localhost:3000/films

                            example :
                        {
                            "name": "the wolf of wall street",
                            "description": "the wolf of wall street description",
                            "categories": [
                                            {
                                                "_id": "5c314258ef2ac833bc0eb163",
                                                "name": "action",
                                                "description": "action description"
                                            },
                                            {
                                                "_id": "5c3140f02d4e831fc8ecddf6",
                                                "name": "drama",
                                                "description": "drama description"
                                            },
                                            {
                                                "_id": "5c314283ef2ac833bc0eb164",
                                                "name": "comedy",
                                                "description": "comedy description"
                                            }
                                        ]
                        }
//-----------------------------------------------------------------//
    PUT    :
                localhost:3000/categories/:id
                localhost:3000/films/:id
//-----------------------------------------------------------------//
    DELETE : 
                localhost:3000/categories/:id
                localhost:3000/films/:id