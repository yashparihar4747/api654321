const userdata = require("../Model/register");

exports.userregister = async (req, res) => {
    try {
        const { 
            email,
            password,
            conformPassword,
            name,
            phone
         } = req.body;

        // 1. Basic field check
        if (!email || !password ||!conformPassword || !name || !phone) {
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

         // 3. Check if user already exists
        const existingUser = await userdata.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: "User already exists"
            });
        }

        // 3. Password match check
        if (password !== conformPassword) {
            return res.status(400).json({
                status: false,
                message: "Passwords do not match"
            });
        }

        // 4. Password strength check
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;
        if (!passwordPattern.test(password)) {
            return res.status(400).json({
                status: false,
                message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
            });
        }


        // 5. Phone number format check 
        const phonePattern = /^\d{10}$/; 
        if (!phonePattern.test(phone)) {
            return res.status(400).json({
                status: false,
                message: "Invalid phone number format"
            });
        }

        // 5. Save user
        const newuser = new userdata({ email, password, name, phone });
        await newuser.save();

        res.status(201).json({
            status: true,
            message: "Registered successfully",
            data: newuser
        });

    } 
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Registration failed",
            error: error.message
        });
    }
};
//getfiltered
exports.getfilteredUsers = async (req, res) => {
    try {
        const { name, email, phone, page = 1, limit = 5 } = req.query;

        const filter = {};

        if (name) {
            // case-insensitive partial match
            filter.name = { $regex: name, $options: 'i' };
        }

        if (email) {
            filter.email = { $regex: email, $options: 'i' };
        }

        if (phone) {
            filter.phone = { $regex: phone, $options: 'i' };
        }

        const skip = (page - 1) * limit;
        const total = await userdata.countDocuments(filter);
        const users = await userdata.find(filter)
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
        const { email, password, name, phone } = req.body;

        const updatedUser = await userdata.findById(id);
        if (!updatedUser) {
            return res.status(400).json({
                status: false,
                message: "User not found"
            });
        }
        updatedUser.name = name;
        updatedUser.email = email;
        updatedUser.password = password;
        updatedUser.phone = phone;
        await updatedUser.save();


       // 1. Basic field check
        if (!email || !password || !name || !phone) {
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

      

        // 4. Password strength check
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;
        if (!passwordPattern.test(password)) {
            return res.status(400).json({
                status: false,
                message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
            });
        }


        // 5. Phone number format check 
        const phonePattern = /^\d{10}$/; 
        if (!phonePattern.test(phone)) {
            return res.status(400).json({
                status: false,
                message: "Invalid phone number format"
            });
        }
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

        const deletedUser = await userdata.findByIdAndDelete(id);
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
    }
     catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
}

         