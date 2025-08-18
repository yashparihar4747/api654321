const userfeedback = require("../Model/feedback");

exports.userFeedback = async (req , res) => {
    try{
        const{
            name,
            email,
            subject,
            messages,

        } = req.body;

        // 1. Basic field check
        if (!email || !name || !subject || !messages) {  
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            }); 
        }


         // 2. Email format check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({
                status: false,
                message: "Invalid email format"
            });
        }

        const newuser = new userfeedback({
           name,
            email,
            subject,
            messages,
           
          
        });

        await newuser.save();

        res.status(201).json({
            status: true,
            message: "register Sucesfully",
            data:newuser
        });
    }
    catch{
        res.status(500).json({
            status: false,
            message: "false",
            error:error.massage
        })
    }
}

// Get all users
exports.getAllFeedback = async (req, res) => {
    try {
        const { name, email, subject,  page = 1, limit = 5 } = req.query;

        const filter = {};

        if (email) {
           
            filter.email = { $regex: email, $options: 'i' };
        }

        if (subject) {
            filter.subject = { $regex: subject, $options: 'i' };
        }
        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }

       

        const skip = (page - 1) * limit;
        const total = await userfeedback.countDocuments(filter);
        const users = await userfeedback.find(filter)
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
exports.editFeedback = async (req, res) => {    
    try {
        const { id } = req.params;
        const { name, email, subject, messages } = req.body;

        const updatedFeedback = await userfeedback.findByIdAndUpdate(id, {
            name,
            email,
            subject,
            messages
        }, { new: true });

        if (!updatedFeedback) {
            return res.status(404).json({
                status: false,
                message: "Feedback not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Feedback updated successfully",
            data: updatedFeedback
        });
    
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to update feedback",
            error: error.message
        });
    }
}
//delete user
exports.deleteFeedback = async (req, res) => {      
    try {
        const { id } = req.params;

        const deletedFeedback = await userfeedback.findByIdAndDelete(id);
        if (!deletedFeedback) {
            return res.status(404).json({
                status: false,
                message: "Feedback not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Feedback deleted successfully",
            data: deletedFeedback
        });
    
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to delete feedback",
            error: error.message
        });
    }
}
