const mongoose =require('mongoose');

const PetSchema = new mongoose.Schema(
    {name: { type: String,
        required: [true, "Must enter a name"],
        minlength: [3, "Name must 3 or more characters"]
    }, 
    type: { type: String,
        required: [true, "Must enter a pet type"],
        minlength: [3, "Pet Type must 3 or more characters"]
    }, 
    description: { type: String,
        required: [true, "Must enter a description"],
        minlength: [3, "Description must 3 or more characters"]
    }, 
    skill1: { type: String,
        required: [false]
    },
    skill2: { type: String,
        required: [false]
    },
    skill3: { type: String,
        required: [false]
    },
    likes: { type: Number,
        default: 0
    }},
    {timestamps: true}
);

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;