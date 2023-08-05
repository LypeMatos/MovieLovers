//model
import Commentary from '../Models/CommentaryModel.js';
import Movie from '../Models/MovieModel.js';
import User from '../Models/UserModel.js';

const getComment = async (req, res) => {
    const movieId = req.params.id;

    const comments = await Commentary.find().where({movie: movieId});

    if(!comments) return res.status(204).json({message: "Ainda não teve comentários para esse filme."});

    try {
        res.status(200).json({comments});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Houve um erro"});
    }
}

const postComment = async (req, res) => {
    const movieId = req.params.id;
    const username = req.user;
    const { title, comment } = req.body;

    const user = await User.findOne({username}).select("_id");
    const movie = await Movie.findById(movieId);
    
    const commentary = { title, comment, user, movie };

    try {
        await Commentary.create(commentary);
        res.status(201).json({message: "Comentário adicionado com sucesso!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Houve um problema'});
    }
}

const editComment = async (req, res) => {
    const { title, comment } = req.body;
    const commentId = req.params.id;
    const username = req.user;    

    const user = await User.findOne().where({username});
    const commentary = await Commentary.findById(commentId);
    
    if(!commentary) return res.sendStatus(404);
    if(user._id.toString() !== commentary.user.toString()) return res.status(403).json({message: "Você não tem permissão para editar este comentário pois pertence a outro usuário"});

    try {
        const updatedCommentary = {title, comment};
        const newComment = await Commentary.findByIdAndUpdate(commentId, updatedCommentary);
        res.status(200).json({message: "Comentário atualizado com sucesso", newComment});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Houve um problema!"});
    }
}

const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    const username = req.user;    

    const user = await User.findOne().where({username});
    const comment = await Commentary.findById(commentId);
    
    if(!comment) return res.sendStatus(404);
    if(user._id.toString() !== comment.user.toString()) return res.status(403).json({message: "Você não tem permissão para exlcuir este comentário pois pertence a outro usuário"});

    try {
        await Commentary.deleteOne({_id: comment.id});
        res.status(200).json({message: "Comentário excluído com sucesso!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Houve um problema!"});
    }
}

export { postComment, getComment, editComment, deleteComment };