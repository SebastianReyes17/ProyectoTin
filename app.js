"use strict";
const g = 9.81;
// Factorial
function factorialCalc(n) {
    let f = 1;
    for (let i = 1; i <= n; i++) {
        f *= i;
    }
    return f;
}
// Seno con Taylor
function senoTaylor(x, n) {
    let resultado = 0;
    let signo = 1;
    for (let i = 0; i < n; i++) {
        let potencia = Math.pow(x, 2 * i + 1);
        let factorial = factorialCalc(2 * i + 1);
        resultado += signo * (potencia / factorial);
        signo *= -1;
    }
    return resultado;
}
// Método de Euler
function euler(theta0, omega0, L, h, tiempo, nTaylor) {
    let t = 0;
    let theta = theta0;
    let omega = omega0;
    let resultados = [];
    while (t <= tiempo) {
        resultados.push({ t, theta, omega });
        let dtheta = omega;
        let domega = -(g / L) * senoTaylor(theta, nTaylor);
        theta = theta + h * dtheta;
        omega = omega + h * domega;
        t += h;
    }
    return resultados;
}
// Ejecutar simulación
function ejecutar() {
    let datos = euler(0.5, // θ inicial
    0, // ω inicial
    1, // longitud
    0.1, // paso
    5, // tiempo
    5 // Taylor
    );
    let texto = "";
    // 🔥 SOLO 5 RESULTADOS
    datos.slice(0, 5).forEach(d => {
        texto += `t=${d.t.toFixed(2)} | θ=${d.theta.toFixed(4)} | ω=${d.omega.toFixed(4)}\n`;
    });
    document.getElementById("output").textContent = texto;
}
