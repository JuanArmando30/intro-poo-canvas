const canvasOOP = document.getElementById("canvasOOP");
const canvasRandom = document.getElementById("canvasRandom");
const canvasMultiple = document.getElementById("canvasMultiple");

const ctx = canvasOOP.getContext("2d");
const ctxRandom = canvasRandom.getContext("2d");
const ctxMultiple = canvasMultiple.getContext("2d");

canvasOOP.height = "200";
canvasOOP.width = "300";

canvasRandom.height = "200";
canvasRandom.width = "300";

canvasMultiple.height = "200";
canvasMultiple.width = "300";

canvasOOP.style.background = "rgb(189, 255, 227)";
canvasRandom.style.background = "#e6f7f6";
canvasMultiple.style.background = "#fcfb97";

class Circle {
  constructor(x, y, radius, color, text, backcolor) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.backcolor = backcolor;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.backcolor;
    context.fill();

    context.lineWidth = 5;
    context.strokeStyle = this.color;
    context.stroke();

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 20px cursive";
    context.fillStyle = "white";
    context.fillText(this.text, this.posX, this.posY);

    context.closePath();
  }
}

function generateValidCircle(canvas, minRadius, maxRadius, text, color, backcolor) {
  let attempts = 0;
  while (attempts < 100) { // Previene bucles infinitos
    let randomRadius = Math.floor(Math.random() * (maxRadius - minRadius) + minRadius); // Genera un radio entre minRadius y maxRadius
    let randomX = Math.random() * (canvas.width - 2 * randomRadius) + randomRadius; // Genera una coordenada x entre randomRadius y canvas.width - randomRadius
    let randomY = Math.random() * (canvas.height - 2 * randomRadius) + randomRadius; // Genera una coordenada y entre randomRadius y canvas.height - randomRadius

    if (
      randomX - randomRadius >= 0 &&
      randomX + randomRadius <= canvas.width &&
      randomY - randomRadius >= 0 &&
      randomY + randomRadius <= canvas.height // Verifica que el círculo no se salga de la pantalla
    ) {
      return new Circle(randomX, randomY, randomRadius, color, text, backcolor);
    }
    attempts++;
  }
  return null; // Si no encuentra una posición válida
}

let miCirculo = new Circle(canvasOOP.width / 2, canvasOOP.height / 2, 50, "red", "Tec", "rgb(66, 135, 245)");
miCirculo.draw(ctx);

let randomCircle = generateValidCircle(canvasRandom, 30, 100, "Tec", "green", "rgb(83, 186, 52)");
if (randomCircle) randomCircle.draw(ctxRandom);

let arrayCircle = [];
for (let i = 0; i < 10; i++) {
  let miCirculoMultiple = generateValidCircle(canvasMultiple, 20, 30, i + 1, "#9e500d", "#f29a4e");
  if (miCirculoMultiple) {
    arrayCircle.push(miCirculoMultiple);
    miCirculoMultiple.draw(ctxMultiple);
  }
}
