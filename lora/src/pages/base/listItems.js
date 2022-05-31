import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useKeycloak } from '@react-keycloak/web';



export function SecondaryListItems() {
  const { keycloak, initialized } = useKeycloak();
  return (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Usuario
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Cerrar Sesión" onClick={()=> {
        keycloak.logout();
      }} />
    </ListItemButton>
    
  </React.Fragment>
  )
}
