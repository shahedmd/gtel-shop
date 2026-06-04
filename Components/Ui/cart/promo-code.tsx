'use client';

import { useState } from 'react';

export function PromoCode() {
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    if (code.trim()) {
      setApplied(true);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Promo Code
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter promo code"
          disabled={applied}
          className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
        {!applied ? (
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Apply
          </button>
        ) : (
          <button
            onClick={() => {
              setCode('');
              setApplied(false);
            }}
            className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg text-sm hover:bg-gray-400 transition"
          >
            Remove
          </button>
        )}
      </div>
      {applied && (
        <p className="text-sm text-green-600 mt-2">✓ Promo code applied</p>
      )}
    </div>
  );
}
