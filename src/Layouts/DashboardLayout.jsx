// src/layouts/DashboardLayout.jsx
import Header from "../components/Header";


export default function DashboardLayout({ children }) {
  return (
    // Remplacer <Flex> par <div className="app-layout"> ou simplement <div>
    <div className="dashboard-layout"> 

      {/* Remplacer <Box> par <div> */}
      <div className="content-area"> 
        <Header />
        
        {/* Remplacer <Box p={8}> par <div> avec une classe pour le padding */}
     <div className="main-content-padding">
            {children}
        </div>
      </div>
    </div>
  );
}


