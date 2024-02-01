import { useContext, useState } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import Menu from '@mui/material/Menu';
import style from './AccountMenu.module.css'
import { Avatar, Box, IconButton, ListItemIcon, MenuItem, Tooltip} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoutButton from './LogoutButton';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const authContext = useContext(AuthContext);

  const user = authContext?.user;

  const userInitial = user?.usuario.email ? user.usuario.email.charAt(0).toUpperCase() : '';
  

  return (
        <><Box className={style.menu}>
          <Tooltip title="Configurações de conta">
              <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
              >
                  <Avatar className={style.btn}>{userInitial}</Avatar>
              </IconButton>
          </Tooltip>
      </Box><>
              <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  className={style.menu}
                  slotProps={{
                    paper: {
                        className: style.customPaper,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            bgcolor: '#222',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&::before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: '#222',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                        }
                    }}
              >
                  <MenuItem className={style.menuItem} onClick={handleClose}>
                    <ListItemIcon>
                        <LogoutIcon className={style.iconLogout} fontSize="small" />
                    </ListItemIcon>
                    <LogoutButton />
                    </MenuItem>

              </Menu>
          </></>
    );
}
