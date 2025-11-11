import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function PropertyEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/properties/${id}`).then((res) => {
      const p = res.data.property;
      setForm({
        title: p.title,
        description: p.description,
        type: p.type || 'residential',
        price: p.price,
        area: p.area,
        location: { city: p.location?.city || '', state: p.location?.state || '' },
        isNegotiable: p.isNegotiable || false,
      });
    }).catch((e) => setError(e?.response?.data?.message || 'Failed to load'));
  }, [id]);

  if (!form) return <div className="max-w-6xl mx-auto px-4 py-8">Loading...</div>;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(''); setError('');
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === 'location') {
        data.append('location.city', form.location.city);
        data.append('location.state', form.location.state);
      } else {
        data.append(k, v);
      }
    });
    for (const f of images) data.append('images', f);
    for (const f of documents) data.append('documents', f);
    try {
      await api.put(`/properties/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg('Updated');
      navigate(`/properties/${id}`);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
      {msg && <div className="text-green-600 mb-2">{msg}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={onSubmit} className="grid gap-3">
        <input name="title" value={form.title} onChange={onChange} className="px-3 py-2 border rounded" />
        <textarea name="description" value={form.description} onChange={onChange} className="px-3 py-2 border rounded" />
        <select name="type" value={form.type} onChange={onChange} className="px-3 py-2 border rounded">
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="industrial">Industrial</option>
          <option value="office">Office</option>
          <option value="agricultural">Agricultural</option>
          <option value="recreational">Recreational</option>
        </select>
        <input type="number" name="price" value={form.price} onChange={onChange} className="px-3 py-2 border rounded" />
        <input type="number" name="area" value={form.area} onChange={onChange} className="px-3 py-2 border rounded" />
        <input placeholder="City" value={form.location.city} onChange={(e) => setForm({ ...form, location: { ...form.location, city: e.target.value } })} className="px-3 py-2 border rounded" />
        <input placeholder="State" value={form.location.state} onChange={(e) => setForm({ ...form, location: { ...form.location, state: e.target.value } })} className="px-3 py-2 border rounded" />
        <div>
          <label className="block text-sm">Add Images</label>
          <input type="file" multiple accept="image/*" onChange={(e) => setImages(Array.from(e.target.files))} />
        </div>
        <div>
          <label className="block text-sm">Add Documents</label>
          <input type="file" multiple onChange={(e) => setDocuments(Array.from(e.target.files))} />
        </div>
        <button type="submit" className="px-4 py-2 rounded bg-slate-900 text-white w-max">Save</button>
      </form>
    </div>
  );
}


