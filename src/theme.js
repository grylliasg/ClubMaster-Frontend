import { createTheme } from "@mui/material/styles"

const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
                fullWidth: true,
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: "#f8fafc",
                    borderRadius: 8,
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#cbd5e1",
                        borderWidth: 2,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#64748b",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#0f766e",
                        borderWidth: 2,
                    },
                },
                input: {
                    padding: "14px 14px",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    color: "#475569",
                    "&.Mui-focused": {
                        color: "#0f766e",
                        fontWeight: 700,
                    },
                },
            },
        },
    },
})

export default theme
