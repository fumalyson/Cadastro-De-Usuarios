export default {
    notFound: (req, res, next) => {
        res.status(404).json({
            error: true,
            message: 'Recurso não encontrado'
        })
    }
}