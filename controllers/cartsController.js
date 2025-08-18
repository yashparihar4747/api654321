const usercarts = require("../Model/carts");


exports.userCarts = async (req , res) => {
    try{
        const {
           placename,
            placeimage
           }= req.body;


        // 1. Basic field check
        if (!placename || !placeimage) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }


        const newuser = new usercarts({
            placename,
            placeimage
        });
        await newuser.save();
       
               

        res.status(201).json({
            status: true,
            message: "carts successfully added",
            data: newuser
        });
    }
    catch(error){
        res.status(500).json({
            status: false,
            message: error.massage
        })
    }
}

// Get all carts
exports.getAllCarts = async (req, res) => {
    try {
        const { placename, page = 1, limit = 5 } = req.query;

        const filter = {};

        if (placename) {
           
            filter.placename = { $regex: placename, $options: 'i' };
        }

       
       

        const skip = (page - 1) * limit;
        const total = await usercarts.countDocuments(filter);
        const users = await usercarts.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json({
            status: true,
            message: "Filtered users retrieved successfully",
            data: users,
            pagination: {
                totalUsers: total,
                totalPages: Math.ceil(total / limit),
                currentPage: Number(page),
                pageSize: Number(limit)
            }
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to retrieve filtered users",
            error: error.message
        });
    }
};

// edit a cart
exports.editCart = async (req, res) => {        
    try {
        const { id } = req.params;
        const { placename, placeimage } = req.body;
// 1. Basic field check
         if (!placename || !placeimage) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }

        const updatedCart = await usercarts.findByIdAndUpdate(id, {
            placename,
            placeimage
        }, { new: true });

        if (!updatedCart) {
            return res.status(404).json({
                status: false,
                message: "Cart not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Cart updated successfully",
            data: updatedCart
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}
// delete a cart
exports.deleteCart = async (req, res) => {      
    try {
        const { id } = req.params;

        const deletedCart = await usercarts.findByIdAndDelete(id);

        if (!deletedCart) {
            return res.status(404).json({
                status: false,
                message: "Cart not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Cart deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

