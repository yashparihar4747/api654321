const userGallary = require("../Model/gallary");


exports.usergallary = async (req , res) => {
    try{
        const {
            title,
            image,
            category}= req.body;

              if (!title || !image || !category) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }

        const newuser = new userGallary({
            title,
            image,
            category
        });
        await newuser.save();
       
               

        res.status(201).json({
            status: true,
            message: "contact list retrieved successfully",
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



//getfiltered
exports.getAllGallary = async (req, res) => {
    try {
        const { title, category,  page = 1, limit = 5 } = req.query;

        const filter = {};

        if (title) {
           
            filter.title = { $regex: title, $options: 'i' };
        }

        if (category) {
            filter.category = { $regex: category, $options: 'i' };
        }

       

        const skip = (page - 1) * limit;
        const total = await userGallary.countDocuments(filter);
        const users = await userGallary.find(filter)
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

    
  

//edit user
exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {  title,
                image,
              category } = req.body;

               if (!title || !image || !category) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }

        const updatedUser = await userGallary.findById(id);
        if (!updatedUser) {
            return res.status(400).json({
                status: false,
                message: "User not found"
            });
        }
        updatedUser.title = title;
        updatedUser.image = image;
        updatedUser.category = category;
        // Save the updated user    
        await updatedUser.save();
        res.status(200).json({
            status: true,
            message: "User updated successfully",
            data: updatedUser
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to update user",
            error: error.message
        });
    }
}
//delete user               
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await userGallary.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(400).json({
                status: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            status: true,
            message: "User deleted successfully",
            data: deletedUser
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
}