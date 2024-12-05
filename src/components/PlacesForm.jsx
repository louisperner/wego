import React, { useState } from "react";
import { useScrapeStore } from "../store/ScraperStore";

const EventForm = () => {
  const store = useScrapeStore();
  const { create, setCreate } = store;

  const event = {
    id: "01JE203S1KXANTH145PRWEMRPR",
    name: "Festival Belford Roxo 2024",
    latitude: -22.736829,
    longitude: -43.388392,
    address:
      "R. Léia Barcelos, 192 - Parque Sao Bernardo, Belford Roxo - RJ, 26165-033",
    type: "festival",
    image:
      "https://s3-assets.bilheteriadigital.com/eventos/60294a.jpg?1730640518000",
    updateFromPlaces: false,
  };
  const [formData, setFormData] = useState(event);

  const handleChange = async (e) => {
    const { name, value, type, checked, image } = e.target;
    await setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  //   https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTmi5Xhy1BcEuuNWwNQ5L_7DQQlz1n5N3P3HqQuRG-Euk_eul5bQfXs3mwd1Q_CcOcbOVCHA7Tr9YSRtJdtJNULcQpiQ8dgLTVTRIaSgA4
  return (
    <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#d7dc54] p-[14px] w-[400px] h-[680px] rounded-[25px] drop-shadow-2xl z-50">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {formData.image && (
              <img
                src={formData.image}
                alt={formData.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            )}
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Imagem
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome do Evento
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Endereço
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="latitude"
                className="block text-sm font-medium text-gray-700"
              >
                Latitude
              </label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="longitude"
                className="block text-sm font-medium text-gray-700"
              >
                Longitude
              </label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="festival">Festival</option>
              <option value="show">Show</option>
              <option value="conference">Conferência</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="updateFromPlaces"
              name="updateFromPlaces"
              checked={formData.updateFromPlaces}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="updateFromPlaces"
              className="ml-2 block text-sm text-gray-700"
            >
              Atualizar de Lugares
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => setCreate(false)}
            className="w-full bg-[red] text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
