const userdata = require("../Model/register");
const usercontact = require("../Model/contact");


exports.userContact = async (req , res) => {
    try{
        const users  = await userdata.find({}, 'email name phone');
          const contactData = [];
               for (const user of users) {
            const contact = new usercontact({
                email: user.email,
                name: user.name,
                phone: user.phone
            });
        await contact.save();
            contactData.push(contact);  
               }

        res.status(201).json({
            status: true,
            message: "contact list retrieved successfully",
            data:contactData
        });
    }
    catch(error){
        res.status(500).json({
            status: false,
            message: error.massage
        })
    }
}


// Get all users

exports.getAllContact = async (req, res) => {
    try {
        const { email, name, phone,  page = 1, limit = 5 } = req.query;

        const filter = {};

        if (email) {
           
            filter.email = { $regex: email, $options: 'i' };
        }

        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }
        if (phone) {
            filter.phone = { $regex: phone, $options: 'i' };
        }

       

        const skip = (page - 1) * limit;
        const total = await usercontact.countDocuments(filter);
        const users = await usercontact.find(filter)
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

exports.editContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, name, phone } = req.body;

        if (!email || !name || !phone) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }
        //email partern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({
                status: false,
                message: "Invalid email format"
            });
        }

        //phone partern
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phone)) {
            return res.status(400).json({
                status: false,
                message: "Invalid phone number format"
            });
        }
        
        const updatedUser = await usercontact.findById(id);
        if (!updatedUser) {
            return res.status(400).json({
                status: false,
                message: "User not found"
            });
        }
        updatedUser.name = name;
        updatedUser.email = email;
        updatedUser.phone = phone;
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
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await usercontact.findByIdAndDelete(id);
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