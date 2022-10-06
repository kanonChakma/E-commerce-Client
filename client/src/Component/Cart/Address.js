import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Avatar, Button, CssBaseline, Grid, TextareaAutosize, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: 'white'
    }
  },
  paper: {
    padding:"10px 20px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Address = ({data,nextStep,handleChange}) => {
  const dispatch=useDispatch();
  const { firstName, lastName, email, phone, address1, address2,information } = data;
  const classes = useStyles();


    const handleSaveAdress=(e)=>{
      e.preventDefault();
       dispatch({
        type:"ADD_ADDRESS",
        payload:data
      })
        toast.success("address saved")
        nextStep()
     }

  return(
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <ContactMailIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
         Enter Your Address
      </Typography>
      <form className={classes.form} onSubmit={handleSaveAdress}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="first name"
              onChange={handleChange}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            size="small"
              variant="outlined"
              fullWidth
              id="lastName"
              label="last name"
              name="lastName"
              autoComplete="lname"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              variant="outlined"
              required
              fullWidth
              id="address1"
              label="Address1"
              name="address1"
              autoComplete="address1"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              variant="outlined"
              fullWidth
              id="address2"
              label="Address2"
              name="address2"
              autoComplete="address2"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            size="small"
            fullWidth
            id="number"
            type="number"
            label="phone number"
            name="phone"
            autoComplete="phone"
            onChange={handleChange}
          />
        </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              variant="outlined"
              required
              fullWidth
              type='email'
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              size="small"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
           <TextareaAutosize
              variant="outlined"
              minRows={3}
              name="information"
              style={{ width: "100%" }}
              onChange={handleChange}
              placeholder="Additional information"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Send Address
        </Button>
      </form>
    </div>
  </Container>
  )
}

export default Address;


