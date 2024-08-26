const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsing de parâmetros de consulta
app.use(express.json());

app.get('/calculate', (req, res) => {
    const { num1, num2, operation } = req.query;

    // Verifica se todos os parâmetros estão presentes
    if (num1 === undefined || num2 === undefined || operation === undefined) {
        return res.status(400).json({ error: 'Parâmetros insuficientes!' });
    }

    // Converte os parâmetros para números
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    // Verifica se os parâmetros são números válidos
    if (isNaN(number1) || isNaN(number2)) {
        return res.status(400).json({ error: 'Parâmetros inválidos!' });
    }

    let result;

    // Realiza a operação baseada no parâmetro 'operation'
    switch (operation) {
        case 'add':
            result = number1 + number2;
            break;
        case 'subtract':
            result = number1 - number2;
            break;
        case 'multiply':
            result = number1 * number2;
            break;
        case 'divide':
            if (number2 === 0) {
                return res.status(400).json({ error: 'Divisão por zero não é permitida!' });
            }
            result = number1 / number2;
            break;
        default:
            return res.status(400).json({ error: 'Operação inválida!' });
    }

    res.json({ result });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
})