const Property = require('../models/Property');

// Obtener todas las propiedades con filtros avanzados
exports.getAllProperties = async (req, res) => {
    try {
        const { type, minPrice, maxPrice, status, municipio, estado, beds, seguridad } = req.query;
        let query = {};

        // Filtros dinámicos
        if (type) query.type = type;
        if (status) query.status = status;
        if (estado) query.estado = estado;
        if (municipio) query.municipio = municipio;
        if (seguridad === 'true') query.seguridad = true;
        
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (beds) query.beds = { $gte: Number(beds) };

        const properties = await Property.find(query).sort({ createdAt: -1 });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las propiedades', error: error.message });
    }
};

// Obtener opciones únicas para los filtros (Estados y Municipios dinámicos)
exports.getFilterOptions = async (req, res) => {
    try {
        const properties = await Property.find({}, 'estado municipio type');
        
        const options = {
            estados: [...new Set(properties.map(p => p.estado))],
            municipiosPorEstado: {},
            tipos: [...new Set(properties.map(p => p.type))]
        };

        properties.forEach(p => {
            if (!options.municipiosPorEstado[p.estado]) {
                options.municipiosPorEstado[p.estado] = new Set();
            }
            options.municipiosPorEstado[p.estado].add(p.municipio);
        });

        // Convertir Sets a Arrays
        for (let estado in options.municipiosPorEstado) {
            options.municipiosPorEstado[estado] = [...options.municipiosPorEstado[estado]];
        }

        res.json(options);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener opciones de filtro', error: error.message });
    }
};

// Crear una nueva propiedad
exports.createProperty = async (req, res) => {
    try {
        const { 
            title, price, location, type, description, 
            beds, baths, area, estado, municipio, 
            seguridad, featured 
        } = req.body;
        
        const propertyData = {
            title,
            price: Number(price),
            location,
            estado,
            municipio,
            type,
            description,
            beds: Number(beds),
            baths: Number(baths),
            area: Number(area),
            seguridad: seguridad === 'true' || seguridad === true,
            featured: featured === 'true' || featured === true,
            status: 'Venta',
            owner: req.user.id
        };
        
        if (req.files && req.files.length > 0) {
            propertyData.images = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);
        }

        const newProperty = new Property(propertyData);
        const savedProperty = await newProperty.save();
        res.status(201).json(savedProperty);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la propiedad', error: error.message });
    }
};

// Actualizar propiedad
exports.updateProperty = async (req, res) => {
    try {
        const { 
            title, price, location, type, description, 
            beds, baths, area, estado, municipio, 
            seguridad, featured 
        } = req.body;

        const updateData = {
            title,
            price: Number(price),
            location,
            estado,
            municipio,
            type,
            description,
            beds: Number(beds),
            baths: Number(baths),
            area: Number(area),
            seguridad: seguridad === 'true' || seguridad === true,
            featured: featured === 'true' || featured === true
        };

        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);
        }

        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedProperty) return res.status(404).json({ message: 'Propiedad no encontrada' });
        res.json(updatedProperty);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar', error: error.message });
    }
};

// Obtener una propiedad por ID
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('owner', 'name email');
        if (!property) return res.status(404).json({ message: 'Propiedad no encontrada' });
        
        property.views += 1;
        await property.save();
        
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la propiedad', error: error.message });
    }
};

// Eliminar propiedad
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) return res.status(404).json({ message: 'Propiedad no encontrada' });
        res.json({ message: 'Propiedad eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar', error: error.message });
    }
};
