const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: [
        true,
        "Cet email est déjà utilisé. Veuillez en utiliser un autre.",
      ],
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ],
    },
    age: {
      type: Number,
      min: [15, "L'âge minimum autorisé est 15 ans."],
      max: [80, "L'âge maximum autorisé est 80 ans."],
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }, // Ajoute createdAt et updatedAt automatiquement
);

userSchema.pre("save", async function () {
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw new Error("Error hashing password: " + error.message);
  }
});

// Éviter la recréation du modèle
const User = mongoose.model("User", userSchema);
module.exports = User;
