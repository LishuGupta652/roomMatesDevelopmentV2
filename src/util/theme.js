import red from '@material-ui/core/colors/red'

export default {
    palette: {
      primary: red,
      secondary: {
        main: '#303f9f',
      },
    },
    typography:{
      userNextVariants: true
    },
    form: {
      textAlign: "center"
  },
  image: {
      width: 50,
      height: 50,
      margin: '10px auto 10px auto'
  },
  pageTitle: {
      margin: '10px auto 10px auto'
  },
  textField: {
      margin: '10px auto 10px auto'
  }, 
  button: {
      marginTop : 20,
      position: 'relative'
  },
  customError: {
      color: 'red',
      fontSize:'0.8rem',
      marginTop: 15
  },
  progress:{
      position: 'absolute'
  }
}