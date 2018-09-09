import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiDialogActions: {
      root: {
        padding: '0 18px 18px'
      }
    }
  }
});

export default theme;