import { useEffect, useState } from 'react';
import './SideBar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  
  // State to manage the open/close of the sub-menu
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

  const closeSidebar = () => {
    toggleSidebar(); // Toggle the sidebar state in the parent component
  };

  // Function to toggle the sub-menu
  const toggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      {/* Open Button */}
      <div className={`open-btn-container ${isOpen ? 'hidden' : ''}`}>
        <button className="open-btn" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className="close-btn" onClick={closeSidebar}>
          &times;
        </button>
        <div className="sidebar-menu">
          <div className="sidebar-item" onClick={() => navigate('/')}>
            <span>Home</span>
          </div>
          <div className="sidebar-item" onClick={() => navigate('/buildingPg')}>
                <span>Create Building</span>
          </div>
          
          <div className="sidebar-item" onClick={toggleSubMenu}>
            <span>Define Organization     </span>
            <span className="submenu-arrow">{isSubMenuOpen ? '▲' : '▼'}</span> 
          </div>

          {/* Sub-menu items */}
          {isSubMenuOpen && (
            <div className="submenu">
              <div className="sidebar-subitem" onClick={() => navigate('/functionPg')}>
                <span>Assign Functions</span>
              </div>
              <div className="sidebar-subitem" onClick={() => navigate('/jobPg')}>
                <span>Assign Jobs</span>
              </div>
              <div className="sidebar-subitem" onClick={() => navigate('/processPg')}>
                <span>Assign Process and Tasks</span>
              </div>
            </div>
          )}
          <div className="sidebar-item" onClick={() => navigate('/business_diagram')}>
            <span>Business Flow Diagram</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
