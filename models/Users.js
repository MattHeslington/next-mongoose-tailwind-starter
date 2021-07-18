import mongoose from 'mongoose'

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username Matt'],
        maxlength: [20, 'Name cannot be more than 20 characters'],
    },
    fullname: {
        type: String,
        required: [true, "Please provide the pet owner's name"],
        maxlength: [30, "Owner's Name cannot be more than 30 characters"],
    },
    age: {
        type: Number,
    },
    imageurl: {
        required: [true, 'Please provide an image url for this user.'],
        type: String,
    }
})

export default mongoose.models.Users || mongoose.model('Users', UserSchema)
