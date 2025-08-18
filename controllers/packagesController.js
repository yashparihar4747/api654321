const userpackages = require("../Model/packages");


exports.userPackages = async (req , res) => {
    try{
        const {
           name,
           attractions,
            pickup,
            duration,
            description,
            price,
            rating,
            category,
            image
           }= req.body;


        // 1. Basic field check
        if (!name || !attractions || !pickup || !duration || !description || !price || !rating || !category || !image) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }


        const newuser = new userpackages({
            name,
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
exports.getAllPackages = async (req, res) => {
    try {
        const { name, attractions, pickup, duration, price, rating, category, page = 1, limit = 5 } = req.query;

        const filter = {};

        if (name) {
           
            filter.name = { $regex: name, $options: 'i' };
        }
        if (attractions) {
            filter.attractions = { $regex: attractions, $options: 'i' };
        }
        if (pickup) {
            filter.pickup = pickup === 'true';
        }
        if (duration) {
            filter.duration = { $regex: duration, $options: 'i' };
        }
        
        if (price) {
            filter.price = { $regex: price, $options: 'i' };
        }
        if (rating) {
            filter.rating = rating;
        }
        if (category) {
            filter.category = { $regex: category, $options: 'i' };
        }


       
       

        const skip = (page - 1) * limit;
        const total = await userpackages.countDocuments(filter);
        const users = await userpackages.find(filter)
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
exports.editPackages = async (req, res) => {        
    try {
        const { id } = req.params;
        const {name,
           attractions,
            pickup,
            duration,
            description,
            price,
            rating,
            category,
            image } = req.body;
// 1. Basic field check
         if (!name || !attractions || !pickup || !duration || !description || !price || !rating || !category || !image) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }

        const updatedPackages = await userpackages.findByIdAndUpdate(id, {
           name,
           attractions,
            pickup,
            duration,
            description,
            price,
            rating,
            category,
            image
        }, { new: true });

        if (!updatedPackages) {
            return res.status(404).json({
                status: false,
                message: "Packages not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Packages updated successfully",
            data: updatedPackages
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}
// delete a Packages
exports.deletePackages = async (req, res) => {      
    try {
        const { id } = req.params;

        const deletedPackages = await userpackages.findByIdAndDelete(id);

        if (!deletedPackages) {
            return res.status(404).json({
                status: false,
                message: "Packages not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Packages deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

