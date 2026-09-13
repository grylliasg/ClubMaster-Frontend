import { Box, Button, Container, Paper, Typography } from "@mui/material"

function FormCard({ title, onBack, backLabel, onSubmit, submitLabel = "Submit", children }) {
    return (
        <Container maxWidth="sm" sx={{ py: 4, textAlign: "left" }}>
            {onBack && (
                <Button
                    variant="outlined"
                    onClick={onBack}
                    sx={{ mb: 2, textTransform: "none" }}
                >
                    {backLabel}
                </Button>
            )}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, sm: 4 },
                    borderRadius: 3,
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 10px 30px -12px rgba(15, 23, 42, 0.18)",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{ mb: 3, fontWeight: 700, color: "#0f172a" }}
                >
                    {title}
                </Typography>
                <Box
                    component="form"
                    onSubmit={(event) => {
                        event.preventDefault()
                        onSubmit?.()
                    }}
                    sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                    {children}
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 1,
                            py: 1.3,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 700,
                            bgcolor: "#0f766e",
                            boxShadow: "none",
                            "&:hover": {
                                bgcolor: "#0d9488",
                                boxShadow: "none",
                            },
                        }}
                    >
                        {submitLabel}
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default FormCard
