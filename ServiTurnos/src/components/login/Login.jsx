const Login = () => {
//comentario prueba
    return (

        <>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="user">Usuario:</Form.Label>
                <Form.Control
                    type="text"
                    id="user"
                />
                <Form.Label htmlFor="password">Contraseña:</Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                />
            </Form.Group>

            <Button variant="primary">Ingresar</Button>{' '}
            <Button variant="primary">Registrarse</Button>{' '}

        </>

    )
}

export default Login;