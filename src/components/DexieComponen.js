import React, { useEffect, useState } from 'react';
import db from '../utils/db';

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null); // To track the item being edited

  const loadItems = async () => {
    const data = await db.items.toArray();
    setItems(data);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result); // Store base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = async () => {
    if (name && description && image) {
      await db.items.add({ name, description, image });
      resetForm();
      loadItems();
    } else {
      alert('Please fill out all fields and upload an image.');
    }
  };

  const updateItem = async () => {
    if (editingItemId && name && description && image) {
      await db.items.update(editingItemId, { name, description, image });
      resetForm();
      loadItems();
    } else {
      alert('Please fill out all fields and upload an image.');
    }
  };

  const deleteItem = async (id) => {
    await db.items.delete(id);
    loadItems();
  };

  const startEditing = (item) => {
    setEditingItemId(item.id);
    setName(item.name);
    setDescription(item.description);
    setImage(item.image);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setImage(null);
    setEditingItemId(null);
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Dexie.js with IndexedDB</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 border rounded-md"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 mb-2"
        />
        {editingItemId ? (
          <button
            onClick={updateItem}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Update Item
          </button>
        ) : (
          <button
            onClick={addItem}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Add Item
          </button>
        )}
        {editingItemId && (
          <button
            onClick={resetForm}
            className="w-full mt-2 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
          >
            Cancel Editing
          </button>
        )}
      </div>

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border-b py-4"
          >
            <div>
              <strong className="block text-lg font-semibold">{item.name}</strong>
              <span className="block text-gray-600">{item.description}</span>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="mt-2 w-24 h-24 object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => startEditing(item)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
