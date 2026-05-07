import { Testimonial } from '../models/Testimonial.js';

export const testimonialController = {
    // Get all testimonials (with filters) - Admin
    async getAllTestimonials(req, res) {
        try {
            const { active, page = 1, limit = 10 } = req.query;
            const filter = {};
            
            if (active !== undefined) filter.active = active === 'true';
            
            const testimonials = await Testimonial.find(filter)
                .sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit);
            
            const total = await Testimonial.countDocuments(filter);
            
            res.json({
                success: true,
                data: testimonials,
                total,
                page: parseInt(page),
                totalPages: Math.ceil(total / limit)
            });
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Get active testimonials for frontend display
    async getActiveTestimonials(req, res) {
        try {
            const testimonials = await Testimonial.find({ active: true })
                .sort({ createdAt: -1 })
                .limit(20);
            
            // Calculate stats
            const total = testimonials.length;
            const totalRatings = testimonials.reduce((sum, t) => sum + t.rating, 0);
            const avgRating = total > 0 ? (totalRatings / total).toFixed(1) : '0';
            const fiveStarCount = testimonials.filter(t => t.rating === 5).length;
            
            res.json({
                success: true,
                data: testimonials,
                stats: {
                    total,
                    avgRating,
                    fiveStarCount,
                    activeCount: testimonials.filter(t => t.active).length
                }
            });
        } catch (error) {
            console.error('Error fetching active testimonials:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Get single testimonial by ID
    async getTestimonialById(req, res) {
        try {
            const { id } = req.params;
            const testimonial = await Testimonial.findById(id);
            
            if (!testimonial) {
                return res.status(404).json({ success: false, error: 'Testimonial not found' });
            }
            
            res.json({ success: true, data: testimonial });
        } catch (error) {
            console.error('Error fetching testimonial:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Create new testimonial
    async createTestimonial(req, res) {
        try {
            const { name, role, content, rating, active } = req.body;
            
            // Validate required fields
            if (!name || !content) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Name and content are required' 
                });
            }
            
            if (!rating || rating < 1 || rating > 5) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'Rating must be between 1 and 5' 
                });
            }
            
            const testimonial = new Testimonial({
                name: name.trim(),
                role: role ? role.trim() : '',
                content: content.trim(),
                rating: Number(rating),
                active: active !== undefined ? active : true
            });
            
            await testimonial.save();
            
            res.status(201).json({ 
                success: true, 
                data: testimonial,
                message: 'Testimonial created successfully'
            });
        } catch (error) {
            console.error('Error creating testimonial:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Update testimonial
    async updateTestimonial(req, res) {
        try {
            const { id } = req.params;
            const { name, role, content, rating, active } = req.body;
            
            const updateData = {};
            if (name !== undefined) updateData.name = name.trim();
            if (role !== undefined) updateData.role = role.trim();
            if (content !== undefined) updateData.content = content.trim();
            if (rating !== undefined) updateData.rating = Number(rating);
            if (active !== undefined) updateData.active = active;
            
            const testimonial = await Testimonial.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );
            
            if (!testimonial) {
                return res.status(404).json({ success: false, error: 'Testimonial not found' });
            }
            
            res.json({ 
                success: true, 
                data: testimonial,
                message: 'Testimonial updated successfully'
            });
        } catch (error) {
            console.error('Error updating testimonial:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Delete testimonial
    async deleteTestimonial(req, res) {
        try {
            const { id } = req.params;
            const testimonial = await Testimonial.findByIdAndDelete(id);
            
            if (!testimonial) {
                return res.status(404).json({ success: false, error: 'Testimonial not found' });
            }
            
            res.json({ 
                success: true, 
                message: 'Testimonial deleted successfully' 
            });
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    
    // Toggle testimonial active status
    async toggleActive(req, res) {
        try {
            const { id } = req.params;
            const testimonial = await Testimonial.findById(id);
            
            if (!testimonial) {
                return res.status(404).json({ success: false, error: 'Testimonial not found' });
            }
            
            testimonial.active = !testimonial.active;
            await testimonial.save();
            
            res.json({ 
                success: true, 
                data: testimonial,
                message: `Testimonial ${testimonial.active ? 'activated' : 'deactivated'} successfully`
            });
        } catch (error) {
            console.error('Error toggling testimonial:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    },


    // Add this method to your testimonialController
// Create testimonial from public form (no auth required)
async createPublicTestimonial(req, res) {
    try {
        const { name, role, content, rating } = req.body;
        
        // Validate required fields
        if (!name || !content) {
            return res.status(400).json({ 
                success: false, 
                error: 'Name and content are required' 
            });
        }
        
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ 
                success: false, 
                error: 'Rating must be between 1 and 5' 
            });
        }
        
        const testimonial = new Testimonial({
            name: name.trim(),
            role: role ? role.trim() : '',
            content: content.trim(),
            rating: Number(rating),
            active: false // New testimonials require admin approval
        });
        
        await testimonial.save();
        
        res.status(201).json({ 
            success: true, 
            data: testimonial,
            message: 'Testimonial submitted successfully. It will appear after admin approval.'
        });
    } catch (error) {
        console.error('Error creating public testimonial:', error);
        res.status(500).json({ success: false, error: error.message });
    }
},
    
    // Get testimonials stats (for admin dashboard)
    async getTestimonialStats(req, res) {
        try {
            const total = await Testimonial.countDocuments();
            const active = await Testimonial.countDocuments({ active: true });
            const inactive = await Testimonial.countDocuments({ active: false });
            
            const ratingStats = await Testimonial.aggregate([
                {
                    $group: {
                        _id: '$rating',
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]);
            
            const avgRating = await Testimonial.aggregate([
                {
                    $group: {
                        _id: null,
                        average: { $avg: '$rating' }
                    }
                }
            ]);
            
            res.json({
                success: true,
                data: {
                    total,
                    active,
                    inactive,
                    averageRating: avgRating[0]?.average.toFixed(1) || 0,
                    ratingDistribution: ratingStats
                }
            });
        } catch (error) {
            console.error('Error fetching testimonial stats:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
};