import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function ServerError() {
    const navigate = useNavigate();
    const { state } = useLocation();

    return (
        <Container component={Paper}>
            {state?.error ? (
                <>
                <Typography gutterBottom variant="h3" color='secondary'>
                    {state.error.title}
                </Typography>
                <Divider />
                <Typography variant="body1">{state.error.detail || 'Internal server error'}</Typography>
                </>
            ) : (
                <Typography variant='h5' gutterBottom>ServerError</Typography>
            )}

            <Button onClick={() => navigate('/catalog')}>Go back to the store</Button>
        </Container>
    )
}