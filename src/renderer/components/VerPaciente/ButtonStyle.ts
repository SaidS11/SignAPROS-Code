/* import { makeStyles, createStyles } from "@material-ui/core/styles";

const TableStylesList = makeStyles(() =>
  createStyles({
    headerRow: {
      height: "35px",
      borderBottom: "1px solid #d7d7d7",
      borderTop: "1px solid #d7d7d7",
      paddingLeft: "10px",
      paddingRight: "10px",
      display: "flex",
    },
    secondRow: {
      display: "flex",
      marginLeft: "auto",
      whiteSpace: "nowrap",
    },
    btn: {
      border: "1px solid #ccc",
      backgroundColor: "#f4f4f4",
      color: "#312e2e",
      minWidth: "initial",
      height: "30px",
      borderRadius: "0",
      padding: "0px 10px",
      minHeight: "initial",
      lineHeight: "initial",
      marginTop: "3px",
      marginBottom: "3px",
      textTransform: "unset",
      "&:hover": {
        backgroundColor: "rgba(158,158,158,0.2)",
      },
    },
    btnConfig: {
      border: "1px solid #ccc",
      backgroundColor: "white",
      color: "#312e2e",
      minWidth: "initial",
      height: "30px",
      borderRadius: "0",
      padding: "0px 10px",
      minHeight: "initial",
      lineHeight: "initial",
      marginTop: "3px",
      marginBottom: "3px",
      marginLeft: "10px",
      textTransform: "unset",
      "&:hover": {
        backgroundColor: "rgba(158,158,158,0.2)",
      },
    },
    btnDialog: {
      backgroundColor: "white",
      color: "#312e2e",
      minWidth: "initial",
      height: "10px",
      minHeight: "initial",
      lineHeight: "initial",
      marginTop: "3px",
      marginBottom: "3px",
      marginLeft: "10px",
      float: "right",
    },
    btnExpand: {
      border: "1px solid #ccc",
      backgroundColor: "#f4f4f4",
      color: "#312e2e",
      minWidth: "initial",
      height: "30px",
      borderRadius: "0",
      padding: "0px 10px",
      minHeight: "initial",
      lineHeight: "initial",
      marginTop: "3px",
      marginBottom: "3px",
      textTransform: "unset",
      marginLeft: "auto",
      "&:hover": {
        backgroundColor: "white",
      },
    },
    btnSelected: {
      backgroundColor: "#c7c7c7",
    },
    btnBlue: {
      border: "1px solid #ccc",
      backgroundColor: "#4372ca",
      color: "white",
      minWidth: "initial",
      height: "30px",
      borderRadius: "0",
      padding: "0px 10px",
      minHeight: "initial",
      lineHeight: "initial",
      marginTop: "3px",
      marginBottom: "3px",
      marginLeft: "10px",
      textTransform: "unset",
      "&:hover": {
        transform: "scale(1.1)",
        backgroundColor: "#4372ca",
        color: "#fff",
      },
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      tableLayout: "fixed",
    },
    tableHeader: {
      border: "solid #d7d7d7",
      borderWidth: "1px",
      background: "white",
      color: "black",
      fontWeight: "bold",
      textAlign: "left",
      height: "28px",
      paddingLeft: "8px",
      position: "sticky",
      top: "0",
      margin: "0 0 0 0",
    },
    tableElementOdd: {
      backgroundColor: "white",
      border: "1px solid #d7d7d7",
      paddingLeft: "8px",
      height: "30px",
      "&:hover": {
        backgroundColor: "#90C2E7",
      },
      "&>*": {
        paddingLeft: "8px",
      },
    },
    tableElementEven: {
      backgroundColor: "#FCF7F8",
      border: "1px solid #d7d7d7",
      paddingLeft: "8px",
      height: "30px",
      "&:hover": {
        backgroundColor: "#90C2E7",
      },
      "&>*": {
        paddingLeft: "8px",
      },
    },
    input: {
      height: "30px",
      minHeight: "30px",
      border: "1px solid #ccc",
      borderRadius: "0",
      backgroundColor: "white",
      fontSize: "13px",
      fontWeight: "normal",
      lineHeight: "30px",
      boxSizing: "border-box",
      padding: "0px 10px",
      zIndex: 1,
      width: "185px",
      marginTop: "3px",
      marginBottom: "3px",
    },
    vertical: {
      border: "none",
      borderLeft: "1px solid #d7d7d7",
      height: "100%",
      width: "1px",
      margin: "0px 9px",
    },
    separator: {
      paddingLeft: "10%",
    },
  }),
);

export default TableStylesList;
 */

