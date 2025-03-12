import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import React, { useState, useEffect, useRef } from 'react';
import './Explorepage.css'
import ArrowButton from '../common/ArrowButton';

const supabase = createClient('https://hdsnhnhsanfswdlxwhfy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkc25obmhzYW5mc3dkbHh3aGZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MzMwNTQsImV4cCI6MjA1NjUwOTA1NH0.4Gkp9jmL3mZQBrCfO4VK8ORe-paVDzsg3VNSGvxj00Q');

<<<<<<< HEAD
=======

>>>>>>> 01f96106f45b7a2ca71ef42d9fd917b717373629
const Explorepage = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [filteredArtifacts, setFilteredArtifacts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef(null);
  
  const itemsPerPage = 12;
  const navigate = useNavigate();

<<<<<<< HEAD
  useEffect(() => {
    fetchArtifacts(0);
  }, []);
  
  // Apply filters whenever search term changes
  useEffect(() => {
    if (artifacts.length > 0) {
      setFilteredArtifacts(applyFilters(artifacts, searchTerm));
    }
  }, [searchTerm, artifacts]);

=======
>>>>>>> 01f96106f45b7a2ca71ef42d9fd917b717373629
  const fetchArtifacts = async (pageNumber) => {
    setLoading(true);
    try {
      let { data, error } = await supabase
        .from('artifacts')
<<<<<<< HEAD
        .select('id, title, image_url, description, material, period_era, location')
=======
        .select('id, title, image_url, description')
>>>>>>> 01f96106f45b7a2ca71ef42d9fd917b717373629
        .range(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage - 1)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data.length < itemsPerPage) {
        setHasMore(false);
      }
      
      if (pageNumber === 0) {
        setArtifacts(data);
<<<<<<< HEAD
        setFilteredArtifacts(applyFilters(data, searchTerm));
=======
        setFilteredArtifacts(data);
>>>>>>> 01f96106f45b7a2ca71ef42d9fd917b717373629
      } else {
        setArtifacts(prev => {
          const newData = [...prev, ...data];
          setFilteredArtifacts(applyFilters(newData, searchTerm));
          return newData;
        });
      }
    } catch (error) {
      console.error('Error fetching artifacts:', error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

<<<<<<< HEAD
  const applyFilters = (items, term) => {
    if (!term) return items;
    
    const searchLower = term.toLowerCase();
    return items.filter(item => {
      // Search across all relevant fields
      return (
        (item.title && item.title.toLowerCase().includes(searchLower)) || 
        (item.description && item.description.toLowerCase().includes(searchLower)) ||
        (item.material && item.material.toLowerCase().includes(searchLower)) ||
        (item.period_era && item.period_era.toLowerCase().includes(searchLower)) ||
        (item.location && item.location.toLowerCase().includes(searchLower))
      );
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
=======
  useEffect(() => {
    fetchArtifacts(0);
    
    const handleScroll = () => {
      if (contentRef.current) {
        setShowScrollTop(contentRef.current.scrollTop > 300);
      }
    };
    
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const applyFilters = (artifacts, search) => {
    if (!search) return artifacts;
    
    const searchLower = search.toLowerCase();
    return artifacts.filter(artifact => 
      artifact.title?.toLowerCase().includes(searchLower) || 
      artifact.description?.toLowerCase().includes(searchLower)
    );
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredArtifacts(applyFilters(artifacts, value));
>>>>>>> 01f96106f45b7a2ca71ef42d9fd917b717373629
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArtifacts(nextPage);
  };

<<<<<<< HEAD
  const handleScroll = () => {
    if (contentRef.current) {
      setShowScrollTop(contentRef.current.scrollTop > 300);
    }
  };

  const scrollToTop = () => {
    contentRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const renderSkeletons = () => {
    return Array(12).fill(0).map((_, index) => (
      <div key={index} className="artifact-card skeleton">
=======
  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const renderSkeletons = () => {
    return Array(itemsPerPage).fill(0).map((_, index) => (
      <div key={`skeleton-${index}`} className="artifact-card skeleton">
>>>>>>> 01f96106f45b7a2ca71ef42d9fd917b717373629
        <div className="skeleton-img"></div>
        <div className="skeleton-text"></div>
      </div>
    ));
  };

  return (
    <div className="gallery-container">
<<<<<<< HEAD
      <ArrowButton onClick={() => navigate(-1)} />
=======
      <ArrowButton onClick={() => navigate('/')} />
>>>>>>> 01f96106f45b7a2ca71ef42d9fd917b717373629
      
      <div className="gallery-header">
        <h2>Explore Artifacts</h2>
      </div>
      
      <div className="search-filter-container">
        <div className="search-container">
          <input
            type="text"
<<<<<<< HEAD
            className="search-input"
            placeholder="Search by title, material, period, location..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <button className="clear-search" onClick={clearSearch}>
=======
            placeholder="Search artifacts..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search" 
              onClick={() => {
                setSearchTerm('');
                setFilteredArtifacts(artifacts);
              }}
            >
>>>>>>> 01f96106f45b7a2ca71ef42d9fd917b717373629
              ×
            </button>
          )}
        </div>
      </div>
      
<<<<<<< HEAD
      <div className="gallery-content" ref={contentRef} onScroll={handleScroll}>
=======
      <div className="gallery-content" ref={contentRef}>
>>>>>>> 01f96106f45b7a2ca71ef42d9fd917b717373629
        {initialLoading ? (
          <div className="artifact-grid">
            {renderSkeletons()}
          </div>
        ) : filteredArtifacts.length > 0 ? (
          <div className="artifact-grid">
            {filteredArtifacts.map((artifact) => (
              <div 
                key={artifact.id} 
                className="artifact-card"
                onClick={() => navigate(`/artifact/${artifact.id}`)}
              >
                <img src={artifact.image_url} alt={artifact.title} />
                <div className="artifact-card-overlay">
                  <p className="artifact-title">{artifact.title}</p>
<<<<<<< HEAD
                  {searchTerm && artifact.material && artifact.material.toLowerCase().includes(searchTerm.toLowerCase()) && (
                    <span className="artifact-material-badge">Material: {artifact.material}</span>
                  )}
=======
>>>>>>> 01f96106f45b7a2ca71ef42d9fd917b717373629
                </div>
              </div>
            ))}
          </div>
        ) : (
<<<<<<< HEAD
          <div className="no-results">
            <h3>No artifacts found matching "{searchTerm}"</h3>
            <button className="reset-button" onClick={clearSearch}>
              Clear Search
            </button>
          </div>
=======
          <div></div>
>>>>>>> 01f96106f45b7a2ca71ef42d9fd917b717373629
        )}
        
        {hasMore && filteredArtifacts.length > 0 && !searchTerm && (
          <button 
            className="load-more-button"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Loading...
              </>
            ) : 'Load More'}
          </button>
        )}
      </div>
      
      {showScrollTop && (
        <button className="scroll-top-button" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Explorepage;
