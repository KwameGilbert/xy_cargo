import React, { useEffect, useState, useRef } from 'react';

const AddressFormModal = ({ open, address, onClose, onSave }) => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    company: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
    isDefault: false,
  });

  useEffect(() => {
    if (address) setForm(address);
    else
      setForm({
        id: '',
        name: '',
        company: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: '',
        isDefault: false,
      });
  }, [address, open]);

  const nameRef = useRef(null);
  const line1Ref = useRef(null);
  const cityRef = useRef(null);
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation: require name and line1 and city
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Full name is required';
    if (!form.line1.trim()) nextErrors.line1 = 'Address line 1 is required';
    if (!form.city.trim()) nextErrors.city = 'City is required';

    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      if (firstError === 'name') nameRef.current?.focus();
      if (firstError === 'line1') line1Ref.current?.focus();
      if (firstError === 'city') cityRef.current?.focus();
      return;
    }

    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{form.id ? 'Edit Address' : 'Add New Address'}</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500">Full name</label>
            <input ref={nameRef} name="name" value={form.name} onChange={handleChange} className={`w-full border rounded-md px-3 py-2 ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'}`} />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="text-xs text-gray-500">Company</label>
            <input name="company" value={form.company} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-gray-500">Address line 1</label>
            <input ref={line1Ref} name="line1" value={form.line1} onChange={handleChange} className={`w-full border rounded-md px-3 py-2 ${errors.line1 ? 'border-red-300 bg-red-50' : 'border-gray-300'}`} />
            {errors.line1 && <p className="text-xs text-red-600 mt-1">{errors.line1}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-gray-500">Address line 2</label>
            <input name="line2" value={form.line2} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="text-xs text-gray-500">City</label>
            <input ref={cityRef} name="city" value={form.city} onChange={handleChange} className={`w-full border rounded-md px-3 py-2 ${errors.city ? 'border-red-300 bg-red-50' : 'border-gray-300'}`} />
            {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
          </div>
          <div>
            <label className="text-xs text-gray-500">State/Region</label>
            <input name="state" value={form.state} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Postal code</label>
            <input name="zip" value={form.zip} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Country</label>
            <input name="country" value={form.country} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-gray-500">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          <div className="flex items-center gap-2 md:col-span-2">
            <input id="isDefault" name="isDefault" type="checkbox" checked={!!form.isDefault} onChange={handleChange} />
            <label htmlFor="isDefault" className="text-sm text-gray-600">Set as default address</label>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md">Save Address</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressFormModal;
