import { receiptDao } from "../dao/index.js"

const getReceiptOfUser = async (req, res) =>{
    try {
        const receiptByUserId = req.params.id
        const receipt = await receiptDao.fetChReceiptOfUser(receiptByUserId)
        if(receipt) {
            res.status(200).json(receipt)
        }else{
            res.status(404).json({message: "No receipt found"})
        }
    } catch (error) {
        res.status(500).json({message: error.toString()})
    }
}
export default { getReceiptOfUser}