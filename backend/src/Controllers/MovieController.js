import client from "../Database/ConnectDB.js";

const db = client.db('moviesdb');
const collection = db.collection('movies');

const getAllMovies = async (req, res) => {
    
    const movies = await collection.find().toArray();

    if(!movies){
       return res.status(404).json({message: "Nenhum filme encontrado"});
    }

    try {
        res.status(200).json({movies});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Não foi possível realizar a sua solicitação no momento"});
    }
}

export {getAllMovies};