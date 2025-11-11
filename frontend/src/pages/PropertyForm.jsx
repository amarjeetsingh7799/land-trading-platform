import React, { useState } from 'react';
import api from '../api';

export default function PropertyForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'residential',
    category: 'buy',
    price: '',
    area: '',
    location: { city: '', state: '' },
    isNegotiable: false,
    amenities: { parking: false, garden: false, pool: false, balcony: false },
  });
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === 'location') {
        data.append('location.city', form.location.city);
        data.append('location.state', form.location.state);
      } else if (k === 'amenities') {
        data.append('amenities.parking', form.amenities.parking);
        data.append('amenities.garden', form.amenities.garden);
        data.append('amenities.pool', form.amenities.pool);
        data.append('amenities.balcony', form.amenities.balcony);
      } else {
        data.append(k, v);
      }
    });
    for (const file of images) data.append('images', file);
    for (const file of documents) data.append('documents', file);

    try {
      await api.post('/properties', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg('Property created');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 720, margin: '0 auto' }}>
      <h2>Create Property</h2>
      {msg && <div style={{ color: 'green' }}>{msg}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div style={{ display: 'grid', gap: 12 }}>
          <input name="title" placeholder="Title" value={form.title} onChange={onChange} required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={onChange} required />
          <select name="type" value={form.type} onChange={onChange} className="">
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
            <option value="office">Office</option>
            <option value="agricultural">Agricultural</option>
            <option value="recreational">Recreational</option>
          </select>
          <select name="category" value={form.category} onChange={onChange}>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
            <option value="new">New Launch</option>
            <option value="commercial">Commercial</option>
            <option value="plots">Plot Property</option>
          </select>
          <input name="price" placeholder="Price" type="number" value={form.price} onChange={onChange} required />
          <input name="area" placeholder="Area" type="number" value={form.area} onChange={onChange} required />
          <input placeholder="City" value={form.location.city} onChange={(e) => setForm({ ...form, location: { ...form.location, city: e.target.value } })} required />
          <input placeholder="State" value={form.location.state} onChange={(e) => setForm({ ...form, location: { ...form.location, state: e.target.value } })} required />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8 }}>
            {[
              {k:'parking',label:'Parking'},
              {k:'garden',label:'Garden'},
              {k:'pool',label:'Swimming Pool'},
              {k:'balcony',label:'Balcony'}
            ].map(a => (
              <label key={a.k} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" checked={!!form.amenities[a.k]} onChange={(e)=> setForm({ ...form, amenities: { ...form.amenities, [a.k]: e.target.checked } })} />
                {a.label}
              </label>
            ))}
          </div>
          <div>
            <label>Images</label>
            <input type="file" multiple accept="image/*" onChange={(e) => setImages(Array.from(e.target.files))} />
          </div>
          <div>
            <label>Documents</label>
            <input type="file" multiple onChange={(e) => setDocuments(Array.from(e.target.files))} />
          </div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}


