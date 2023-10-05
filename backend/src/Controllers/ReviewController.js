//model
import Review from '../Models/ReviewModel.js';
import Movie from '../Models/MovieModel.js';
import User from '../Models/UserModel.js';

const getReview = async (req, res) => {
    const movieId = req.params.id;

    const reviews = await Review.find().where({ movie: movieId });

    if (!reviews) return res.status(204).json({ message: "Ainda não teve comentários para esse filme." });

    try {
        res.status(200).json({ reviews });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Houve um erro" });
    }
}

const postReview = async (req, res) => {
    const movieId = req.params.id;
    const userId = req.userId;
    const { title, review } = req.body;

    const user = await User.findById(userId);
    const movie = await Movie.findById(movieId);

    const userReview = { title, review, user, movie };

    try {
        await Review.create(userReview);
        res.status(201).json({ message: "Comentário adicionado com sucesso!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Houve um problema' });
    }
}

const editReview = async (req, res) => {
    const { title, review } = req.body;
    const reviewId = req.params.id;
    const userId = req.userId;

    const user = await User.findById(userId);
    const foundReview = await Review.findById(reviewId);

    if (!foundReview) return res.sendStatus(404);
    if (user !== foundReview.user) return res.status(403).json({ message: "Você não tem permissão para editar este comentário pois pertence a outro usuário" });

    try {
        const updatedReview = { title, review };
        const newReview = await Review.findByIdAndUpdate(reviewId, updatedReview);
        res.status(200).json({ message: "Comentário atualizado com sucesso", newReview });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Houve um problema!" });
    }
}

const deleteReview = async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.userId;

    const user = await User.findById(userId);
    const review = await Review.findById(reviewId);

    if (!review) return res.sendStatus(404);
    if (user !== review.user) return res.status(403).json({ message: "Você não tem permissão para exlcuir este comentário pois pertence a outro usuário" });

    try {
        await Review.deleteOne({ _id: review.id });
        res.status(200).json({ message: "Comentário excluído com sucesso!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Houve um problema!" });
    }
}

export { getReview, postReview, editReview, deleteReview };