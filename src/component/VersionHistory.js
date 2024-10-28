// Import useState for filter functionality
import React, { useState } from 'react';
import { versionHistory } from './Version';
import './About.css';

const VersionHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter version history by search term and reverse order for latest first
  const filteredHistory = versionHistory
    .filter((version) => version.version.includes(searchTerm))
    .reverse(); // Reverse the array to show latest version first

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        <i className="fas fa-star text-primary me-2"></i> Version Release History
      </h2>
      {/* Search Input */}
      <div className="text-center mb-4">
        <input
          type="text"
          placeholder="Search by version..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control w-50 mx-auto"
        />
      </div>

      {/* Version List */}
      {filteredHistory.map((version, index) => (
        <div key={index} className="card mb-4 shadow-sm border-primary">
          <div className="card-body">
            <h3 className="card-title text-primary">
              <i className="fas fa-check-circle text-success me-2"></i>
              Version {version.version} 
              {index === 0 && <span className="badge bg-success ms-2">Latest</span>}
            </h3>
            <p className="card-text">
              <i className="fas fa-calendar-alt text-secondary me-2"></i>
              Released on: <strong>{version.releaseDate}</strong>
            </p>
            <ul className="list-group list-group-flush">
              {version.features.map((feature, i) => (
                <li key={i} className="list-group-item">
                  <i className="fas fa-check-circle text-info me-2"></i>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VersionHistory;
