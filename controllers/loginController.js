const userdata = require("../Model/register");
const userLogin = require("../Model/login");

//post login
exports.userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;




        // 1. Basic field check
        if (!email || !password) {
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
        
        const user = await userdata.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password"
            });
        }
        if (user.password !== password) {
            return res.status(401).json({
                status: false,
                message: "Wrong password"
            });

        }
        const loginRecord = new userLogin({
            email: user.email,
            password: user.password // still hashed
        });

        await loginRecord.save();

        res.status(200).json({
            status: true,
            message: "Login successful",
            data: loginRecord
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Login failed",
            error: error.message
        });
    }
};

//getfiltered
exports.getAllLogin = async (req, res) => {
    try {
        const {  email, page = 1, limit = 5 } = req.query;

        const filter = {};
        if (email) {
            filter.email = { $regex: email, $options: 'i' };
        }
        const skip = (page - 1) * limit;
        const total = await userLogin.countDocuments(filter);
        const users = await userLogin.find(filter)
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
    exports.editlogin = async (req, res) => {
        try {
            const { id } = req.params;
            const { email, password } = req.body;

            const updatedlogin = await userLogin.findById(id);
            if (!updatedlogin) {
                return res.status(400).json({
                    status: false,
                    message: "User not found"
                });
            }

            // 1. Basic field check
            if (!email || !password) {
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

            updatedlogin.email = email;
            updatedlogin.password = password;

            // Save the updated user
            await updatedlogin.save();
            res.status(200).json({
                status: true,
                message: "User updated successfully",
                data: updatedlogin
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
exports.deletelogin = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedlogin = await userLogin.findByIdAndDelete(id);
        if (!deletedlogin) {
            return res.status(400).json({
                status: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            status: true,
            message: "User deleted successfully",
            data: deletedlogin
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
}

