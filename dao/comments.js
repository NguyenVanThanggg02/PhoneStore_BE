import Comment from "../models/comment.js"

const fetchAllCommentByProductId = async(id) =>{
    try {
        const allComments = await Comment.find({productId:id})
        .populate("userId")
        .exec()
        return allComments;
    } catch (error) {
        throw new Error(error.toString());
    }
}
const deleteCommentById = async(id) =>{
    try {
        const deleteComment = await Comment.deleteOne({_id:id})
        return deleteComment
    } catch (error) {
        throw new Error(error.toString()); 
    }
}

const addComment = async (text, productId, userId) => {
    try {
      const comment = await Comment.create({ text, productId, userId });
      return comment;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw new Error(error.toString());
    }
  };

  const editComment = async (id, newText) =>{
    try {
        const editText = await Comment.findOneAndUpdate({_id:id}, newText, {new:true});
        return editText;
    } catch (error) {
        throw new Error(error.toString());
    }
  }

export default {fetchAllCommentByProductId, deleteCommentById,addComment, editComment}