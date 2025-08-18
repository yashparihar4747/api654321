const userscustomize = require("../Model/customizeTrip");

exports.userCustomize = async (req , res) => {
    try{
        const{
            name,
            email,
            country,
            phone,
            adults,
            children,
            startDate,
            hotelRequired,
            carRequired,
            message

        } = req.body;

        // 1. Basic field check
        if (!email || !name || !country || !phone || !adults ||!startDate ) {  
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
         const phonePattern = /^\d{10}$/; 
        if (!phonePattern.test(phone)) {
            return res.status(400).json({
                status: false,
                message: "Invalid phone number format"
            });
        }

        const newuser = new userscustomize({
           name,
            email,
            country,
            phone,
            adults,
            children,
            startDate,
            hotelRequired,
            carRequired,
            message
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
exports.getAllCustomize = async (req, res) => {
    try {
        const { name, email, country, phone,  page = 1, limit = 5 } = req.query;

        const filter = {};

        if (email) {
           
            filter.email = { $regex: email, $options: 'i' };
        }

      
        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }
        if (country) {
            filter.country = { $regex: country, $options: 'i' };
        }
        if (phone) {
            filter.phone = { $regex: phone, $options: 'i' };
        }


       

        const skip = (page - 1) * limit;
        const total = await userscustomize.countDocuments(filter);
        const users = await userscustomize.find(filter)
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
exports.editCustomize = async (req, res) => {    
    try {
        const { id } = req.params;
        const { name,
               email,
              country,
             phone,
            adults,
            children,
            startDate,
            hotelRequired,
            carRequired,
            message  } = req.body;

        const updatedCustomize = await userscustomize.findByIdAndUpdate(id, {
            name,
            email,
            country,
            phone,
            adults,
            children,
            startDate,
            hotelRequired,
            carRequired,
            message
        }, { new: true });

        if (!updatedCustomize) {
            return res.status(404).json({
                status: false,
                message: "Customize not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Customize updated successfully",
            data: updatedCustomize
        });
    
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to update Customize",
            error: error.message
        });
    }
}
//delete user
exports.deleteCustomize = async (req, res) => {      
    try {
        const { id } = req.params;

        const deletedCustomize = await userscustomize.findByIdAndDelete(id);
        if (!deletedCustomize) {
            return res.status(404).json({
                status: false,
                message: "Customize not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Customize deleted successfully",
            data: deletedCustomize
        });
    
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to delete Customize",
            error: error.message
        });
    }
}
