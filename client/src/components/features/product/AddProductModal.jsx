import {
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

// תמיכה ב-RTL
const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export function AddProductModal({ open, handleClose, handleSubmit, addCategory, setAddCategory }) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2" sx={{ mb: 2, direction:"ltr" }}>
              הוספת מוצר חדש
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Select
                value={addCategory}
                onChange={(e) => setAddCategory(e.target.value)}
                name="category"
                fullWidth
                sx={{direction:"ltr"}}
              >
                <MenuItem value="ice cream">גלידות</MenuItem>
                <MenuItem value="drinks">משקאות</MenuItem>
                <MenuItem value="shakes">שייקים</MenuItem>
                <MenuItem value="ices">אייסים</MenuItem>
              </Select>

              <TextField
                name="description"
                label="תיאור"
                multiline
                required
              />

              <TextField
                name="price"
                label="מחיר"
                type="number"
                inputProps={{ step: "0.01" }}
                required
              />

              <TextField
                name="imgUrl"
                label="כתובת תמונה (URL)"
                type="text"
                required
              />

              <Button type="submit" variant="contained" sx={{
                color: "#1a3328",
                borderColor: "#1a3328",
                backgroundColor: "#ffffff",
                border:"1px solid",
                '&:hover': {
                  backgroundColor: "#e8f5e9",
                  border:"1px solid",
                  borderColor: "#1a3328",
                }
              }}>
                הוסף מוצר
              </Button>
            </form>
          </Box>
        </Modal>
      </ThemeProvider>
    </CacheProvider>
  );
}