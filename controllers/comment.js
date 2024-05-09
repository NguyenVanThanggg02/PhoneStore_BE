import { commentDao } from "../dao/index.js";

const getAllCommentByProductId = async (req, res) => {
  try {
    const commentProductId = req.params.id;
    const allCommentsProduct = await commentDao.fetchAllCommentByProductId(
      commentProductId
    );
    if (allCommentsProduct) {
      res.status(200).json(allCommentsProduct);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
const removeCommentById = async (req, res) => {
  try {
    const commentId = req.params.id;
    const removeCommentByProductId = await commentDao.deleteCommentById(
      commentId
    );
    if (removeCommentByProductId) {
      res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const addComment = async (req, res) => {
  try {
    const { text, productId, userId } = req.body;
    const comment = await commentDao.addComment(text, productId, userId);
    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
const updateComment = async (req, res) => {
  try {
    const updateCmt = await commentDao.editComment(req.params.id, req.body);
    res.status(200).json(updateCmt);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
export default {
  getAllCommentByProductId,
  removeCommentById,
  addComment,
  updateComment,
};
