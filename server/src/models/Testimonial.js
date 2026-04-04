import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
testimonialSchema.index({ active: 1, createdAt: -1 });
testimonialSchema.index({ rating: 1 });

// Virtual to get formatted date
testimonialSchema.virtual('formattedDate').get(function() {
    return this.createdAt.toISOString().split('T')[0];
});

// Method to toggle active status
testimonialSchema.methods.toggleActive = function() {
    this.active = !this.active;
    return this.save();
};

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);