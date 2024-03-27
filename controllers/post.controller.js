const models=require('../models')
function save(req,res){
    const post={
        title:req.body.title,
        content:req.body.content,
        imageUrl:req.body.imageUrl,
        categoryId:req.body.categoryId,
        userId:1
    }
    models.Post.create(post).then(result=>{
        res.status(201).json({
            message:"Post Created successfully",
            post:result
        })
    }

    ).catch(err=>{
        res.status(500).json({
            message:"Something went wrong",
            error:err
        })
    })

}

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await models.Post.findAll({
            include: models.Category, // Include associated category
            include: models.User 
        });
        res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

module.exports={
    save:save,
    getAllPosts: exports.getAllPosts
}