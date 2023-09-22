import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Card from '../Card/App';
import CardList from '../demo/VolunteerList';
import Admin from '../Volunteer/App';
import Search from '../search/App';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import {
  AccountBox,
  Article,
  Group,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
} from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import UserSearchForm from '../search/UserSearchForm';
import UserList from '../search/UserList';
import axios from 'axios';
import {
  getAllVolunteers
} from '../Volunteer/VolunteerService';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [query , setQuery] = useState("");
  const [data , setData] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  
  const searchUsers = async (userName) => {
    
    try {
      if (userName.length === 0 ) {
        // Agar userName bo'sh bo'lsa, bo'sh ro'yxatni ko'rsatish uchun users ni tozalab tashlash
        const response = await getAllVolunteers();
        setUsers(response.data);

        setSelectedComponent(null); // Selected componentni tozalab tashlash
        return;
      }

      const response = await fetch(`http://localhost:8080/api/volunteers/search?userName=${userName}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
   
      
        if (selectedComponent === null) {
          setUsers(data);
        }
        else if (selectedComponent.type === CardList) {
          setUsers(data);
          setSelectedComponent(<CardList users={data} />);
        } else if (selectedComponent.type === Admin) {
          setUsers(data);
          setSelectedComponent(<Admin users={data} />);
        }
      } else {
        console.error('Something went wrong while fetching users.');
      }
    } catch (error) {
      console.error('Error occurred during API call:', error);
    }

 
  };
  // if (userName.length === 0 || userName.length > 2) {
  //   searchUsers('');
  // }


  const handleItemClick = (component) => {
   // setSelectedComponent();
    setSelectedComponent(component);
  
  };

  const clearUsers = () => {
    setUsers([]);
    if (selectedComponent === null) {
      setUsers(users);
    }

    else if (selectedComponent === null || selectedComponent.type === CardList) {
      setSelectedComponent(<CardList users={[]} />)
    } else if (selectedComponent.type === Admin) {
      setSelectedComponent(<Admin users={[]} />)
    }
  };


  console.log(users);

  const items = [
    { text: 'Admin', icon: <AdminPanelSettingsRoundedIcon />, component: <Admin users={users}/> },
    { text: 'Members', icon: <Group />, component: <CardList users={users} /> }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ height: "80px" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container>
            <Grid item xs={2}><Typography marginTop={1} variant="h6" noWrap component="div">
              Persistent drawer
            </Typography></Grid>
            <Grid item xs={10}><div style={{ marginTop: "2px", right: "10px", float: "right" }}>
              <UserSearchForm onSearch={searchUsers} onClear={clearUsers}/>
            </div></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <>aa</>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {items.map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton
                selected={selectedComponent === item.component}
                onClick={() => handleItemClick(item.component)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding >
            <ListItemButton
              onClick={handleLogout}
            >
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {selectedComponent}
      
      </Main>
    </Box>
  );
}

