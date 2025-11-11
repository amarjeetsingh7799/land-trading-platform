const Property = require('../models/Property');

// Metro region definitions - shows nearby cities in same metro area
const metroRegions = {
  'delhi': {
    cities: ['Delhi', 'New Delhi', 'Noida', 'Greater Noida', 'Gurugram', 'Gurgaon', 'Faridabad', 'Ghaziabad'],
    states: ['Delhi', 'Haryana', 'Uttar Pradesh']
  },
  'mumbai': {
    cities: ['Mumbai', 'Navi Mumbai', 'Thane', 'Kalyan', 'Dombivli', 'Kalyan-Dombivali'],
    states: ['Maharashtra']
  },
  'bangalore': {
    cities: ['Bangalore', 'Bengaluru'],
    states: ['Karnataka']
  },
  'bengaluru': {
    cities: ['Bangalore', 'Bengaluru'],
    states: ['Karnataka']
  },
  'hyderabad': {
    cities: ['Hyderabad', 'Secunderabad'],
    states: ['Telangana']
  },
  'pune': {
    cities: ['Pune', 'Pimpri-Chinchwad', 'Pimpri Chinchwad'],
    states: ['Maharashtra']
  },
  'kolkata': {
    cities: ['Kolkata', 'Howrah'],
    states: ['West Bengal']
  },
  'chennai': {
    cities: ['Chennai'],
    states: ['Tamil Nadu']
  }
};

// Create a new property (seller/admin)
exports.createProperty = async (req, res) => {
  try {
    const sellerId = req.user.userId;

    const property = new Property({
      ...req.body,
      seller: sellerId,
      images: (req.uploads && req.uploads.images) || [],
      documents: (req.uploads && req.uploads.documents) || []
    });

    const saved = await property.save();
    res.status(201).json({ success: true, property: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create property', error: error.message });
  }
};

// Get all properties (public) with smart metro region filtering
exports.getProperties = async (req, res) => {
  try {
    const { city, state, type, category, minPrice, maxPrice, status, page = 1, limit = 12, sort = 'newest', parking, garden, pool, balcony } = req.query;

    console.log('📊 Filters received:', req.query);

    const filter = {};
    
    // ✅ SMART CITY FILTERING - Shows metro regions or flexible match
    if (city) {
      const cityLower = city.toLowerCase().trim();
      console.log('🔍 Searching for city:', city);
      console.log('🔍 Normalized city:', cityLower);
      
      const region = metroRegions[cityLower];
      
      if (region) {
        // Metro city - show all cities in the region
        const cityQueries = region.cities.map(c => ({
          'location.city': { $regex: new RegExp('^' + c + '(?:,|$)', 'i') }
        }));
        
        filter.$or = cityQueries;
        if (region.states.length > 0) {
          filter['location.state'] = { $in: region.states.map(s => new RegExp('^' + s + '$', 'i')) };
        }
        console.log(`🌆 Metro region: ${city}`);
        console.log('🔍 City queries:', JSON.stringify(cityQueries, null, 2));
      } else {
        // Non-metro city - match at the start of the city name
        filter['location.city'] = { $regex: new RegExp('^' + cityLower + '(?:,|$)', 'i') };
        console.log(`🏙️ Non-metro city: ${city}`);
        console.log('🔍 City filter:', filter['location.city']);
      }
    }
    
    // State filter (user can override metro region by selecting specific state)
    if (state && !city) {
      filter['location.state'] = { $regex: state, $options: 'i' };
    }
    
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (parking) filter['amenities.parking'] = parking === 'true' || parking === '1' ? true : { $exists: true };
    if (garden) filter['amenities.garden'] = garden === 'true' || garden === '1' ? true : { $exists: true };
    if (pool) filter['amenities.pool'] = pool === 'true' || pool === '1' ? true : { $exists: true };
    if (balcony) filter['amenities.balcony'] = balcony === 'true' || balcony === '1' ? true : { $exists: true };
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    console.log('🔍 MongoDB Query:', JSON.stringify(filter, null, 2));

    const skip = (Number(page) - 1) * Number(limit);

    const sortMap = {
      newest: { createdAt: -1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 }
    };

    const [items, total] = await Promise.all([
      Property.find(filter)
        .sort(sortMap[sort] || { createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate('seller', 'name email role'),
      Property.countDocuments(filter)
    ]);

    console.log(`✅ Found ${items.length} properties (Total: ${total})`);

    res.json({ success: true, items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    console.error('❌ Get properties error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch properties', error: error.message });
  }
};


// Get property by id (public)
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('seller', 'name email role');
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' });
    res.json({ success: true, property });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch property', error: error.message });
  }
};

// Update property (owner or admin)
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' });

    const isOwner = property.seller.toString() === req.user.userId;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    Object.assign(property, req.body);
    if (req.uploads) {
      if (req.uploads.images && req.uploads.images.length) {
        property.images = [...property.images, ...req.uploads.images];
      }
      if (req.uploads.documents && req.uploads.documents.length) {
        property.documents = [...property.documents, ...req.uploads.documents];
      }
    }
    const updated = await property.save();
    res.json({ success: true, property: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update property', error: error.message });
  }
};

// Delete property (owner or admin)
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' });

    const isOwner = property.seller.toString() === req.user.userId;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    await property.deleteOne();
    res.json({ success: true, message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete property', error: error.message });
  }
};

// Get properties of current seller (protected)
exports.getMyProperties = async (req, res) => {
  try {
    const items = await Property.find({ seller: req.user.userId }).sort({ createdAt: -1 });
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch properties', error: error.message });
  }
};