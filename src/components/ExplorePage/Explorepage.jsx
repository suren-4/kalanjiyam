import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import React, { useState, useEffect, useRef } from 'react';
import './Explorepage.css'
import ArrowButton from '../common/ArrowButton';

const supabase = createClient('https://hdsnhnhsanfswdlxwhfy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkc25obmhzYW5mc3dkbHh3aGZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MzMwNTQsImV4cCI6MjA1NjUwOTA1NH0.4Gkp9jmL3mZQBrCfO4VK8ORe-paVDzsg3VNSGvxj00Q');


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

  const fetchArtifacts = async (pageNumber) => {
    setLoading(true);
    try {
      let { data, error } = await supabase
        .from('artifacts')
        .select('id, title, image_url, description')
        .range(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage - 1)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data.length < itemsPerPage) {
        setHasMore(false);
      }
      
      if (pageNumber === 0) {
        setArtifacts(data);
        setFilteredArtifacts(data);
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
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArtifacts(nextPage);
  };

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
        <div className="skeleton-img"></div>
        <div className="skeleton-text"></div>
      </div>
    ));
  };

  return (
    <div className="gallery-container">
      <ArrowButton onClick={() => navigate('/')} />
      
      <div className="gallery-header">
        <h2>Explore Artifacts</h2>
      </div>
      
      <div className="search-filter-container">
        <div className="search-container">
          <input
            type="text"
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
              ×
            </button>
          )}
        </div>
      </div>
      
      <div className="gallery-content" ref={contentRef}>
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
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