const styleButton = {
  border: '1px solid #ccc',
  backgroundColor: '#4372ca',
  color: 'white',
  minWidth: 'initial',
  height: '30px',
  borderRadius: '10',
  padding: '0px 10px',
  minHeight: 'initial',
  lineHeight: 'initial',
  marginTop: '3px',
  marginBottom: '3px',
  marginLeft: '10px',
  textTransform: 'unset',
  '&:hover': {
    color: '#4372ca',
    transform: "scale(1.05)",
    borderColor: "#4372ca"
  },
};

export const styleButtonBigger = {
  border: '1px solid #ccc',
  backgroundColor: '#4372ca',
  color: 'white',
  minWidth: 'initial',
  height: '40px',
  borderRadius: '10',
  padding: '0px 10px',
  minHeight: 'initial',
  lineHeight: 'initial',
  marginTop: '3px',
  marginBottom: '3px',
  marginLeft: '10px',
  textTransform: 'unset',
  '&:hover': {
    color: '#4372ca',
    transform: "scale(1.05)",
    borderColor: '#4372ca',


  },
};

export const styleButtonBiggerRed = {
  border: '1px solid #ccc',
  backgroundColor: '#d90429',
  color: 'white',
  minWidth: 'initial',
  height: '40px',
  borderRadius: '10',
  padding: '0px 10px',
  minHeight: 'initial',
  lineHeight: 'initial',
  marginTop: '3px',
  marginBottom: '3px',
  marginLeft: '10px',
  textTransform: 'unset',
  '&:hover': {
    color: 'red',
    backgroundColor: 'white',
    transform: "scale(1.05)",
    borderColor: 'red',


  },
};

export const styleButtonBiggerGreen = {
  border: '1px solid #ccc',
  backgroundColor: '#70e000',
  color: 'white',
  minWidth: 'initial',
  height: '40px',
  borderRadius: '10',
  padding: '0px 10px',
  minHeight: 'initial',
  lineHeight: 'initial',
  marginTop: '3px',
  marginBottom: '3px',
  marginLeft: '10px',
  textTransform: 'unset',
  '&:hover': {
    transform: "scale(1.05)",
    color: '#70e000',
    backgroundColor: 'white',
    borderColor: '#70e000',
  },
};

export const styleButtonLogin = {
  backgroundColor: "white",
  textTransform: "none",
  padding:"10px 20px",
  borderRadius: "10px",
  border: "none",
  appearance: "none",
  fontSize: "1.3rem",
  boxShadow: "0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)",
  transition: "all ease-in 0.1s",
  cursor: "pointer",
  opacity: "0.9",
  '&:hover': {
    transform: "scale(1.05)",
    opacity: "1",
  }
};

export const styleButtonMenuInicial = {
  fontSize: '25px', 
  border: '1px solid black', 
  backgroundColor: 'rgb(18,10,143)', 
  color: 'white', 
  width: '400px', 
  borderRadius: '20px',
  '&:hover': {
    transform: "scale(1.05)",
    backgroundColor: "white",
    color: "rgb(18,10,143)",
    borderColor: "rgb(18,10,143)"
  }
};


export const styleButtonVisibility = {

  '&:hover': {
    backgroundColor: "transparent",
  },
  '&:active': {
    backgroundColor: "transparent",
  },
  '&:focus': {
    backgroundColor: "transparent",
  }
}; 
export const checkBoxConfigRitmo = {
  // marginLeft: '280px',
  display: 'inline-block',
  '&:>': {
    display: 'inline-block',
  },
};

export const checkBoxConfig = {
  display: 'block',
  height: '28.8px',
  margin: '0px 0px 8px',
  paddingBottom: '0px',
  paddingTop: '0px',
};

export const checkBoxConfigGsr = {
  marginLeft: '330px',
};

export const checkBoxConfigAcelerometro = {
  marginLeft: '303px',
};

export default styleButton;


export const styleAddIcon = {
  cursor: "pointer",
  color: "green",
  transform: "scale(1.1)",
  '&:hover': {
    transform: "scale(1.3)",
  },
};